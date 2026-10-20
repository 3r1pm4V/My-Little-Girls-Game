/**
 * test-progress.js
 * Kiểm thử toàn diện hệ thống theo dõi tiến độ kỹ năng (progress.js)
 */

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: TIẾN ĐỘ HỌC TẬP & THÀNH THẠO (PROGRESS.JS)  ');
console.log('================================================================');

// Mock localStorage
const mockStorage = {};
global.localStorage = {
  getItem: (k) => mockStorage[k] || null,
  setItem: (k, v) => { mockStorage[k] = String(v); },
  removeItem: (k) => { delete mockStorage[k]; },
  clear: () => { Object.keys(mockStorage).forEach(k => delete mockStorage[k]); }
};

const progress = require('./progress.js');
const { updateProgress, checkMastery, getSkillLevel } = progress;

// --- TEST 1: Kỹ năng mới hoàn toàn trả về 'new' ---
console.log('\n--- TEST 1: Kiểm tra trạng thái kỹ năng mới (new) ---');
assert.strictEqual(getSkillLevel('math_addition'), 'new', 'Kỹ năng chưa làm bài nào phải có level "new"');
assert.strictEqual(checkMastery('math_addition'), false, 'Kỹ năng mới không thể mastered');
console.log('✔ Kỹ năng mới trả về chính xác "new" và checkMastery = false');

// --- TEST 2: Ghi nhận câu trả lời vào localStorage key blg.progress.v2 ---
console.log('\n--- TEST 2: Kiểm tra updateProgress lưu vào key blg.progress.v2 ---');
updateProgress('math_addition', true);
const rawData = global.localStorage.getItem('blg.progress.v2');
assert.ok(rawData, 'localStorage phải chứa key "blg.progress.v2"');
const parsed = JSON.parse(rawData);
assert.ok(parsed.skills && parsed.skills['math_addition'], 'Dữ liệu phải có skill math_addition');
assert.strictEqual(parsed.skills['math_addition'].history.length, 1, 'History phải có 1 bản ghi');
assert.strictEqual(parsed.skills['math_addition'].history[0].correct, true, 'Lần 1 phải là true');

assert.strictEqual(getSkillLevel('math_addition'), 'learning', 'Sau khi làm bài nhưng chưa đủ phiên phải là "learning"');
assert.strictEqual(checkMastery('math_addition'), false, 'Chưa đủ 2 ngày thì chưa thể đạt mastered');
console.log('✔ updateProgress lưu trữ chuẩn xác vào key blg.progress.v2, chuyển trạng thái sang "learning"');

// --- TEST 3: Cùng một ngày làm đúng 5/5 câu vẫn CHƯA đạt mastery (cần 2 phiên khác ngày) ---
console.log('\n--- TEST 3: Kiểm tra điều kiện 2 phiên khác ngày (Spaced Learning) ---');
// Làm thêm 4 câu đúng trong cùng ngày hôm nay
updateProgress('math_addition', true);
updateProgress('math_addition', true);
updateProgress('math_addition', true);
updateProgress('math_addition', true);
// Hiện tại: 5/5 trong 1 ngày duy nhất
assert.strictEqual(checkMastery('math_addition'), false, 'Dù đúng 5/5 câu nhưng mới trong 1 ngày thì chưa thể mastered');
assert.strictEqual(getSkillLevel('math_addition'), 'learning', 'Vẫn phải ở trạng thái "learning"');
console.log('✔ 5/5 câu trong 1 ngày duy nhất không đạt mastery (bảo vệ chống học vẹt)');

// --- TEST 4: Sang ngày thứ 2, làm đúng >= 4/5 câu -> ĐẠT MASTERY ---
console.log('\n--- TEST 4: Sang ngày thứ 2 đạt >= 4/5 lần -> Thành thạo (mastered) ---');
const day2 = Date.now() + 86400000; // Ngày mai (+24h)
updateProgress('math_addition', true, day2);
updateProgress('math_addition', true, day2);
updateProgress('math_addition', true, day2);
updateProgress('math_addition', true, day2);
updateProgress('math_addition', false, day2); // 4 đúng, 1 sai (4/5)

