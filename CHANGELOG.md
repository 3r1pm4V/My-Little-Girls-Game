# CHANGELOG.md — Lịch sử thay đổi "Bé học vui"

Mọi thay đổi trong dự án được ghi nhận tại đây theo nguyên tắc tại `AGENTS.md`.

---

## [Unreleased]

### 2026-10-20
- **feat(P1-09, P1-10)**:
  - **P1-09 (Chế độ chạm thay thế kéo-thả nối dây & bắt bóng nhẹ nhàng)**:
    - Bổ sung cơ chế Chạm-chọn (Tap-to-Match) trong trò chơi ghép thẻ nối dây (`match()`): Bé chỉ cần chạm thẻ chữ cái bên trái (phát âm và gắn hiệu ứng chọn `.tap-selected` phát sáng), sau đó chạm thẻ hình ảnh bên phải để tự động nối dây và kiểm tra kết quả. Cho phép chọn theo chiều ngược lại hoặc chạm đổi thẻ cùng bên tự nhiên. Cơ chế kéo-thả (Drag-to-Connect) vẫn hoạt động song song mượt mà.
    - Cập nhật hướng dẫn âm thanh và giao diện: "Bé có thể chạm vào chữ rồi chạm vào hình, hoặc kéo dây để nối nhé!".
    - Bổ sung Chế độ bắt bóng chữ nhẹ nhàng (`isGentleMode`) trong trò chơi `bubbleGame`: Tốc độ mặc định giảm xuống mức bay chậm thư thả (~0.65x - 0.85x), không tăng tốc đột ngột, vùng chạm bóng mở rộng thoải mái; bổ sung nút chuyển đổi tốc độ `🐢 Bay chậm` / `🐇 Bay nhanh` trên thanh mục tiêu.
  - **P1-10 (Màn hình nghỉ ngơi nhẹ nhàng & ấm áp khi hết thời gian)**:
    - Thay thế hoàn toàn emoji `😴` trong `#timeLimitModal` bằng biểu tượng mầm cây `🌱` xinh xắn, xóa bỏ cảm giác gián đoạn hay sợ hãi cho trẻ nhỏ.
    - Soạn thảo lại thông điệp ấm áp, khích lệ nỗ lực của bé: "Bé học giỏi lắm, cùng nghỉ ngơi nhé! 🌟 Hôm nay bé đã rất chăm chỉ! Mình cùng thư giãn đôi mắt xinh và vui đùa một lát nhé. Hẹn gặp lại bé ngày mai! 🎈".
    - Bổ sung nút phát giọng đọc dặn dò `🔊 Nghe bạn mèo dặn` cho các bé chưa biết đọc chữ; tự động đọc lời chúc và hiển thị bạn mèo vẫy tay vui vẻ khi kích hoạt giới hạn giờ học; duy trì nút mở thêm 15 phút bảo vệ bằng mã PIN phụ huynh (`__unlockTimeLimit()`).
  - Tạo bộ test tự động `test-p1-touch-rest.js` và xác minh 100% thành công trên toàn bộ 10/10 bộ test.
- **feat(P1-07, P1-08)**:
  - **P1-07 (Vùng chạm ≥ 64px & Khoảng cách ≥ 12px)**:
    - Chuẩn hóa toàn diện CSS cho mọi phần tử tương tác: `button`, `.card`, `.opt`, `.chip`, `.pill`, `.syl-btn`, `.word-btn`, `.rhyme-chip`, `.story-item`, `.k-bc-btn`, `.ob`, `.k-bc-back`, `.trace-sample-card`, `.trace-picker button`, `.nav`, `.act-opt-btn`, `.cg-opt-btn`, `.badge-btn`, `.stage-tab-btn`, `.stars`, `#hb`, `#backBtn` đều đạt `min-height ≥ 64px`, `min-width ≥ 64px`, `touch-action: manipulation`.
    - Điều chỉnh khoảng cách layout và lưới lựa chọn đạt chuẩn `gap ≥ 12px` trên `.k-bc`, `.k-bc-action`, `.cards`, `.chips`, `.lgrid`, `.syl-grid`, `.cg-opts`, `.stage-tabs-wrap`, `.opts.cmp`, `.badge-grid`.
    - Tối ưu hóa chế độ màn hình hẹp 360px (`@media (max-width: 600px)`): nút quay lại `#backBtn`, huy hiệu `.badge-btn`, điểm sao `.stars`, breadcrumbs `.k-bc-back`/`.k-bc-btn` duy trì kích thước tối thiểu 64px và padding rộng rãi, không bị dính nút hay chạm nhầm.
  - **P1-08 (Chuyển Gợi ý cho bố mẹ vào khu phụ huynh)**:
    - Loại bỏ hoàn toàn nút nổi `.parent-tip-corner-btn` khỏi màn hình học tập và làm bài của bé (`playActivity` ở cả chế độ xem video và làm bài tập), tránh tuyệt đối nguy cơ che khuất chú mèo và vùng lựa chọn câu hỏi.
    - Bổ sung CSS `display: none !important` cho `.parent-tip-corner-btn` nhằm vô hiệu hóa nút nổi ở mọi ngữ cảnh.
    - Xây dựng chuyên mục "Mẹo đồng hành cùng bé ở nhà (Parent Guidance)" trong Bảng điều khiển phụ huynh (`parent()`): bao gồm các chỉ dẫn thực tế về nhận diện âm vần, đếm số ngoài đời thực, khen ngợi nỗ lực, thời lượng học vàng 10–15 phút, kèm danh sách tổng hợp mẹo sư phạm từ bài học (Cô Lan Anh).
  - Tạo bộ test tự động `test-p1-touch-tips.js` và xác minh 100% thành công trên toàn bộ 9/9 bộ test.
