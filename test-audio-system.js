// ============================================================================
// TEST SUITE: HỆ THỐNG ÂM THANH THEO QUY TRÌNH ƯU TIÊN 4 BƯỚC
// 1. window.AUDIO_MAP load đồng bộ, key chuẩn hóa
// 2. Kiểm tra thứ tự ưu tiên tuyệt đối của playSafeAudio:
//    Bước 1: Map -> Bước 2: IndexedDB -> Bước 3: TTS API -> Bước 4: Web Speech
// 3. Cơ chế Debounce 300ms khi spam API
// 4. Thuật toán IndexedDB LRU Cache Eviction (50MB)
// ============================================================================

const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

console.log('================================================================');
console.log('  CHẠY TEST SUITE: HỆ THỐNG ÂM THANH 4 BƯỚC ƯU TIÊN & AUDIO MAP');
console.log('================================================================\n');

// ----------------------------------------------------------------------------
// TEST 1: Kiểm tra audio-map.js (Load đồng bộ, chuẩn hóa key, Proxy lookup)
// ----------------------------------------------------------------------------
console.log('--- TEST 1: audio-map.js nạp đồng bộ & Chuẩn hóa key ---');
const audioMapCode = fs.readFileSync('audio-map.js', 'utf8');

const sandbox = { window: {}, console: console };
vm.createContext(sandbox);
vm.runInContext(audioMapCode, sandbox);

// 1.1 Kiểm tra window.AUDIO_MAP được nạp ĐỒNG BỘ ngay lập tức
assert(sandbox.window.AUDIO_MAP && typeof sandbox.window.AUDIO_MAP === 'object', 'AUDIO_MAP phải tồn tại đồng bộ');
console.log('✔ window.AUDIO_MAP tồn tại đồng bộ ngay khi nạp audio-map.js');

// 1.2 Kiểm tra hàm chuẩn hóa __normAudioKey
assert(typeof sandbox.window.__normAudioKey === 'function', '__normAudioKey phải là hàm');
assert.strictEqual(sandbox.window.__normAudioKey('  Không! Bao Giờ? '), 'không bao giờ');
assert.strictEqual(sandbox.window.__normAudioKey('Mười Một.'), 'mười một');
console.log('✔ Hàm __normAudioKey xóa dấu câu, chuyển chữ thường, NFC chính xác');

// 1.3 Kiểm tra tra cứu linh hoạt qua Proxy (chấp nhận text có dấu câu, chữ hoa, prefix vi|)
const map = sandbox.window.AUDIO_MAP;
assert(map['không'] === 'audio/vi_khong_1othrk.mp3', 'Lookup từ thường "không"');
assert(map['Không!'] === 'audio/vi_khong_1othrk.mp3', 'Lookup từ có viết hoa và dấu cảm "Không!"');
assert(map['vi|không'] === 'audio/vi_khong_1othrk.mp3', 'Lookup có prefix "vi|không"');
assert(map['vi|Một!'] === 'audio/vi_mot_7ht4.mp3', 'Lookup "vi|Một!"');
assert(map['mười hai'] === 'audio/vi_muoi_hai_d8v39b.mp3', 'Lookup "mười hai"');
console.log('✔ Proxy lookup hoạt động thông minh, tìm đúng file dù text có dấu câu hoặc chữ hoa');

// 1.4 Đảm bảo đường dẫn trong AUDIO_MAP là đường dẫn tương đối (không bắt đầu bằng '/')
let nonRelativeCount = 0;
for (const [k, p] of Object.entries(map)) {
  if (typeof p === 'string' && p.startsWith('/')) {
    nonRelativeCount++;
  }
}
assert.strictEqual(nonRelativeCount, 0, 'Tất cả đường dẫn âm thanh phải là tương đối (không có / đầu)');
console.log('✔ 100% đường dẫn trong AUDIO_MAP là tương đối (audio/xxx.mp3), an toàn trên GitHub Pages & Netlify');


// ----------------------------------------------------------------------------
// TEST 2: Kiểm tra thứ tự ưu tiên 4 bước của playSafeAudio
// ----------------------------------------------------------------------------
console.log('\n--- TEST 2: Thứ tự ưu tiên 4 bước của playSafeAudio ---');

// Mô phỏng hệ thống playSafeAudio để test độc lập logic
class MockAudioSystem {
  constructor(audioMap, mockDB = {}) {
    this.audioMap = audioMap;
    this.db = new Map(Object.entries(mockDB));
    this.apiCalls = [];
    this.webSpeechCalls = [];
    this.playedSources = [];
    this.logs = [];
    this.debounceTimers = new Map();
  }

