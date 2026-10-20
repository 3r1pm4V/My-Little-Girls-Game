# BÁO CÁO KIỂM TOÁN TOÀN BỘ CODEBASE (AUDIT.MD)
## Dự án: "Bé học vui" (My-Little-Girls-Game) — Chuẩn bị vào Lớp 1 (5–6 tuổi)
*Thời điểm kiểm toán: 2026-10-19 | Phạm vi: Toàn bộ mã nguồn, dữ liệu, media, network, cấu hình PWA & backend*

---

## 1. TỔNG QUAN KIẾN TRÚC & CÂY THƯ MỤC REPO

Ứng dụng là một **PWA Vanilla JavaScript thuần (Client-Side SPA)**, hoàn toàn không sử dụng framework (không React/Vue), không qua bước build/bundle (không Webpack/Vite). Ứng dụng chạy trực tiếp bằng cách mở file tĩnh qua Web Server hoặc Netlify Static Hosting.

```
D:\Nghia\Python\My-Little-Girls-Game\
├── index.html                  # 85.4 KB — File HTML chính (chứa ~780 dòng CSS inline, background base64)
├── test-local.html             # 42.6 KB — File HTML môi trường dev cục bộ (Bản sao cũ, lệch với index.html)
├── app.js                      # 220.8 KB (4,278 dòng) — Toàn bộ logic giao diện, routing, game, âm thanh
├── activities-data.js          # 133.5 KB (3,008 dòng) — 77 bài học phân tầng (Preschool, Grade 1-2, Grade 3-5)
├── activity.schema.json        # 5.5 KB — JSON Schema định nghĩa cấu trúc dữ liệu bài học
├── audio-map.js                # 609.2 KB (12,994 dòng) — Bản đồ ánh xạ từ vựng sang file MP3 local
├── data-vn.js                  # 74.3 KB (1,456 dòng) — Giáo trình Tiếng Việt: ghép âm, dấu thanh, 14 nét viết
├── stories-data.js             # 46.2 KB (935 dòng) — 24 truyện cổ tích chọn lọc có bài học đạo đức
├── stories-catalog.js          # 140.7 KB (2,960 dòng) — Danh mục 265 truyện thiếu nhi từ truyencotich.top
├── img-core.js                 # 1.44 MB — Kho SVG & Base64 inline cho nhân vật Mèo, icon UI, chữ cái
├── img-s.js                    # 1.55 MB — Lazy module: Sprite sheet & hình ảnh phụ
├── img-o.js                    # 1.29 MB — Lazy module: Sprite sheet đồ vật bổ trợ
├── audio/                      # 51.2 MB (2,955 file .mp3) — Kho âm thanh cục bộ giọng Tưởng Vy & VTV7
├── font-vn.ttf                 # 39.2 KB — Font hiển thị chữ AnjaVN
├── font-tapviet.ttf            # 134.2 KB — Font chữ nét tập viết tiểu học (HPTapViet)
├── font-tapviet-cham.ttf       # 540.3 KB — Font chữ chấm tập tô tiểu học (HPCham)
├── manifest.webmanifest        # 1.0 KB — Cấu hình PWA cài đặt HomeScreen
├── sw.js                       # 862 B — Service Worker quản lý offline cache (version: bhv-v35)
├── server.js                   # 6.8 KB (217 dòng) — Máy chủ dev Node.js cục bộ tích hợp TTS Proxy
├── netlify.toml                # 1.3 KB — Cấu hình deploy Netlify, Cache-Control & Redirects
├── netlify/functions/tts.js    # 2.5 KB (89 dòng) — Netlify Serverless Function proxy VieNeu TTS
└── test-*.js                   # 4 file test Node.js: schema, audio, dom-performance, scoring
```

### Thứ tự nạp Script trong `index.html` (Không được đảo ngược):
1. `img-core.js` → Khởi tạo từ điển đồ họa toàn cục `window.IMG`.
2. `data-vn.js` → Khởi tạo `VN_SPELL`, `VN_SPELL_WORDS`, `VN_LESSONS`, `VN_STORIES`, `VN_STROKES`.
3. `activities-data.js` → Khởi tạo cơ sở dữ liệu `ACTIVITIES_DATA` (hoặc nạp dynamic qua `import()`).
4. `audio-map.js` → Khởi tạo hàm `__normAudioKey` và `RAW_MAP` ánh xạ âm thanh đồng bộ.
5. `app.js` → Controller chính, routing, âm thanh, gamification, DOM render.
6. `sw.js` → Đăng ký Service Worker khi window load xong.

