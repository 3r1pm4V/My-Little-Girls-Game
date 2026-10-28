/**
 * scripts/chrome_generate_assets.js
 * Điều khiển Google Chrome (C:\Program Files\Google\Chrome\Application\chrome.exe)
 * để tự động tạo và xuất toàn bộ hình ảnh PNG chất lượng cao, đồng bộ phong cách,
 * 100% OFFLINE, 0 CREDIT, KHÔNG PHỤ THUỘC API NGOÀI:
 * 
 * 1. 6 Tranh tô màu Elsa nét viền đen dày, nền trắng (coloring/mnvh_elsa_*.png)
 * 2. 4 Icon Lớn Trang Chủ vừa vặn Mobile/Tablet/PC (img/home/home_*.png)
 * 3. 16 Icon Game Đồ Họa 3D Bắt Mắt (img/games/game_*.png)
 * 4. 20 Đồ vật đếm hình độc nhất cho số 1 đến 20 (img/vocab/count_*.png)
 * 5. 10 Sticker hoạt hình 2D rực rỡ (img/stickers/sticker_*.png)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT_DIR = path.resolve(__dirname, '..');

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function main() {
  console.log('================================================================');
  console.log('  CHROME CANVAS GENERATOR — ASSET PRODUCTION PIPELINE (0 CREDIT)');
  console.log('  Chrome Binary:', CHROME_PATH);
  console.log('================================================================\n');

  await ensureDir(path.join(ROOT_DIR, 'coloring'));
  await ensureDir(path.join(ROOT_DIR, 'img', 'home'));
  await ensureDir(path.join(ROOT_DIR, 'img', 'games'));
  await ensureDir(path.join(ROOT_DIR, 'img', 'vocab'));
  await ensureDir(path.join(ROOT_DIR, 'img', 'stickers'));

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 512, height: 512, deviceScaleFactor: 2 });

  // Load a base HTML with full canvas helper functions
  const baseHtml = `
    <!doctype html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body, html { margin:0; padding:0; background: transparent; overflow:hidden; }
        canvas { display:block; }
      </style>
    </head>
    <body>
      <canvas id="c" width="512" height="512"></canvas>
      <script>
        const c = document.getElementById("c");
        const ctx = c.getContext("2d");

        function clearCanvas(bg = null) {
          ctx.clearRect(0, 0, 512, 512);
          if (bg) {
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, 512, 512);
          }
        }

        function drawGlossyBadge(bgColor1, bgColor2, borderColor, iconEmoji, subSymbol = "") {
          clearCanvas(null);
          const r = 210, cx = 256, cy = 256;
          
          // Drop shadow
          ctx.save();
          ctx.shadowColor = "rgba(0, 0, 0, 0.22)";
          ctx.shadowBlur = 32;
          ctx.shadowOffsetY = 16;
          
          // Badge background
          const grad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
          grad.addColorStop(0, bgColor1);
          grad.addColorStop(1, bgColor2);
          ctx.fillStyle = grad;
          
          ctx.beginPath();
          ctx.roundRect(cx - r, cy - r, r * 2, r * 2, 72);
          ctx.fill();
          ctx.restore();

          // Border
          ctx.lineWidth = 14;
          ctx.strokeStyle = borderColor;
          ctx.beginPath();
          ctx.roundRect(cx - r, cy - r, r * 2, r * 2, 72);
          ctx.stroke();

          // Inner highlight border
          ctx.lineWidth = 4;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.65)";
          ctx.beginPath();
          ctx.roundRect(cx - r + 8, cy - r + 8, r * 2 - 16, r * 2 - 16, 64);
          ctx.stroke();

          // Top glossy reflection
          ctx.save();
          ctx.beginPath();
          ctx.roundRect(cx - r + 10, cy - r + 10, r * 2 - 20, r - 20, [60, 60, 10, 10]);
          const gloss = ctx.createLinearGradient(0, cy - r, 0, cy);
          gloss.addColorStop(0, "rgba(255, 255, 255, 0.5)");
          gloss.addColorStop(1, "rgba(255, 255, 255, 0.05)");
          ctx.fillStyle = gloss;
          ctx.fill();
          ctx.restore();

          // Main Icon
          ctx.font = "180px 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(iconEmoji, cx, cy + (subSymbol ? -12 : 8));

          // Sub symbol if exists
          if (subSymbol) {
            ctx.font = "bold 70px 'Baloo 2', system-ui, sans-serif";
            ctx.fillStyle = "#ffffff";
            ctx.shadowColor = "rgba(0,0,0,0.4)";
            ctx.shadowBlur = 8;
            ctx.fillText(subSymbol, cx, cy + 130);
          }

          return c.toDataURL("image/png");
        }

        function drawElsaColoringPage(title, elements) {
          clearCanvas("#ffffff");
          ctx.strokeStyle = "#111827";
          ctx.fillStyle = "#ffffff";
          ctx.lineCap = "round";
          ctx.lineJoin = "round";

          // Decorative border
          ctx.lineWidth = 6;
          ctx.strokeRect(20, 20, 472, 472);
          ctx.lineWidth = 2;
          ctx.strokeRect(28, 28, 456, 456);

          // Snowflakes in corners
          const drawCornerSnowflake = (x, y) => {
            ctx.lineWidth = 4;
            for (let i = 0; i < 4; i++) {
              ctx.beginPath();
              ctx.moveTo(x - 22, y);
              ctx.lineTo(x + 22, y);
              ctx.moveTo(x, y - 22);
              ctx.lineTo(x, y + 22);
              ctx.stroke();
            }
          };
          drawCornerSnowflake(54, 54);
          drawCornerSnowflake(458, 54);
          drawCornerSnowflake(54, 458);
          drawCornerSnowflake(458, 458);

          // Render specific Elsa character artwork
          elements.forEach(el => {
            ctx.lineWidth = el.w || 6;
            if (el.type === "circle") {
              ctx.beginPath();
              ctx.arc(el.x, el.y, el.r, 0, Math.PI * 2);
              ctx.stroke();
            } else if (el.type === "line") {
              ctx.beginPath();
              ctx.moveTo(el.x1, el.y1);
              ctx.lineTo(el.x2, el.y2);
              ctx.stroke();
            } else if (el.type === "path") {
              const p = new Path2D(el.d);
              ctx.stroke(p);
            } else if (el.type === "emoji") {
              ctx.font = el.size + "px 'Segoe UI Emoji', sans-serif";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillText(el.char, el.x, el.y);
            }
          });

          // Title banner at bottom
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.roundRect(80, 420, 352, 44, 22);
          ctx.stroke();
          ctx.font = "bold 20px system-ui, sans-serif";
          ctx.fillStyle = "#1e293b";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("❄️ " + title + " ❄️", 256, 442);

          return c.toDataURL("image/png");
        }

        function drawItemGraphic(emoji, bgColor, borderColor) {
          clearCanvas(null);
          const cx = 256, cy = 256, r = 210;

          // Soft background circle
          const grad = ctx.createRadialGradient(cx, cy, 40, cx, cy, r);
          grad.addColorStop(0, bgColor);
          grad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(cx, cy, r, 0, Math.PI * 2);
          ctx.fill();

          // Crisp emoji graphic
          ctx.font = "260px 'Segoe UI Emoji', 'Apple Color Emoji', sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.shadowColor = "rgba(0,0,0,0.18)";
          ctx.shadowBlur = 24;
          ctx.shadowOffsetY = 12;
          ctx.fillText(emoji, cx, cy + 12);

          return c.toDataURL("image/png");
        }
      </script>
    </body>
    </html>
  `;

  await page.setContent(baseHtml);

  // ============================================================================
  // 1. SINH 4 ICON LỚN TRANG CHỦ (Home Menu Icons)
  // ============================================================================
  console.log('--- 1. Sinh 4 Icon Lớn Trang Chủ (Home Menu Icons) ---');
  const HOME_ICONS = [
    { file: 'img/home/home_letters.png', bg1: '#fef3c7', bg2: '#fde047', border: '#f59e0b', emoji: '🔤', sub: 'Aa · Bé học chữ' },
    { file: 'img/home/home_numbers.png', bg1: '#e0e7ff', bg2: '#a5b4fc', border: '#6366f1', emoji: '🔢', sub: '123 · Bé học số' },
    { file: 'img/home/home_games.png', bg1: '#bae6fd', bg2: '#38bdf8', border: '#0284c7', emoji: '🎮', sub: 'Trò chơi vui nhộn' },
    { file: 'img/home/home_stories.png', bg1: '#dcfce7', bg2: '#86efac', border: '#22c55e', emoji: '📖', sub: 'Truyện cổ tích' }
  ];

  for (const h of HOME_ICONS) {
    const pngBase64 = await page.evaluate((h) => {
      return drawGlossyBadge(h.bg1, h.bg2, h.border, h.emoji, h.sub).replace(/^data:image\/png;base64,/, '');
    }, h);
    const dest = path.join(ROOT_DIR, h.file);
    fs.writeFileSync(dest, Buffer.from(pngBase64, 'base64'));
    console.log(`  ✔ Đã tạo: ${h.file}`);
  }

  // ============================================================================
  // 2. SINH 16 ICON GAME ĐỒ HỌA BẮT MẮT (Games Grid Icons)
  // ============================================================================
  console.log('\n--- 2. Sinh 16 Icon Game Cho Menu Trò Chơi (PNG) ---');
  const GAME_ICONS = [
    { id: 'game_count', bg1: '#fee2e2', bg2: '#fca5a5', border: '#ef4444', emoji: '🍎', sub: 'Đếm hình' },
    { id: 'game_bubble', bg1: '#e0f2fe', bg2: '#7dd3fc', border: '#0284c7', emoji: '🫧', sub: 'Bắt bóng' },
    { id: 'game_match', bg1: '#fef3c7', bg2: '#fcd34d', border: '#f59e0b', emoji: '🧩', sub: 'Ghép chữ' },
    { id: 'game_missing', bg1: '#ede9fe', bg2: '#c4b5fd', border: '#8b5cf6', emoji: '❓', sub: 'Số thiếu' },
    { id: 'game_memory', bg1: '#fce7f3', bg2: '#f9a8d4', border: '#ec4899', emoji: '🃏', sub: 'Lật thẻ' },
    { id: 'game_compare', bg1: '#dcfce7', bg2: '#86efac', border: '#10b981', emoji: '⚖️', sub: 'So sánh' },
    { id: 'game_color_shape', bg1: '#ccfbf1', bg2: '#5eead4', border: '#14b8a6', emoji: '🧺', sub: 'Giỏ màu' },
    { id: 'game_puzzle', bg1: '#ffedd5', bg2: '#fed7aa', border: '#f97316', emoji: '🐧', sub: 'Ghép hình' },
    { id: 'game_size_compare', bg1: '#fef9c3', bg2: '#fde047', border: '#eab308', emoji: '🍇', sub: 'To nhỏ' },
    { id: 'game_odd_spot', bg1: '#ecfdf5', bg2: '#a7f3d0', border: '#059669', emoji: '🔍', sub: 'Khác biệt' },
    { id: 'game_fruit_slash', bg1: '#ffe4e6', bg2: '#fda4af', border: '#f43f5e', emoji: '🍉', sub: 'Chém quả' },
    { id: 'game_ninja', bg1: '#ffe4e6', bg2: '#fda4af', border: '#f43f5e', emoji: '🍉', sub: 'Chém quả' },
    { id: 'game_art_studio', bg1: '#fdf4ff', bg2: '#f0abfc', border: '#d946ef', emoji: '🎨', sub: 'Tô màu' },
    { id: 'game_art', bg1: '#fdf4ff', bg2: '#f0abfc', border: '#d946ef', emoji: '🎨', sub: 'Tô màu' },
    { id: 'game_connect_dots', bg1: '#eff6ff', bg2: '#93c5fd', border: '#3b82f6', emoji: '🔢', sub: 'Nối chấm' },
    { id: 'game_memory_draw', bg1: '#f5f3ff', bg2: '#ddd6fe', border: '#7c3aed', emoji: '🧠', sub: 'Vẽ nhớ' },
    { id: 'game_ten_frame', bg1: '#ecfeff', bg2: '#a5f3fc', border: '#06b6d4', emoji: '🔟', sub: 'Khung 10' },
    { id: 'game_pair_link', bg1: '#fff7ed', bg2: '#fdba74', border: '#ea580c', emoji: '🔗', sub: 'Nối cặp' }
  ];

  for (const g of GAME_ICONS) {
    const pngBase64 = await page.evaluate((g) => {
      return drawGlossyBadge(g.bg1, g.bg2, g.border, g.emoji, g.sub).replace(/^data:image\/png;base64,/, '');
    }, g);
    const dest = path.join(ROOT_DIR, 'img', 'games', `${g.id}.png`);
    fs.writeFileSync(dest, Buffer.from(pngBase64, 'base64'));
    console.log(`  ✔ Đã tạo: img/games/${g.id}.png`);
  }

  // ============================================================================
  // 3. SINH 20 ĐỒ VẬT ĐẾM HÌNH CHO SỐ 1 ĐẾN 20 (Mỗi số 1 hình độc nhất)
  // ============================================================================
  console.log('\n--- 3. Sinh 20 Đồ Vật Đếm Hình Riêng Biệt Cho Số 1 Đến 20 (PNG) ---');
  const COUNT_OBJECTS = [
    { id: 'count_sun', emoji: '☀️', bg: '#fef08a' },
    { id: 'count_cat', emoji: '🐱', bg: '#fed7aa' },
    { id: 'count_apple', emoji: '🍎', bg: '#fecaca' },
    { id: 'count_flower', emoji: '🌸', bg: '#fbcfe8' },
    { id: 'count_star', emoji: '⭐', bg: '#fef08a' },
    { id: 'count_donut', emoji: '🍩', bg: '#fed7aa' },
    { id: 'count_grape', emoji: '🍇', bg: '#e9d5ff' },
    { id: 'count_orange', emoji: '🍊', bg: '#ffedd5' },
    { id: 'count_strawberry', emoji: '🍓', bg: '#ffe4e6' },
    { id: 'count_puppy', emoji: '🐶', bg: '#fed7aa' },
    { id: 'count_balloon', emoji: '🎈', bg: '#fecaca' },
    { id: 'count_icecream', emoji: '🍦', bg: '#fef08a' },
    { id: 'count_banana', emoji: '🍌', bg: '#fef9c3' },
    { id: 'count_bunny', emoji: '🐰', bg: '#f1f5f9' },
    { id: 'count_car', emoji: '🚗', bg: '#bae6fd' },
    { id: 'count_kite', emoji: '🪁', bg: '#e0e7ff' },
    { id: 'count_watermelon', emoji: '🍉', bg: '#bbf7d0' },
    { id: 'count_butterfly', emoji: '🦋', bg: '#a5f3fc' },
    { id: 'count_rocket', emoji: '🚀', bg: '#fed7aa' },
    { id: 'count_heart', emoji: '💖', bg: '#fbcfe8' }
  ];

  for (const obj of COUNT_OBJECTS) {
    const pngBase64 = await page.evaluate((obj) => {
      return drawItemGraphic(obj.emoji, obj.bg, '#0284c7').replace(/^data:image\/png;base64,/, '');
    }, obj);
    const dest = path.join(ROOT_DIR, 'img', 'vocab', `${obj.id}.png`);
    fs.writeFileSync(dest, Buffer.from(pngBase64, 'base64'));
    console.log(`  ✔ Đã tạo: img/vocab/${obj.id}.png (${obj.emoji})`);
  }

  // ============================================================================
  // 4. SINH 6 TRANH TÔ MÀU ELSA MỚI (Nét Viền Đen Rõ Nét, Nền Trắng Tinh)
  // ============================================================================
  console.log('\n--- 4. Sinh 6 Tranh Tô Màu Elsa Nét Viền Đen Dày, Nền Trắng (PNG) ---');
  const ELSA_PAGES = [
    {
      file: 'coloring/mnvh_elsa_olaf.png',
      title: 'Elsa và người tuyết Olaf',
      elements: [
        { type: 'emoji', char: '👸', size: 190, x: 190, y: 220 },
        { type: 'emoji', char: '☃️', size: 150, x: 350, y: 280 },
        { type: 'circle', x: 256, y: 256, r: 180, w: 5 },
        { type: 'emoji', char: '❄️', size: 50, x: 130, y: 110 },
        { type: 'emoji', char: '❄️', size: 50, x: 380, y: 120 }
      ]
    },
    {
      file: 'coloring/mnvh_elsa_ice_castle.png',
      title: 'Elsa và lâu đài băng',
      elements: [
        { type: 'emoji', char: '🏰', size: 210, x: 256, y: 180 },
        { type: 'emoji', char: '👸', size: 140, x: 256, y: 320 },
        { type: 'emoji', char: '❄️', size: 45, x: 100, y: 140 },
        { type: 'emoji', char: '❄️', size: 45, x: 412, y: 140 }
      ]
    },
    {
      file: 'coloring/mnvh_elsa_ice_skating.png',
      title: 'Elsa trượt băng nghệ thuật',
      elements: [
        { type: 'emoji', char: '👸', size: 190, x: 256, y: 210 },
        { type: 'emoji', char: '⛸️', size: 90, x: 256, y: 340 },
        { type: 'circle', x: 256, y: 240, r: 160, w: 4 },
        { type: 'emoji', char: '✨', size: 50, x: 130, y: 130 },
        { type: 'emoji', char: '✨', size: 50, x: 382, y: 130 }
      ]
    },
    {
      file: 'coloring/mnvh_elsa_ice_crown.png',
      title: 'Elsa vương miện băng tuyết',
      elements: [
        { type: 'emoji', char: '👑', size: 130, x: 256, y: 120 },
        { type: 'emoji', char: '👸', size: 210, x: 256, y: 270 },
        { type: 'circle', x: 256, y: 256, r: 175, w: 5 }
      ]
    },
    {
      file: 'coloring/mnvh_elsa_nokk_water_horse.png',
      title: 'Elsa và chú ngựa thần Nokk',
      elements: [
        { type: 'emoji', char: '👸', size: 160, x: 180, y: 240 },
        { type: 'emoji', char: '🦄', size: 170, x: 340, y: 240 },
        { type: 'emoji', char: '🌊', size: 70, x: 256, y: 360 }
      ]
    },
    {
      file: 'coloring/mnvh_elsa_bruni.png',
      title: 'Elsa và thằn lằn tuyết Bruni',
      elements: [
        { type: 'emoji', char: '👸', size: 190, x: 220, y: 220 },
        { type: 'emoji', char: '🦎', size: 100, x: 370, y: 280 },
        { type: 'emoji', char: '❄️', size: 45, x: 370, y: 170 }
      ]
    }
  ];

  for (const pageItem of ELSA_PAGES) {
    const pngBase64 = await page.evaluate((item) => {
      return drawElsaColoringPage(item.title, item.elements).replace(/^data:image\/png;base64,/, '');
    }, pageItem);
    const dest = path.join(ROOT_DIR, pageItem.file);
    fs.writeFileSync(dest, Buffer.from(pngBase64, 'base64'));
    console.log(`  ✔ Đã tạo: ${pageItem.file} (${(fs.statSync(dest).size / 1024).toFixed(1)} KB)`);
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('  TẤT CẢ TÀI NGUYÊN PNG ĐÃ ĐƯỢC CHROME TẠO XONG 100%!');
  console.log('================================================================');
}

main().catch(err => {
  console.error('✖ Lỗi:', err);
  process.exit(1);
});
