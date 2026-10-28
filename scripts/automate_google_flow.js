/**
 * scripts/automate_google_flow.js
 * Kết nối với Google Chrome đang chạy trên port 9222 để tự động điều khiển
 * Google Flow (flow.google.com) tạo 10 tranh tô màu theo số (Color-by-number)
 * và 7 sticker hình khối học tập (Shapes).
 */

const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const COLORING_DIR = path.join(ROOT_DIR, 'coloring');
const SHAPES_DIR = path.join(ROOT_DIR, 'img', 'shapes');

if (!fs.existsSync(COLORING_DIR)) fs.mkdirSync(COLORING_DIR, { recursive: true });
if (!fs.existsSync(SHAPES_DIR)) fs.mkdirSync(SHAPES_DIR, { recursive: true });

const WORKSHEETS_PROMPTS = [
  {
    id: "cbn_teddy_bear",
    titleVi: "Bé gấu bông ôm nơ",
    titleEn: "Teddy Bear",
    object: "Cute cartoon Teddy Bear sitting happily with a bow tie"
  },
  {
    id: "cbn_butterfly",
    titleVi: "Chú bướm mùa xuân",
    titleEn: "Spring Butterfly",
    object: "Beautiful friendly Butterfly with large wings"
  },
  {
    id: "cbn_castle",
    titleVi: "Lâu đài cổ tích",
    titleEn: "Fairytale Castle",
    object: "Magical fairytale Princess Castle with towers and flags"
  },
  {
    id: "cbn_dinosaur",
    titleVi: "Khủng long con vui vẻ",
    titleEn: "Baby Dinosaur",
    object: "Cute baby Dinosaur with smiling face"
  },
  {
    id: "cbn_sunflower",
    titleVi: "Bông hoa hướng dương",
    titleEn: "Smiling Sunflower",
    object: "Big cheerful smiling Sunflower in a flower pot"
  },
  {
    id: "cbn_apple_tree",
    titleVi: "Cây táo sai quả",
    titleEn: "Apple Tree",
    object: "Delicious Apple Tree with big round ripe apples"
  },
  {
    id: "cbn_car",
    titleVi: "Chiếc ô tô nhỏ",
    titleEn: "Cartoon Car",
    object: "Cute cartoon Car with round headlights and wheels"
  },
  {
    id: "cbn_fish",
    titleVi: "Chú cá bơi lội",
    titleEn: "Little Fish",
    object: "Happy little Fish swimming with sea bubbles"
  },
  {
    id: "cbn_kitten",
    titleVi: "Mèo con cuộn len",
    titleEn: "Playful Kitten",
    object: "Adorable Kitten cat playing with a wool yarn ball"
  },
  {
    id: "cbn_rocket",
    titleVi: "Tàu vũ trụ không gian",
    titleEn: "Space Rocket",
    object: "Cartoon Space Rocket spaceship flying among stars"
  }
];

function getWorksheetPrompt(objectName) {
  return `Color-by-number worksheet for preschool children. A large centered line-art ${objectName}, divided into exactly 7 numbered regions labeled 1–7. Each region is clearly separated with thick black outlines and contains a large readable number. Right-side vertical color legend with crayon illustrations: 1 Đỏ, 2 Cam, 3 Vàng, 4 Xanh lá, 5 Xanh dương, 6 Tím, 7 Hồng. Plain white background with simple decorative doodles related to the theme. Black-and-white worksheet style, printable educational material, vector outline drawing, no grayscale, no shadows, no gradients, no realistic rendering, no 3D effects, no texture, clean composition, A4 portrait, children activity book quality.`;
}

async function main() {
  console.log("=== TỰ ĐỘNG HÓA GOOGLE FLOW QUA CHROME DEBUGGING ===");
  try {
    const browser = await puppeteer.connect({ browserURL: "http://127.0.0.1:9222" });
    const pages = await browser.pages();
    const page = pages[0] || await browser.newPage();

    console.log("Đã kết nối với Chrome. Trang hiện tại:", await page.title(), "| URL:", page.url());

    if (page.url().includes("accounts.google.com")) {
      console.log("👉 Vui lòng đăng nhập tài khoản Google trên cửa sổ Chrome vừa mở.");
      console.log("Sau khi đăng nhập xong, Chrome sẽ tự chuyển vào Google Flow.");
      browser.disconnect();
      return;
    }

    console.log("Trang sẵn sàng. Đang kiểm tra giao diện Google Flow...");
    browser.disconnect();
  } catch (err) {
    console.error("Lỗi kết nối:", err.message);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  WORKSHEETS_PROMPTS,
  getWorksheetPrompt
};