---

## 2. KIỂM TOÁN CHI TIẾT TỪNG MODULE & HÀM CHỨC NĂNG

### 2.1. `app.js` (4,278 dòng) — Trái tim của ứng dụng

`app.js` đảm nhận toàn bộ nghiệp vụ của hệ thống. Dưới đây là phân tích kiến trúc module bên trong:

#### A. Hệ thống Routing & Quản lý màn hình (`V` map, `go`, `show`, `goBack`):
* **Cơ chế Router**: Lưu lịch sử trong mảng `stk` kết hợp với `history.pushState` / `replaceState` và sự kiện `popstate`.
* **Bảng điều hướng (`V`) gồm 28 màn hình/chức năng**:
  * `home`: Màn hình chính phân theo 3 tầng tuổi (`preschool`, `grade1_2`, `grade3_5`).
  * `letL`, `letD`, `letP`: Học chữ cái bảng chữ cái tiếng Việt, xem từ vựng minh họa, trắc nghiệm nhận diện chữ.
  * `numL`, `numP`, `math10`: Học số 0–20, trắc nghiệm số, phép toán cộng trừ trong phạm vi 10 (và 20-100).
  * `countGame`: Trò chơi đếm hình chọn số lượng (tư duy số lượng cho bé mầm non).
  * `bubbleGame`: Trò chơi bong bóng chữ bay (nghe âm thanh chữ cái, bấm bóng nổ pop).
  * `match`: Trò chơi nối chữ và hình (refactored sang cơ chế kéo-thả nối dây SVG).
  * `mem`: Trò chơi lật thẻ nhớ tìm cặp giống nhau.
  * `cmp`, `cmpS`: So sánh nhiều/ít, lớn/bé/bằng (`>`, `=`, `<`).
  * `trace`: Luyện viết chữ đẹp và nét cơ bản (vẽ canvas trên font nét chấm tiểu học).
  * `readL`: Trung tâm luyện đọc: đánh vần ghép âm, bài học Cô Lan Anh, bài học vần, đoạn văn.
  * `storyL`, `storyRead`, `storyDetail`: Kho truyện cổ tích, đọc truyện tự động chạy chữ, câu hỏi đạo đức.
  * `tierActivities`, `tierActLanAnh`, `tierActVtv7`, `tierActMath`, `tierActWord`, `tierActRead`: Danh mục bài tập phân tầng chuẩn GDPT 2018.
  * `playActivity`: Trình phát bài tập đa phương tiện (hỗ trợ video YouTube, trắc nghiệm, audio hướng dẫn).
  * `gate`, `parent`, `rec`: Cổng bảo vệ phụ huynh (mã PIN), trang quản trị phụ huynh, tính năng ghi âm giọng bố mẹ.
  * `badges`: Phòng truyền thống (xem điểm sao, cấp độ bé, huy hiệu, bộ sưu tập sticker).
  * `pwaGuide`: Hướng dẫn cài đặt HomeScreen cho iPad/iPhone và Android/Huawei.

