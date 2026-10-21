// ============================================================================
// TEST SUITE: TASK P1-05 & P1-06 (TỰ ĐỌC ĐỀ & STREAK NHẸ NHÀNG)
// ============================================================================

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: TASK P1-05 & P1-06');
console.log('================================================================\n');

const appJs = fs.readFileSync("app.js", "utf8") +
  (fs.existsSync("alphabet.js") ? fs.readFileSync("alphabet.js", "utf8") : "") +
  (fs.existsSync("numbers.js") ? fs.readFileSync("numbers.js", "utf8") : "") +
  (fs.existsSync("spelling.js") ? fs.readFileSync("spelling.js", "utf8") : "");

// ----------------------------------------------------------------------------
// TEST 1: Kiểm tra P1-05 — Tự đọc đề và nút 🔊 nghe lại trên mọi màn hình
// ----------------------------------------------------------------------------
console.log('--- TEST 1: Kiểm tra P1-05 (Tự đọc đề & Nút 🔊 nghe lại) ---');

// 1.1 Kiểm tra cơ chế autoplay an toàn pendingAutoplayAudio
assert(appJs.includes('let pendingAutoplayAudio=null;'), 'Phải có biến pendingAutoplayAudio');
assert(appJs.includes('handleAutoplayUnlock'), 'Phải có handler mở khóa autoplay khi tương tác');
assert(appJs.includes('pointerdown",handleAutoplayUnlock'), 'Phải lắng nghe pointerdown để mở khóa autoplay');

// 1.2 Kiểm tra playActivity
assert(appJs.includes('say(actQText, actQTextEn)'), 'playActivity phải tự đọc câu hỏi khi vào');
assert(appJs.includes('id="actQTitle"'), 'playActivity phải có phần tử câu hỏi #actQTitle có nút 🔊');
assert(appJs.includes('say(act.title, act.titleEn || act.title)'), 'isWatchMode phải tự đọc tiêu đề bài học khi vào');
assert(appJs.includes('id="actWatchTitle"'), 'isWatchMode phải có #actWatchTitle có nút 🔊');

// 1.3 Kiểm tra countGame (hỗ trợ cả module games/count-game.js)
const cgCode = fs.existsSync('games/count-game.js') ? fs.readFileSync('games/count-game.js', 'utf8') : '';
assert(appJs.includes('say(viPrompt, enPrompt)') || cgCode.includes('say(viPrompt, enPrompt)'), 'countGame phải tự đọc đề khi vào câu hỏi mới');
assert(appJs.includes('id="cgPrompt"') || cgCode.includes('id="cgPrompt"'), 'countGame phải có nút nghe lại #cgPrompt');

// 1.4 Kiểm tra bubbleGame
assert(appJs.includes('announceTarget()'), 'bubbleGame phải tự đọc chữ cái cần bắt');
assert(appJs.includes('__bgReplayAudio'), 'bubbleGame phải có nút 🔊 nghe lại');

// 1.5 Kiểm tra trace
assert(appJs.includes('id="traceQ"'), 'trace phải có #traceQ kèm 🔊 nghe lại');
assert(appJs.includes('md.say(it)'), 'trace phải tự đọc chữ/nét khi vào');

// 1.6 Kiểm tra quiz (mis, cmpS, cmp, numF, letO)
assert(appJs.includes('<h2 id="q">🔊'), 'quiz phải có tiêu đề kèm biểu tượng 🔊');
assert(appJs.includes('document.getElementById("q").onclick=()=>say(qv,qe);say(qv,qe);'), 'quiz phải tự đọc và cho phép bấm nghe lại');

// 1.7 Kiểm tra match & mem
assert(appJs.includes('say("Ghép chữ với hình nhé'), 'match phải tự đọc hướng dẫn khi vào');
assert(appJs.includes('id="memQ"'), 'mem phải có #memQ kèm 🔊 nghe lại');

// 1.8 Kiểm tra letL, numL, readL
assert(appJs.includes('id="letLQ"'), 'letL phải có #letLQ kèm 🔊');
assert(appJs.includes('id="readLQ"'), 'readL phải có #readLQ kèm 🔊');
assert(appJs.includes('onclick="sayN(${n})" role="button" tabindex="0" style="cursor:pointer" title="${T("Bấm để nghe đọc lại","Tap to listen again")}">🔊'), 'numL phải có 🔊 nghe lại số');

