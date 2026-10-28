const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT_DIR = path.resolve(__dirname, '..');

const IMAGES = [
  {
    src: 'C:\\Users\\nghiabh\\.gemini\\antigravity\\brain\\50160709-bb8c-4c77-ac48-f365c4ce4627\\mnvh_elsa_olaf_png_1793154234510.jpg',
    dest: path.join(ROOT_DIR, 'coloring', 'mnvh_elsa_olaf.png')
  },
  {
    src: 'C:\\Users\\nghiabh\\.gemini\\antigravity\\brain\\50160709-bb8c-4c77-ac48-f365c4ce4627\\mnvh_elsa_ice_castle_png_1793154275307.jpg',
    dest: path.join(ROOT_DIR, 'coloring', 'mnvh_elsa_ice_castle.png')
  },
  {
    src: 'C:\\Users\\nghiabh\\.gemini\\antigravity\\brain\\50160709-bb8c-4c77-ac48-f365c4ce4627\\mnvh_elsa_ice_skating_png_1793154292629.jpg',
    dest: path.join(ROOT_DIR, 'coloring', 'mnvh_elsa_ice_skating.png')
  },
  {
    src: 'C:\\Users\\nghiabh\\.gemini\\antigravity\\brain\\50160709-bb8c-4c77-ac48-f365c4ce4627\\mnvh_elsa_ice_crown_png_1793154347718.jpg',
    dest: path.join(ROOT_DIR, 'coloring', 'mnvh_elsa_ice_crown.png')
  },
  {
    src: 'C:\\Users\\nghiabh\\.gemini\\antigravity\\brain\\50160709-bb8c-4c77-ac48-f365c4ce4627\\mnvh_elsa_nokk_water_horse_png_1793154363736.jpg',
    dest: path.join(ROOT_DIR, 'coloring', 'mnvh_elsa_nokk_water_horse.png')
  }
];

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 768, height: 1024 });

  for (const img of IMAGES) {
    if (!fs.existsSync(img.src)) {
      console.warn('File not found:', img.src);
      continue;
    }
    const dataUri = 'data:image/jpeg;base64,' + fs.readFileSync(img.src).toString('base64');
    const pngBase64 = await page.evaluate(async (uri) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.onload = () => {
          const c = document.createElement('canvas');
          c.width = image.width;
          c.height = image.height;
          const ctx = c.getContext('2d');
          // Fill pure white background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, c.width, c.height);
          // Draw image
          ctx.drawImage(image, 0, 0);
          resolve(c.toDataURL('image/png').replace(/^data:image\/png;base64,/, ''));
        };
        image.src = uri;
      });
    }, dataUri);

    fs.writeFileSync(img.dest, Buffer.from(pngBase64, 'base64'));
    console.log('Converted & Saved:', img.dest);
  }

  // Generate mnvh_elsa_bruni.png (pure black and white outline, thick lines, no color)
  const bruniPngBase64 = await page.evaluate(() => {
    const c = document.createElement('canvas');
    c.width = 768;
    c.height = 1024;
    const ctx = c.getContext('2d');
    
    // Background pure white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, c.width, c.height);

    ctx.strokeStyle = '#111827';
    ctx.fillStyle = '#ffffff';
    ctx.lineWidth = 8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Decorative frame
    ctx.strokeRect(30, 30, 708, 964);
    ctx.lineWidth = 3;
    ctx.strokeRect(42, 42, 684, 940);

    // Snowflakes in corners
    const drawSnowflake = (x, y, s) => {
      ctx.lineWidth = 5;
      for (let i = 0; i < 6; i++) {
        const ang = (i * Math.PI) / 3;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(ang) * s, y + Math.sin(ang) * s);
        ctx.stroke();
      }
    };
    drawSnowflake(90, 90, 32);
    drawSnowflake(678, 90, 32);
    drawSnowflake(90, 934, 32);
    drawSnowflake(678, 934, 32);

    // Elsa's hand supporting Bruni
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(120, 820);
    ctx.bezierCurveTo(240, 800, 340, 760, 440, 750);
    ctx.bezierCurveTo(520, 740, 600, 750, 660, 790);
    ctx.stroke();

    // Elsa's sleeve cuff
    ctx.beginPath();
    ctx.arc(170, 815, 20, 0, Math.PI * 2);
    ctx.stroke();

    // Bruni - Cute Salamander Body (thick bold line art)
    const bx = 384, by = 560;
    
    // Body oval
    ctx.beginPath();
    ctx.ellipse(bx, by + 40, 140, 95, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Head
    ctx.beginPath();
    ctx.ellipse(bx, by - 100, 160, 120, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Big kawaii eyes
    ctx.beginPath();
    ctx.arc(bx - 70, by - 120, 42, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bx + 70, by - 120, 42, 0, Math.PI * 2);
    ctx.stroke();

    // Eye pupils (outline only for coloring)
    ctx.beginPath();
    ctx.arc(bx - 60, by - 125, 22, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bx + 60, by - 125, 22, 0, Math.PI * 2);
    ctx.stroke();

    // Happy smiling mouth
    ctx.beginPath();
    ctx.arc(bx, by - 65, 45, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    // Cute smiling tongue line
    ctx.beginPath();
    ctx.arc(bx, by - 45, 20, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    // Front little paws
    ctx.beginPath();
    ctx.arc(bx - 110, by + 120, 32, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bx + 110, by + 120, 32, 0, Math.PI * 2);
    ctx.stroke();

    // Back paws
    ctx.beginPath();
    ctx.arc(bx - 140, by + 70, 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(bx + 140, by + 70, 28, 0, Math.PI * 2);
    ctx.stroke();

    // Tail curved up happily
    ctx.beginPath();
    ctx.moveTo(bx + 130, by + 50);
    ctx.bezierCurveTo(bx + 240, by + 20, bx + 270, by - 60, bx + 210, by - 100);
    ctx.bezierCurveTo(bx + 180, by - 120, bx + 160, by - 80, bx + 130, by - 20);
    ctx.stroke();

    // Flame / Snowflake energy on Bruni's back
    ctx.beginPath();
    ctx.moveTo(bx, by - 220);
    ctx.bezierCurveTo(bx - 30, by - 180, bx + 30, by - 180, bx, by - 220);
    ctx.stroke();

    // Floating snowflake friends around Bruni
    drawSnowflake(200, 320, 24);
    drawSnowflake(580, 340, 28);
    drawSnowflake(520, 680, 20);

    return c.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
  });

  const bruniDest = path.join(ROOT_DIR, 'coloring', 'mnvh_elsa_bruni.png');
  fs.writeFileSync(bruniDest, Buffer.from(bruniPngBase64, 'base64'));
  console.log('Generated & Saved:', bruniDest);

  await browser.close();
  console.log('All 6 Elsa coloring pages updated successfully!');
}

main().catch(console.error);
