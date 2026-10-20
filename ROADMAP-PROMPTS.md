# ROADMAP-PROMPTS.md — Lộ trình làm việc với Antigravity + prompt dán sẵn

Cách dùng: mỗi **phiên** = 1 cuộc chat mới với Antigravity = 1 nhánh Git = 1 prompt dưới đây.
Chat mới mỗi phiên để agent nạp lại `AGENTS.md`, không mang theo "trí nhớ" lệch.

---

## 0. Khuôn prompt chung (dán ở đầu MỌI phiên)

```
Đọc AGENTS.md, todo.md và mục liên quan trong PLAN.md. Nhớ: bé 4 tuổi, không dạy trước lớp 1, không ép tô/viết, phiên 5–10 phút.
Hôm nay chỉ làm: <TASK ID>.
Trước khi sửa code: tóm tắt kế hoạch ≤ 5 dòng, liệt kê file sẽ sửa, rồi CHỜ mình xác nhận.
Sau khi xong: chạy đủ 4 bộ test, cập nhật todo.md (ghi cách xác minh: đọc code / test / thiết bị) và CHANGELOG.md, báo cáo theo AGENTS.md mục 8.
Không làm việc ngoài task. Không ghi giá trị secret/PIN vào bất kỳ file nào. Việc cần chơi thử trên thiết bị thì để [~], mình sẽ tự tick.
```

## 0b. Sau mỗi phiên, bạn làm 4 việc (5 phút)

1. `git diff` lướt qua: có file lạ, file bị xóa, dependency mới không?
2. Chạy app local, chơi thử đúng chỗ vừa đổi (trên điện thoại/tablet của bé nếu đổi UI).
3. Merge vào `main` nếu ổn. Không ổn → `git checkout main` bỏ nhánh, viết lại prompt cho rõ hơn (đừng cãi nhau với agent).
4. Gắn tag ở các mốc ★.

---

## 1. Tổng quan thứ tự

| Giai đoạn | Phiên | Việc chính | Kết quả |
|-----------|-------|-----------|---------|
| **A. An toàn & nền** | M0 (bạn tự làm), S1, S2 | Thu hồi key, dọn secret, tag baseline, rà tài nguyên | Repo an toàn, có mốc quay lại |
| **B. Chế độ cho bé 5–6 tuổi** | S3–S9 | Chốt chặng, giao diện gọn, đọc to, cổng phụ huynh, sao lưu | ★ `v0.1-child-mode`: bé dùng được |
| **C. Dọn kỹ thuật** | S10–S12 | Tách CSS, font, cache, ảnh nặng | ★ `v0.2-lean`: nhanh, offline chắc |
| **D. Bộ máy học** | S13–S17 | Schema v2, kỹ năng, mastery, "Học hôm nay", ôn tập, bản đồ | ★ `v0.3-journey`: có lộ trình thật |
| **E. Nội dung** | S18+ (lặp) | Làm từng chặng 0 → 5, bạn rà soát | Mở rộng dần, không có điểm dừng |
| **F. Phụ huynh & phát hành** | S19–S21 | Báo cáo tuần, nhiều hồ sơ, test offline iOS/Android, CSP, CI | ★ `v1.0` |

Nhịp gợi ý: 2–3 phiên/tuần → Giai đoạn A–B khoảng 3 tuần, đến ★ `v0.3` khoảng 7–9 tuần, nội dung làm song song và liên tục. Đây là ước lượng, tùy thời gian bạn có.

**Cập nhật 2026-10-20:** bé **4 tuổi**, chưa rành chữ, đã đếm 1–10 (Q1). Vì vậy mỗi chặng ước ~3–4 tháng (không phải 3–5 tuần), thời gian của dự án nằm nhiều ở **nội dung** và **quan sát bé**, ít ở code. Q2 (bộ sách) chưa xác định tên, chưa gấp; cần trước khi chốt thứ tự chữ chặng 2.

---

## GIAI ĐOẠN A — An toàn & nền

