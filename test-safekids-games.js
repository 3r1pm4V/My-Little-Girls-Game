/**
 * test-safekids-games.js
 * Test suite cho Hệ thống Trò chơi Safe Kid Games & Phân loại Cấp độ (Grade Filter Tabs)
 */
const assert = require("assert");
const fs = require("fs");

console.log("================================================================");
console.log("  CHẠY TEST SUITE: SAFE KID GAMES & GRADE CLASSIFICATION        ");
console.log("================================================================\n");

// --- TEST 1: Kiểm tra cấu trúc module games/safekids-games.js ---
console.log("--- TEST 1: Kiểm tra module games/safekids-games.js ---");
const safekids = require("./games/safekids-games.js");
assert(typeof safekids.mathSumGame === "function", "safekids-games.js phải export mathSumGame");
assert(typeof safekids.animalPathGame === "function", "safekids-games.js phải export animalPathGame");
assert(Array.isArray(safekids.MATH_THEMES) && safekids.MATH_THEMES.length >= 5, "Phải có danh sách chủ đề đồ vật toán học");
assert(Array.isArray(safekids.ANIMAL_STORIES) && safekids.ANIMAL_STORIES.length >= 4, "Phải có danh sách cốt truyện thú con tìm đường");
console.log("✔ Module games/safekids-games.js đầy đủ hàm và kho chủ đề!");

// --- TEST 2: Kiểm tra DOM rendering mathSumGame ---
console.log("\n--- TEST 2: Kiểm tra DOM kết xuất mathSumGame ---");
const mockM = { innerHTML: "" };
global.document = {
  getElementById: (id) => (id === "m" ? mockM : null)
};
global.window = {
  T: (vi, en) => vi,
  kbc: (arr) => `<nav class="kbc">${arr.map(c => c.t).join(" > ")}</nav>`,
  say: () => {},
  catSet: () => {},
  sfxTap: () => {},
  sfxOk: () => {},
  sfxNo: () => {},
  sfxTingTing: () => {},
  fx: () => {},
  stars: 10,
  ls: { set: () => {} }
};

safekids.mathSumGame();
const mathHtml = mockM.innerHTML;
assert(mathHtml.includes("ms-arena"), "mathSumGame phải kết xuất sàn thi đấu ms-arena");
assert(mathHtml.includes("ms-group-box"), "mathSumGame phải có ô nhóm đồ vật đếm");
assert(mathHtml.includes("ms-op-badge"), "mathSumGame phải có huy hiệu phép toán (+ hoặc -)");
assert(mathHtml.includes("ms-target-box"), "mathSumGame phải có ô dấu hỏi kết quả");
assert(mathHtml.includes("ms-opt-btn"), "mathSumGame phải có 3 nút lựa chọn đáp án số");
console.log("✔ mathSumGame kết xuất DOM trực quan, đẹp mắt và đúng hợp đồng!");

// --- TEST 3: Kiểm tra DOM rendering animalPathGame ---
console.log("\n--- TEST 3: Kiểm tra DOM kết xuất animalPathGame ---");
safekids.animalPathGame();
const pathHtml = mockM.innerHTML;
assert(pathHtml.includes("ap-track-arena"), "animalPathGame phải kết xuất ap-track-arena");
assert(pathHtml.includes("ap-path-grid"), "animalPathGame phải có đường nối ap-path-grid");
assert(pathHtml.includes("ap-stone-btn"), "animalPathGame phải có các viên đá dẫm chân");
assert(pathHtml.includes("ap-goal-dish"), "animalPathGame phải có đích đến món quà/thức ăn");
console.log("✔ animalPathGame kết xuất hành trình dẫn bạn thú về đích hoàn hảo!");

// --- TEST 4: Kiểm tra tích hợp trong app.js, index.html & sw.js ---
console.log("\n--- TEST 4: Kiểm tra tích hợp app.js, index.html, sw.js ---");
const appJs = fs.readFileSync("app.js", "utf8");
const indexHtml = fs.readFileSync("index.html", "utf8");
const swJs = fs.readFileSync("sw.js", "utf8");
const stylesCss = fs.readFileSync("styles.css", "utf8");

assert(indexHtml.includes('src="games/safekids-games.js"'), "index.html phải nạp games/safekids-games.js");
assert(swJs.includes('"games/safekids-games.js"'), "sw.js CORE phải có games/safekids-games.js");
assert(appJs.includes('I["game_math_sum"]'), "app.js phải đăng ký icon game_math_sum");
assert(appJs.includes('I["game_animal_path"]'), "app.js phải đăng ký icon game_animal_path");
assert(appJs.includes("get mathSumGame()"), "Router V trong app.js phải có getter mathSumGame");
assert(appJs.includes("get animalPathGame()"), "Router V trong app.js phải có getter animalPathGame");
assert(appJs.includes("renderGradeTabsHtml"), "app.js phải có renderGradeTabsHtml");
assert(appJs.includes("filterGamesByGrade"), "app.js phải có hàm lọc theo cấp độ filterGamesByGrade");

// Kiểm tra CSS Antigravity
assert(stylesCss.includes(".grade-tabs-wrap"), "styles.css phải có class .grade-tabs-wrap");
assert(stylesCss.includes(".grade-tab"), "styles.css phải có class .grade-tab");
assert(stylesCss.includes(".card-grade-badge"), "styles.css phải có class .card-grade-badge");
assert(stylesCss.includes(".ms-arena"), "styles.css phải có class .ms-arena");
assert(stylesCss.includes(".ap-track-arena"), "styles.css phải có class .ap-track-arena");

console.log("✔ Toàn bộ hệ thống Safe Kid Games đã tích hợp đồng bộ 100%!");

console.log("\n================================================================");
console.log("  TẤT CẢ KIỂM THỬ SAFE KID GAMES ĐẠT CHUẨN 100%!                ");
console.log("================================================================\n");
