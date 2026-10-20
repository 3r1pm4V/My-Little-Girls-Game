# AGENTS.md — My-Little-Girls-Game ("Bé học vui")

> File này là luật bắt buộc cho mọi AI agent (Antigravity, Claude Code, Cursor, Codex...) làm việc trong repo này.
> Đọc hết trước khi làm bất cứ việc gì. Nếu luật mâu thuẫn với yêu cầu trong chat: **dừng lại và hỏi**, không tự chọn.

## 1. Sứ mệnh

Web app học mà chơi cho **bé 4–6 tuổi, làm quen trước lớp 1**. Hiện tại (2026-10) bé **4 tuổi, chưa rành chữ, đã đếm được 1–10**; dự kiến vào lớp 1 khoảng năm 2028. Người dùng cuối: con gái của chủ dự án; người dùng phụ: bố mẹ.
Ưu tiên theo thứ tự: **An toàn cho bé > Bé thấy vui và tự dùng được > Học đúng, tiến bộ thật > Code gọn, dễ bảo trì**.

Mục tiêu học: làm quen chữ cái + dấu thanh + ghép vần đơn giản, tập tô nét, số 1–20, cộng/trừ trong phạm vi 10 bằng hình, hình học/vị trí/quy luật, nghe hiểu truyện ngắn, tiếng Anh nhập môn, kỹ năng sống. Làm quen nhẹ nhàng, **không ép, không thi cử**.
Ưu tiên hiện tại: **Tiếng Việt tiền đọc-viết** (nghe âm, vần, nhận mặt nguyên âm qua hình) và củng cố số 1–10 → làm quen 11–20. Chặng 3–5 để sau, mở theo mức thành thạo chứ không theo lịch.

Lộ trình đầy đủ: `PLAN.md`. Việc đã/đang/sẽ làm: `todo.md`.

## 2. Giao thức bắt buộc ở đầu MỖI phiên làm việc

1. Đọc `AGENTS.md`, `todo.md`, mục liên quan trong `PLAN.md`.
2. Nêu rõ **ID task** (ví dụ `P1-03`) sẽ làm. Không có ID trong `todo.md` → thêm task vào `todo.md` trước, rồi mới làm.
3. Tóm tắt kế hoạch tối đa 5 dòng, liệt kê file sẽ sửa. Việc lớn (động ≥ 5 file hoặc đổi cấu trúc dữ liệu) → chờ chủ dự án xác nhận.
4. Mỗi phiên chỉ làm **1 task** (hoặc 1 nhóm task nhỏ cùng file). Không tiện tay sửa thêm.

## 3. Điều CẤM (vi phạm = hủy thay đổi)

- ❌ Viết lại từ đầu, đổi sang framework (React/Vue/...), thêm bundler/build step. Dự án là **vanilla JS + PWA, chạy trực tiếp không cần build**. Cải tiến từng bước trên code hiện có.
- ❌ Xóa/đổi tên file hoặc đổi cấu trúc dữ liệu (`activities-data.js`, `data-vn.js`, `stories-*.js`, key `localStorage`) mà không có migration và không được xác nhận.
- ❌ Thêm analytics, tracker, quảng cáo, đăng nhập, form thu thập thông tin cá nhân, gọi API bên thứ ba gửi dữ liệu của bé. **Dữ liệu của bé chỉ nằm trên thiết bị** (trừ khi chủ dự án chủ động bật tính năng khác bằng task rõ ràng).
- ❌ Nhúng nội dung ngoài mà bé có thể bấm lạc sang (YouTube related videos, link ra ngoài, quảng cáo). Video: ưu tiên file local; nếu buộc dùng YouTube thì chỉ `youtube-nocookie.com` + `rel=0`, bọc sau cổng phụ huynh khi có link thoát.
- ❌ Hardcode secret/API key vào repo, **kể cả "key dự phòng"/giá trị mặc định**. Không commit file `.env`. Repo này **public**: mọi thứ đã commit coi như lộ.
- ❌ Chép secret/key/PIN thật vào bất kỳ file nào, kể cả báo cáo, `audit.md`, `CHANGELOG.md`, log, comment. Khi báo cáo chỉ ghi file + dòng + loại secret, **không ghi giá trị**. Phát hiện secret trong repo → dừng, báo chủ dự án ngay để thu hồi key.
- ❌ Commit/sửa code không có task ID trong `todo.md` (kể cả "tiện tay chuyển nội dung giữa các tầng"). Thay đổi nội dung/cấu trúc ảnh hưởng lộ trình phải được xác nhận trước.
- ❌ Đánh dấu `[x]` khi chưa có bằng chứng đúng loại. Ghi rõ cách xác minh: `(đọc code)`, `(test: tên test)`, hoặc `(thiết bị: tên máy)`. Việc cần chơi thử trên thiết bị của bé chỉ **chủ dự án** mới tick `[x]`; agent để `[~]`.
- ❌ Ghi nguồn gốc/giấy phép trong `ASSETS.md` khi chưa có bằng chứng. Không rõ → ghi `UNVERIFIED`.
- ❌ Hiển thị cho bé: điểm trừ, mặt buồn/âm thanh chê, đếm ngược gây áp lực, "mất chuỗi ngày", popup chặn màn hình khó tắt, nút mua/xin thêm.
- ❌ Bỏ qua lỗi test. Không comment-out hoặc sửa test cho "xanh" mà không giải thích trong PR/commit.
- ❌ Đoán nội dung giáo dục. Nếu không chắc chữ/dấu/phép tính/phát âm đúng hay sai → ghi `TODO(parent-review)` và hỏi.