### M0 — Việc BẠN tự làm (không giao agent)
- [ ] Thu hồi key VieNeu cũ, tạo key mới (chưa dán vào code).
- [ ] Thay `audit.md` bằng `audit.redacted.md`; xóa `audit.md` ở root nếu `docs/audit.md` đã có.
- [ ] Đặt biến môi trường `VIENEU_API_KEY` trên Netlify (và file `.env` local, đã `.gitignore`).
- [ ] `git tag v0-baseline` trên `main`.
- [ ] Chơi thử app trên thiết bị của bé 10 phút, ghi lại lỗi/điều bé thích vào `todo.md` (P0-05).
- [ ] Trả lời Q1, Q2, Q3 trong `todo.md`.

### S1 — P0-09 (phần code) + P0-10 + P0-11
```
[khuôn chung]. Task: P0-09 (phần code), P0-10, P0-11.
- server.js và netlify/functions/tts.js: bỏ hoàn toàn key hardcode/key dự phòng, chỉ đọc process.env.VIENEU_API_KEY. Thiếu biến → trả lỗi 500 rõ ràng, KHÔNG fallback.
- server.js đọc file .env local mà không thêm dependency mới (tự parse đơn giản hoặc node --env-file). Tạo .env.example (không có giá trị thật). Xác nhận .gitignore có .env.
- Chạy `git grep -n "vn_sk_"` phải rỗng (kể cả docs/). Không in giá trị key ra console/log/báo cáo.
- server.js mặc định phục vụ index.html; test-local.html: xóa hoặc đánh dấu deprecated, nêu đề xuất trước khi xóa.
- Chỉ giữ docs/audit.md, xóa audit.md ở root.
Tiêu chí xong: TTS vẫn chạy local khi có .env; 4 test PASS; không còn secret trong repo.
```

### S2 — P0-12 (kiểm kê tài nguyên, KHÔNG tự kết luận giấy phép)
```
[khuôn chung]. Task: P0-12. Chỉ tạo/sửa ASSETS.md và docs/assets-inventory.md, không sửa code.
- Liệt kê: font, thư mục audio/ (nhóm theo nguồn: TTS vs VTV7 vs khác, dựa vào audio-map.js, generate_spelling_audio.js, tên file), ảnh/sprite trong img-*.js, truyện trong stories-*.js, video nhúng.
- Với mỗi nhóm: nguồn đã biết (kèm bằng chứng: file/dòng/commit), giấy phép đã biết, hoặc ghi UNVERIFIED. Tuyệt đối không suy đoán nguồn/giấy phép.
- Cuối file: danh sách việc chủ dự án cần xác minh (ví dụ liên hệ tác giả font, đọc điều khoản VieNeu), sắp theo mức rủi ro vì repo đang public.
```
Sau S2: bạn quyết định nhóm nào giữ/bỏ/thay (đặc biệt font HPTapViet/HPCham, truyện `truyencotich.top`, audio VTV7 nếu có).

---

## GIAI ĐOẠN B — Chế độ cho bé 5–6 tuổi

### S3 — P1-00 (CHỈ PHÂN TÍCH, không code)
```
[khuôn chung]. Task: P1-00, chỉ phân tích, KHÔNG sửa code/dữ liệu.
Tạo docs/stage-map.md:
1. Bảng cả 77 bài trong activities-data.js: id, tiêu đề, ageTier hiện tại, đề xuất `stage` (0–5 theo PLAN.md mục 4), kỹ năng đề xuất (skill id theo PLAN.md mục 5.1), mức phù hợp 5–6 tuổi (phù hợp / hơi khó / quá khó).
2. Các trò chơi/màn hình ngoài activities-data (countGame, bubbleGame, trace, letL, numL, math10, mem, cmp...) cũng gán stage + skill.
3. Khoảng trống: mỗi chặng 0–5 còn thiếu những loại bài/kỹ năng nào so với PLAN.md.
4. Đánh giá commit feat(grade1) (chuyển 5 bài Cô Lan Anh sang grade1_2): hậu quả nếu ẩn grade1_2 khỏi bé, và đề xuất xử lý (hoàn nguyên hay gán stage).
5. Đề xuất cách thêm trường `stage` tương thích ngược (không phá dữ liệu/ test hiện có).
```
Bạn đọc `docs/stage-map.md`, sửa stage nào bạn không đồng ý, rồi duyệt.

