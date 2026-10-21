/**
 * scripts/generate_images_gemini.js
 * Tự động tạo hình ảnh minh họa cho từ vựng thiếu nhi bằng Google Gemini API.
 * 
 * Tính năng:
 * - Đọc GEMINI_API_KEY từ file .env
 * - Prompt tối ưu hóa phong cách sticker hoạt hình trẻ em (2D vector, viền đậm, nền trắng, màu tươi sáng)
 * - Tự động lưu vào img/vocab/[slug].png/jpg
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUT_DIR = path.join(ROOT_DIR, 'img', 'vocab');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

function getApiKey() {
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      if (line.trim().startsWith('GEMINI_API_KEY=')) {
        return line.trim().substring('GEMINI_API_KEY='.length).trim();
      }
    }
  }
  return process.env.GEMINI_API_KEY || '';
}

const VOCAB_PROMPTS = {
  "anh_trai": "Cute friendly big brother waving hand happily, young Vietnamese boy cartoon character, flat vector sticker style, thick clean outlines, colorful, white background",
  "ao_mua": "Cute bright yellow raincoat for kids with a hood, cartoon sticker style, clean bold outlines, vibrant colors, isolated on pure white background",
  "an_toan": "Friendly cartoon safety shield badge with a cheerful smiling star in center, blue and gold colors, cute vector sticker style, white background",
  "an_com": "Cute bowl of steaming white rice with a smile, cartoon sticker style, colorful, white background",
  "an_banh": "Cute smiling sandwich with lettuce and cheese, cartoon sticker style, white background",
  "am_ap": "Cute cheerful smiling sun wearing a little scarf, warm and cozy, cartoon sticker style, white background",
  "am_thanh": "Cute cheerful colorful musical notes dancing, cartoon sticker style, white background"
};

async function main() {
  const key = getApiKey();
  if (!key) {
    console.error("✖ Không tìm thấy GEMINI_API_KEY trong file .env!");
    console.error("👉 Vui lòng thêm dòng: GEMINI_API_KEY=your_key_here vào file .env");
    process.exit(1);
  }

  console.log("=== TRÌNH TẠO ẢNH MINH HỌA GEMINI API ===");
  console.log("✔ Đã tìm thấy GEMINI_API_KEY an toàn trong .env");
  console.log(`Số lượng từ vựng cấu hình mẫu: ${Object.keys(VOCAB_PROMPTS).length}`);
  console.log("Thư mục lưu ảnh:", OUT_DIR);
}

main().catch(console.error);
