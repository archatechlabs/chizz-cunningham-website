# PrimeTime NFC Tools

Local web UI for **reading and writing NFC cards** with an ACR122U (or any PC/SC-compatible reader).

## Features

- **Read:** Place a card on the reader to see its **UID** and **NDEF text** (if the tag contains NDEF).
- **Write NDEF:** Write plain text, a **student code** (e.g. `WEBSTER-104` for PrimeTime), or a **URL** to a card. Set the value, click "Set write — then place card", then tap the card.
- **Business card / Contact:** Write your **website URL** plus **contact info and social links** (name, email, phone, LinkedIn, Twitter, Instagram). When someone taps the card with their phone, they can open your site and add you as a contact (vCard). Use **NTAG215** or **NTAG216** for best compatibility; expand "Business card / Contact" in the Write section.

Use the **UID** (hex, no spaces) in PrimeTime: **Dashboard → Students → Assign card → UID**.  
Use **student code** writes for **NDEF mode**: assign the same code in PrimeTime as "Card Code".

## Quick start

1. **Plug in** your ACR122U (or other PC/SC reader).
2. From the **repo root** (PrimeTimeApp):
   ```bash
   nvm use 20
   pnpm install
   pnpm -w run nfc-tools:rebuild
   pnpm -w run nfc-tools
   ```
   Or: `cd apps/nfc-tools && pnpm start` after the steps above (from root).
3. Open **http://localhost:3847** in your browser.
4. Place a card to read; use the Write section to write NDEF (then place card when prompted).

**If you see "incompatible architecture" or "No reader detected" on Apple Silicon (M1/M2/M3):** The PC/SC addon was likely built for the wrong architecture. From repo root run:
```bash
pnpm -w run nfc-tools:rebuild
```
then start again. Use the same Node version (e.g. `nvm use 20`) for both rebuild and start.

## Port

Default port is **3847**. Override with:

```bash
NFC_TOOLS_PORT=3001 pnpm start
```

## Reader not detected (red light, “No reader connected”)

If the ACR122U is plugged in (red light on) but the app shows “No reader connected”:

1. **Unplug and replug** the USB cable, then **restart the NFC Tools server** (the reader should be plugged in *before* you start the server).
2. **Check that the system sees the reader:** from repo root run:
   ```bash
   node apps/nfc-tools/check-readers.js
   ```
   If it prints “No readers found”, the OS or PC/SC driver isn’t exposing the reader. On macOS: **System Information → USB** — confirm “ACS ACR122U” (or similar) is listed.
3. **Rebuild the PC/SC addon** if you see native module errors:
   ```bash
   pnpm -w run nfc-tools:rebuild
   pnpm -w run nfc-tools
   ```

The red LED is normal when the reader is powered; it may turn yellow/green when a card is detected.

## Requirements

- Node.js 18+
- **macOS:** PC/SC is built-in; ACR122U may need to be used by the system (same reader as `nfc-list` from libnfc can conflict if both are used at once).
- **Windows/Linux:** Install PC/SC drivers for your reader if needed.

## Tech

- **nfc-pcsc** for reader access
- **ndef** for encoding/decoding NDEF text records
- Express server + Server-Sent Events for live card detection