### S4 — thêm `stage` (dữ liệu + schema + test, chưa đổi giao diện)
```
[khuôn chung]. Task: P1-00 (phần thực hiện) theo docs/stage-map.md đã được duyệt.
- Thêm trường tùy chọn `stage` (0–5) vào activity.schema.json (additive, không phá bài cũ), gán stage cho các bài theo docs/stage-map.md.
- Xử lý commit feat(grade1) đúng phương án đã duyệt.
- Cập nhật test-activity-schema.js: mọi bài preschool/grade1_2 dùng cho bé phải có stage hợp lệ; thêm test bắt trường hợp thiếu.
- KHÔNG đổi UI trong phiên này.
```

### S5 — P1-01 + P1-02 (bé thấy nội dung theo chặng)
```
[khuôn chung]. Task: P1-01, P1-02.
- Giao diện bé: chỉ hiện nội dung có `stage` 0–5, bất kể ageTier. Bộ chọn 3 tầng tuổi ẩn khỏi bé, chỉ phụ huynh bật (cờ trong localStorage, mặc định tắt).
- Đổi <title>, meta description, manifest từ "4–11 tuổi" sang "5–6 tuổi, chuẩn bị vào lớp 1".
- Dữ liệu localStorage cũ (ageTier, lvl) vẫn mở được, không mất sao/huy hiệu.
Tiêu chí: mở app mới hoàn toàn và app đã có dữ liệu cũ đều không lỗi.
```

### S6 — P1-03 (header gọn)
```
[khuôn chung]. Task: P1-03.
Header cho bé chỉ còn: Home, Quay lại (khi cần), điểm sao, huy hiệu. Chuyển ngôn ngữ, tốc độ đọc, bật/tắt âm, chi tiết streak vào khu phụ huynh (phía sau cổng hiện có). Giữ nguyên chức năng, chỉ đổi chỗ. Kiểm tra ở 360px và tablet ngang.
```

### S7 — P1-04 (Home 3 nút)
```
[khuôn chung]. Task: P1-04.
Home cho bé: 3 nút lớn (Học hôm nay · Chơi tự do · Sticker của bé), toàn icon + giọng đọc tự động khi bé chạm giữ/vào màn hình. Tạm thời "Học hôm nay" mở danh sách bài theo chặng hiện tại (logic chọn bài thông minh làm ở S16). "Chơi tự do" = các trò chơi hiện có. Vùng chạm ≥ 64px, cách nhau ≥ 12px.
```

### S8 — P1-05 + P1-06 (đọc to tự động, streak nhẹ nhàng)
```
[khuôn chung]. Task: P1-05, P1-06.
- Mọi màn hình bài/trò chơi: tự đọc đề khi vào (tôn trọng chính sách autoplay đã có: pendingAutoplayAudio), nút 🔊 nghe lại.
- Streak: bỏ cảm giác "mất chuỗi": hiển thị "bé đã học N ngày", không reset gây buồn, không có thông báo mất. Dữ liệu streak cũ vẫn đọc được. Cập nhật test-scoring.js tương ứng.
```

### S8b — P1-12 (định vị lại 4–6 tuổi) — làm trước S9
```
[khuôn chung]. Task: P1-12.
Bé hiện 4 tuổi (chưa rành chữ, đã đếm 1–10). Đổi định vị sang "4–6 tuổi, làm quen trước lớp 1": <title>, meta description, manifest.webmanifest, AGE_TIERS.preschool, lời chào/tiêu đề còn ghi 5–6 tuổi. Đặt thời lượng phiên gợi ý 5–10 phút và giới hạn ngày mặc định thấp (phụ huynh vẫn chỉnh được; dữ liệu giới hạn cũ của người dùng không bị đổi).
Rà 53 bài đang hiển thị cho bé: lập bảng trong docs/age-fit.md (id, stage, phù hợp 4 tuổi: có / hơi khó / quá sớm, lý do). Chưa ẩn bài nào, chỉ thêm trường tùy chọn `minAge`/`difficulty` nếu cần và cập nhật schema + test. Chờ mình duyệt bảng trước khi thay đổi hiển thị. Đề xuất riêng: bài tô chữ và kéo-thả chính xác được đánh dấu tùy chọn, không tính vào mức thành thạo.
Bump version cache sw.js.
```

