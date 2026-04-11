import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import pngToIco from 'png-to-ico';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E3A5F"/>
      <stop offset="100%" style="stop-color:#0F2744"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="14" fill="url(#bgGradient)"/>
  <text x="32" y="42" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="bold" fill="white" text-anchor="middle">DO</text>
</svg>`;

const imgDir = path.join(process.cwd(), 'public', 'assets', 'img');
const publicDir = path.join(process.cwd(), 'public');

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'favicon.png', size: 64 },
];

async function generateFavicons() {
  console.log('Generating favicon PNGs...');
  
  for (const { name, size } of sizes) {
    await sharp(Buffer.from(svgContent))
      .resize(size, size)
      .png()
      .toFile(path.join(imgDir, name));
    console.log(`Created ${name} (${size}x${size})`);
  }
  
  // Generate favicon.ico
  console.log('Generating favicon.ico...');
  const pngPath = path.join(imgDir, 'favicon-32x32.png');
  const icoBuffer = await pngToIco(pngPath);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);
  console.log('Created favicon.ico');
  
  console.log('Favicon PNGs generated successfully!');
}

generateFavicons().catch(console.error);
