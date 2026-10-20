const fs = require("fs");
const path = require("path");

const win = {};
global.window = win;
require(path.join(__dirname, "../audio-map.js"));

const NORM_MAP = Object.create(null);
const normKey = win.__normAudioKey;
for (const k in win.AUDIO_MAP) {
  const v = win.AUDIO_MAP[k];
  const nk = normKey(k);
  if (nk && !NORM_MAP[nk]) NORM_MAP[nk] = v;
  const rawK = nk.replace(/^(vi|en)\|/, "");
  if (rawK && !NORM_MAP[rawK]) NORM_MAP[rawK] = v;
}

function getAudioPath(text) {
  if (!text) return null;
  const rawText = String(text).trim();
  const nk = normKey(rawText);
  const rawK = nk.replace(/^(vi|en)\|/, "");
  return win.AUDIO_MAP[rawText] || NORM_MAP[nk] || NORM_MAP[rawK] || null;
}

const appCode = fs.readFileSync(path.join(__dirname, "../app.js"), "utf8");

// Extract all say(vi, ...) calls where vi is a static string
const sayRegex = /\bsay\s*\(\s*(["'`])((?:\\.|(?!\1).)*)\1/g;
let match;
const viSayStrings = new Set();
while ((match = sayRegex.exec(appCode)) !== null) {
  const str = match[2].trim();
  if (str && !str.includes("${") && !str.includes(" + ") && !str.startsWith("audio/")) {
    if (/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(str) || str.includes("Bé") || str.includes("Chào")) {
      viSayStrings.add(str);
    }
  }
}

// Also extract sayPrompt(...) calls
const promptRegex = /\bsayPrompt\s*\(\s*["'`][^"'`]+["'`]\s*,\s*(["'`])((?:\\.|(?!\1).)*)\1/g;
while ((match = promptRegex.exec(appCode)) !== null) {
  const str = match[2].trim();
  if (str && !str.includes("${") && !str.includes(" + ") && !str.startsWith("audio/")) {
    if (/[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i.test(str)) {
      viSayStrings.add(str);
    }
  }
}

console.log("Total unique Vietnamese say/sayPrompt strings:", viSayStrings.size);

const missing = [];
const found = [];

for (const text of viSayStrings) {
  const file = getAudioPath(text);
  if (!file) {
    missing.push({ text });
  } else {
    const fullPath = path.join(__dirname, "..", file);
    if (!fs.existsSync(fullPath)) {
      missing.push({ text, file, fileExists: false });
    } else {
      found.push({ text, file });
    }
  }
}

console.log("\nFOUND (" + found.length + "):");
found.forEach(f => console.log("  OK:", f.text, "->", f.file));

console.log("\nMISSING (" + missing.length + "):");
missing.forEach(m => console.log("  MISSING:", m));