### S9 — P5-01 + P5-02 + P1-08 + P1-10 (phụ huynh & sao lưu)
```
[khuôn chung]. Task: P5-01, P5-02, P1-08, P1-10.
- Thay prompt() ở __unlockTimeLimit bằng hộp thoại trong app dùng chung cổng phụ huynh.
- Bắt buộc tạo PIN ở lần dùng khu phụ huynh đầu tiên; bỏ PIN mặc định 1234; lưu PIN dạng băm (SubtleCrypto SHA-256 + salt); người dùng cũ còn PIN thô thì migrate.
- Xuất/nhập: danh sách key đầy đủ + tiền tố (study_sec_*), có schemaVersion, KHÔNG xuất PIN. Viết test xuất→nhập khứ hồi (huy hiệu, streak, tên, avatar, giới hạn giờ, thống kê).
- Chuyển nút "Gợi ý cho bố mẹ" vào khu phụ huynh; rà lời màn hình hết giờ cho dịu nhẹ.
```
★ Sau S9: merge, `git tag v0.1-child-mode`, cho bé dùng thật 1–2 tuần, ghi quan sát.

---

## GIAI ĐOẠN C — Dọn kỹ thuật

### S10 — P2-01 + P2-02
```
[khuôn chung]. Task: P2-01, P2-02.
Tách toàn bộ CSS inline ra styles.css, ảnh nền base64 ra bg.webp (hoặc định dạng nhẹ phù hợp). Không đổi giao diện/hành vi. Thêm vào precache, bump version sw.js. So sánh ảnh chụp trước/sau ở 3 màn hình chính để chứng minh không đổi.
```

### S11 — P2-03 + P2-07
```
[khuôn chung]. Task: P2-03, P2-07.
Tự host Baloo 2 (woff2, đúng giấy phép OFL, ghi ASSETS.md), bỏ request Google Fonts. Precache bổ sung activities-data.js, stories-data.js, img-s.js, img-o.js; version cache sinh tự động từ hash hoặc danh sách file; trang dự phòng khi offline. Kiểm tra: bật airplane mode sau lần mở đầu vẫn học được bài và đọc truyện chính.
```

### S12 — P2-10 (ảnh nặng) — tùy chọn, làm khi thấy app chậm trên máy của bé
```
[khuôn chung]. Task: P2-10.
Đo thời gian mở app hiện tại. Đề xuất (chưa code) phương án chuyển ảnh base64 trong img-core/img-s/img-o sang file thật + tải lazy, ước lượng lợi ích, rồi chờ mình duyệt mới làm.
```
★ Sau C: `git tag v0.2-lean`.

---

## GIAI ĐOẠN D — Bộ máy học

### S13 — P3-01 + P3-02 (schema v2 + danh mục kỹ năng)
```
[khuôn chung]. Task: P3-01, P3-02.
Tạo skills.js theo PLAN.md mục 5.1 (id, tên VI/EN, nhóm, kỹ năng tiên quyết, chặng). Schema v2: thêm template, skills[], prerequisites[], estimatedMinutes, reviewed, theme (ban-than | gia-dinh | dong-vat | truong-hoc | do-vat-mau-sac), pillar (cognition-language | fine-motor | readiness-habits); tương thích ngược. Bổ sung kỹ năng math.sort.classify, math.shape.3d, math.size.compare, vi.speak.express, vi.rhyme.match (xem PLAN.md mục 4c, 5.1). Gán theme/pillar cho các bài hiện có theo docs/stage-map.md (task P3-11). Gán skills cho các bài hiện có theo docs/stage-map.md. Test: mọi skill id trong bài phải tồn tại trong skills.js; không có vòng lặp tiên quyết.
```

### S14 — P3-03 + P3-04 (tiến độ theo kỹ năng + mastery, có test)
```
[khuôn chung]. Task: P3-03, P3-04. Làm test trước.
Module progress: lưu theo skill (attempts, correct, lastSeen, sessionsPassed, level new/learning/mastered, nextReview) trong blg.progress.v2, hàm migrate từ st/bhv_act_stats cũ không làm mất sao/huy hiệu. Mastery: ≥ 4/5 đúng ở 2 phiên khác ngày. Không đổi UI trong phiên này. Thêm test: mastery, migrate, dữ liệu hỏng/thiếu (trả mặc định an toàn).
```

