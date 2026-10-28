const fs = require('fs');
const puppeteer = require('puppeteer-core');
const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function main() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 512, height: 512 });

  const ICONS = [
    { file: 'img/games/game_math_sum.png', bg1: '#e0f2fe', bg2: '#38bdf8', border: '#0284c7', emoji: '🧮' },
    { file: 'img/games/game_animal_path.png', bg1: '#dcfce7', bg2: '#4ade80', border: '#16a34a', emoji: '🐾' }
  ];

  for (const item of ICONS) {
    const pngBase64 = await page.evaluate((it) => {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');
      const cx = 256, cy = 256, r = 210;

      // Soft shadow
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.14)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 12;

      // Background
      const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
      grad.addColorStop(0, it.bg1);
      grad.addColorStop(1, it.bg2);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(cx - r, cy - r, r * 2, r * 2, 84);
      ctx.fill();
      ctx.restore();

      // Border
      ctx.lineWidth = 14;
      ctx.strokeStyle = it.border;
      ctx.beginPath();
      ctx.roundRect(cx - r, cy - r, r * 2, r * 2, 84);
      ctx.stroke();

      // Inner highlight
      ctx.lineWidth = 4;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.beginPath();
      ctx.roundRect(cx - r + 8, cy - r + 8, r * 2 - 16, r * 2 - 16, 76);
      ctx.stroke();

      // Top gloss
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cx - r + 10, cy - r + 10, r * 2 - 20, r - 20, [72, 72, 12, 12]);
      const gloss = ctx.createLinearGradient(0, cy - r, 0, cy);
      gloss.addColorStop(0, 'rgba(255, 255, 255, 0.55)');
      gloss.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
      ctx.fillStyle = gloss;
      ctx.fill();
      ctx.restore();

      // Emoji
      ctx.font = "220px 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif";
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(it.emoji, cx, cy + 14);

      return c.toDataURL('image/png').replace(/^data:image\/png;base64,/, '');
    }, item);

    fs.writeFileSync(item.file, Buffer.from(pngBase64, 'base64'));
    console.log('Created:', item.file);
  }

  await browser.close();
}

main().catch(console.error);