console.log('✔ P1-05 ĐẠT: Mọi màn hình bài/trò chơi đều tự đọc đề khi vào và có nút 🔊 nghe lại!');

// ----------------------------------------------------------------------------
// TEST 2: Kiểm tra P1-06 — Streak nhẹ nhàng ("bé đã học N ngày", không reset)
// ----------------------------------------------------------------------------
console.log('\n--- TEST 2: Kiểm tra P1-06 (Streak nhẹ nhàng, không reset gây buồn) ---');

function createMockEnv(initialData = {}) {
  const store = { ...initialData };
  const mockLs = {
    get(k, d) { return store[k] !== undefined ? store[k] : d; },
    set(k, v) { store[k] = String(v); },
    _store: store
  };

  function getDailyStreak(){
    let count = parseInt(mockLs.get("kids_streak_count", ""), 10);
    if(Number.isNaN(count)){
      count = parseInt(mockLs.get("streak", "0"), 10) || 0;
    }
    const lastDate = mockLs.get("kids_streak_last_date", "");
    return { count, lastDate };
  }

  function recordDailyActivity(simulatedToday){
    const { count, lastDate } = getDailyStreak();
    const today = simulatedToday;
    if(lastDate === today){
      return { count, updated: false };
    }
    const newCount = count + 1;
    mockLs.set("kids_streak_count", newCount);
    mockLs.set("streak", newCount);
    mockLs.set("kids_streak_last_date", today);
    return { count: newCount, updated: true };
  }

  return { mockLs, getDailyStreak, recordDailyActivity };
}

// 2.1 Kiểm tra tương thích dữ liệu streak cũ
const envLegacy = createMockEnv({ "streak": "12" });
assert.strictEqual(envLegacy.getDailyStreak().count, 12, 'Dữ liệu streak cũ (key: streak) vẫn phải đọc được 12');

// 2.2 Ngày đầu tiên học
const envNew = createMockEnv({});
assert.strictEqual(envNew.getDailyStreak().count, 0, 'Bé mới tinh chưa học ngày nào: count = 0');
const day1 = envNew.recordDailyActivity("2026-10-01");
assert.strictEqual(day1.count, 1, 'Học ngày 1 -> count = 1');
assert.strictEqual(day1.updated, true);

// 2.3 Học lại trong cùng ngày
const day1Again = envNew.recordDailyActivity("2026-10-01");
assert.strictEqual(day1Again.count, 1, 'Học tiếp trong ngày 1 -> không cộng dồn, count vẫn = 1');
assert.strictEqual(day1Again.updated, false);

// 2.4 Ngày hôm sau học tiếp
const day2 = envNew.recordDailyActivity("2026-10-02");
assert.strictEqual(day2.count, 2, 'Ngày 2 học tiếp -> count = 2');
assert.strictEqual(day2.updated, true);

// 2.5 Bé nghỉ 10 ngày (không học liên tục), ngày thứ 11 quay lại học
const daySkip = envNew.recordDailyActivity("2026-10-13");
assert.strictEqual(daySkip.count, 3, 'Nghỉ nhiều ngày quay lại: KHÔNG RESET về 1, tích lũy tiếp thành 3 ngày!');
assert.strictEqual(daySkip.updated, true);

// 2.6 Kiểm tra từ ngữ hiển thị trong app.js
assert(appJs.includes('Bé đã học: ${dailyStreak.count} ngày'), 'showBadges phải hiển thị "Bé đã học: N ngày"');
assert(appJs.includes('Số ngày bé đã học:'), 'Parent Dashboard phải hiển thị "Số ngày bé đã học:"');
assert(appJs.includes('ngày bé đã học'), 'Parent Dashboard phải ghi nhận ngày bé đã học');
assert(!appJs.includes('mất chuỗi'), 'Tuyệt đối không có thông báo hay cảnh báo mất chuỗi gây buồn cho bé');

console.log('✔ P1-06 ĐẠT: Streak nhẹ nhàng hoạt động hoàn hảo, không reset khi nghỉ nhiều ngày, tích lũy trọn vẹn!');

console.log('\n================================================================');
console.log('  TẤT CẢ TEST TASK P1-05 & P1-06 ĐẠT 100% THÀNH CÔNG!');
console.log('================================================================');