### S15 — nối kết quả bài làm vào tiến độ
```
[khuôn chung]. Task: P3-03 (phần nối). Mọi bài/trò chơi báo kết quả theo skill vào module progress (đúng lần đầu, số lần gợi ý). Sai không trừ sao. Kiểm tra không làm chậm trò chơi bắt bóng (test-dom-performance.js).
```

### S16 — P3-05 (Học hôm nay)
```
[khuôn chung]. Task: P3-05.
"Học hôm nay" chọn 3 hoạt động ~10–15 phút: 1 bài ôn, 1 bài mới (kỹ năng kế tiếp trong chặng, đã đủ tiên quyết), 1 trò chơi bé chọn. Xong → sticker + màn hình nghỉ nhẹ nhàng. Có test chọn bài (đủ tiên quyết, không lặp, hết bài mới vẫn có đề xuất hợp lý).
```

### S17 — P3-06 + P3-07 + P3-08 (ôn giãn cách, độ khó thích ứng, bản đồ chặng)
```
[khuôn chung]. Task: P3-06, P3-07, P3-08. Có thể tách 3 phiên nếu agent báo quá lớn.
Ôn +1/+3/+7/+14 ngày; 3 đúng liên tiếp tăng khó, 2 sai liên tiếp giảm + gợi ý (không phạt); bản đồ hành trình các chặng mở dần, phụ huynh mở khóa thủ công được. Bản đồ dùng icon + giọng đọc, không cần biết đọc.
```
★ Sau D: `git tag v0.3-journey`.

---

## GIAI ĐOẠN E — Nội dung (lặp lại cho từng chặng)

Phân công: agent **soạn nháp**, bạn (hoặc người nhà) **rà soát chính tả/dấu/phát âm** rồi mới `reviewed: true`. Làm theo thứ tự chặng 0 → 1 → 2 → 3 → 4 → 5. Mỗi chặng ~1–2 phiên.

```
[khuôn chung]. Task: P4-0X (Chặng N — <tên chặng>) cho bé 4 tuổi.
Đọc docs/stage-map.md (khoảng trống của chặng N), PLAN.md mục 4b, 4c, 5.
Soạn <số> hoạt động mới, phân bổ theo chủ đề (theme) và trụ cột (pillar), đa dạng template (trắc nghiệm hình, nối cặp bằng chạm, đếm, nghe-chọn, bắt bóng chậm, phân loại...). Mỗi bài ≤ 4–5 câu, có audio đọc đề, hint, explanation ngắn cho trẻ, và các trường stage, skills, theme, pillar, difficulty, reviewed: false.
Không dạy trước chương trình lớp 1; không bắt buộc tô/viết. Ưu tiên flashcard, trò chơi, truyện ngắn tương tác.
Với mỗi kỹ năng mới, thêm 1 gợi ý "hoạt động ngoài màn hình" cho bố mẹ (tô màu, nặn đất, xâu hạt, vẽ chữ trên cát, đếm đồ vật thật...) và 1 câu hỏi mở bố mẹ có thể hỏi bé, lưu trong dữ liệu để khu phụ huynh hiển thị.
Audio mới: dùng pipeline hiện có (generate_spelling_audio.js), không hardcode key.
Không đoán nội dung giáo dục: chỗ nào không chắc ghi TODO(parent-review).
Cuối phiên xuất docs/review-stage-N.md: danh sách từng câu/chữ/vần cần mình rà, kèm file audio.
Hình ảnh: chỉ dùng tài nguyên có trong ASSETS.md hoặc SVG tự vẽ; không tải ảnh từ web.
```
Thứ tự ưu tiên: **Chặng 0–2 trước** (làm quen, số 1–10 + nguyên âm, phụ âm + dấu thanh + ghép vần), vì đó là phần bé nhà bạn dùng ngay.

