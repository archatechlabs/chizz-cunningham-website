/**
 * PrimeTime NFC Tools - Local server for ACR122U / PC/SC readers
 * Run: node server.js  →  open http://localhost:3847
 *
 * - Read UID, read NDEF, write NDEF (text, URL, student code)
 * - Uses nfc-pcsc; reader must be connected (e.g. ACR122U)
 */

const express = require('express');
const cors = require('cors');
const path = require('path');
const ndef = require('ndef');

const PORT = process.env.NFC_TOOLS_PORT || 3847;
const app = express();

function log(...args) {
  console.log('[NFC]', ...args);
}
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory state: last card seen, pending write, SSE clients
let lastCard = null;
let pendingWrite = null;
let sseClients = [];
let readerName = null;

// Build vCard 3.0 string from contact + social links
function buildVCard(payload) {
  const lines = ['BEGIN:VCARD', 'VERSION:3.0'];
  if (payload.name) {
    lines.push('FN:' + payload.name.replace(/[\r\n]/g, ' ').trim());
    const parts = payload.name.replace(/[\r\n]/g, ' ').trim().split(/\s+/);
    const last = parts.pop() || '';
    const first = parts.join(' ') || last;
    lines.push('N:' + last + ';' + first + ';;;');
  }
  if (payload.email) lines.push('EMAIL:' + String(payload.email).trim());
  if (payload.phone) lines.push('TEL;TYPE=CELL:' + String(payload.phone).replace(/\D/g, ''));
  if (payload.website) lines.push('URL:' + String(payload.website).trim());
  if (payload.linkedIn) lines.push('URL:' + String(payload.linkedIn).trim());
  if (payload.twitter) lines.push('URL:' + String(payload.twitter).trim());
  if (payload.instagram) lines.push('URL:' + String(payload.instagram).trim());
  const socialNote = [payload.linkedIn && 'LinkedIn', payload.twitter && 'Twitter', payload.instagram && 'Instagram']
    .filter(Boolean).join(', ');
  if (socialNote) lines.push('NOTE:Social: ' + socialNote);
  lines.push('END:VCARD');
  return lines.join('\r\n');
}

// NDEF: encode text, URL, or business_card (multi-record: URI + vCard) to bytes
function encodeNdefPayload(type, value) {
  if (type === 'business_card') {
    let payload;
    try {
      payload = typeof value === 'string' ? JSON.parse(value) : value;
    } catch (e) {
      throw new Error('Invalid business card payload');
    }
    const website = (payload.website || '').trim() || (payload.url || '').trim();
    if (!website) throw new Error('Business card must include a website URL');
    const vCardStr = buildVCard(payload);
    // Pass payload as byte array so ndef lib never calls stringToBytes (avoids Buffer.toJSON() quirks in newer Node)
    const vCardBytes = Array.from(Buffer.from(vCardStr, 'utf8'));
    const records = [
      ndef.uriRecord(website),
      ndef.mimeMediaRecord('text/vcard', vCardBytes),
    ];
    let encoded;
    try {
      encoded = ndef.encodeMessage(records);
    } catch (e) {
      throw new Error('NDEF encode failed: ' + (e && e.message ? e.message : String(e)));
    }
    if (!encoded || !Array.isArray(encoded)) throw new Error('NDEF encode failed');
    return Buffer.from(encoded);
  }
  if (value == null || typeof value !== 'string') {
    throw new Error('Missing or invalid value for text/URL write');
  }
  const records = type === 'url'
    ? [ndef.uriRecord(value)]
    : [ndef.textRecord(value)];
  let encoded;
  try {
    encoded = ndef.encodeMessage(records);
  } catch (e) {
    throw new Error('NDEF encode failed: ' + (e && e.message ? e.message : String(e)));
  }
  if (!encoded || !Array.isArray(encoded)) throw new Error('NDEF encode failed');
  return Buffer.from(encoded);
}

