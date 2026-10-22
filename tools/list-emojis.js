const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'alphabet.js'), 'utf8');
const match = content.match(/var VT = "([^"]+)"/);
const items = match[1].split(';');

const emojis = [];
const namedImgs = [];

items.forEach(it => {
  const [L, img, word] = it.split('|');
  const isNamed = /^[a-z0-9_-]+$/i.test(img);
  if (isNamed) {
    namedImgs.push({ L, img, word });
  } else {
    emojis.push({ L, img, word });
  }
});

console.log('Named images in VT:', namedImgs.length);
console.log('Emojis in VT:', emojis.length);
console.log('\n--- EMOJIS IN VT ---');
emojis.forEach(e => console.log(`${e.L} | ${e.word} (${e.img})`));
