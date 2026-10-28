const puppeteer = require('C:/Users/nghiabh/.gemini/antigravity/scratch/stickman-story/node_modules/puppeteer-core');
const fs = require('fs');
const path = require('path');

const ITEMS = [
  {
    name: 'cbn_teddy_bear.png',
    object: 'cute teddy bear sitting happily'
  },
  {
    name: 'cbn_butterfly.png',
    object: 'beautiful butterfly with large symmetric wings'
  },
  {
    name: 'cbn_castle.png',
    object: 'fairytale royal castle with towers and flags'
  },
  {
    name: 'cbn_dinosaur.png',
    object: 'friendly cute baby dinosaur'
  },
  {
    name: 'cbn_sunflower.png',
    object: 'smiling sunflower with round center and petals'
  },
  {
    name: 'cbn_apple_tree.png',
    object: 'lush apple tree with round apples'
  },
  {
    name: 'cbn_car.png',
    object: 'cute cartoon car with wheels and headlights'
  },
  {
    name: 'cbn_fish.png',
    object: 'cute tropical fish swimming with fins and bubbles'
  },
  {
    name: 'cbn_kitten.png',
    object: 'playful adorable kitten sitting with a ball of yarn'
  },
  {
    name: 'cbn_rocket.png',
    object: 'space rocket flying with flames and stars'
  }
];

function buildPrompt(objectDesc) {
  return `Color-by-number worksheet for preschool children.

A large centered line-art ${objectDesc}, divided into exactly 7 numbered regions labeled 1–7. Each region is clearly separated with thick black outlines and contains a large readable number.

Right-side vertical color legend with crayon illustrations:

1 Đỏ

2 Cam

3 Vàng

4 Xanh lá

5 Xanh dương

6 Tím

7 Hồng

Plain white background with simple decorative doodles related to the theme.

Black-and-white worksheet style, printable educational material, vector outline drawing, no grayscale, no shadows, no gradients, no realistic rendering, no 3D effects, no texture, clean composition, A4 portrait, children activity book quality.`;
}

const OUT_DIR = path.join(__dirname, '..', 'coloring');

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  console.log('Connecting to Chrome on port 9222...');
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  const page = (await browser.pages()).find(p => p.url().includes('flow.google.com/project'));
  if (!page) throw new Error('Không tìm thấy tab Google Flow project!');

  await page.bringToFront();
  console.log('Connected to Google Flow!');

  for (let idx = 0; idx < ITEMS.length; idx++) {
    const item = ITEMS[idx];
    const targetFile = path.join(OUT_DIR, item.name);
    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 10000) {
      console.log(`[${idx + 1}/${ITEMS.length}] File ${item.name} đã tồn tại (${Math.round(fs.statSync(targetFile).size / 1024)} KB), bỏ qua.`);
      continue;
    }

    console.log(`\n========================================`);
    console.log(`[${idx + 1}/${ITEMS.length}] Bắt đầu tạo: ${item.name} (${item.object})`);

    // Danh sách ảnh hiện tại trước khi tạo
    const oldImgs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('img'))
        .map(i => i.src)
        .filter(s => s && (s.includes('flow-content.google/image/') || s.includes('flow.google.com/asb/') || (s.includes('googleusercontent.com') && !s.includes('ogw/'))));
    });

    const promptText = buildPrompt(item.object);

    // Điền prompt vào .ProseMirror và kích hoạt event
    await page.evaluate((text) => {
      const el = document.querySelector('.ProseMirror');
      if (el) {
        el.focus();
        document.execCommand('selectAll', false, null);
        document.execCommand('insertText', false, text);
        el.dispatchEvent(new Event('input', { bubbles: true }));
        el.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, promptText);

    await sleep(2000);

    // Chờ nút tạo sẵn sàng và không bị disabled
    let btnBox = null;
    for (let wait = 0; wait < 15; wait++) {
      btnBox = await page.evaluate(() => {
        const btn = document.querySelector('button[aria-label="Bắt đầu tạo"], .generate-icon-button, button[aria-label="Gửi"]');
        if (!btn) return null;
        const isDisabled = btn.disabled || btn.classList.contains('mat-mdc-button-disabled');
        const r = btn.getBoundingClientRect();
        return { x: r.x, y: r.y, width: r.width, height: r.height, isDisabled };
      });

      if (btnBox && !btnBox.isDisabled) break;
      // Nhấn phím Enter hoặc gõ thêm một dấu cách nếu nút chưa kích hoạt
      if (wait === 3 || wait === 7) {
        await page.evaluate(() => {
          const el = document.querySelector('.ProseMirror');
          if (el) {
            el.focus();
            document.execCommand('insertText', false, ' ');
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
        });
      }
      await sleep(1000);
    }

    if (!btnBox) {
      console.error('Không tìm thấy nút Bắt đầu tạo!');
      continue;
    }

    console.log(`Clicking nút Bắt đầu tạo (x: ${Math.round(btnBox.x)}, y: ${Math.round(btnBox.y)})...`);
    await page.mouse.click(btnBox.x + btnBox.width / 2, btnBox.y + btnBox.height / 2);

    // Chờ ảnh mới xuất hiện (tối đa 90 giây)
    console.log('Đang chờ Flow tạo ảnh...');
    let newImgSrc = null;
    const startTime = Date.now();
    while (Date.now() - startTime < 90000) {
      await sleep(3500);
      const currentImgs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('img'))
          .map(i => i.src)
          .filter(s => s && (s.includes('flow-content.google/image/') || s.includes('flow.google.com/asb/') || (s.includes('googleusercontent.com') && !s.includes('ogw/'))));
      });

      newImgSrc = currentImgs.find(s => !oldImgs.includes(s));
      if (newImgSrc) {
        console.log('Đã phát hiện ảnh mới tạo:', newImgSrc);
        break;
      }
    }

    if (!newImgSrc) {
      console.error(`Timeout khi chờ ảnh cho ${item.name}! Chuyển sang ảnh tiếp theo.`);
      continue;
    }

    // Tải ảnh độ phân giải cao
    const highResUrl = newImgSrc.replace(/=s\d+(-[a-z0-9]+)?$/, '=s2048-rw');
    console.log('Đang tải ảnh chất lượng cao về máy...');
    const base64Data = await page.evaluate(async (url) => {
      const res = await fetch(url);
      const blob = await res.blob();
      return new Promise(r => {
        const rd = new FileReader();
        rd.onloadend = () => r(rd.result);
        rd.readAsDataURL(blob);
      });
    }, highResUrl);

    if (base64Data && base64Data.includes(',')) {
      const buf = Buffer.from(base64Data.split(',')[1], 'base64');
      fs.writeFileSync(targetFile, buf);
      console.log(`>>> ĐÃ LƯU THÀNH CÔNG: ${targetFile} (${Math.round(buf.length / 1024)} KB)`);
    } else {
      console.error(`Không thể tải base64 data cho ${item.name}!`);
    }

    // Nghỉ 4 giây giữa các lượt tạo
    await sleep(4000);
  }

  console.log('\nHOÀN THÀNH TẤT CẢ 10 ẢNH!');
  await browser.disconnect();
}

run().catch(err => {
  console.error('LỖI:', err);
  process.exit(1);
});