## 4. Ràng buộc kỹ thuật

- Stack: HTML + CSS + JS thuần (script tag toàn cục), PWA (`manifest.webmanifest`, `sw.js`), deploy Netlify (`netlify.toml`, `netlify/functions`), chạy local bằng `run-local.bat` / `server.js`.
- Thứ tự nạp script trong `index.html` (img-core → data-vn → activities-data → audio-map → app) **không được đảo** nếu chưa kiểm tra phụ thuộc.
- Khi thêm/sửa asset (ảnh, âm thanh, font, file JS/CSS): **bump version cache trong `sw.js`** và kiểm tra app chạy offline.
- Mọi tài nguyên phải chạy **offline**. Không thêm CDN mới; font/ảnh/âm thanh phải nằm trong repo.
- File văn bản dùng **UTF-8, chuẩn hóa Unicode NFC** (tiếng Việt có dấu không được bị tách dấu).
- Tránh file khổng lồ: file mới > 400 dòng thì tách module. Không nhúng ảnh base64 lớn vào CSS/HTML.
- Code mới: hàm nhỏ, tên rõ nghĩa, có JSDoc cho hàm công khai, bắt lỗi khi đọc/ghi `localStorage` (try/catch, mặc định an toàn khi dữ liệu hỏng/thiếu).
- Mọi chuỗi hiển thị cho bé/phụ huynh nằm trong file dữ liệu hoặc từ điển i18n, không rải trong logic.

## 5. Luật UX cho bé 4–6 tuổi (kiểm tra từng màn hình mới)

1. **Không cần biết đọc để dùng được**: mỗi câu hỏi/nút quan trọng có icon/hình + **tự động đọc to** (tiếng Việt, `vi-VN` hoặc file audio trong `audio/`). Có nút 🔊 nghe lại.
2. Vùng chạm tối thiểu **64×64 px**, khoảng cách giữa nút ≥ 12 px; chỉ 1 thao tác chính mỗi màn hình; ưu tiên chạm hơn kéo-thả (kéo-thả phải có chế độ chạm thay thế).
3. Điều hướng cho bé: tối đa **3 lựa chọn chính trên Home**, thanh trên cùng chỉ có Home + sao. Cài đặt, ngôn ngữ, tốc độ đọc, giới hạn thời gian, báo cáo → **chỉ trong khu vực phụ huynh (có cổng PIN/phép tính)**.
4. Sai không bị phạt: lần 1 → gợi ý nhẹ + đọc lại; lần 2 → làm nổi đáp án đúng; luôn kết thúc bằng khích lệ. Sao thưởng **chỉ tăng, không giảm**.
5. Một phiên gợi ý **5–10 phút** khi bé 4 tuổi (tăng dần theo tuổi, phụ huynh chỉnh), mỗi hoạt động **≤ 4–5 câu**. Bé 4 tuổi: thao tác tô/viết/kéo-thả chính xác **không bao giờ là điều kiện để qua bài**; luôn có cách chạm thay thế và dung sai rộng. Hết phiên → màn hình nghỉ nhẹ nhàng, không hù dọa.
6. Tôn trọng `prefers-reduced-motion`, tương phản đủ (WCAG AA), không nhấp nháy > 3 lần/giây, âm lượng mặc định vừa phải, có nút tắt tiếng.
7. Chạy tốt trên **tablet + điện thoại, dọc và ngang**, không cuộn ngang, safe-area iOS.
8. Văn phong: ấm áp, ngắn, xưng "bé", không so sánh với bạn khác.

## 6. Luật nội dung & sư phạm