#### B. Hệ thống Âm thanh 4 bước ưu tiên (`playSafeAudio` & `say`):
Được thiết kế để giải quyết triệt để lỗi phát âm tiếng Việt và tối ưu hóa độ trễ:
* **Bước 1 (Ưu tiên tuyệt đối — Offline & Local)**: Tra cứu `RAW_MAP` trong `audio-map.js`. Nếu có file `.mp3` cục bộ trong thư mục `audio/`, phát trực tiếp bằng thẻ `new Audio()`. Bỏ qua hoàn toàn kết nối mạng.
* **Bước 2 (IndexedDB Cache)**: Mở database `bhv_audio_cache` (store `audios`). Nếu câu đã từng được sinh từ TTS API, lấy `Blob` và phát qua `URL.createObjectURL`. Quản lý bộ nhớ bằng thuật toán **LRU Eviction (ngưỡng 50 MB)**.
* **Bước 3 (API TTS Vieneu)**: Gọi `POST /api/tts` (qua Netlify Function hoặc local server) với debounce 300ms, timeout 3.5 giây. Khi nhận dữ liệu âm thanh, tự động ghi vào IndexedDB và cập nhật `window.AUDIO_MAP`.
* **Bước 4 (Fallback cuối cùng)**: Nếu mất mạng hoặc API lỗi, tự động chuyển sang Web Speech API (`window.speechSynthesis`) với `vi-VN` giọng máy chuẩn.
* **Bảo vệ Autoplay**: Bắt sự kiện `NotAllowedError` của trình duyệt trên thiết bị di động, lưu tạm vào `pendingAutoplayAudio` và phát ngay khi bé chạm màn hình lần đầu (`pointerdown`/`keydown`).

#### C. Hệ thống Động lực học & Gamification:
* **Điểm sao (`stars`)**: Tăng sau mỗi hoạt động đúng (`+1`, `+2`, `+3` sao), không bao giờ bị trừ điểm.
* **Cấp độ (`LEVELS`)**: 5 cấp bậc tiến hóa từ *Bé Mầm Non* (0★) → *Bé Khám Phá* (15★) → *Bé Thông Thái* (35★) → *Bé Siêu Đẳng* (70★) → *Vô Địch Học Vui* (120★).
* **Huy hiệu (`BADGES`)**: 12 huy hiệu với điều kiện kích hoạt tự động (`checkBadges()`), có hiệu ứng chúc mừng (pháo hoa confetti canvas + âm thanh fanfare).
* **Bộ sưu tập Sticker (`STICKERS`)**: 8 sticker dễ thương thưởng cho bé theo tiến độ.
* **Chuỗi ngày học (`kids_streak_count`)**: Đếm số ngày học liên tiếp dựa trên `getLocalDateStr()`.

#### D. Khu vực phụ huynh & An toàn thời gian:
* **Cổng phụ huynh (`gate`)**: Yêu cầu nhập PIN (mặc định `'1234'`) hoặc giải phép tính ngẫu nhiên.
* **Giới hạn thời gian học (`daily_limit_minutes`)**: Cài đặt 15, 30, 45, 60 phút hoặc Không giới hạn. Khi hết giờ, hiển thị modal nhắc nhở bé nghỉ ngơi (`timeLimitModal`).
* **Khuyến nghị kỹ năng yếu (`getWeakSkillRecommendation`)**: Phân tích danh sách lỗi sai trong `ST.w` để gợi ý bài tập cần ôn thêm.

---

### 2.2. `index.html` và `test-local.html`

* **`index.html` (85.4 KB)**:
  * Chứa **toàn bộ CSS giao diện inline** bên trong thẻ `<style>` (từ dòng 24 đến 823, chiếm hơn 90% dung lượng file).
  * Chứa **1 ảnh nền base64 WebP cỡ lớn inline** ở dòng 42 (`body::before`).
  * Header hiện tại có **7 nút điều khiển**: Nút Home, Nút Quay lại, Nút Streak 🔥, Nút Huy hiệu 🏆, Nút Đổi ngôn ngữ 🇻🇳/🇬🇧, Khung điểm sao ⭐, Nút Âm thanh 🔊, Nút Tốc độ đọc 🐢/🐇.
  * Có nhúng Google Fonts trực tuyến: `https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;800&display=swap`.
* **Sự bất đồng bộ giữa `test-local.html` và `index.html`**:
  * `test-local.html` (301 dòng) là một bản sao cũ, **thiếu hoàn toàn** các style mới: Drag-to-connect SVG line, Bong bóng chữ bay, Modal Mẹo phụ huynh, Modal pháo hoa chúc mừng...
  * Khi chạy `server.js` local, mặc định truy cập `/` lại nạp `test-local.html` khiến giao diện thử nghiệm khác biệt với bản chạy trên Netlify (`index.html`).

---

### 2.3. `sw.js` (Service Worker) & Khả năng Offline

