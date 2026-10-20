// Test suite cho logic chấm điểm, tính sao, streak và phát hiện bài bỏ dở
const assert = require("assert");

console.log("=========================================");
console.log("  CHẠY TEST SUITE: CHẤM ĐIỂM & TÍNH SAO   ");
console.log("=========================================\n");

// 1. Test logic tính sao theo số lần thử
function calculateEarnedStars(attempts) {
  return attempts === 0 ? 3 : (attempts === 1 ? 2 : 1);
}

assert.strictEqual(calculateEarnedStars(0), 3, "Lần 1 phải đạt 3 sao");
assert.strictEqual(calculateEarnedStars(1), 2, "Lần 2 phải đạt 2 sao");
assert.strictEqual(calculateEarnedStars(2), 1, "Lần 3 phải đạt 1 sao");
assert.strictEqual(calculateEarnedStars(5), 1, "Lần 5 vẫn đạt 1 sao khuyến khích");
console.log("✔ Test 1: Logic tính sao theo số lần thử PASSED");

// 2. Test tỷ lệ chính xác (Accuracy percentage)
function calculateAccuracy(firstTryCorrect, totalQuestions) {
  if (!totalQuestions) return 0;
  return Math.round((firstTryCorrect / totalQuestions) * 100);
}

assert.strictEqual(calculateAccuracy(5, 5), 100, "5/5 câu đúng phải là 100%");
assert.strictEqual(calculateAccuracy(4, 5), 80, "4/5 câu đúng phải là 80%");
assert.strictEqual(calculateAccuracy(0, 0), 0, "Chưa làm câu nào phải là 0%");
assert.strictEqual(calculateAccuracy(1, 3), 33, "1/3 câu đúng làm tròn là 33%");
console.log("✔ Test 2: Công thức tỷ lệ chính xác PASSED");

// 3. Test logic chuỗi ngày học streak (Streak nhẹ nhàng: "Bé đã học N ngày", không reset gây buồn)
function calculateNextStreak(currentStreak, lastDateStr, todayStr) {
  if (lastDateStr === todayStr) {
    return { streak: currentStreak, updated: false };
  }
  // Bé học thêm ngày mới: tích lũy thêm 1 ngày, không bao giờ reset về 1
  return { streak: currentStreak + 1, updated: true };
}

assert.deepStrictEqual(
  calculateNextStreak(3, "2026-10-19", "2026-10-19"),
  { streak: 3, updated: false },
  "Cùng ngày học lại không được cộng dồn streak"
);

assert.deepStrictEqual(
  calculateNextStreak(3, "2026-10-18", "2026-10-19"),
  { streak: 4, updated: true },
  "Học liên tiếp ngày hôm sau phải tăng lên 4 ngày"
);

assert.deepStrictEqual(
  calculateNextStreak(5, "2026-10-10", "2026-10-19"),
  { streak: 6, updated: true },
  "Nghỉ nhiều ngày quay lại học: không reset về 1, tích lũy thành 6 ngày (bỏ cảm giác mất chuỗi)"
);
console.log("✔ Test 3: Logic tính chuỗi ngày streak nhẹ nhàng (không reset gây buồn) PASSED");

// 4. Test logic thống kê theo môn học
function recordSubjectStat(stats, subject) {
  const next = { ...stats };
  if (subject === "math") next.mathCount = (next.mathCount || 0) + 1;
  else if (subject === "vietnamese") next.letCount = (next.letCount || 0) + 1;
  else if (subject === "reading") next.storyCount = (next.storyCount || 0) + 1;
  else if (subject === "english") next.engCount = (next.engCount || 0) + 1;
  return next;
}

let s = {};
s = recordSubjectStat(s, "math");
s = recordSubjectStat(s, "english");
s = recordSubjectStat(s, "math");
assert.strictEqual(s.mathCount, 2);
assert.strictEqual(s.engCount, 1);
assert.strictEqual(s.letCount, undefined);
console.log("✔ Test 4: Logic đếm tiến độ môn học PASSED");

// 5. Test logic phát hiện hoạt động bỏ dở (Abandonment detection)
function checkAbandon(session, currentTime) {
  if (!session || session.completed) return false;
  const duration = currentTime - session.startTime;
  return duration >= 3500; // Hơn 3.5s mà không xong thì tính là bỏ dở
}

assert.strictEqual(checkAbandon({ startTime: 1000, completed: true }, 10000), false, "Đã hoàn thành không bị tính bỏ dở");
assert.strictEqual(checkAbandon({ startTime: 1000, completed: false }, 2000), false, "Dưới 3.5s chưa tính bỏ dở");
assert.strictEqual(checkAbandon({ startTime: 1000, completed: false }, 5000), true, "Trên 3.5s chưa xong tính là bỏ dở");
console.log("✔ Test 5: Logic phát hiện bài học bỏ dở (Abandonment) PASSED");

console.log("\n=========================================");
console.log("  TẤT CẢ TEST ĐÃ VƯỢT QUA 100% THÀNH CÔNG! ");
console.log("=========================================\n");