- Mỗi hoạt động gắn **kỹ năng (skill id)** theo `PLAN.md` mục 5, `difficulty` 1–5, `ageTier: "preschool"`.
- Mỗi câu hỏi có: `question`, đáp án đúng, `explanation` ngắn bằng ngôn ngữ trẻ con, `hint`. Đáp án sai phải **hợp lý** (không gây hiểu nhầm), không quá 3–4 lựa chọn.
- Chữ cái/vần/dấu thanh/từ vựng: kiểm tra chính tả + dấu, ví dụ phải là từ bé quen thuộc, hình minh họa không gây nhầm (ví dụ "ê" không minh họa bằng hình dễ gọi tên khác).
- Giữ **trình tự học** theo `PLAN.md`: bài sau chỉ mở khi kỹ năng tiên quyết đạt ngưỡng (mastery), nhưng phụ huynh có thể mở khóa thủ công.
- **Không dạy trước chương trình lớp 1** và không ép tô/viết chữ: ưu tiên flashcard, trò chơi, nghe kể chuyện tương tác, âm thanh–hình ảnh. Tô chữ chỉ là hoạt động **tùy chọn** (nét đứt, dung sai rộng), không tính vào mức thành thạo.
- Mỗi hoạt động gắn **1 chủ đề** (`theme`) và **1 trụ cột** (`pillar`: cognition-language / fine-motor / readiness-habits), xem `PLAN.md` mục 4c. Việc chỉ làm được ngoài màn hình (vận động tinh, nề nếp, diễn đạt) thì app chỉ hiện **gợi ý hoạt động/câu hỏi mở cho bố mẹ**, không bắt bé làm trên màn hình.
- Không nội dung bạo lực, đáng sợ, quảng cáo, thương hiệu, hình ảnh có bản quyền chưa rõ nguồn. Ghi nguồn/giấy phép tài nguyên vào `ASSETS.md`.

## 7. Dữ liệu & schema

- Hoạt động mới phải qua `activity.schema.json`. Nếu cần loại mới (kéo-nối, bắt bóng, tô chữ...), **cập nhật schema trước** (thêm trường `template` / `skills`), cập nhật `test-activity-schema.js`, rồi mới thêm dữ liệu.
- Tiến độ của bé lưu `localStorage` với key có tiền tố + **số phiên bản schema** (ví dụ `blg.progress.v2`). Đổi cấu trúc → viết hàm migrate từ bản cũ, không làm mất sao/huy hiệu đã có.
- Có chức năng xuất/nhập tiến độ (JSON) trong khu vực phụ huynh (task trong `todo.md`).

## 8. Quy trình mỗi thay đổi

1. Tạo nhánh `feat/<id>-<mô-tả-ngắn>` hoặc `fix/<id>-...`.
2. Sửa nhỏ, từng bước; mỗi commit làm một việc: `<type>(<id>): <mô tả>` (type: feat, fix, content, refactor, docs, test, chore).
3. Chạy test (mục 9). Tự kiểm tra thủ công bằng danh sách ở mục 10.
4. Cập nhật `todo.md` (đổi `[ ]` → `[x]`, ghi ngày), thêm dòng vào `CHANGELOG.md`.
5. Báo cáo cuối phiên: đã làm gì, file đổi, cách kiểm tra, rủi ro/việc còn lại. Không báo "xong" nếu chưa chạy test.

## 9. Test

Các script có sẵn (xác nhận cách chạy và ghi vào `todo.md` task `P0-04`):
`test-activity-schema.js`, `test-audio-system.js`, `test-dom-performance.js`, `test-scoring.js`, `test-local.html`.
- Chạy bằng Node: `node test-<tên>.js` (script nào cần trình duyệt thì mở `test-local.html` qua `run-local.bat`).
- Thêm logic mới (chấm điểm, mastery, migrate dữ liệu) → **thêm test cùng lúc**.
- Thêm nội dung mới → phải qua test schema.

## 10. Checklist thủ công trước khi báo xong

- [ ] Home và hoạt động mới dùng được **chỉ bằng chạm + nghe**, không cần đọc.
- [ ] Không có chữ sai dấu/sai chính tả; audio đúng chữ.
- [ ] Nút ≥ 64px; không cuộn ngang ở 360px và ở tablet ngang.
- [ ] Offline: tắt mạng, tải lại, vẫn chơi được (đã bump cache `sw.js`).
- [ ] Console không lỗi; không request ra domain ngoài (ngoại trừ cái đã được duyệt).
- [ ] Sai → không bị phạt; đúng → có khích lệ; sao không giảm.
- [ ] Dữ liệu cũ trong `localStorage` vẫn mở được.

## 11. Khi nào phải DỪNG và hỏi chủ dự án

- Yêu cầu mâu thuẫn với file này hoặc `PLAN.md`.
- Cần đổi cấu trúc dữ liệu, thêm dependency, thêm kết nối mạng, hoặc đụng tới dữ liệu cá nhân.
- Không chắc về độ đúng của nội dung giáo dục.
- Test hỏng mà chưa rõ nguyên nhân sau 2 lần thử.

## 12. Định nghĩa "Xong" (Definition of Done)

Task chỉ được tick `[x]` khi: chạy được offline ✔ test liên quan xanh ✔ checklist mục 10 đạt ✔ `todo.md` + `CHANGELOG.md` đã cập nhật ✔ không vi phạm mục 3.