* **Version hiện tại**: `bhv-v35`.
* **Danh sách Precache tĩnh (`CORE`)**:
  ```javascript
  ["./", "index.html", "app.js", "data-vn.js", "audio-map.js", "img-core.js", 
   "font-vn.ttf", "font-tapviet.ttf", "font-tapviet-cham.ttf", 
   "manifest.webmanifest", "icon-192.png", "icon-512.png"]
  ```
* **Chiến lược Caching**:
  * Request GET: Cache First, nếu không có thì fetch từ mạng và tự động lưu vào cache (`caches.open(C).then(c=>c.put(r,cp))`).
  * Chế độ điều hướng (`mode === "navigate"`): Nếu mất mạng, fallback về `index.html`.
* **Hạn chế phát hiện**:
  * `activities-data.js`, `stories-data.js`, `stories-catalog.js`, `img-s.js`, `img-o.js` không nằm trong danh sách `CORE`. Người dùng lần đầu mở app nếu ngắt mạng ngay lập tức trước khi tải các file này sẽ bị lỗi thiếu bài học và truyện.
  * Font "Baloo 2" từ Google Fonts không được Service Worker precache.

---

### 2.4. `server.js` & `netlify/functions/tts.js` (Backend & Proxy)

* **Nhiệm vụ**: Đóng vai trò Proxy trung gian chuyển tiếp văn bản cần đọc từ client đến API bên ngoài `https://api.vieneu.io/api/v1/audio/speech` (Model: `vieneu-v4`, Giọng: `Tưởng Vy`).
* **Bảo mật & Quyền riêng tư của bé**:
  * **Dữ liệu gửi ra ngoài**: CHỈ gửi chuỗi văn bản cần đọc (`text`) và tên giọng đọc (`voice`). **HOÀN TOÀN KHÔNG** gửi bất kỳ thông tin nào của bé (tên, tuổi, điểm số, lịch sử học tập, thiết bị).
  * **LỖ HỔNG BẢO MẬT PHÁT HIỆN**: Trong cả `server.js` (dòng 10) và `netlify/functions/tts.js` (dòng 3) đều có **hardcode API Key dự phòng**:
    `'[REDACTED-KEY]'`.
    Điều này vi phạm Điều cấm số 3 trong `AGENTS.md` ("Không hardcode secret/API key vào repo").

---

### 2.5. `data-vn.js` (Giáo trình Tiếng Việt Tiền tiểu học & Lớp 1)

File dữ liệu chất lượng cao, chuẩn mực ngữ âm tiếng Việt:
* **`VN_SPELL_WORDS`**: Hơn 500 từ vựng thực tế ghép từ phụ âm + nguyên âm + 6 dấu thanh (đã lọc chuẩn chính tả và phù hợp trẻ em).
* **`VN_SPELL`**:
  * 27 phụ âm (16 phụ âm đơn: b, c, d, đ, g, h, k, l, m, n, p, r, s, t, v, x; 11 phụ âm ghép: ch, gh, gi, kh, nh, ng, ngh, ph, qu, th, tr).
  * 9 nguyên âm mở (a, e, ê, i, o, ô, ơ, u, ư — loại bỏ ă, â vì là nguyên âm ngắn bắt buộc có âm cuối).
  * 6 thanh điệu chuẩn: Không dấu, Huyền, Sắc, Hỏi, Ngã, Nặng.
  * Hàm `valid(c, v)`: Kiểm tra luật chính tả ghép âm (ví dụ: k/gh/ngh chỉ đi với e/ê/i; c/g/ng không đi với e/ê/i).
* **`VN_STROKES`**: 14 nét viết cơ bản trong chương trình Tiền tiểu học (nét thẳng đứng, nét ngang, xiên phải, xiên trái, móc ngược, móc xuôi, móc hai đầu, cong hở phải, cong hở trái, cong kín, khuyết trên, khuyết dưới, thắt đầu, thắt giữa).

---

### 2.6. `activities-data.js` & `activity.schema.json`

