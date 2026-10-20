const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('--- TEST MODULE: games/count-game.js ---');

assert(fs.existsSync('games/count-game.js'), 'File games/count-game.js phải tồn tại');

const mod = require('./games/count-game.js');
assert(typeof mod.init === 'function', 'Module phải export hàm init(container)');
assert(typeof mod.render === 'function', 'Module phải export hàm render()');

// Mock DOM
let renderedHtml = "";
const mockContainer = {
  get isConnected() { return true; },
  set innerHTML(val) { renderedHtml = val; },
  get innerHTML() { return renderedHtml; },
  querySelector: () => null,
  querySelectorAll: () => []
};

global.window = global;
global.document = {
  getElementById: (id) => id === 'm' ? mockContainer : null
};
global.say = () => {};
global.catSet = () => {};
global.kbc = () => '<nav>Breadcrumb</nav>';
global.T = (vi, en) => vi;

mod.init(mockContainer);
mod.render();

assert(renderedHtml.includes('cg-wrap'), 'Phải render được giao diện trò chơi đếm hình');
assert(renderedHtml.includes('cg-prompt'), 'Phải có phần tử câu hỏi cg-prompt');
assert(renderedHtml.includes('cg-items-box'), 'Phải có hộp chứa các hình ảnh đếm');
assert(renderedHtml.includes('cg-opts'), 'Phải có các nút lựa chọn số');

console.log('✔ games/count-game.js export đúng init() & render() và render HTML hoàn hảo!');