// NDEF: parse TLV from tag (0x03 = NDEF, then length, then payload) and decode first text/URI record
function decodeNdefText(bytes) {
  if (!bytes || bytes.length < 2) {
    log('decodeNdefText: no bytes or too short', bytes ? bytes.length : 0);
    return null;
  }
  const raw = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  log('decodeNdefText: raw length=', raw.length, 'first 16 hex=', raw.slice(0, 16).toString('hex'));
  let ndefPayload = null;
  if (raw[0] === 0x03) {
    let ndefLen = raw[1];
    let payloadStart = 2;
    if (ndefLen === 0xff && raw.length >= 4) {
      ndefLen = raw.readUInt16BE(2);
      payloadStart = 4;
    }
    log('decodeNdefText: TLV type=0x03 ndefLen=', ndefLen, 'payloadStart=', payloadStart);
    if (ndefLen > 0 && payloadStart + ndefLen <= raw.length) {
      ndefPayload = raw.slice(payloadStart, payloadStart + ndefLen);
      log('decodeNdefText: extracted payload length=', ndefPayload.length, 'payload hex=', ndefPayload.slice(0, 32).toString('hex'));
    }
  } else {
    log('decodeNdefText: first byte not 0x03, using raw as payload');
  }
  if (!ndefPayload || ndefPayload.length === 0) {
    ndefPayload = raw;
  }
  try {
    const message = ndef.decodeMessage(Array.from(ndefPayload));
    log('decodeNdefText: decoded', message.length, 'record(s)');
    for (const record of message) {
      const typeStr = record.type;
      log('decodeNdefText: record tnf=', record.tnf, 'type=', JSON.stringify(typeStr), '(T=text U=uri)');
      if (record.tnf === ndef.TNF_WELL_KNOWN && typeStr === 'T') {
        const text = ndef.text.decodePayload(record.payload);
        log('decodeNdefText: text record ->', JSON.stringify(text));
        return text;
      }
      if (record.tnf === ndef.TNF_WELL_KNOWN && typeStr === 'U' && ndef.uri && ndef.uri.decodePayload) {
        const uri = ndef.uri.decodePayload(record.payload);
        log('decodeNdefText: uri record ->', uri);
        return uri;
      }
    }
    log('decodeNdefText: no text/uri record found in message');
  } catch (e) {
    log('decodeNdefText: decodeMessage/decodePayload threw', e.message);
  }
  return null;
}

// Mifare Ultralight / NTAG: block (page) size 4 bytes
const UL_BLOCK_SIZE = 4;
const CC_BLOCK = 3;
const NDEF_BLOCK = 4;
const CAPABILITY_CONTAINER = Buffer.from([0xe1, 0x10, 0x06, 0x00]);

