/**
 * test-required-audio.js
 * Kiểm tra xác thực 100% các chuỗi trong danh sách chốt (157 chuỗi)
 * đều tra cứu ra file âm thanh hợp lệ trong AUDIO_MAP và file tồn tại thực tế trên đĩa.
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: KIỂM TRA TOÀN BỘ DANH SÁCH CHỐT AUDIO');
console.log('================================================================\n');

// 1. Nạp audio-map.js
const audioMapCode = fs.readFileSync(path.join(__dirname, 'audio-map.js'), 'utf8');
const sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(audioMapCode, sandbox);

const map = sandbox.window.AUDIO_MAP;
assert(map && typeof map === 'object', 'AUDIO_MAP phải tồn tại');

// 2. Nạp danh sách 157 chuỗi từ kế hoạch
const planContent = fs.readFileSync(path.join(__dirname, 'docs', 'vieneu-generation-plan.md'), 'utf8');
const lines = planContent.split('\n');

const excludedTexts = new Set([
  'Dog',
  'Cat',
  'Chick',
  'Con Cừu / Con Dê kêu Be be',
  'Con Chó sủa Gâu gâu',
  'Con Mèo kêu Meo meo',
  'Con Gà gáy Ò ó o'
]);

const itemsToCheck = [];
lines.forEach(line => {
  const m = line.match(/^\|\s*(\d+)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|\s*(.+?)\s*\|/);
  if (m) {
    const text = m[2].trim();
    const fileName = m[4].trim().replace(/`/g, '');
    if (!excludedTexts.has(text)) {
      itemsToCheck.push({ text, fileName });
    }
  }
});

console.log(`Đang kiểm tra ${itemsToCheck.length} chuỗi trong danh sách chốt...`);
assert.strictEqual(itemsToCheck.length, 157, 'Phải có đúng 157 chuỗi trong danh sách chốt');

let passedCount = 0;

itemsToCheck.forEach((item, idx) => {
  const rawLookup = map[item.text];
  assert(rawLookup, `[LỖI] Chuỗi text thô "${item.text}" không tra ra file trong AUDIO_MAP!`);

  const viLookup = map['vi|' + item.text];
  assert(viLookup, `[LỖI] Chuỗi prefix "vi|${item.text}" không tra ra file trong AUDIO_MAP!`);

  assert(rawLookup && rawLookup.startsWith('audio/'), `Đường dẫn file không hợp lệ cho "${item.text}"`);
  assert(fs.existsSync(path.join(__dirname, rawLookup)), `[LỖI] File map không tồn tại trên đĩa: ${rawLookup}`);
  assert(fs.existsSync(path.join(__dirname, 'audio', item.fileName)), `[LỖI] File sinh không tồn tại trên đĩa: audio/${item.fileName}`);

  passedCount++;
});

console.log(`\n✔ 100% (${passedCount}/157) chuỗi trong danh sách chốt đều tra ra file MP3 thực tế trên đĩa!`);
console.log('✔ Tra cứu hai chiều (text thô & "vi|"+text) hoạt động chính xác tuyệt đối.');

console.log('\n================================================================');
console.log('  TẤT CẢ TEST REQUIRED AUDIO ĐÃ VƯỢT QUA 100% THÀNH CÔNG! ');
console.log('================================================================');