* **Cơ sở dữ liệu gồm 77 bài học phân tầng**:
  * **Preschool (Mầm non - 3–5 tuổi)**: 12 bài học (làm quen mặt chữ, đếm số, nhận biết con vật, kỹ năng sống).
  * **Grade 1-2 (Lớp 1–2 - 6–8 tuổi)**: 43 bài học:
    * 25 bài học chữ cái & vần VTV7 (ABC Vui từng giờ).
    * 9 bài học chữ cái & đánh vần Cô Lan Anh (A, Ă, Â, B, C, D/Đ, AI/AY).
    * Các bài trắc nghiệm Toán cộng trừ phạm vi 20–100, so sánh, tiếng Anh.
  * **Grade 3-5 (Lớp 3–5 - 8–11 tuổi)**: 22 bài học (Toán nhân chia, chuỗi số, vòng đời bướm, khoa học vũ trụ).
* **Hạn chế của Schema hiện tại (`activity.schema.json`)**:
  * Schema v1 chỉ mô tả cấu trúc trắc nghiệm chuẩn (`options`, `correctAnswer`).
  * Trong thực tế, các trò chơi mới (Kéo-nối SVG, Bắt bóng chữ, Luyện viết nét chấm) đang chạy theo cấu trúc hàm riêng trong `app.js` mà chưa được chuẩn hóa vào trường `template` của schema.

---

## 3. KIỂM TOÁN DỮ LIỆU CỤC BỘ (LOCALSTORAGE & INDEXEDDB)

### 3.1. Danh mục 24 Khóa `localStorage` Đang Được Sử Dụng

| Khóa (Key) | Mục đích sử dụng | Kiểu dữ liệu |
|---|---|---|
| `stars` | Tổng số ngôi sao thưởng tích lũy của bé | Số nguyên (`number`) |
| `st` | Thống kê học tập: tổng câu đúng (`n`), đúng lần đầu (`f`), số lần sai theo bài (`w`), số bài theo môn (`letCount`, `mathCount`, `storyCount`, `traceCount`) | JSON string |
| `lvl` | Cấp độ khó hiện tại (1: Mầm non, 2: Lớp 1-2, 3: Lớp 3-5) | Số nguyên (1, 2, 3) |
| `ageTier` | Tầng tuổi được chọn (`preschool`, `grade1_2`, `grade3_5`) | String |
| `lang` | Ngôn ngữ giao diện (`vi`, `en`, `both`) | String |
| `rate2` | Tốc độ giọng đọc của máy (0.4: rùa rùa, 0.6: rùa, 0.85: thỏ) | Số thực |
| `sound_master` | Trạng thái bật/tắt toàn bộ âm thanh (1: bật, 0: tắt) | String ("1" / "0") |
| `sfx` | Âm thanh hiệu ứng Web Audio API | String ("1" / "0") |
| `rm` | Giảm chuyển động (Reduced Motion: "auto", "1", "0") | String |
| `badges` | Danh sách ID các huy hiệu đã mở khóa | JSON Array String |
| `kids_streak_count` | Số ngày học liên tiếp hiện tại | Số nguyên |
| `kids_streak_last_date` | Ngày học gần nhất (`YYYY-MM-DD`) | String |
| `kid_name` | Tên của bé hiển thị trong hồ sơ phụ huynh | String |
| `kid_avatar` | Avatar chú mèo hoặc biểu tượng của bé | String |
| `daily_limit_minutes` | Giới hạn thời gian học mỗi ngày (0 = không giới hạn) | Số nguyên (phút) |
| `parent_pin` | Mã PIN bảo vệ khu vực phụ huynh (mặc định "1234") | String |
| `study_sec_<date>` | Số giây đã học trong ngày cụ thể | Số nguyên |
| `kids_confetti_disabled` | Tắt hiệu ứng pháo hoa confetti khi hoàn thành | String ("1" / "0") |
| `kids_count_game_last` | Chỉ số câu hỏi gần nhất của trò chơi đếm hình | Số nguyên |
| `bhv_events` | Nhật ký 60 sự kiện học tập gần nhất (Analytics cục bộ) | JSON Array String |
| `bhv_act_stats` | Thống kê tỷ lệ hoàn thành/bỏ dở theo bài học | JSON Object String |
| `bhv_errors` | Nhật ký 10 lỗi JavaScript gần nhất | JSON Array String |
| `auto`, `ad`, `trm` | Các cờ cấu hình âm thanh/giao diện cũ còn lưu lại | String |