function initNfc() {
  let NFC;
  try {
    NFC = require('nfc-pcsc').NFC;
  } catch (err) {
    console.error('NFC module load failed:', err.message);
    broadcast({ event: 'error', message: 'NFC module load failed: ' + err.message });
    return;
  }
  let nfc;
  try {
    nfc = new NFC();
  } catch (err) {
    console.error('NFC init failed:', err.message);
    console.error('If the reader is plugged in, try: pnpm run nfc-tools:rebuild');
    broadcast({ event: 'error', message: 'NFC init failed: ' + err.message });
    return;
  }

  nfc.on('reader', (reader) => {
    readerName = reader.reader.name;
    console.log('NFC reader attached:', readerName);

    reader.on('card', async (card) => {
      const uid = card.uid ? Buffer.from(card.uid).toString('hex').replace(/\s/g, '') : null;
      lastCard = { uid, at: new Date().toISOString() };
      console.log('Card detected:', uid || '(no uid)', 'type:', card.type);

      // Any card with UID can be written (TAG_ISO_14443_3, TAG_ISO_14443_3A, etc.)
      const canReadWrite = uid && (card.type === 'TAG_ISO_14443_3' || (card.type && card.type.indexOf('14443_3') !== -1));
      log('canReadWrite=', canReadWrite, 'pendingWrite=', !!pendingWrite);

      // Do pending write FIRST (before read) so we don't touch the card with a read that might interfere
      if (pendingWrite && uid) {
        const { type, value } = pendingWrite;
        try {
          if (type === 'test_write') {
            const testBlock = Buffer.alloc(UL_BLOCK_SIZE, 0);
            await reader.write(NDEF_BLOCK, testBlock, UL_BLOCK_SIZE);
            broadcast({ event: 'test_write_ok', uid });
            pendingWrite = null;
          } else {
            try {
              await reader.write(CC_BLOCK, CAPABILITY_CONTAINER, UL_BLOCK_SIZE);
            } catch (e) {
              // Block 3 often read-only; continue with NDEF
            }
            const bytes = encodeNdefPayload(type, value);
            if (!bytes || typeof bytes.length !== 'number') {
              throw new Error('Encode failed: no payload (check business card fields)');
            }
            log('WRITE: value=', typeof value === 'string' ? value.slice(0, 80) + '...' : JSON.stringify(value), 'type=', type, 'ndef bytes length=', bytes.length);
            const maxBytes = type === 'business_card' ? 600 : 120;
            if (bytes.length > maxBytes) throw new Error('Payload too long for tag (max ' + maxBytes + ' bytes). Use NTAG215/216 for business cards.');
            // TLV: type 0x03 (NDEF). Length must fit in 1 byte (0-255) or use extended: 0xFF + 2-byte big-endian
            const ndefLen = bytes.length;
            const useExtendedLength = ndefLen >= 256;
            const headerLen = useExtendedLength ? 4 : 2;
            const payloadLen = headerLen + ndefLen + 1; // +1 for 0xfe terminator
            const tlvLen = Math.ceil(payloadLen / UL_BLOCK_SIZE) * UL_BLOCK_SIZE;
            const tlv = Buffer.alloc(tlvLen, 0);
            tlv.writeUInt8(0x03, 0);
            if (useExtendedLength) {
              tlv.writeUInt8(0xff, 1);
              tlv.writeUInt16BE(ndefLen, 2);
              bytes.copy(tlv, 4);
              tlv.writeUInt8(0xfe, 4 + ndefLen);
            } else {
              if (ndefLen > 255) throw new Error('NDEF length ' + ndefLen + ' requires extended TLV (bug: useExtendedLength should be true)');
              tlv.writeUInt8(ndefLen, 1);
              bytes.copy(tlv, 2);
              tlv.writeUInt8(0xfe, 2 + ndefLen);
            }
            log('WRITE: TLV length=', tlvLen, 'full TLV hex=', tlv.toString('hex'));
            const delayMs = (ms) => new Promise((r) => setTimeout(r, ms));
            for (let offset = 0; offset < tlv.length; offset += UL_BLOCK_SIZE) {
              const block = NDEF_BLOCK + offset / UL_BLOCK_SIZE;
              const blockData = tlv.slice(offset, offset + UL_BLOCK_SIZE);
              await reader.write(block, blockData, UL_BLOCK_SIZE);
              log('WRITE: wrote block', block, 'hex=', blockData.toString('hex'));
              await delayMs(25);
            }
            const readBack = await reader.read(NDEF_BLOCK, tlv.length, UL_BLOCK_SIZE);
            if (readBack == null) throw new Error('Read-back failed (no data from tag)');
            const readBackBuf = Buffer.isBuffer(readBack) ? readBack : Buffer.from(readBack);
            if (typeof readBackBuf.length !== 'number') throw new Error('Read-back failed (invalid response)');
            log('WRITE: read-back length=', readBackBuf.length, 'hex=', readBackBuf.toString('hex'));
            if (readBackBuf.length < tlv.length || !tlv.equals(readBackBuf.slice(0, tlv.length))) {
              console.error('Write read-back failed. Wrote:', tlv.slice(0, 16).toString('hex'), 'Read:', readBackBuf.slice(0, 16).toString('hex'));
              throw new Error('Data did not persist (card may be read-only or use a different layout)');
            }
            log('WRITE: read-back OK, broadcasting write_ok');
            broadcast({ event: 'write_ok', uid, value });
            pendingWrite = null;
          }
        } catch (err) {
          const msg = err.message || String(err);
          console.error('Write failed:', msg);
          if (err.stack) console.error(err.stack);
          pendingWrite = null;
          broadcast({ event: 'write_fail', uid, error: msg });
        }
      }

      // Then read NDEF for display (Mifare Ultralight / NTAG: block 4+)
      let ndefText = null;
      if (canReadWrite) {
        try {
          const data = await reader.read(NDEF_BLOCK, 48, UL_BLOCK_SIZE);
          log('READ: got', data && data.length, 'bytes from block', NDEF_BLOCK);
          if (data && data.length) {
            const dataBuf = Buffer.isBuffer(data) ? data : Buffer.from(data);
            log('READ: raw bytes hex=', dataBuf.slice(0, Math.min(48, dataBuf.length)).toString('hex'));
            ndefText = decodeNdefText(data);
            log('READ: decodeNdefText result=', ndefText == null ? 'null' : JSON.stringify(ndefText));
          }
        } catch (e) {
          log('READ: read or decode threw', e.message);
        }
      }

      log('BROADCAST card: uid=', uid, 'ndefText=', ndefText == null ? 'null' : JSON.stringify(ndefText));
      broadcast({ event: 'card', uid, ndefText, at: lastCard.at });
    });

    reader.on('card.off', () => {
      lastCard = null;
      broadcast({ event: 'card_off' });
    });

    reader.on('error', (err) => {
      console.error('Reader error:', err);
      broadcast({ event: 'error', message: err.message });
    });

    reader.on('end', () => {
      readerName = null;
      broadcast({ event: 'reader_off' });
    });
  });

  nfc.on('error', (err) => {
    console.error('NFC error:', err);
    broadcast({ event: 'error', message: err.message });
  });
}

