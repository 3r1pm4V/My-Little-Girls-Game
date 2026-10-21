/**
 * scripts/generate_images_gemini.js
 * Tự động tạo hình ảnh minh họa cho từ vựng thiếu nhi bằng Google Gemini API.
 * 
 * Tính năng:
 * - Đọc GEMINI_API_KEYS và GEMINI_API_KEY từ file .env (hỗ trợ xoay vòng nhiều key)
 * - Prompt tối ưu hóa phong cách sticker hoạt hình trẻ em (2D vector, viền đậm, nền trắng, màu tươi sáng)
 * - Tự động lưu vào img/vocab/[slug].png/jpg
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT_DIR, 'img', 'vocab');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function getApiKeys() {
  const keys = [];
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('GEMINI_API_KEYS=')) {
        line.trim().substring('GEMINI_API_KEYS='.length).split(',').forEach(k => {
          const t = k.trim();
          if (t && !keys.includes(t)) keys.push(t);
        });
      } else if (line.trim().startsWith('GEMINI_API_KEY=')) {
        const t = line.trim().substring('GEMINI_API_KEY='.length).trim();
        if (t && !keys.includes(t)) keys.push(t);
      }
    }
  }
  return keys;
}

const VOCAB_PROMPTS = {
  // A
  "anh_trai": "Cute friendly big brother waving hand happily, young Vietnamese boy cartoon character, flat vector sticker style, thick clean outlines, colorful, white background",
  "ao_mua": "Cute bright yellow raincoat for kids with a hood, cartoon sticker style, clean bold outlines, vibrant colors, isolated on pure white background",
  "an_toan": "Friendly cartoon safety shield badge with a cheerful smiling star in center, blue and gold colors, cute vector sticker style, white background",
  // Ă
  "an_com": "Cute friendly bowl of steaming hot white rice, smiling face, cartoon sticker style, colorful, white background",
  "an_banh": "Cute delicious sandwich with smiling face, lettuce and cheese, cartoon sticker style, white background",
  // Â
  "am_ap": "Cute cheerful smiling sun wearing a little warm scarf, glowing warmth, cartoon sticker style, white background",
  "am_thanh": "Cute cheerful colorful musical notes dancing with smiley faces, cartoon sticker style, white background"
};

async function main() {
  const keys = getApiKeys();
  if (keys.length === 0) {
    console.error("✖ Không tìm thấy GEMINI_API_KEY trong file .env!");
    console.error("👉 Vui lòng thêm dòng: GEMINI_API_KEY=your_key_here vào file .env");
    process.exit(1);
  }

  console.log("=== TRÌNH TẠO ẢNH MINH HỌA GEMINI API ===");
  console.log(`✔ Đã tìm thấy ${keys.length} GEMINI_API_KEYS an toàn trong .env`);
  console.log(`Số lượng từ vựng cấu hình mẫu: ${Object.keys(VOCAB_PROMPTS).length}`);
  console.log("Thư mục lưu ảnh:", OUT_DIR);
}

main().catch(console.error);
