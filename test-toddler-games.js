/**
 * test-toddler-games.js
 * Kiểm thử toàn diện cho hệ thống Trò chơi Mầm non RV AppStudios Edition (games/toddler-games.js):
 * 1. Kiểm thử hàm kiểm chứng đường nét tập viết validateTracePath (Path Validation Unit Test).
 * 2. Kiểm thử dữ liệu các bộ trò chơi (Giỏ màu, Hình dạng, Ghép nửa tranh, Hình bóng, Đối lập, Động vật).
 * 3. Kiểm thử kết xuất DOM và cơ chế chạy Random của:
 *    - colorShapeGame (Giỏ màu & Hình dạng)
 *    - puzzleGame (Ghép 2 nửa tranh, Khuyết hình quả, Hình bóng)
 *    - sizeCompareGame (To & Nhỏ, Đếm & So sánh nhiều/ít)
 *    - oddSpotGame (Tìm hình khác biệt, Quy luật hình còn thiếu, Thế giới loài vật)
 *    - numberTrainGame (Đoàn tàu sâu róm & Bóng bay số)
 *    - randomMixGame (Hộp quà bất ngờ chạy random tổng hợp)
 */

const assert = require("assert");
const fs = require("fs");
const ToddlerGames = require("./games/toddler-games.js");
const CreativeGames = require("./games/creative-games.js");

console.log("================================================================");
console.log("  CHẠY TEST SUITE: TRÒ CHƠI MẦM NON & PATH VALIDATION (RV EDITION)");
console.log("================================================================\n");

// ----------------------------------------------------------------------------
// TEST 1: Kiểm thử hàm validateTracePath (Path Validation cho Tập viết)
// ----------------------------------------------------------------------------
console.log("--- TEST 1: Kiểm thử logic validateTracePath (Path Validation) ---");

const numberOneCheckpoints = [
  { x: 160, y: 80 },
  { x: 160, y: 130 },
  { x: 160, y: 180 },
  { x: 160, y: 230 },
  { x: 160, y: 265 }
];

// Trường hợp 1: Bé viết chuẩn từ trên xuống dưới dọc theo nét số 1
const goodUserPath = [
  { x: 158, y: 82 },
  { x: 162, y: 128 },
  { x: 161, y: 179 },
  { x: 159, y: 228 },
  { x: 160, y: 262 }
];
const resGood = ToddlerGames.validateTracePath(goodUserPath, numberOneCheckpoints, 35);
assert.strictEqual(resGood.valid, true, "Đường nét viết chuẩn phải trả về valid = true");
assert.strictEqual(resGood.coverage, 1, "Độ phủ nét viết chuẩn phải đạt 100% (1.0)");

// Trường hợp 2: Bé chấm quá ít hoặc vẽ lệch hẳn ra ngoài vùng chữ
const offTargetPath = [
  { x: 20, y: 20 },
  { x: 30, y: 40 },
  { x: 40, y: 60 }
];
const resBad = ToddlerGames.validateTracePath(offTargetPath, numberOneCheckpoints, 35);
assert.strictEqual(resBad.valid, false, "Đường nét viết lệch ra ngoài phải trả về valid = false");
assert(resBad.coverage < 0.5, "Độ phủ đường lệch phải nhỏ hơn 50%");

// Trường hợp 3: Bé viết ngược từ dưới lên (sai điểm bắt đầu)
const reversePath = [...goodUserPath].reverse();
const resReverse = ToddlerGames.validateTracePath(reversePath, numberOneCheckpoints, 35);
assert.strictEqual(resReverse.startOk, false, "Viết ngược từ đáy lên phải phát hiện startOk = false");
assert.strictEqual(resReverse.valid, false, "Viết sai điểm bắt đầu phải trả về valid = false");

console.log("✔ Logic validateTracePath kiểm chứng chính xác độ phủ nét viết và hướng bắt đầu!");

// ----------------------------------------------------------------------------
// TEST 2: Kiểm thử kho dữ liệu phong phú trong games/toddler-games.js
// ----------------------------------------------------------------------------
console.log("\n--- TEST 2: Kiểm thử kho dữ liệu Màu sắc, Hình học, Tranh ghép & Đối lập ---");

assert(Array.isArray(ToddlerGames.COLOR_BUCKETS) && ToddlerGames.COLOR_BUCKETS.length >= 6, "Phải có ít nhất 6 giỏ màu sắc");
assert(Array.isArray(ToddlerGames.SHAPES_DATA) && ToddlerGames.SHAPES_DATA.length >= 6, "Phải có ít nhất 6 hình dạng cơ bản");
assert(Array.isArray(ToddlerGames.PUZZLE_ANIMALS) && ToddlerGames.PUZZLE_ANIMALS.length >= 10, "Phải có ít nhất 10 con vật ghép hình/hình bóng");
assert(Array.isArray(ToddlerGames.FRUIT_CUTOUTS) && ToddlerGames.FRUIT_CUTOUTS.length >= 5, "Phải có ít nhất 5 mẫu quả khuyết hình học");
assert(Array.isArray(ToddlerGames.OPPOSITE_PAIRS) && ToddlerGames.OPPOSITE_PAIRS.length >= 5, "Phải có ít nhất 5 cặp hình đối lập (Lửa-Đá, Vui-Buồn, Thỏ-Rùa...)");

console.log("✔ Kho dữ liệu mầm non đầy đủ và chuẩn xác!");

// ----------------------------------------------------------------------------
// TEST 3: Mô phỏng DOM kiểm thử kết xuất & Random của các trò chơi
// ----------------------------------------------------------------------------
console.log("\n--- TEST 3: Kiểm thử kết xuất DOM & Chế độ Chạy Random ---");