function broadcast(obj) {
  const data = 'data: ' + JSON.stringify(obj) + '\n\n';
  sseClients = sseClients.filter((res) => {
    try {
      res.write(data);
      return true;
    } catch (e) {
      return false;
    }
  });
}

// --- API ---

app.get('/api/status', (req, res) => {
  res.json({
    reader: readerName || null,
    lastCard: lastCard ? { uid: lastCard.uid, at: lastCard.at } : null,
    pendingWrite: pendingWrite ? { type: pendingWrite.type } : null,
  });
});

app.get('/api/diagnose', (req, res) => {
  res.json({
    reader: readerName || null,
    hint: 'If reader is plugged in (red light) but not detected: unplug/replug USB, restart this server, or run: node check-readers.js (from apps/nfc-tools)',
  });
});

app.get('/api/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.flushHeaders();
  sseClients.push(res);
  res.on('close', () => {
    sseClients = sseClients.filter((r) => r !== res);
  });
  // send current state
  if (readerName) res.write('data: ' + JSON.stringify({ event: 'reader', name: readerName }) + '\n\n');
  if (lastCard) res.write('data: ' + JSON.stringify({ event: 'card', uid: lastCard.uid, at: lastCard.at }) + '\n\n');
});

app.post('/api/test-write', (req, res) => {
  pendingWrite = { type: 'test_write' };
  res.json({ ok: true, message: 'Place card on reader to test if it is writable.' });
});

app.post('/api/write', (req, res) => {
  const body = req.body || {};
  const type = (body.type != null ? body.type : 'text').toString().toLowerCase();
  const payload = body.payload || body;
  const hasPayloadWebsite = payload && typeof payload === 'object' && ((payload.website || payload.url || '').trim());
  if (type === 'business_card' || hasPayloadWebsite) {
    const website = (payload.website || payload.url || '').trim();
    if (!website) {
      return res.status(400).json({ error: 'Business card requires "website" (or "url") in payload' });
    }
    pendingWrite = { type: 'business_card', value: JSON.stringify(payload) };
    return res.json({ ok: true, message: 'Place card on reader to write business card (website + contact).' });
  }
  const value = body.value;
  if (!value || typeof value !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid "value" (string)' });
  }
  pendingWrite = { type: type || 'text', value: value.trim() };
  res.json({ ok: true, message: 'Place card on reader to write.' });
});

app.get('/api/clear-pending', (req, res) => {
  pendingWrite = null;
  res.json({ ok: true });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, () => {
  console.log('PrimeTime NFC Tools: http://localhost:' + PORT);
  console.log('Connect your ACR122U (or other PC/SC reader) and open the URL in a browser.');
  console.log('NFC Tools logging: ON (all card read/write and NDEF decode logged to this terminal)');
  console.log('');
  console.log('If the reader is plugged in (red light) but the app says "No reader detected":');
  console.log('  1. Unplug the reader and plug it back in, then restart this server.');
  console.log('  2. Run: node check-readers.js  (from apps/nfc-tools) to list PC/SC readers.');
  console.log('  3. On macOS: System Information → USB — confirm "ACS ACR122U" is listed.');
  // Init NFC after server is listening so the page loads even if NFC/reader fails
  setImmediate(() => initNfc());
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error('Port ' + PORT + ' is already in use. Stop the other process using it (e.g. another NFC Tools server), or use a different port:');
    console.error('  NFC_TOOLS_PORT=3848 pnpm -w run nfc-tools');
    console.error('To find what is using the port: lsof -i :' + PORT);
  } else {
    console.error('Server error:', err.message);
  }
  process.exit(1);
});