- **feat(P1-05, P1-06)**:
  - Tự động đọc to đề bài / câu hỏi khi vào mọi màn hình bài học và trò chơi (`playActivity`, chế độ xem video `isWatchMode`, `countGame`, `bubbleGame`, `trace`, `match`, `mem`, `quiz`, `letL`, `numL`, `readL`).
  - Trang bị nút 🔊 nghe lại trực quan trên tiêu đề hoặc khu vực câu hỏi của tất cả các màn hình hoạt động, cho phép bé chạm nghe lại không giới hạn.
  - Tôn trọng chính sách autoplay của trình duyệt: giữ hàng đợi âm thanh `pendingAutoplayAudio` và phát lại ngay khi có tương tác người dùng (`pointerdown`, `keydown`) mà không bao giờ gây lỗi uncaught.
  - Chuyển đổi cơ chế Streak "nhẹ nhàng": Hiển thị "Bé đã học N ngày", tích lũy tự nhiên theo từng ngày bé tham gia học, tuyệt đối không reset về 1 khi bé nghỉ ngơi, xóa bỏ hoàn toàn cảm giác mất chuỗi hay thông báo phạt.
  - Đảm bảo tương thích ngược 100%: Dữ liệu streak cũ (key `streak`) vẫn được nạp đầy đủ vào hệ thống mới.
  - Cập nhật bộ unit test `test-scoring.js` và tạo bộ test chuyên biệt `test-p1-streak-audio.js` (100% PASS, tổng cộng 8/8 bộ test đều xanh).

### 2026-10-19
- **feat(P1-04)**:
  - Thiết kế lại màn hình Trang chủ (Home) cho bé với 3 nút lớn trực quan, toàn icon:
    1. 🎒 **Học hôm nay** (`go('todayLearning')`): Mở danh sách bài học theo chặng hiện tại (Chặng 0 đến Chặng 5).
    2. 🎮 **Chơi tự do** (`go('games')`): Tổng hợp 11 trò chơi học tập và tương tác (đếm hình, bắt bóng chữ, bảng chữ cái, số đếm, vẽ nét, đọc truyện, v.v.).
    3. 🏆 **Sticker của bé** (`showBadges('stickers')`): Mở thẳng bộ sưu tập sticker và huy hiệu của bé.
  - Tích hợp giọng đọc tự động (`speakKidBtn`) khi bé chạm giữ / hover (`pointerdown`, `mouseenter`) vào các nút, cùng giọng đọc tự động chào đón khi vào Home.
  - Xây dựng màn hình "Học hôm nay" (`todayLearning(stage)`): Phân loại bài học theo 6 chặng (0–5), hỗ trợ thanh tab chuyển chặng trực quan, liên kết với `getActivitiesByStage()`.
  - Đáp ứng nghiêm ngặt tiêu chuẩn vùng chạm ngón tay trẻ nhỏ: `min-height ≥ 84px` (≥ 64px), `min-width ≥ 64px`, khoảng cách `gap = 16px` (≥ 12px) trên cả mobile 360px và tablet.
  - Bổ sung `todayLearning` vào Router `V`, duy trì tương thích 100% với phụ huynh và các màn hình khác.
  - Tạo bộ test tự động `test-p1-home.js` đạt 100% PASS (tổng cộng 7/7 bộ test đều xanh).