assert.strictEqual(checkMastery('math_addition'), true, 'Đạt >= 4/5 câu ở 2 ngày khác nhau phải đạt mastery');
assert.strictEqual(getSkillLevel('math_addition'), 'mastered', 'Trạng thái kỹ năng phải chuyển thành "mastered"');
console.log('✔ Đạt đúng >= 4/5 lần trong 2 phiên khác ngày chuyển thành công sang "mastered"!');

// --- TEST 5: Kỹ năng khác làm sai nhiều thì không đạt mastery ---
console.log('\n--- TEST 5: Kiểm tra kỹ năng làm sai nhiều không thể đạt mastery ---');
const today = Date.now();
const tomorrow = today + 86400000;
updateProgress('spelling_gh', false, today);
updateProgress('spelling_gh', false, today);
updateProgress('spelling_gh', true, today);
updateProgress('spelling_gh', false, tomorrow);
updateProgress('spelling_gh', false, tomorrow);

assert.strictEqual(checkMastery('spelling_gh'), false, 'Tỷ lệ sai cao không thể đạt mastery');
assert.strictEqual(getSkillLevel('spelling_gh'), 'learning', 'Kỹ năng làm sai nhiều vẫn là "learning"');
console.log('✔ Kỹ năng trả lời sai được ghi nhận chính xác ở cấp độ "learning"');

// --- TEST 6: 5 lần làm đúng rải rác qua 2 ngày (3 câu ngày 1, 2 câu ngày 2) ---
console.log('\n--- TEST 6: Kiểm tra 5 câu trả lời rải rác qua 2 ngày đạt >= 4/5 ---');
const dayA = Date.now() - 172800000; // 2 ngày trước
const dayB = Date.now() - 86400000;  // 1 ngày trước
updateProgress('counting_objects', true, dayA);
updateProgress('counting_objects', true, dayA);
updateProgress('counting_objects', true, dayA);
updateProgress('counting_objects', true, dayB);
updateProgress('counting_objects', true, dayB);

assert.strictEqual(checkMastery('counting_objects'), true, '5 câu đúng liên tiếp qua 2 ngày phải đạt mastery');
assert.strictEqual(getSkillLevel('counting_objects'), 'mastered', 'Cấp độ counting_objects phải là "mastered"');
console.log('✔ Cửa sổ 5 câu trả lời qua 2 ngày đạt >= 4/5 được xác nhận thành công!');

// --- TEST 7: Kiểm tra tích hợp trong app.js (recordActivityProgress) ---
console.log('\n--- TEST 7: Kiểm tra tích hợp gọi updateProgress trong app.js ---');
const appJsCode = fs.readFileSync('app.js', 'utf8');
assert.ok(appJsCode.includes('function recordActivityProgress'), 'app.js phải có hàm recordActivityProgress');
assert.ok(appJsCode.includes('recordActivityProgress(isRight, act)'), 'app.js phải gọi recordActivityProgress trong __actChoose');
assert.ok(appJsCode.includes('recordActivityProgress(true, currentPlayingAct)'), 'app.js phải gọi recordActivityProgress khi nối cặp đúng');
assert.ok(appJsCode.includes('recordActivityProgress(false, currentPlayingAct)'), 'app.js phải gọi recordActivityProgress khi nối cặp sai');
assert.ok(appJsCode.includes('recordActivityProgress(isMatch, act)'), 'app.js phải gọi recordActivityProgress khi sắp xếp kết quả');
console.log('✔ app.js tích hợp gọi updateProgress sau mỗi câu trả lời của bé trong các hoạt động!');

console.log('\n================================================================');
console.log('  TẤT CẢ KIỂM THỬ PROGRESS.JS ĐỀU ĐẠT CHUẨN 100%!               ');
console.log('================================================================');
