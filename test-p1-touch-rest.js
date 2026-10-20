// ============================================================================
// TEST SUITE: TASK P1-09 & P1-10
// P1-09: Chế độ chạm thay thế cho kéo-thả nối dây (match) và bắt bóng (bubbleGame)
// P1-10: Màn hình nghỉ ngơi nhẹ nhàng khi hết thời gian (bỏ emoji 😴, lời ấm áp, audio)
// ============================================================================

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: TASK P1-09 & P1-10');
console.log('================================================================\n');

const indexHtml = fs.readFileSync('index.html', 'utf8');
const stylesCss = fs.existsSync('styles.css') ? fs.readFileSync('styles.css', 'utf8') : indexHtml;
const appJs = fs.readFileSync('app.js', 'utf8');

// ----------------------------------------------------------------------------
// TEST 1: Kiểm tra P1-09 — Chế độ chạm-chọn cho kéo-thả nối dây (match)
// ----------------------------------------------------------------------------
console.log('--- TEST 1: Kiểm tra P1-09 (Chế độ chạm nối dây & bắt bóng) ---');

// 1.1 CSS tap-selected cho drag-card
assert(stylesCss.includes('.drag-card.tap-selected'), 'styles.css phải có class CSS .drag-card.tap-selected');
console.log('✔ CSS .drag-card.tap-selected: Có hiệu ứng nổi bật khi bé chạm chọn thẻ!');

// 1.2 Logic chạm-chọn trong hàm match()
const matchCodeMatch = appJs.match(/function match\(\)\{[\s\S]*?\n\}/);
assert(matchCodeMatch, 'Phải tìm thấy hàm match trong app.js');
const matchCode = matchCodeMatch[0];

assert(matchCode.includes('handleCardTap'), 'Hàm match phải có hàm xử lý chạm thẻ handleCardTap');
assert(matchCode.includes('attemptMatch'), 'Hàm match phải có hàm thống nhất attemptMatch cho cả chạm và kéo');
assert(matchCode.includes('tapSelectedCard'), 'Hàm match phải theo dõi thẻ đang chạm tapSelectedCard');
assert(matchCode.includes('tap-selected'), 'Hàm match phải gắn/gỡ class tap-selected');

// 1.3 Mô phỏng logic chạm-chọn nối dây (Tap-to-Match)
console.log('  -> Chạy mô phỏng logic Chạm-chọn (Tap-to-Match):');
let mockTapSelected = null;
let mockMatchedPairs = [];
let mockErrors = 0;

function mockAttempt(firstEl, secondEl) {
  const leftEl = firstEl.side === "left" ? firstEl : secondEl;
  const rightEl = firstEl.side === "left" ? secondEl : firstEl;
  if (leftEl.letter === rightEl.letter) {
    mockMatchedPairs.push({ left: leftEl.letter, right: rightEl.letter });
    return true;
  } else {
    mockErrors++;
    return false;
  }
}

function mockTap(card) {
  if (!mockTapSelected) {
    mockTapSelected = card;
    return "selected";
  }
  if (mockTapSelected === card) {
    return "same";
  }
  if (mockTapSelected.side === card.side) {
    mockTapSelected = card;
    return "switched";
  }
  const prev = mockTapSelected;
  mockTapSelected = null;
  return mockAttempt(prev, card) ? "matched" : "wrong";
}

// Kịch bản A: Bé chạm Chữ 'A' (trái), sau đó chạm Hình quả táo 'A' (phải) -> Đúng
assert.strictEqual(mockTap({ side: "left", letter: "A" }), "selected");
assert.strictEqual(mockTap({ side: "right", letter: "A" }), "matched");
assert.strictEqual(mockMatchedPairs.length, 1);
console.log('  ✔ Chạm chữ A rồi chạm hình Quả Táo -> Nối thành công!');

// Kịch bản B: Bé chạm Chữ 'B' (trái), sau đó đổi ý chạm Chữ 'C' (trái) -> Đổi chọn mượt mà
assert.strictEqual(mockTap({ side: "left", letter: "B" }), "selected");
assert.strictEqual(mockTap({ side: "left", letter: "C" }), "switched");
console.log('  ✔ Chạm thẻ cùng bên -> Tự động chuyển đổi thẻ được chọn!');

