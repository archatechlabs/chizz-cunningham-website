#!/usr/bin/env node
/**
 * PrimeTime NFC Tools – reader diagnostic
 * Run from repo root: pnpm -w exec node apps/nfc-tools/check-readers.js
 * Or from apps/nfc-tools: node check-readers.js
 *
 * Lists PC/SC readers (e.g. ACR122U). If none appear, the OS or driver isn’t
 * exposing the reader to Node.
 */

const path = require('path');

console.log('Checking for PC/SC NFC readers…\n');

let nfc;
try {
  nfc = require('nfc-pcsc');
} catch (e) {
  console.error('Failed to load nfc-pcsc:', e.message);
  if (e.message && (e.message.includes('pcsclite') || e.message.includes('incompatible architecture'))) {
    console.error('\nThe PC/SC native addon is missing or wrong architecture (e.g. Apple Silicon vs x64).');
    console.error('From repo root run:');
    console.error('  pnpm run nfc-tools:rebuild');
    console.error('Then run this check again and start the NFC Tools server.');
  }
  process.exit(1);
}

const { NFC } = nfc;
const readers = [];
const nfcInstance = new NFC();

nfcInstance.on('reader', (reader) => {
  const name = reader.reader ? reader.reader.name : reader.name;
  readers.push(name);
  console.log('  ✓', name);
});

nfcInstance.on('error', (err) => {
  console.error('NFC error:', err.message);
});

// Give PC/SC a few seconds to report readers (they can appear shortly after init)
setTimeout(() => {
  nfcInstance.close();
  if (readers.length === 0) {
    console.log('No readers found.\n');
    console.log('If your ACR122U is plugged in (red light on):');
    console.log('  1. Unplug the USB cable and plug it back in.');
    console.log('  2. Start this check again: node check-readers.js');
    console.log('  3. On macOS: Open System Information → USB and confirm "ACS ACR122U" (or similar) is listed.');
    console.log('  4. Restart the NFC Tools server with the reader already plugged in.');
    process.exit(1);
  }
  console.log('\nFound', readers.length, 'reader(s). You can start the NFC Tools server.');
  process.exit(0);
}, 4000);