- **feat(P1-03)**:
  - Đơn giản hóa header cho bé: chỉ giữ nút Trang chủ (`#hb`), Quay lại (`#backBtn`), Điểm sao (`#stars`), Bộ sưu tập huy hiệu (`#badgeBtn`).
  - Chuyển toàn bộ điều khiển kỹ thuật và cài đặt vào Bảng điều khiển phụ huynh (`parent()`): Nút chuyển ngôn ngữ (`setLang()`), tùy chỉnh tốc độ đọc TTS (Chậm 0.4× / Vừa 0.6× / Chuẩn 0.85×), bật/tắt âm thanh toàn cục & hiệu ứng âm thanh (`toggleSoundMaster()`, `togSfx()`), và thẻ thông tin chuỗi ngày học (`streak`).
  - Thêm hàm hỗ trợ `setSpeechRate(rate)` và bọc an toàn tránh lỗi `spEl` / `hbEl` khi tải trang.
  - Đảm bảo hiển thị hoàn hảo và không bị tràn trên màn hình hẹp 360px và tablet xoay ngang.
  - Tạo bộ test tự động `test-p1-header.js` xác minh cấu trúc header, tính năng di dời và layout đáp ứng (100% PASS).
- **feat(P1-01, P1-02)**:
  - Cập nhật `<title>`, `<meta name="description">` trong `index.html` và `manifest.webmanifest` sang "5–6 tuổi, chuẩn bị vào lớp 1" (loại bỏ hoàn toàn "4–11 tuổi").
  - Đặt `preschool` (lvl = 1) làm mặc định cho người dùng mới; cập nhật `AGE_TIERS.preschool` thành "5–6 tuổi".
  - Giao diện bé chỉ hiển thị 53 bài học có `stage: 0–5` (bất kể `ageTier`), ẩn hoàn toàn 24 bài lớp 3–5 và bài toán quá khó.
  - Ẩn bộ chọn 3 tầng tuổi khỏi giao diện bé; thêm công tắc bật/tắt trong Bảng điều khiển phụ huynh (`show_age_tiers`, mặc định tắt).
  - Đảm bảo tương thích ngược 100%: Dữ liệu `localStorage` cũ (`lvl`, `ageTier`, `stars`, `badges`, `streak`) không bị mất; mở app mới hoặc app cũ đều không lỗi.
  - Tạo bộ test tự động toàn diện `test-p1-journey.js` (100% PASS).
- **feat(P1-00)**:
  - Bổ sung trường tùy chọn `stage` (0–5, null) vào `activity.schema.json` và `activities-data.js` (hoàn toàn tương thích ngược).
  - Gán `stage` chuẩn hóa cho tất cả 77 bài học theo `docs/stage-map.md`.
  - Giữ `ageTier: "grade1_2"` cho các bài Cô Lan Anh và VTV7, gán `stage: 1` và `stage: 2` để mở đường cho chế độ lộ trình 5–6 tuổi mà không cần rollback.
  - Thêm và export các hàm helper: `getActivitiesByStage(stage)` và `getPreschoolJourneyActivities()`.
  - Cập nhật hàm `validateActivity(act)` kiểm tra trường `stage` hợp lệ (0–5 hoặc null).
  - Bổ sung TEST 5 trong `test-activity-schema.js` kiểm tra toàn bộ 53 bài phục vụ bé 5–6 tuổi đều có `stage` hợp lệ và kiểm tra negative tests khi thiếu/sai `stage`.
- **docs(P1-00)**:
  - Phân tích và tạo `docs/stage-map.md`: Lập bảng phân bổ 77 bài học và các mini-game theo 6 chặng (0–5), đánh giá khoảng trống và đề xuất giải pháp tương thích ngược cho trường `stage`.
- **sec(P0-08)**:
  - Thu hồi và xóa hoàn toàn hardcoded VieNeu API Key khỏi `server.js`, `netlify/functions/tts.js`, `generate_spelling_audio.js`.
  - Thay thế `audit.md` và `docs/audit.md` bằng bản đã xóa secret (`audit.redacted.md`).
  - Thêm `.env` và `.env.*` vào `.gitignore`, tạo `.env.example`.
  - Bổ sung luật cấm ghi secret vào bất kỳ file nào trong `AGENTS.md`.
- **docs(P0-01, P0-03)**:
  - Đưa bộ tài liệu `PLAN.md`, `AGENTS.md`, `todo.md` vào thư mục gốc repository.
  - Tạo `CHANGELOG.md`, `ASSETS.md`.
  - Hoàn thành kiểm toán toàn bộ codebase và lập báo cáo chi tiết tại `audit.md` và `docs/audit.md`.
  - Xác minh thành công 100% các mục tính năng `[~]` và chạy 4 bộ test tự động đạt 100% PASS.
- **feat(grade1)**:
  - Chuyển toàn bộ 5 bài học chữ cái và đánh vần Cô Lan Anh (A, Ă, Â, B, C) từ Mầm non sang Lớp 1–2.
  - Cập nhật thẻ trang chủ và bộ lọc Cô Lan Anh trong danh mục bài tập Lớp 1–2.