### 3.2. PHÁT HIỆN LỖI NGHIÊM TRỌNG: MẤT TIẾN ĐỘ KHI SAO LƯU / PHỤC HỒI (Task P5-02)

Tại dòng 4269 của `app.js`, hàm xuất/nhập dữ liệu tiến độ định nghĩa mảng `LSK` như sau:
```javascript
const LSK = ["stars", "st", "lvl", "lang", "rate2", "auto", "ad", "sfx", "rm", "trm", "sound_master"];
```
> [!CAUTION]
> **Lỗi mất dữ liệu khi đổi máy**: Mảng `LSK` chỉ chứa 11 key cổ xưa! Khi phụ huynh bấm **"Xuất dữ liệu"** để chuyển sang iPad hoặc máy khác:
> - **KHÔNG sao lưu**: `badges` (huy hiệu bé đạt được), `kids_streak_count` & `kids_streak_last_date` (chuỗi ngày học), `kid_name` & `kid_avatar` (hồ sơ của con), `ageTier` (lớp học), `daily_limit_minutes` & `parent_pin` (cài đặt phụ huynh).
> - Khi nhập lại, toàn bộ huy hiệu, chuỗi ngày học và hồ sơ của bé bị biến mất! Cần phải cập nhật `LSK` ngay ở Phase 5.

---

## 4. KIỂM TOÁN KẾT NỐI MẠNG & AN TOÀN TRẺ EM

| Địa chỉ URL / Domain | File sử dụng | Mục đích | Đánh giá an toàn & Đề xuất |
|---|---|---|---|
| `https://fonts.googleapis.com`<br>`https://fonts.gstatic.com` | `index.html`<br>`test-local.html` | Tải font chữ "Baloo 2" | **RỦI RO**: Gây phụ thuộc mạng ngoài. Khi tắt mạng, app có thể bị giật hoặc lỗi font. **Đề xuất (P2-03)**: Tải file `.ttf`/`.woff2` về repo và nạp local qua `@font-face`. |
| `https://img.youtube.com/vi/...`<br>`https://www.youtube-nocookie.com` | `app.js`<br>`activities-data.js` | Hiển thị thumbnail & nhúng video bài học VTV7/Cô Lan Anh | **ĐẠT YÊU CẦU AN TOÀN**: Đã sử dụng `youtube-nocookie.com` với `rel=0` ngăn đề xuất video ngoài. Tuy nhiên vẫn cần mạng để xem video. |
| `https://api.vieneu.io/api/v1/audio/speech` | `server.js`<br>`netlify/functions/tts.js` | Sinh giọng đọc AI Tưởng Vy cho từ vựng mới | **AN TOÀN RIÊNG TƯ**: Chỉ gửi văn bản cần đọc, không gửi thông tin bé. Cần loại bỏ hardcode API key. |
| `https://truyencotich.top/audio/stream/...` | `stories-catalog.js` | Stream audio kể chuyện cổ tích | **RỦI RO OFFLINE**: Các câu chuyện trong catalog phụ thuộc vào máy chủ `truyencotich.top`. Khi không có mạng, audio không phát được. 24 câu chuyện chính trong `stories-data.js` hoạt động tốt với giọng TTS local. |

---

## 5. XÁC MINH CÁC MỤC TÍNH NĂNG `[~]` TỪ `TODO.MD`

Toàn bộ 9 tính năng đánh dấu `[~]` ở Phần A của `todo.md` đã được kiểm chứng trực tiếp trong mã nguồn:

