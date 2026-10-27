/**
 * scripts/generate_images_krea.js
 * Tự động tạo hình ảnh minh họa cho bé hoặc tranh tô màu bằng Krea AI API.
 * 
 * Tính năng:
 * - Đọc KREA_API_KEY từ file .env
 * - Hỗ trợ 2 chế độ:
 *   1. Chế độ Tô màu (coloring): Tạo tranh viền đen nét dày, nền trắng tinh, không màu tô.
 *   2. Chế độ Minh họa (vocab): Tạo sticker hoạt hình 2D, viền nét rõ, màu sắc tươi sáng cho trẻ em.
 * - Hỗ trợ gửi lệnh bất đồng bộ tới Krea API, chờ polling job hoàn tất và tự động tải ảnh về lưu đĩa.
 * 
 * Cách dùng:
 *   node scripts/generate_images_krea.js --mode=coloring --prompt="chú thỏ dễ thương ôm củ cà rốt"
 *   node scripts/generate_images_krea.js --mode=vocab --slug="con_meo" --prompt="con mèo con dễ thương"
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT_DIR = path.resolve(__dirname, '..');

function getKreaApiKey() {
  if (process.env.KREA_API_KEY) return process.env.KREA_API_KEY.trim();
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('KREA_API_KEY=')) {
        return trimmed.substring('KREA_API_KEY='.length).trim();
      }
    }
  }
  return null;
}

function requestKrea(endpoint, method = 'GET', body = null, apiKey) {
  return new Promise((resolve, reject) => {
    const url = new URL(endpoint.startsWith('http') ? endpoint : `https://api.krea.ai${endpoint}`);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`Krea API Error ${res.statusCode}: ${data}`));
          }
        } catch (e) {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${data}`));
          }
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    https.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(destPath));
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {});
      reject(err);
    });
  });
}

async function sleep(ms) {
  return new Promise(res => setTimeout(res, ms));
}

async function generateImage({ prompt, mode = 'coloring', outputFilename, resolution = '1K' }) {
  const apiKey = getKreaApiKey();
  if (!apiKey) {
    throw new Error("Không tìm thấy KREA_API_KEY trong file .env!");
  }

  let fullPrompt = '';
  if (mode === 'coloring') {
    fullPrompt = `Kids coloring page book, ${prompt}, thick clean black outlines, bold line art, pure white background, no shading, no colors, high contrast, simple and cute for preschool kids 4-6 years old`;
  } else {
    fullPrompt = `Cute cartoon sticker, ${prompt}, adorable 2D vector character for children, vibrant colors, bold clean outlines, isolated on pure white background, high quality`;
  }

  console.log(`🎨 Đang gửi yêu cầu sinh ảnh tới Krea AI API...`);
  console.log(`Prompt: "${fullPrompt}"`);

  // Tạo job sinh ảnh Krea 3 (hoặc Krea 2 nếu Krea 3 bận)
  let job;
  try {
    job = await requestKrea('/generate/image/krea/krea-3', 'POST', {
      prompt: fullPrompt,
      thinking_mode: 'fast',
      resolution: resolution
    }, apiKey);
  } catch (err) {
    console.warn(`Thử lại với krea-2... (${err.message})`);
    job = await requestKrea('/generate/image/krea/krea-2/medium', 'POST', {
      prompt: fullPrompt
    }, apiKey);
  }

  const jobId = job.job_id || job.id;
  if (!jobId) {
    throw new Error(`Không nhận được job_id từ Krea API: ${JSON.stringify(job)}`);
  }

  console.log(`⏳ Job ID: ${jobId} — Đang chờ xử lý...`);

  // Polling kết quả job
  const maxWait = 90; // 90 giây tối đa
  let elapsed = 0;
  let resultUrl = null;

  while (elapsed < maxWait) {
    await sleep(2500);
    elapsed += 2.5;

    const statusRes = await requestKrea(`/jobs/${jobId}`, 'GET', null, apiKey);
    const status = statusRes.status;
    process.stdout.write(`... [${elapsed}s: ${status || 'running'}]\r`);

    if (status === 'completed' || status === 'succeeded') {
      const urls = (statusRes.result && statusRes.result.urls) || statusRes.urls || [];
      if (urls.length > 0) {
        resultUrl = urls[0];
        break;
      }
    } else if (status === 'failed' || status === 'error') {
      throw new Error(`Job thất bại: ${JSON.stringify(statusRes)}`);
    }
  }

  console.log("");
  if (!resultUrl) {
    throw new Error("Hết thời gian chờ Krea API trả về kết quả!");
  }

  console.log(`✔ Đã tạo ảnh thành công! URL: ${resultUrl}`);

  // Lưu file vào thư mục đích
  const targetDir = mode === 'coloring' ? path.join(ROOT_DIR, 'coloring') : path.join(ROOT_DIR, 'img', 'vocab');
  if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

  const fileName = outputFilename || `krea_${Date.now()}.png`;
  const destPath = path.join(targetDir, fileName);

  await downloadFile(resultUrl, destPath);
  console.log(`💾 Đã tải và lưu ảnh về máy tại: ${destPath} (${fs.statSync(destPath).size} bytes)`);

  return { url: resultUrl, path: destPath };
}

// Chạy trực tiếp qua CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  let prompt = "chú gấu trúc ôm cành trúc";
  let mode = "coloring";
  let outputFilename = null;

  args.forEach(arg => {
    if (arg.startsWith('--prompt=')) prompt = arg.substring('--prompt='.length);
    if (arg.startsWith('--mode=')) mode = arg.substring('--mode='.length);
    if (arg.startsWith('--out=')) outputFilename = arg.substring('--out='.length);
  });

  generateImage({ prompt, mode, outputFilename })
    .then(() => {
      console.log("🎉 Hoàn tất tác vụ!");
      process.exit(0);
    })
    .catch(err => {
      console.error("✖ Lỗi:", err.message);
      process.exit(1);
    });
}

module.exports = {
  getKreaApiKey,
  generateImage
};
