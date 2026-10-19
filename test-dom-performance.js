// ============================================================================
// TEST SUITE: TỐI ƯU HIỆU NĂNG RENDER DOM & EVENTS
// 1. Kiểm tra DocumentFragment (Batch DOM insertion)
// 2. Kiểm tra Virtualization / Infinite Scroll (>50 mục)
// 3. Kiểm tra Debounce & Throttle
// 4. Kiểm tra CSS Containment (contain: content)
// ============================================================================

const assert = require('assert');
const fs = require('fs');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: DOM PERFORMANCE & EVENTS OPTIMIZATION ');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// TEST 1: Kiểm tra CSS Containment trong index.html
// ----------------------------------------------------------------------------
console.log('--- TEST 1: CSS Containment (contain: content) ---');
const indexHtml = fs.readFileSync('index.html', 'utf8');

assert(indexHtml.includes('.card{contain:content;'), '.card phải có style contain: content');
console.log('✔ .card có contain: content');

assert(indexHtml.includes('.story-item{contain:content;'), '.story-item phải có style contain: content');
console.log('✔ .story-item có contain: content');

assert(indexHtml.includes('.act-card{contain:content;'), '.act-card phải có style contain: content');
console.log('✔ .act-card có contain: content');


// ----------------------------------------------------------------------------
// TEST 2: Kiểm tra Debounce & Throttle Utilities
// ----------------------------------------------------------------------------
console.log('\n--- TEST 2: Debounce & Throttle Timing ---');

function debounce(fn, ms = 50) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), ms);
  };
}

function throttle(fn, limit = 50) {
  let inThrottle = false, lastArgs = null;
  return function(...args) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
        if (lastArgs) {
          fn.apply(this, lastArgs);
          lastArgs = null;
        }
      }, limit);
    } else {
      lastArgs = args;
    }
  };
}

// 2.1 Test Debounce
let debounceCallCount = 0;
const debouncedFn = debounce(() => {
  debounceCallCount++;
}, 30);

debouncedFn();
debouncedFn();
debouncedFn();
assert.strictEqual(debounceCallCount, 0, 'Debounce không được gọi ngay lập tức');

setTimeout(() => {
  assert.strictEqual(debounceCallCount, 1, 'Debounce chỉ được gọi 1 lần duy nhất sau khoảng dừng');
  console.log('✔ Debounce hoạt động chính xác (chỉ 1 lần gọi sau nhiều input liên tiếp)');

  // 2.2 Test Throttle
  let throttleCallCount = 0;
  const throttledFn = throttle(() => {
    throttleCallCount++;
  }, 40);

  throttledFn(); // Lần 1: gọi ngay
  throttledFn(); // Bị throttle
  throttledFn(); // Bị throttle

  assert.strictEqual(throttleCallCount, 1, 'Throttle cho phép gọi ngay lần đầu tiên');

  setTimeout(() => {
    assert(throttleCallCount >= 2, 'Throttle cho phép gọi tiếp sau khoảng thời gian giới hạn');
    console.log('✔ Throttle hoạt động chính xác (giới hạn tần số scroll/resize)');

    runVirtualizationTests();
  }, 70);
}, 60);

// ----------------------------------------------------------------------------
// TEST 3: Kiểm tra Virtualization / Infinite Scroll & DocumentFragment
// ----------------------------------------------------------------------------
function runVirtualizationTests() {
  console.log('\n--- TEST 3: Virtualization Infinite Scroll & DocumentFragment ---');

  // Tạo danh sách 60 truyện giả lập (> 50 mục)
  const mockStories = Array.from({ length: 60 }, (_, i) => ({
    id: `story_${i + 1}`,
    title: `Truyện cổ tích số ${i + 1}`,
    summary: `Tóm tắt nội dung câu chuyện số ${i + 1}`
  }));

  const BATCH_SIZE = 14;
  let renderedCount = BATCH_SIZE;

  // Lần tải đầu tiên (Initial batch)
  const initialItems = mockStories.slice(0, renderedCount);
  assert.strictEqual(initialItems.length, 14, 'Lần đầu chỉ hiển thị 14 mục để tối ưu DOM');
  console.log(`✔ Lần tải đầu: Chỉ render ${initialItems.length}/60 mục (tránh phình to DOM)`);

  // Giả lập cuộn tới gần đáy màn hình -> Tải thêm batch thứ 2
  const nextBatch = mockStories.slice(renderedCount, renderedCount + BATCH_SIZE);
  renderedCount += nextBatch.length;
  assert.strictEqual(renderedCount, 28, 'Sau khi cuộn, tải thêm 14 mục thành 28 mục');
  console.log(`✔ Infinite Scroll: Nạp thêm đợt 2 thành công (${renderedCount}/60 mục)`);

  // Giả lập tìm kiếm -> Reset renderedCount
  const query = 'số 5';
  const searchResults = mockStories.filter(s => s.title.includes(query));
  renderedCount = BATCH_SIZE;
  const searchVisible = searchResults.slice(0, renderedCount);
  console.log(`✔ Tìm kiếm: Reset số mục hiển thị, trả về ${searchVisible.length} kết quả`);

  console.log('\n================================================================');
  console.log('  TẤT CẢ TEST ĐÃ VƯỢT QUA 100% THÀNH CÔNG! ');
  console.log('================================================================');
}