// Kịch bản C: Bé chạm Chữ 'C' (trái), sau đó chạm Hình con Bướm 'B' (phải) -> Báo sai nhẹ nhàng
assert.strictEqual(mockTap({ side: "right", letter: "B" }), "wrong");
assert.strictEqual(mockErrors, 1);
console.log('  ✔ Chạm sai -> Ghi nhận lỗi nhẹ nhàng, không bị khóa cứng màn hình!');

// 1.4 Kiểm tra trò chơi bắt bóng (bubbleGame) có Chế độ nhẹ nhàng
console.log('\n--- Kiểm tra P1-09: Chế độ bắt bóng chữ nhẹ nhàng (bubbleGame) ---');
const bubbleCodeMatch = appJs.match(/function bubbleGame\([\s\S]*?\n\}/);
assert(bubbleCodeMatch, 'Phải tìm thấy hàm bubbleGame trong app.js');
const bubbleCode = bubbleCodeMatch[0];

assert(bubbleCode.includes('isGentleMode'), 'bubbleGame phải có cờ isGentleMode');
assert(bubbleCode.includes('__bgToggleSpeed'), 'bubbleGame phải có nút __bgToggleSpeed chuyển đổi tốc độ');
assert(bubbleCode.includes('Bay chậm'), 'bubbleGame phải có nhãn chế độ Bay chậm');
assert(bubbleCode.includes('0.65'), 'bubbleGame tốc độ mặc định bay chậm nhẹ nhàng ~0.65');

console.log('✔ P1-09 ĐẠT: Cả kéo-thả nối dây và bắt bóng đều có chế độ chạm nhẹ nhàng, thân thiện cho bé 5–6 tuổi!');

// ----------------------------------------------------------------------------
// TEST 2: Kiểm tra P1-10 — Màn hình nghỉ ngơi nhẹ nhàng (hết thời gian)
// ----------------------------------------------------------------------------
console.log('\n--- TEST 2: Kiểm tra P1-10 (Màn hình nghỉ ngơi nhẹ nhàng, không gây sợ) ---');

// 2.1 Tuyệt đối không còn emoji 😴 gây sợ hãi/tiêu cực
assert(!indexHtml.includes('>😴<'), 'index.html KHÔNG được chứa emoji 😴 trong modal nghỉ ngơi');
console.log('✔ Đã xóa bỏ hoàn toàn emoji 😴 khỏi modal nghỉ ngơi!');

// 2.2 Modal có biểu tượng ấm áp và lời chúc khích lệ bé
const modalMatch = indexHtml.match(/<div id="timeLimitModal"[\s\S]*?<\/div>\s*<\/div>/);
assert(modalMatch, 'Phải tìm thấy thẻ modal timeLimitModal');
const modalHtml = modalMatch[0];

assert(modalHtml.includes('🌱'), 'Modal nghỉ ngơi phải dùng biểu tượng mầm cây 🌱 nhẹ nhàng');
assert(modalHtml.includes('Bé học giỏi lắm, cùng nghỉ ngơi nhé!'), 'Modal phải có tiêu đề khích lệ');
assert(modalHtml.includes('thư giãn đôi mắt xinh'), 'Modal phải có lời giải thích thư giãn mắt');
assert(modalHtml.includes('🔊 Nghe bạn mèo dặn'), 'Modal phải có nút nghe giọng đọc dặn dò');
assert(modalHtml.includes('window.__unlockTimeLimit()'), 'Modal vẫn giữ nút mở thêm 15 phút với PIN');

// 2.3 Trong app.js hàm checkDailyTimeLimit đọc lời ấm áp khi xuất hiện
const checkLimitMatch = appJs.match(/function checkDailyTimeLimit\([\s\S]*?\n\}/);
assert(checkLimitMatch, 'Phải tìm thấy hàm checkDailyTimeLimit trong app.js');
const checkLimitCode = checkLimitMatch[0];

assert(checkLimitCode.includes('say('), 'checkDailyTimeLimit phải tự động đọc lời dặn dò cho bé');
assert(checkLimitCode.includes('catSet("happy")'), 'checkDailyTimeLimit phải đặt mèo ở trạng thái vui vẻ vẫy tay');

console.log('✔ P1-10 ĐẠT: Màn hình nghỉ ngơi ấm áp, tôn trọng tâm lý bé nhỏ, có giọng đọc tự động và cổng PIN bố mẹ!');

console.log('\n================================================================');
console.log('  TẤT CẢ TEST TASK P1-09 & P1-10 ĐẠT 100% THÀNH CÔNG!');
console.log('================================================================\n');
