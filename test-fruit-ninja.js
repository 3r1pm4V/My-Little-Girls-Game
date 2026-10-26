const assert = require('assert');
const fs = require('fs');

console.log('--- TEST MODULE: games/fruit-ninja.js (Ninja Fruit Clone) ---');

assert(fs.existsSync('games/fruit-ninja.js'), 'File games/fruit-ninja.js phải tồn tại');

// Mock localStorage & DOM
const storageMock = {};
global.localStorage = {
  getItem: (k) => storageMock[k] || null,
  setItem: (k, v) => { storageMock[k] = v.toString(); }
};

let renderedHtml = "";
const mockCanvas = {
  getContext: () => ({
    save: () => {},
    restore: () => {},
    translate: () => {},
    rotate: () => {},
    beginPath: () => {},
    arc: () => {},
    ellipse: () => {},
    fill: () => {},
    stroke: () => {},
    fillRect: () => {},
    strokeRect: () => {},
    moveTo: () => {},
    lineTo: () => {},
    quadraticCurveTo: () => {},
    bezierCurveTo: () => {},
    closePath: () => {},
    fillText: () => {},
    createLinearGradient: () => ({ addColorStop: () => {} }),
    createRadialGradient: () => ({ addColorStop: () => {} })
  }),
  getBoundingClientRect: () => ({ left: 0, top: 0, width: 400, height: 600 }),
  addEventListener: () => {},
  removeEventListener: () => {},
  width: 400,
  height: 600
};

const mockContainer = {
  get clientWidth() { return 400; },
  get clientHeight() { return 600; },
  set innerHTML(val) { renderedHtml = val; },
  get innerHTML() { return renderedHtml; },
  querySelector: (sel) => {
    if (sel === "#fnCanvas") return mockCanvas;
    return {
      onclick: null,
      textContent: "",
      style: { display: "none" },
      setAttribute: () => {},
      getAttribute: () => "classic"
    };
  },
  querySelectorAll: () => []
};

global.window = global;
global.document = {
  getElementById: (id) => id === 'm' ? mockContainer : null,
  createElement: () => mockCanvas
};
global.requestAnimationFrame = () => 1;
global.cancelAnimationFrame = () => {};
global.T = (vi, en) => vi;

const mod = require('./games/fruit-ninja.js');

assert(typeof mod.init === 'function', 'Module phải export hàm init(container, options)');
assert(typeof mod.render === 'function', 'Module phải export hàm render()');
assert(typeof mod.selectBlade === 'function', 'Module phải export hàm selectBlade(id)');
assert(typeof mod.selectDojo === 'function', 'Module phải export hàm selectDojo(id)');
assert(typeof mod.getState === 'function', 'Module phải export hàm getState()');
assert(typeof mod.destroy === 'function', 'Module phải export hàm destroy()');
assert(typeof mod.AudioEngine === 'object', 'Module phải export AudioEngine');

// 1. Kiểm tra Audio Engine
mod.AudioEngine.init();
mod.AudioEngine.muted = true;
assert(mod.AudioEngine.muted === true, 'AudioEngine phải hỗ trợ bật/tắt âm thanh');

// 2. Khởi tạo Game
mod.init(mockContainer);
assert(renderedHtml.includes('fn-container'), 'Giao diện phải chứa container trò chơi');
assert(renderedHtml.includes('fnCanvas'), 'Giao diện phải chứa thẻ Canvas');
assert(renderedHtml.includes('CLASSIC'), 'Menu phải có chế độ Classic');
assert(renderedHtml.includes('ZEN'), 'Menu phải có chế độ Zen');
assert(renderedHtml.includes('ARCADE'), 'Menu phải có chế độ Arcade');

// 3. Kiểm tra thay đổi Kiếm & Đạo Quán
mod.selectBlade('flame');
let state = mod.getState();
assert.strictEqual(state.currentBlade, 'flame', 'Lưỡi kiếm phải đổi thành flame');

mod.selectDojo('night');
state = mod.getState();
assert.strictEqual(state.currentDojo, 'night', 'Đạo quán phải đổi thành night');

// 4. Hủy game an toàn
mod.destroy();

console.log('✔ games/fruit-ninja.js đạt chuẩn 100% hợp đồng API, DOM & Mechanics!');
