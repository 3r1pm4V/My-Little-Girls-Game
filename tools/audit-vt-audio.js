global.window = global;
require('../audio-map.js');
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, '..', 'alphabet.js'), 'utf8');
const match = content.match(/var VT = "([^"]+)"/);
const vtItems = match[1].split(';');

console.log('=== CHECKING ALL VT ITEMS ===');
const suspicious = [];

vtItems.forEach(it => {
  const [L, img, word] = it.split('|');
  const mapped = global.AUDIO_MAP[word];
  const isSuspicious = !mapped ||
    mapped.includes('chao_be') ||
    mapped.includes('hoan_ho') ||
    mapped.includes('chuc_mung') ||
    mapped.includes('dung_roi') ||
    mapped.includes('sai_roi') ||
    !fs.existsSync(path.join(__dirname, '..', mapped));
  
  if (isSuspicious) {
    suspicious.push({ L, word, mapped });
  }
  console.log(`${L} | ${word} -> ${mapped}`);
});

console.log('\n=== SUSPICIOUS OR MISMATCHED ITEMS ===');
console.log('Total suspicious in VT:', suspicious.length);
if (suspicious.length > 0) {
  console.log(JSON.stringify(suspicious, null, 2));
}