### P4-01 — Chặng 0 (làm quen, bé 4 tuổi)
```
[khuôn chung]. Task: P4-01. Theo khuôn nội dung ở trên với N = 0.
Khoảng 10–12 hoạt động, chủ đề: Bản thân em, Gia đình em, Đồ vật và màu sắc quanh bé.
- Nghe âm đầu: 3 bài. Bắt vần (hai từ có vần giống nhau): 2 bài.
- Nhận mặt nguyên âm qua hình: 2 bài, chỉ nghe–chạm, KHÔNG ghép vần, KHÔNG tô chữ. Thứ tự chữ dùng thứ tự hiện có trong data-vn.js; nếu docs/letter-order.md đã có thì theo đó.
- Phân loại và so sánh (màu, to–nhỏ, nhiều–ít): 2 bài. Vị trí (trên–dưới, trong–ngoài): 1 bài.
- Nghe truyện ngắn + 1–2 câu hỏi: 2 bài.
Không làm đếm 1–5 (bé đã đếm 1–10). Mỗi kỹ năng có gợi ý ngoài màn hình và câu hỏi mở cho bố mẹ.
```

### P4-02 — Chặng 1 (số 1–10 + nguyên âm đầu tiên)
```
[khuôn chung]. Task: P4-02. Theo khuôn nội dung ở trên với N = 1.
Khoảng 12–14 hoạt động, chủ đề: Thế giới động vật quanh ta, Gia đình em.
- Nhận mặt chữ số 1–10: 3 bài. Đếm đúng số vật 1–10 (tăng dần độ khó): 3 bài.
- Nhiều hơn–ít hơn, số liền sau: 2 bài. Làm quen đếm 11–20 bằng nghe–đếm cùng: 1 bài.
- Hình học 2D và 3D (tròn, vuông, tam giác, khối cầu, khối lập phương): 2 bài.
- Nguyên âm nhóm đầu (nghe–chạm–nhìn hình): 2–3 bài.
Thứ tự chữ chưa khóa theo bộ sách (Q2 chưa trả lời): dùng thứ tự hiện có và ghi chú để đổi sau.
Làm trước khi viết: hỏi mình bé đã nhận mặt chữ số 1–10 và đếm đúng số vật thật chưa; nếu rồi thì rút 3+3 bài đầu còn 3 bài ôn.
```


---

## GIAI ĐOẠN F — Phụ huynh & phát hành

### S19 — P5-03 + P5-05 (báo cáo tuần + cài đặt)
```
[khuôn chung]. Task: P5-03, P5-05.
Báo cáo tuần trong khu phụ huynh: kỹ năng đã vững / đang học / cần ôn, tổng thời gian, 2–3 gợi ý hoạt động cùng bé ngoài màn hình lấy từ danh sách gắn theo kỹ năng (tô màu, nặn đất, xâu hạt, vẽ chữ trên cát, đếm đồ vật thật, câu hỏi mở để bé kể lại), task P5-03 + P5-07. Dữ liệu từ module progress, không gửi đi đâu. Cài đặt tập trung: giới hạn giờ/ngày, bật/tắt tầng tuổi, ngôn ngữ, tốc độ đọc, giảm chuyển động.
```

### S20 — P5-04 + P5-06 (nhiều hồ sơ, mở khóa chặng) — chỉ làm nếu thật sự có hơn một bé dùng chung

### S21 — P6-01 → P6-07 (chất lượng, an toàn, phát hành)
```
[khuôn chung]. Task: P6-02, P6-05, P6-06, P6-07.
Video YouTube: ưu tiên video local; nếu giữ YouTube thì bọc cổng phụ huynh khi có thể thoát ra ngoài (logo/link). Bổ sung test còn thiếu (mastery, kế hoạch ngày, migrate, giới hạn thời gian). CSP + header bảo mật trong netlify.toml (thử kỹ, CSP sai làm vỡ app). GitHub Actions chạy 4 test khi push.
```
Phần P6-01 (test offline thật trên Android/iOS), P6-03 (accessibility), P6-04 (hiệu năng máy yếu) cần **bạn** thao tác trên thiết bị; agent chỉ lập checklist.
★ `git tag v1.0`.

---

## Quy tắc ngón tay cái khi dùng agent

- Phiên nào agent muốn sửa > 5 file hoặc đổi cấu trúc dữ liệu mà bạn chưa duyệt → bảo nó dừng và đưa kế hoạch.
- Agent báo "xong 100%" nhưng không nêu cách xác minh → chưa tin, bắt nó nêu cách kiểm tra.
- Thấy agent thêm thứ không ai yêu cầu (tầng mới, tính năng mới, thư viện mới) → hoàn nguyên nhánh đó.
- Luôn có `v0-baseline` và các tag mốc để quay lại.