| # | Tính năng trong `todo.md` | Kết quả xác minh mã nguồn | Trạng thái cập nhật |
|---|---|---|:---:|
| 1 | 3 tầng tuổi: `preschool`, `grade1_2`, `grade3_5` | Đã có `AGE_TIERS`, tab chọn tầng, bộ lọc theo lứa tuổi hoạt động hoàn chỉnh. | `[x]` |
| 2 | Thẻ hoạt động preschool có ảnh + chế độ "xem rồi học" + tiến trình | Đã có class `.act-card-pre` với ảnh thumbnail lớn, nút Play ▶, thanh tiến trình bước trong `playActivity`. | `[x]` |
| 3 | Mẫu bài: trắc nghiệm, điền chỗ trống, nối cặp, sắp xếp, kéo-thả nối dây | Trắc nghiệm và Video Quiz hoạt động mượt mà. Trò chơi ghép nối đã được nâng cấp thành **kéo-thả nối dây SVG bezier curve** hỗ trợ Touch Event. | `[x]` |
| 4 | Trò chơi: đếm hình chọn số, bắt bóng chữ, tô chữ, đánh vần, truyện | Đầy đủ 6 trò chơi: `countGame`, `bubbleGame` (âm thanh nổ pop + xẹp bóng), `trace` (canvas vẽ trên font chấm HPCham), `letL`/`letP`, `readL`, `storyL`. | `[x]` |
| 5 | Sao, huy hiệu, bộ sưu tập sticker, chuỗi ngày (streak) | Đã có 12 huy hiệu (`BADGES`), 8 sticker (`STICKERS`), hệ thống tính streak theo ngày thực tế `kids_streak_count`. | `[x]` |
| 6 | Khu vực phụ huynh: PIN, hồ sơ bé, tiến độ, gợi ý bài tiếp theo | Màn hình `gate` có bàn phím số nhập PIN hoặc giải toán; màn hình `parent` có phân tích lỗi sai và gợi ý bài tập yếu. | `[x]` |
| 7 | **Xác minh Task P0-06**: Giới hạn thời gian chơi + cổng PIN | **ĐÃ XÁC MINH**: Hàm `window.__unlockTimeLimit()` tại dòng 3293 của `app.js` **CÓ BƯỚC XÁC THỰC PIN** bằng `prompt()`. Nếu đúng PIN (mặc định `'1234'`), mở thêm 15 phút. Tuy nhiên dùng `prompt()` trên tablet chưa đẹp mắt. | `[x]` |
| 8 | Hỗ trợ giảm chuyển động, focus-visible, tắt tiếng, chỉnh tốc độ đọc | Đã có `rmOn()`, `togRM()`, `toggleSoundMaster()`, nút chỉnh tốc độ đọc `RATE` (0.4 / 0.6 / 0.85). | `[x]` |
| 9 | Song ngữ Việt/Anh (nút đổi ngôn ngữ) | Đã có `toggleLang()`, toàn bộ giao diện hỗ trợ `T(vi, en)`. | `[x]` |

---

## 6. KẾT QUẢ CHẠY TOÀN BỘ TEST SUITE (Task P0-04)

Tất cả 4 kịch bản kiểm thử tự động của hệ thống đều đạt **100% PASS**:

```bash
# 1. Kiểm tra 77 bài học và JSON Schema GDPT 2018:
node test-activity-schema.js
# KẾT QUẢ: PASS (10/10 Video Quiz, 5/5 Math Lớp 3, 5/5 Khoa học, 5/5 Cô Lan Anh, 25/25 VTV7 Lớp 1)

# 2. Kiểm tra Hệ thống Âm thanh 4 bước, Caching & LRU Eviction:
node test-audio-system.js
# KẾT QUẢ: PASS (Map Local -> IDB -> API -> Web Speech Fallback, Debounce, 50MB LRU Cache)

# 3. Kiểm tra Tối ưu DOM & Hiệu năng:
node test-dom-performance.js
# KẾT QUẢ: PASS (CSS contain: content, Debounce/Throttle timing, Virtualization list)

# 4. Kiểm tra Chấm điểm, Sao & Abandonment Tracking:
node test-scoring.js
# KẾT QUẢ: PASS (Tính sao, tỷ lệ chính xác, streak ngày, đếm bài, bỏ dở)
```

---

## 7. KHOẢNG CÁCH SO VỚI MỤC TIÊU "BÉ 5–6 TUỔI CHUẨN BỊ VÀO LỚP 1"

Đối chiếu với các nguyên tắc trong `PLAN.md` và `AGENTS.md`:

