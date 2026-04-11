import sharp from 'sharp';
import path from 'path';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1E3A5F"/>
      <stop offset="100%" style="stop-color:#0F2744"/>
    </linearGradient>
  </defs>
  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bgGradient)"/>
  
  <!-- Decorative circles -->
  <circle cx="1100" cy="100" r="200" fill="#0ea5e9" opacity="0.1"/>
  <circle cx="100" cy="530" r="150" fill="#0ea5e9" opacity="0.1"/>
  
  <!-- Logo icon -->
  <rect x="500" y="120" width="200" height="200" rx="40" fill="#ffffff"/>
  <text x="600" y="265" font-family="Arial, Helvetica, sans-serif" font-size="100" font-weight="bold" fill="#1E3A5F" text-anchor="middle">DO</text>
  
  <!-- Company Name -->
  <text x="600" y="420" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="bold" fill="#ffffff" text-anchor="middle">TheDiGiorb</text>
  
  <!-- Tagline -->
  <text x="600" y="490" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#0ea5e9" text-anchor="middle">Crafting Exceptional Digital Experiences</text>
  
  <!-- Website -->
  <text x="600" y="570" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#94a3b8" text-anchor="middle">www.thedigiorb.com</text>
</svg>`;

const imgDir = path.join(process.cwd(), 'public', 'assets', 'img');

async function generateOgImage() {
  console.log('Generating OG image...');
  
  await sharp(Buffer.from(svgContent))
    .resize(1200, 630)
    .png()
    .toFile(path.join(imgDir, 'og-image.png'));
  
  console.log('Created og-image.png (1200x630)');
}

generateOgImage().catch(console.error);
