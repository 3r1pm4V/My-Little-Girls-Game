/**
 * scripts/chrome_generate_assets.js
 * Điều khiển Chrome tự động tạo hình ảnh PNG đồng bộ phong cách cho:
 * 1. Tranh tô màu Elsa nét viền đen dày, nền trắng tinh (coloring/mnvh_elsa_*.png)
 * 2. Bộ Sticker hoạt hình 2D rực rỡ cho bé (img/stickers/sticker_*.png)
 * 3. Bộ Icon Game và Học chữ sắc nét (img/games/game_*.png & img/letters/icon_*.png)
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ROOT_DIR = path.resolve(__dirname, '..');

// 1. Danh sách Tranh Tô Màu Elsa mới (Coloring Pages)
const ELSA_COLORING_ITEMS = [
  {
    id: 'mnvh_elsa_olaf',
    icon: '☃️',
    titleVi: 'Elsa và người tuyết Olaf',
    titleEn: 'Elsa and Olaf the Snowman',
    prompt: 'Cute Princess Elsa smiling and standing beside funny cute Olaf the snowman, Elsa wearing her ice gown, children coloring book page, bold clean thick black outlines, pure white background, no grayscale, no shading, no colors, clean minimalist coloring page for 4 year old preschool kid'
  },
  {
    id: 'mnvh_elsa_ice_castle',
    icon: '🏰',
    titleVi: 'Elsa và lâu đài băng',
    titleEn: 'Elsa and the Ice Castle',
    prompt: 'Princess Elsa waving hand in front of a majestic magical ice crystal castle, snowflake patterns, coloring book page for toddlers, thick bold black outlines, pure white background, simple lines, no shading, no colors, high quality coloring sheet'
  },
  {
    id: 'mnvh_elsa_ice_skating',
    icon: '⛸️',
    titleVi: 'Elsa trượt băng nghệ thuật',
    titleEn: 'Elsa Ice Skating',
    prompt: 'Princess Elsa gracefully ice skating on frozen winter lake, wearing beautiful winter dress, gentle smile, coloring book illustration, bold black line art, pure white background, no colors, no grayscale, easy coloring for little girls'
  },
  {
    id: 'mnvh_elsa_ice_crown',
    icon: '👑',
    titleVi: 'Elsa vương miện băng tuyết',
    titleEn: 'Elsa with Ice Crown',
    prompt: 'Portrait of Princess Elsa wearing a glittering ice crystal crown, long beautiful blonde braid on shoulder, friendly happy eyes, coloring book page, clean thick black contours, pure white background, no shading, black and white line art'
  },
  {
    id: 'mnvh_elsa_nokk_water_horse',
    icon: '🦄',
    titleVi: 'Elsa và chú ngựa thần Nokk',
    titleEn: 'Elsa and Nokk Water Horse',
    prompt: 'Princess Elsa gently petting a cute friendly magical water horse spirit Nokk, peaceful fairy tale scene, kids coloring book page, bold clean black outlines, pure white background, simple line art, no fill colors'
  },
  {
    id: 'mnvh_elsa_bruni',
    icon: '🦎',
    titleVi: 'Elsa và thằn lằn tuyết Bruni',
    titleEn: 'Elsa and Baby Salamander Bruni',
    prompt: 'Princess Elsa holding cute tiny salamander Bruni sitting on her palm, Elsa smiling warmly, coloring book page, clear thick black outlines, pure white background, minimalist line art, no shading, no colors'
  }
];

// 2. Danh sách Stickers hoạt hình 2D rực rỡ cho bé
const STICKER_ITEMS = [
  {
    id: 'cat',
    nameVi: 'Mèo Mimi',
    nameEn: 'Mimi Kitty',
    prompt: 'Super cute smiling fluffy white kitten wearing a little pink bow, big sparkling eyes, waving paw, cute 2D cartoon sticker for preschool kids, bold clean white border, vibrant pastel colors, clean vector illustration, isolated on pure white background'
  },
  {
    id: 'apple',
    nameVi: 'Táo Ngọt Ngào',
    nameEn: 'Sweet Apple',
    prompt: 'Cute friendly red apple character with a happy smiling face and two tiny green leaves, cute kawaii vector sticker style, bold outlines, bright vibrant red and green colors, isolated on pure white background'
  },
  {
    id: 'rocket',
    nameVi: 'Phi Thuyền Nhí',
    nameEn: 'Space Rocket',
    prompt: 'Cute colorful cartoon space rocket flying upwards with golden stars, soft glowing flame, cute preschool vector sticker, bright cheerful red, blue and yellow colors, thick bold outlines, isolated on pure white background'
  },
  {
    id: 'rainbow',
    nameVi: 'Cầu Vồng Kì Diệu',
    nameEn: 'Magic Rainbow',
    prompt: 'Cheerful colorful curved rainbow with smiling puffy white clouds on both ends, bright pastel rainbow colors, cute kids sticker style, thick clean contours, isolated on pure white background'
  },
  {
    id: 'unicorn',
    nameVi: 'Kỳ Lân Mộng Mơ',
    nameEn: 'Dreamy Unicorn',
    prompt: 'Adorable baby magical unicorn with pastel rainbow mane and a glittering golden horn, closed eyes smiling gently, cute 2D cartoon sticker, bright cheerful colors, thick outline, isolated on pure white background'
  },
  {
    id: 'lion',
    nameVi: 'Sư Tử Trí Tuệ',
    nameEn: 'Wise Lion',
    prompt: 'Cute friendly little lion cub with a fluffy round orange mane, big happy eyes, cute cartoon sticker style for kids, bright warm golden and orange colors, bold outlines, isolated on pure white background'
  },
  {
    id: 'star',
    nameVi: 'Ngôi Sao May Mắn',
    nameEn: 'Lucky Star',
    prompt: 'Shining cheerful golden star with smiling cute face and rosy cheeks, sparkling glow, cute kawaii cartoon sticker, bright yellow and orange colors, thick bold outlines, isolated on pure white background'
  },
  {
    id: 'butterfly',
    nameVi: 'Bướm Xinh Đón Nắng',
    nameEn: 'Pretty Butterfly',
    prompt: 'Cute friendly cartoon butterfly with beautiful patterned colorful wings in pink and cyan, smiling face, cute preschool sticker style, bold clean outlines, isolated on pure white background'
  },
  {
    id: 'crown',
    nameVi: 'Vương Miện Công Chúa',
    nameEn: 'Princess Crown',
    prompt: 'Cute glittering golden royal princess crown adorned with sparkling pink and blue gems, cute cartoon sticker, vibrant gold and jewel colors, clean bold outline, isolated on pure white background'
  },
  {
    id: 'rabbit',
    nameVi: 'Thỏ Trắng Tinh Nghịch',
    nameEn: 'Playful Bunny',
    prompt: 'Super cute fluffy white bunny rabbit holding a little orange carrot, big happy eyes, long ears, cute 2D cartoon sticker style, bold outlines, vibrant colors, isolated on pure white background'
  }
];

// 3. Danh sách Icon Game cho Menu Trò Chơi (Góc vui chơi ôn tập)
const GAME_ICON_ITEMS = [
  {
    id: 'game_count',
    prompt: 'Colorful 3D glossy game icon showing juicy red apples and bright star number counters, preschool math counting game badge, vibrant colors, soft round square frame, isolated on white background'
  },
  {
    id: 'game_bubble',
    prompt: 'Colorful 3D glossy game icon with translucent soap bubbles containing glowing alphabet letter A, cheerful pop sound feeling, vibrant cyan and pink colors, isolated on white background'
  },
  {
    id: 'game_match',
    prompt: 'Colorful 3D glossy game icon showing two interlocking puzzle pieces matching an apple and letter A, vibrant orange and purple colors, clean badge, isolated on white background'
  },
  {
    id: 'game_missing',
    prompt: 'Colorful 3D glossy game icon showing a cute toy train carrying numbered blocks 1 2 and a question mark, vibrant train colors, clean badge, isolated on white background'
  },
  {
    id: 'game_memory',
    prompt: 'Colorful 3D glossy game icon showing two smiling card tiles flipping over with stars, memory flip game badge, vibrant purple and gold colors, isolated on white background'
  },
  {
    id: 'game_compare',
    prompt: 'Colorful 3D glossy game icon showing a friendly smiling balance scale with greater than and less than signs, vibrant emerald green and gold colors, isolated on white background'
  },
  {
    id: 'game_art',
    prompt: 'Colorful 3D glossy game icon showing artist palette with bright rainbow colors and a glowing sparkling magic brush, creative art studio badge, isolated on white background'
  },
  {
    id: 'game_ninja',
    prompt: 'Colorful 3D glossy game icon showing a sliced watermelon with sparkling splash blade slash effect, fruit ninja style badge, vibrant colors, isolated on white background'
  }
];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

async function generateSingleImageViaChrome(page, prompt, outputPath, isColoring = false, width = 512, height = 512) {
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true&seed=${Math.floor(Math.random() * 999999)}`;
  
  console.log(`  -> Đang tải & kết xuất qua Chrome: ${path.basename(outputPath)}...`);

  const html = `
    <!doctype html>
    <html>
    <head>
      <style>
        body, html { margin:0; padding:0; background: ${isColoring ? '#ffffff' : 'transparent'}; overflow:hidden; }
        canvas { display:block; }
      </style>
    </head>
    <body>
      <canvas id="cv" width="${width}" height="${height}"></canvas>
      <script>
        window.loadAndProcess = function(url, isColoring) {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
              const cv = document.getElementById("cv");
              const ctx = cv.getContext("2d");
              ctx.clearRect(0, 0, ${width}, ${height});
              ctx.drawImage(img, 0, 0, ${width}, ${height});
              
              if (isColoring) {
                // Tăng độ tương phản viền đen, làm trắng tinh nền cho tranh tô màu
                const idata = ctx.getImageData(0, 0, ${width}, ${height});
                const d = idata.data;
                for (let i = 0; i < d.length; i += 4) {
                  const lum = (d[i] * 0.299 + d[i+1] * 0.587 + d[i+2] * 0.114);
                  if (lum > 175) {
                    d[i] = 255; d[i+1] = 255; d[i+2] = 255;
                  } else if (lum < 95) {
                    d[i] = 20; d[i+1] = 20; d[i+2] = 20;
                  }
                }
                ctx.putImageData(idata, 0, 0);
              }
              
              resolve(cv.toDataURL("image/png"));
            };
            img.onerror = (e) => reject(new Error("Image load failed: " + url));
            img.src = url;
          });
        };
      </script>
    </body>
    </html>
  `;

  await page.setContent(html);
  
  // Thực thi trên Chrome
  const dataUrl = await page.evaluate(async (url, isColoring) => {
    return await window.loadAndProcess(url, isColoring);
  }, imageUrl, isColoring);

  const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
  fs.writeFileSync(outputPath, Buffer.from(base64Data, 'base64'));
  const stat = fs.statSync(outputPath);
  console.log(`     ✔ Thành công! File: ${outputPath} (${(stat.size / 1024).toFixed(1)} KB)`);
}

async function main() {
  console.log('================================================================');
  console.log('  FLOW TỰ ĐỘNG TẠO ẢNH PNG ĐỒNG BỘ BẰNG GOOGLE CHROME');
  console.log('  Chrome Binary:', CHROME_PATH);
  console.log('================================================================\n');

  if (!fs.existsSync(CHROME_PATH)) {
    console.error('✖ Không tìm thấy Chrome tại:', CHROME_PATH);
    process.exit(1);
  }

  await ensureDir(path.join(ROOT_DIR, 'coloring'));
  await ensureDir(path.join(ROOT_DIR, 'img', 'stickers'));
  await ensureDir(path.join(ROOT_DIR, 'img', 'games'));

  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 512, height: 512 });

  // 1. TẠO TRANH TÔ MÀU ELSA
  console.log('--- 1. Sinh 6 Tranh Tô Màu Elsa Mới (PNG Viền Nét Đen Rõ, Nền Trắng) ---');
  for (const item of ELSA_COLORING_ITEMS) {
    const outPath = path.join(ROOT_DIR, 'coloring', `${item.id}.png`);
    await generateSingleImageViaChrome(page, item.prompt, outPath, true, 512, 512);
  }

  // 2. TẠO BỘ STICKERS 2D
  console.log('\n--- 2. Sinh Bộ 10 Sticker Hoạt Hình 2D Cho Bé (PNG) ---');
  for (const item of STICKER_ITEMS) {
    const outPath = path.join(ROOT_DIR, 'img', 'stickers', `sticker_${item.id}.png`);
    await generateSingleImageViaChrome(page, item.prompt, outPath, false, 512, 512);
  }

  // 3. TẠO BỘ ICON GAMES
  console.log('\n--- 3. Sinh Bộ 8 Icon Game Đồng Bộ (PNG) ---');
  for (const item of GAME_ICON_ITEMS) {
    const outPath = path.join(ROOT_DIR, 'img', 'games', `${item.id}.png`);
    await generateSingleImageViaChrome(page, item.prompt, outPath, false, 512, 512);
  }

  await browser.close();
  console.log('\n================================================================');
  console.log('  TẤT CẢ ẢNH PNG ĐÃ ĐƯỢC CHROME TẠO VÀ TỐI ƯU THÀNH CÔNG! 🚀');
  console.log('================================================================');
}

main().catch(err => {
  console.error('✖ Lỗi trong flow Chrome:', err);
  process.exit(1);
});