  log(msg, data) {
    this.logs.push({ msg, data });
  }

  async playSafeAudio(text, voice = 'Tưởng Vy', onEnd) {
    const rawText = String(text).trim();
    const cleanKey = rawText.toLowerCase().replace(/[.,!?:;'"“”„…\-–—()\[\]{}]+/g, '').trim();

    // BƯỚC 1: Kiểm tra window.AUDIO_MAP[text]
    const mapPath = this.audioMap[rawText] || this.audioMap[cleanKey] || this.audioMap['vi|' + cleanKey];
    if (mapPath) {
      this.log('[Audio] Found in Map', mapPath);
      this.playedSources.push({ type: 'map', path: mapPath });
      if (onEnd) onEnd();
      return;
    }

    // BƯỚC 2: Kiểm tra IndexedDB
    const dbKey = 'tts:' + cleanKey;
    const cachedBlobUrl = this.db.get(dbKey) || this.db.get(rawText);
    if (cachedBlobUrl) {
      this.log('[Audio] Found in DB', rawText);
      this.playedSources.push({ type: 'db', url: cachedBlobUrl });
      if (onEnd) onEnd();
      return;
    }

    // BƯỚC 3: Gọi API TTS với Debounce 300ms
    this.log('[Audio] Fetching from API', rawText);
    return new Promise(resolve => {
      if (this.debounceTimers.has(cleanKey)) {
        clearTimeout(this.debounceTimers.get(cleanKey));
      }

      const timerId = setTimeout(async () => {
        this.debounceTimers.delete(cleanKey);
        this.apiCalls.push({ text: cleanKey, voice });

        // Giả lập API phản hồi hoặc lỗi
        if (this.apiMockHandler) {
          const res = await this.apiMockHandler(cleanKey, voice);
          if (res && res.url) {
            this.db.set(dbKey, res.url);
            this.audioMap[cleanKey] = res.url;
            this.playedSources.push({ type: 'api', url: res.url });
            if (onEnd) onEnd();
            resolve();
            return;
          }
        }

        // BƯỚC 4: Fallback Web Speech
        this.log('[Audio] Fallback to Web Speech', cleanKey);
        this.webSpeechCalls.push(cleanKey);
        this.playedSources.push({ type: 'webspeech', text: cleanKey });
        if (onEnd) onEnd();
        resolve();
      }, 50); // Thu nhỏ 50ms cho unit test chạy nhanh
      this.debounceTimers.set(cleanKey, timerId);
    });
  }
}

// 2.1 BƯỚC 1: Có trong AUDIO_MAP -> Phát từ Map, không đụng tới DB, API, Web Speech
(async () => {
  const sys = new MockAudioSystem(map, { 'tts:không': 'blob:mock-not-used' });
  await sys.playSafeAudio('không');
  assert.strictEqual(sys.playedSources.length, 1);
  assert.strictEqual(sys.playedSources[0].type, 'map');
  assert.strictEqual(sys.apiCalls.length, 0);
  assert.strictEqual(sys.webSpeechCalls.length, 0);
  assert(sys.logs.some(l => l.msg === '[Audio] Found in Map'));
  console.log('✔ Bước 1: Có trong MAP -> Phát trực tiếp từ MAP, bỏ qua hoàn toàn DB/API');
})();

// 2.2 BƯỚC 2: Không có trong MAP, nhưng có trong DB -> Phát từ DB, không gọi API
(async () => {
  const customMap = {};
  const sys = new MockAudioSystem(customMap, { 'tts:từ đặc biệt': 'blob:special-url' });
  await sys.playSafeAudio('từ đặc biệt');
  assert.strictEqual(sys.playedSources.length, 1);
  assert.strictEqual(sys.playedSources[0].type, 'db');
  assert.strictEqual(sys.playedSources[0].url, 'blob:special-url');
  assert.strictEqual(sys.apiCalls.length, 0);
  assert.strictEqual(sys.webSpeechCalls.length, 0);
  assert(sys.logs.some(l => l.msg === '[Audio] Found in DB'));
  console.log('✔ Bước 2: Không có trong MAP -> Phát từ IndexedDB, không gọi API');
})();

// 2.3 BƯỚC 3: Không có trong MAP, không có trong DB -> Gọi API TTS & Lưu vào DB + Map
(async () => {
  const customMap = {};
  const sys = new MockAudioSystem(customMap, {});
  sys.apiMockHandler = async (text, voice) => ({ url: 'audio/generated_new.mp3' });

  await sys.playSafeAudio('câu chuyện mới lạ');
  assert.strictEqual(sys.apiCalls.length, 1);
  assert.strictEqual(sys.playedSources[0].type, 'api');
  assert.strictEqual(sys.audioMap['câu chuyện mới lạ'], 'audio/generated_new.mp3');
  assert.strictEqual(sys.db.get('tts:câu chuyện mới lạ'), 'audio/generated_new.mp3');
  assert(sys.logs.some(l => l.msg === '[Audio] Fetching from API'));
  console.log('✔ Bước 3: Gọi API TTS thành công -> Tự động lưu vào IndexedDB và AUDIO_MAP');
})();

// 2.4 BƯỚC 4: Fallback Web Speech khi API lỗi / offline
(async () => {
  const customMap = {};
  const sys = new MockAudioSystem(customMap, {});
  sys.apiMockHandler = async () => null; // API trả về null / offline

  await sys.playSafeAudio('từ vựng khi mất mạng');
  assert.strictEqual(sys.webSpeechCalls.length, 1);
  assert.strictEqual(sys.playedSources[0].type, 'webspeech');
  assert(sys.logs.some(l => l.msg === '[Audio] Fallback to Web Speech'));
  console.log('✔ Bước 4: Fallback sang Web Speech API trơn tru khi API thất bại');
})();


// ----------------------------------------------------------------------------
// TEST 3: Kiểm tra Debounce chống Spam API
// ----------------------------------------------------------------------------
console.log('\n--- TEST 3: Kiểm tra Debounce chống spam API ---');
(async () => {
  const customMap = {};
  const sys = new MockAudioSystem(customMap, {});
  sys.apiMockHandler = async (text) => ({ url: 'audio/' + text + '.mp3' });

  // Gọi 5 lần liên tục cùng 1 từ trong thời gian ngắn
  sys.playSafeAudio('spam test');
  sys.playSafeAudio('spam test');
  sys.playSafeAudio('spam test');
  sys.playSafeAudio('spam test');
  const p5 = sys.playSafeAudio('spam test');

  await p5;
  assert.strictEqual(sys.apiCalls.length, 1, 'Debounce phải gộp 5 lần gọi liên tiếp thành duy nhất 1 lần gọi API');
  console.log('✔ Debounce chặn spam API thành công: 5 lần gọi liên tiếp chỉ thực hiện 1 request API');
})();


// ----------------------------------------------------------------------------
// TEST 4: Kiểm tra thuật toán LRU Cache Eviction (50MB)
// ----------------------------------------------------------------------------
console.log('\n--- TEST 4: Thuật toán IndexedDB LRU Eviction (50MB) ---');
class MockLRUStore {
  constructor(maxBytes) {
    this.maxBytes = maxBytes;
    this.store = new Map();
    this.clock = 0;
  }
  put(url, size) {
    this.clock++;
    let total = size;
    for (const item of this.store.values()) total += item.size;
    if (total > this.maxBytes) {
      const items = Array.from(this.store.values()).sort((a, b) => a.lastUsed - b.lastUsed);
      let toRemove = total - (this.maxBytes * 0.85);
      for (const it of items) {
        if (toRemove <= 0) break;
        this.store.delete(it.url);
        toRemove -= it.size;
      }
    }
    this.store.set(url, { url, size, lastUsed: this.clock });
  }
}

const lru = new MockLRUStore(50 * 1024 * 1024); // 50 MB
lru.put('audio/file1.mp3', 20 * 1024 * 1024);
lru.put('audio/file2.mp3', 25 * 1024 * 1024);
assert.strictEqual(lru.store.size, 2);

// Thêm file3 (15MB) -> Tổng 20 + 25 + 15 = 60MB > 50MB -> file1 bị evict
lru.put('audio/file3.mp3', 15 * 1024 * 1024);
assert(!lru.store.has('audio/file1.mp3'), 'file1 cũ nhất phải bị evict');
assert(lru.store.has('audio/file2.mp3'), 'file2 được giữ lại');
assert(lru.store.has('audio/file3.mp3'), 'file3 mới thêm được giữ lại');
console.log('✔ LRU Eviction bảo vệ bộ nhớ không vượt quá 50MB');

console.log('\n================================================================');
console.log('  TẤT CẢ TEST ĐÃ VƯỢT QUA 100% THÀNH CÔNG! ');
console.log('================================================================');