let currentHtml = "";
const fakeContainer = {
  get innerHTML() { return currentHtml; },
  set innerHTML(val) { currentHtml = val; },
  querySelector() { return null; },
  querySelectorAll() { return []; }
};

global.document = {
  getElementById(id) { return id === "m" ? fakeContainer : null; },
  body: fakeContainer,
  querySelectorAll() { return []; }
};
global.window = global;

ToddlerGames.colorShapeGame(true);
assert(currentHtml.includes("rv-game-wrap"), "colorShapeGame phải kết xuất giao diện .rv-game-wrap");

ToddlerGames.puzzleGame(true);
assert(currentHtml.includes("rv-game-wrap"), "puzzleGame phải kết xuất giao diện .rv-game-wrap");

ToddlerGames.sizeCompareGame(true);
assert(currentHtml.includes("rv-game-wrap"), "sizeCompareGame phải kết xuất giao diện .rv-game-wrap");

ToddlerGames.oddSpotGame(true);
assert(currentHtml.includes("rv-game-wrap"), "oddSpotGame phải kết xuất giao diện .rv-game-wrap");

ToddlerGames.numberTrainGame(true);
assert(currentHtml.includes("rv-game-wrap"), "numberTrainGame phải kết xuất giao diện .rv-game-wrap");

ToddlerGames.randomMixGame(true);
assert(currentHtml.includes("rv-game-wrap"), "randomMixGame (Hộp Quà Bất Ngờ) phải kết xuất thành công");

// Kiểm thử 5 chế độ sáng tạo & Montessori mới trong games/creative-games.js
CreativeGames.artStudioGame("color");
assert(currentHtml.includes("crSvgCanvas"), "artStudioGame('color') phải kết xuất tranh SVG tô màu theo vùng");

CreativeGames.artStudioGame("glow");
assert(currentHtml.includes("crGlowCanvas"), "artStudioGame('glow') phải kết xuất bảng Bút phát sáng");

CreativeGames.connectDotsGame(true);
assert(currentHtml.includes("crDotsSvg"), "connectDotsGame phải kết xuất các chấm số và nút Tự vẽ");

CreativeGames.memoryStepDrawGame("memory");
assert(currentHtml.includes("crMemCanvas"), "memoryStepDrawGame phải kết xuất khung vẽ trí nhớ & từng bước");

CreativeGames.tenFrameGame(true);
assert(currentHtml.includes("crTenFrameGrid"), "tenFrameGame phải kết xuất lưới Khung 10 ô (2×5)");

CreativeGames.pairLinkGridGame(true);
assert(currentHtml.includes("crPairGrid"), "pairLinkGridGame phải kết xuất lưới Nối cặp giống nhau có nút Hoàn tác & Gợi ý");

console.log("✔ Tất cả 6 nhóm trò chơi gộp, 5 chế độ sáng tạo Montessori & Hộp Quà Bất Ngờ đều kết xuất DOM mượt mà!");

// ----------------------------------------------------------------------------
// TEST 4: Kiểm tra tích hợp trong app.js và index.html
// ----------------------------------------------------------------------------
console.log("\n--- TEST 4: Kiểm tra tích hợp Router V, Chủ đề Mùa & Khoảng số 1–5/10/20 ---");

const appJs = fs.readFileSync("app.js", "utf8");
const indexHtml = fs.readFileSync("index.html", "utf8");

assert(indexHtml.includes('games/toddler-games.js'), "index.html phải nạp games/toddler-games.js");
assert(indexHtml.includes('games/creative-games.js'), "index.html phải nạp games/creative-games.js");
assert(appJs.includes('randomMixGame'), "app.js phải tích hợp nút randomMixGame (Hộp Quà Bất Ngờ)");
assert(appJs.includes('colorShapeGame'), "app.js phải tích hợp colorShapeGame");
assert(appJs.includes('puzzleGame'), "app.js phải tích hợp puzzleGame");
assert(appJs.includes('sizeCompareGame'), "app.js phải tích hợp sizeCompareGame");
assert(appJs.includes('oddSpotGame'), "app.js phải tích hợp oddSpotGame");
assert(appJs.includes('artStudioGame') && appJs.includes('connectDotsGame') && appJs.includes('tenFrameGame') && appJs.includes('pairLinkGridGame'), "app.js phải tích hợp đầy đủ các trò chơi sáng tạo & Montessori mới");
assert(appJs.includes('setSeasonTheme') && appJs.includes('getNumberRangeMax'), "app.js phải hỗ trợ Chủ đề màu theo mùa và Khoảng số 1–5 / 1–10 / 1–20");

// Kiểm thử giới hạn khoảng số (Bước 11): Khi phụ huynh chọn khoảng 1–5, không câu hỏi nào vượt quá 5
global.getNumberRangeMax = () => 5;
CreativeGames.connectDotsGame(true);
const dotMatches = currentHtml.match(/class="cr-dot-node"/g) || [];
assert(dotMatches.length <= 5, "Khi khoảng số đặt là 1–5, Nối chấm không được vượt quá 5 chấm");

CreativeGames.tenFrameGame(true);
const tfLockedMatches = currentHtml.match(/cr-tf-cell filled locked/g) || [];
assert(tfLockedMatches.length <= 5, "Khi khoảng số đặt là 1–5, Khung 10 ô chỉ sinh số trong phạm vi 5");

console.log("✔ Tích hợp Router V, Menu games() và index.html hoàn chỉnh 100%!");

console.log("\n================================================================");
console.log("  TẤT CẢ KIỂM THỬ TRÒ CHƠI MẦM NON ĐẠT CHUẨN 100%!              ");
console.log("================================================================");
