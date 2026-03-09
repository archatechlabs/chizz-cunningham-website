import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function GET() {
  let photoBase64 = ''
  
  try {
    const imagePath = join(process.cwd(), 'public', 'Images', 'Chizz_Cunningham_Image.jpeg')
    const imageBuffer = readFileSync(imagePath)
    photoBase64 = imageBuffer.toString('base64')
  } catch {
    console.log('Could not load profile image for vCard')
  }

  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Cunningham;Chizz;;;',
    'FN:Chizz Cunningham',
    'ORG:Archatech Labs LLC',
    'TITLE:Founder / Software Engineer / Data Scientist / Entrepreneur',
    'TEL;TYPE=CELL:+1 929 304 2211',
    'EMAIL;TYPE=WORK:Chizz@Archatechlabs.com',
    'URL:https://www.chizzcunningham.io',
    'URL;TYPE=LinkedIn:https://www.linkedin.com/in/chizz-cunningham-664237214/',
    'URL;TYPE=Twitter:https://x.com/techlordchizz',
    photoBase64 ? `PHOTO;ENCODING=b;TYPE=JPEG:${photoBase64}` : '',
    'END:VCARD',
  ].filter(Boolean).join('\r\n')

  return new NextResponse(vcard, {
    headers: {
      'Content-Type': 'text/vcard',
      'Content-Disposition': 'attachment; filename="Chizz_Cunningham.vcf"',
    },
  })
}
