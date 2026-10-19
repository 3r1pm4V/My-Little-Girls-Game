// Máy chủ kiểm tra cục bộ (Local Development Server)
// Tích hợp API VieNeu TTS giọng đọc Tưởng Vy (vieneu-v4)
const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 8000;
const API_KEY = process.env.VIENEU_API_KEY || 'vn_sk_622f6140a9fb7f079e25fd9f5831a072b5fed9a195e4f499';
const DEFAULT_VOICE = 'Tưởng Vy';
const AUDIO_DIR = path.join(__dirname, 'audio');

if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
  '.ogg': 'audio/ogg',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

function getFileName(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  const safeName = str.toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "_")
    .replace(/_+/g, "_")
    .slice(0, 24);
  return `vi_${safeName}_${Math.abs(hash).toString(36)}.mp3`;
}

function fetchVieneuTTS(text, voice) {
  const payload = JSON.stringify({
    model: 'vieneu-v4',
    input: text,
    voice: voice || DEFAULT_VOICE
  });
  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'api.vieneu.io',
      path: '/api/v1/audio/speech',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const buf = Buffer.concat(chunks);
        if (res.statusCode === 200) resolve(buf);
        else reject(new Error(`Vieneu API ${res.statusCode}: ${buf.toString()}`));
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function normAudioKey(s) {
  if (!s) return "";
  return String(s)
    .trim()
    .toLowerCase()
    .normalize("NFC")
    .replace(/[.,!?:;'"“”„…\-–—()\[\]{}]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function updateAudioMap(key, relativePath) {
  const mapPath = path.join(__dirname, 'audio-map.js');
  try {
    if (fs.existsSync(mapPath)) {
      let content = fs.readFileSync(mapPath, 'utf8');
      const m = content.match(/(const\s+RAW_MAP\s*=\s*)(\{[\s\S]*?\})(\s*;)/);
      if (m) {
        const map = JSON.parse(m[2]);
        const clean = normAudioKey(key.replace(/^(vi|en)\|/, ''));
        map[key] = relativePath;
        map[clean] = relativePath;
        map['vi|' + clean] = relativePath;
        const newMapJson = JSON.stringify(map, null, 2);
        content = content.replace(m[0], m[1] + newMapJson + m[3]);
        fs.writeFileSync(mapPath, content, 'utf8');
      }
    }
  } catch (e) {
    console.warn('[AudioMap] Lỗi cập nhật audio-map.js:', e.message);
  }
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API TTS endpoint
  if (pathname === '/api/tts' && req.method === 'POST') {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const text = (data.text || '').trim();
        const voice = data.voice || DEFAULT_VOICE;

        if (!text) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Text required' }));
          return;
        }

        const fileName = getFileName(text);
        const filePath = path.join(AUDIO_DIR, fileName);
        const relUrl = `audio/${fileName}`;

        if (fs.existsSync(filePath) && fs.statSync(filePath).size > 1000) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ url: relUrl, cached: true }));
          return;
        }

        console.log(`[TTS] Đang sinh giọng đọc cho: "${text}" (Giọng ${voice})...`);
        const buf = await fetchVieneuTTS(text, voice);
        fs.writeFileSync(filePath, buf);
        updateAudioMap(`vi|${text}`, relUrl);

        console.log(`[TTS] -> Lưu thành công: ${relUrl} (${buf.length} bytes)`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ url: relUrl, cached: false }));
      } catch (err) {
        console.error('[TTS Error]', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // Serve static files
  if (pathname === '/' || pathname === '') {
    pathname = '/test-local.html';
  }

  const filePath = path.join(__dirname, pathname);

  // Prevent directory traversal
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    res.end('Forbidden');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': 'no-cache'
    });

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🎉 Local Test Server đang chạy tại:`);
  console.log(`👉 http://localhost:${PORT}/test-local.html`);
  console.log(`👉 http://localhost:${PORT}/index.html`);
  console.log(`🎙 Tích hợp API VieNeu TTS giọng: ${DEFAULT_VOICE}`);
  console.log(`======================================================\n`);
});