1. **Quá tải nhận thức trên Trang chủ (Home)**:
   * Hiện tại trang chủ hiển thị bộ chọn 3 tầng tuổi (`preschool`, `grade1_2`, `grade3_5`) và hàng loạt thẻ bài học. Bé 5–6 tuổi chưa biết đọc dễ bị rối khi bấm nhầm sang tầng Lớp 3–5.
   * **Cần sửa (P1-01, P1-04)**: Đặt `preschool` làm mặc định, ẩn 2 tầng trên vào Cài đặt phụ huynh. Home cho bé chỉ cần 3 nút siêu to: **Học hôm nay · Chơi tự do · Sticker của bé**.
2. **Header quá nhiều nút bấm cho bé nhỏ**:
   * Header hiện có 7 nút (Home, Back, Streak, Badge, Lang, Stars, Sound, Rate). Bé chưa biết đọc rất dễ bấm nhầm làm đổi tốc độ đọc hoặc chuyển sang tiếng Anh.
   * **Cần sửa (P1-03)**: Header của bé chỉ giữ lại: **Nút Home + Điểm sao ⭐ + Nút Huy hiệu 🏆**. Các nút cài đặt chuyển vào khu phụ huynh.
3. **Chưa có Lộ trình học tuần tự (Learning Journey)**:
   * Hiện các bài học nằm ở dạng danh sách phẳng. Bé chưa có cảm giác "chinh phục từng chặng" (Chặng 0: Làm quen nét → Chặng 1: Số 1–10 + nguyên âm → Chặng 2: Phụ âm + dấu thanh → Chặng 3: Số 11–20 + ghép từ...).
   * **Cần bổ sung (P3-08, Phase 4)**: Xây dựng bản đồ hành trình mở khóa dần theo quy tắc Mastery.
4. **CSS & Base64 inline quá nặng**:
   * `index.html` nặng 85.4 KB với gần 800 dòng CSS inline và ảnh nền base64 làm chậm tốc độ parse ban đầu.
   * **Cần tách (P2-01, P2-02)**: Đưa CSS ra file `styles.css` riêng, tách ảnh nền thành `bg.webp`.

---

## 8. BẢNG TỔNG HỢP VẤN ĐỀ & KẾ HOẠCH HÀNH ĐỘNG TIẾP THEO

| # | Vấn đề phát hiện | Mức độ | File liên quan | Đề xuất xử lý | Task ID |
|---|---|:---:|---|---|:---:|
| 1 | Hardcode VieNeu API Key trong mã nguồn | **Khẩn cấp** | `server.js`<br>`netlify/functions/tts.js` | Đưa về đọc biến môi trường `process.env.VIENEU_API_KEY`, không để key trần trong file git | P0-08 |
| 2 | Mất dữ liệu huy hiệu, streak, avatar khi xuất/nhập sao lưu | **Cao** | `app.js` (dòng 4269) | Bổ sung đầy đủ các key vào mảng `LSK`: `badges`, `kids_streak_*`, `kid_*`, `ageTier`, `daily_limit_*` | P5-02 |
| 3 | `test-local.html` bị lệch pha và lỗi thời so với `index.html` | **Trung bình** | `test-local.html`<br>`server.js` | Cập nhật `server.js` mặc định phục vụ `index.html`; đồng bộ lại `test-local.html` | P0-03 |
| 4 | Font "Baloo 2" nạp từ Google Fonts gây phụ thuộc online | **Cao** | `index.html` | Tải font về repo, thêm vào `@font-face` local và precache trong `sw.js` | P2-03 |
| 5 | Giao diện Home và Header quá tải đối với bé 5–6 tuổi | **Cao** | `index.html`<br>`app.js` | Tinh gọn header còn 3 nút; Trang chủ 3 nút lớn; mặc định `preschool` | P1-01 -> P1-04 |
| 6 | CSS inline và Base64 nặng nề trong `index.html` | **Trung bình** | `index.html` | Tách ra `styles.css` và `bg.webp` độc lập để trình duyệt cache tối ưu | P2-01, P2-02 |
| 7 | Thiếu precache các file dữ liệu bài học trong `sw.js` | **Trung bình** | `sw.js` | Thêm `activities-data.js`, `stories-data.js` vào mảng `CORE` của `sw.js` | P2-07 |

---
*Báo cáo được hoàn thành tự động bởi Antigravity Agent theo chuẩn AGENTS.md và PLAN.md.*
