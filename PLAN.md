# PLAN.md — Bé học vui: kế hoạch cho bé 5–6 tuổi chuẩn bị vào lớp 1

Phiên bản: 2026-10-19 · Repo: https://github.com/3r1pm4V/My-Little-Girls-Game

---

## 1. Hiện trạng (đã xem gì, chưa xem gì)

**Đã xem:** cây thư mục, toàn bộ `index.html`, `activity.schema.json`.
**Chưa xem:** `app.js`, `activities-data.js`, `data-vn.js`, `stories-*.js`, `sw.js`, `server.js`, `netlify/functions`, các `test-*.js`. Những nhận định về logic bên trong là **giả định**, cần xác minh ở Phase 0.

**Điểm mạnh**
- Đã là PWA vanilla JS, không cần build, deploy Netlify. Đúng hướng cho dự án cá nhân: đơn giản, chạy offline được.
- Đã có nhiều thứ khó: giọng đọc/âm thanh, tô chữ, đếm hình, kéo-nối, bắt bóng, sao/huy hiệu/sticker, khu phụ huynh có PIN, giới hạn thời gian, schema + test.
- UI đã có tư duy trẻ nhỏ: nút to, màu theo môn, giảm chuyển động, focus-visible.

**Khoảng cách so với mục tiêu "bé 5–6 tuổi, chuẩn bị vào lớp 1"**
- Phạm vi quá rộng (mô tả "4–11 tuổi", 3 tầng) → bé nhỏ thấy quá nhiều thứ, và nội dung preschool bị loãng.
- Chưa có **lộ trình**: danh sách hoạt động phẳng, chưa có thứ tự học, chưa có "thành thạo", chưa có bài ôn.
- Header đang có ~7 nút (streak, huy hiệu, ngôn ngữ, sao, âm thanh, tốc độ đọc, quay lại) — nhiều với bé chưa biết đọc.
- Một số chi tiết kỹ thuật cần dọn (xem mục 3).

---

## 2. Nguyên tắc thiết kế

1. **Chơi trước, học trong chơi.** Mỗi phiên 10–15 phút, mỗi hoạt động ≤ 5 câu, kết thúc khi bé còn muốn chơi thêm.
2. **Không cần biết đọc.** Hình + giọng đọc tự động; chữ chỉ là thứ bé đang học.
3. **Không phạt.** Sai → gợi ý → hiện đáp án → khích lệ. Sao chỉ tăng.
4. **Lộ trình rõ, mở dần.** Kỹ năng sau mở khi kỹ năng trước đã vững; bố mẹ có quyền mở tay.
5. **Phụ huynh nhìn thấy tiến bộ thật** (báo cáo tuần), không chỉ điểm sao.
6. **Riêng tư tuyệt đối.** Dữ liệu của bé chỉ nằm trên thiết bị; không tracker/quảng cáo/link lạc.
7. **Cải tiến từng bước trên code hiện có**, không viết lại.

Về chương trình: Hãy coi đây là *làm quen và tạo hứng thú*, không dạy trước ép khuôn. Thứ tự chữ/vần nên khớp bộ sách lớp 1 của trường bé (hỏi cô giáo — câu hỏi Q2 trong `todo.md`).

---

## 3. Vấn đề phát hiện & sửa đổi đề xuất

| # | Vấn đề (căn cứ) | Sửa đổi | Ưu tiên | Task |
|---|-----------------|---------|---------|------|
| 1 | Phạm vi 4–11 tuổi, 3 tầng (`index.html` meta + schema `ageTier`) | `preschool` làm mặc định; tầng khác ẩn sau cài đặt phụ huynh; đổi mô tả thành 5–6 tuổi | P1 | P1-01, P1-02 |
| 2 | Header quá tải cho bé | Chỉ Home + sao (+ huy hiệu); còn lại vào khu phụ huynh | P1 | P1-03 |
| 3 | Home chưa dẫn dắt | 3 nút lớn: Học hôm nay · Chơi tự do · Sticker | P1 | P1-04 |
| 4 | Streak 🔥 dễ tạo áp lực "mất chuỗi" | Đổi thành "bé đã học N ngày", không reset gây buồn | P1 | P1-06 |
| 5 | Nút "Bố mẹ mở thêm 15 phút" hiển thị ngay trên màn hình hết giờ (HTML không thấy cổng xác thực) | Xác minh; bắt buộc qua cổng phụ huynh | P1 | P0-06, P5-01 |
| 6 | Font "Baloo 2" nạp từ Google Fonts → có request ngoài, offline có thể lỗi font | Tự host font, thêm vào precache | P1 | P2-03 |
| 7 | `index.html` ~83KB, phần lớn CSS inline + ảnh nền base64 | Tách `styles.css`, ảnh nền thành file `.webp` | P1 | P2-01, P2-02 |
| 8 | Schema `subject` (vietnamese, math, english, science, skills) lệch UI (math, vietnamese, reading, game, logic, trace) | Chốt bảng danh mục môn/kỹ năng (mục 5), sửa schema + CSS + dữ liệu | P2 | P2-04 |
| 9 | Schema chỉ mô tả bài trắc nghiệm (`options`, `correctAnswer`) nhưng app có nối dây, kéo-thả, bắt bóng, tô chữ | Schema v2: thêm `template`, `skills[]`, `prerequisites[]` | P1 | P3-01 |
| 10 | Loại `video_quiz` dùng YouTube → video đề xuất/quảng cáo/link thoát với bé nhỏ | Dùng video local; hoặc `youtube-nocookie` + `rel=0` + chặn thoát | P1 | P6-02 |
| 11 | Kéo-thả chính xác khó với tay bé 5 tuổi | Thêm chế độ chạm-chọn thay thế | P2 | P1-09 |
| 12 | Nút "Gợi ý cho bố mẹ" cố định góc trái dưới có thể che nội dung | Chuyển vào khu phụ huynh | P2 | P1-08 |
| 13 | Handler `onclick` inline + hàm toàn cục | Dần chuyển sang `addEventListener`, namespace `BLG` | P2 | P2-05 |
| 14 | Chưa có sao lưu tiến độ | Xuất/nhập JSON trong khu phụ huynh | P1 | P5-02 |
| 15 | `netlify/functions` chưa rõ mục đích | Kiểm toán: có dữ liệu bé đi ra ngoài không | P2 | P0-08 |

---

## 4. Lộ trình học cho bé (6 chặng)

Mỗi chặng ~3–5 tuần nếu bé chơi 4–5 ngày/tuần. Không cứng nhắc: bé vững sớm thì sang chặng sau, chưa vững thì ở lại. Thứ tự chữ cái dưới đây là **đề xuất khởi điểm**, đổi theo sách của trường.

| Chặng | Tên | Toán | Tiếng Việt | Khác |
|-------|-----|------|------------|------|
| 0 | Làm quen | Màu, hình, to/nhỏ, nhiều/ít, đếm 1–5 | Nghe âm đầu, phân biệt âm giống/khác, nghe truyện ngắn | Cách cầm bút, nét thẳng/cong cơ bản |
| 1 | Số 1–10 + nguyên âm | Đếm và nhận mặt số 1–10, thứ tự, so sánh | Nguyên âm: a ă â e ê i o ô ơ u ư y (nghe, nhận mặt chữ, tô) | Tiếng Anh: màu sắc |
| 2 | Phụ âm, dấu thanh, ghép vần | Số liền trước/liền sau, tách-gộp số trong 5 | Phụ âm (b c d đ g h k l m n...), 6 thanh điệu, ghép vần đơn giản (ba, bà, bá...) | Cảm xúc, chào hỏi |
| 3 | Số 11–20 + hình & quy luật | Số 11–20, cộng/trừ trong 5 → 10 bằng hình, hình tròn/vuông/tam giác/chữ nhật, trên/dưới/trái/phải, quy luật lặp | Từ 2 tiếng quen thuộc, tìm tiếng có vần giống nhau | Tiếng Anh: ABC, số 1–10 |
| 4 | Đọc bước đầu | So sánh, dài/ngắn, nặng/nhẹ, xem giờ đúng | Đọc từ 2 tiếng và câu ngắn, tô chữ, nghe hiểu truyện + trả lời câu hỏi | An toàn bản thân, giờ giấc |
| 5 | Sẵn sàng vào lớp 1 | Ôn tổng hợp | Ôn tổng hợp | Phiếu báo cáo cho bố mẹ |

**Gợi ý tỉ lệ thời gian một phiên:** ~50% Tiếng Việt, ~35% Toán, ~15% khác (Anh/kỹ năng). Thứ tự mỗi phiên: khởi động nhẹ (bài đã vững) → bài mới → trò chơi tự do.

**Cổng sang chặng sau (mastery):** ≥ 80% kỹ năng cốt lõi của chặng đạt "thành thạo" (mục 5). Phụ huynh có thể mở khóa thủ công.

---

## 5. Bộ máy học (learning engine)

### 5.1 Danh mục kỹ năng
Mỗi hoạt động gắn 1–3 `skill id`. Quy ước id: `<môn>.<nhóm>.<tên>`

```
math.count.1-5        math.count.1-10      math.count.11-20
math.compare.moreless math.order.numbers   math.addsub.within5
math.addsub.within10  math.shape.basic     math.position.basic
math.pattern.repeat
vi.phonics.initial-sound   vi.letters.vowels    vi.letters.consonants
vi.tones.six               vi.blend.simple      vi.read.word2
vi.read.sentence-short     vi.trace.strokes     vi.trace.letters
vi.listen.story
en.intro.colors  en.intro.abc  en.intro.numbers
life.emotions  life.safety  life.time
```

Danh sách này là **nguồn chuẩn duy nhất** (`skills.js`); schema và UI phải dùng chung (task P2-04, P3-02).

### 5.2 Schema v2 (rút gọn, tương thích ngược)
```json
{
  "id": "vi-vowel-a-01",
  "title": "Tìm chữ a",
  "titleEn": "Find the letter a",
  "ageTier": "preschool",
  "stage": 1,
  "template": "tap_choice",
  "skills": ["vi.letters.vowels"],
  "prerequisites": ["vi.phonics.initial-sound"],
  "difficulty": 1,
  "estimatedMinutes": 3,
  "reviewed": true,
  "content": [
    {
      "question": "Chữ nào là chữ a?",
      "audio": "audio/q-vi-vowel-a-01.mp3",
      "options": [{"id":"a","text":"a"},{"id":"o","text":"o"}],
      "correctAnswer": "a",
      "explanation": "Chữ a tròn, có một cái đuôi nhỏ.",
      "hint": "Tìm chữ có cái đuôi."
    }
  ]
}
```
`template` gợi ý: `tap_choice`, `fill_blank`, `match_pairs`, `sort_order`, `drag_connect`, `bubble_pop`, `trace_letter`, `count_pick`, `story_listen`.

### 5.3 Theo dõi tiến độ
Lưu trong `localStorage` key `blg.progress.v2` (kèm hàm migrate từ dữ liệu cũ):
```
profiles[childId].skills[skillId] = {
  attempts, correct, lastSeen, streakCorrect,
  sessionsPassed, level: "new" | "learning" | "mastered", nextReview
}
```
- **Thành thạo (mastered):** ≥ 4/5 đúng ở 2 phiên khác ngày.
- **Ôn giãn cách:** sau khi thành thạo → ôn lại +1, +3, +7, +14 ngày (nếu ôn sai thì lùi về "learning").
- **Độ khó thích ứng:** 3 đúng liên tiếp → tăng 1 mức; 2 sai liên tiếp → giảm 1 mức + gợi ý. Sai không trừ sao.

### 5.4 "Học hôm nay"
Mỗi ngày tự chọn 3 hoạt động (~10–15 phút): 1 bài ôn (đến hạn ôn), 1 bài mới (kỹ năng tiếp theo trong chặng), 1 trò chơi vui (bé chọn). Xong → sticker + nghỉ nhẹ nhàng.

### 5.5 Khu phụ huynh
- Cổng: PIN hoặc phép tính ngẫu nhiên (cho mọi thao tác nhạy cảm, kể cả mở thêm thời gian).
- Báo cáo tuần: kỹ năng đã vững, đang học, cần ôn; thời gian học; gợi ý 2–3 hoạt động cùng bé ở nhà (đọc truyện, đếm đồ vật, tô chữ trên giấy).
- Sao lưu/khôi phục JSON, nhiều hồ sơ bé, giới hạn thời gian, bật/tắt tầng tuổi.

---

## 6. Lộ trình kỹ thuật (phase)

| Phase | Nội dung | Kết quả kiểm chứng |
|-------|----------|--------------------|
| 0 | Chuẩn bị & kiểm toán: đưa 3 file này vào repo, tag baseline, đọc code, xác minh tính năng, chạy test | `docs/audit.md`, danh sách bug, mọi `[~]` thành `[x]` hoặc bug |
| 1 | Chế độ "Chuẩn bị vào lớp 1": mặc định preschool, header gọn, Home 3 nút, tự đọc to, streak nhẹ | Bé tự mở và chơi được không cần bố mẹ chỉ |
| 2 | Dọn kỹ thuật: tách CSS, bỏ base64, tự host font, thống nhất danh mục, module hóa `app.js` | Hành vi y hệt trước, `index.html` nhỏ, offline ổn |
| 3 | Learning engine: schema v2, skills, mastery, ôn giãn cách, "Học hôm nay" | Test mastery/migrate xanh; bài tự đổi theo kết quả |
| 4 | Nội dung chặng 0 → 5 (làm dần, ưu tiên chặng 0–2) | Mỗi gói qua test schema + phụ huynh rà soát |
| 5 | Khu phụ huynh: cổng thống nhất, báo cáo tuần, sao lưu, nhiều hồ sơ | Xuất/nhập dữ liệu không mất sao/huy hiệu |
| 6 | Chất lượng & phát hành: offline iOS/Android, YouTube, accessibility, hiệu năng, CSP, CI | Checklist `AGENTS.md` mục 10 đạt toàn bộ |

**Thứ tự đề xuất:** P0 → P1 → (P2 song song nhẹ) → P3 → P4 chặng 0–2 → P5 → phần còn lại.
Mốc ngắn: sau Phase 1 là đã có bản dùng được cho bé; sau Phase 3 mới thật sự là "có lộ trình".

---

## 7. Đo lường thành công

Cho bé (quan sát, không thi):
- Tự mở app và chơi ≥ 10 phút/ngày, ≥ 4 ngày/tuần mà không phải nhắc.
- Ở cuối chặng, bé tự nhận ra đúng các chữ/số của chặng đó khi chơi ngoài app (hỏi miệng, nhìn biển hiệu).

Cho app:
- Tỉ lệ hoàn thành phiên ≥ 80%; tỉ lệ thoát giữa chừng thấp.
- Không có lỗi console; chạy offline; mở app < 3 giây trên thiết bị của bé.
- Không có request mạng ngoài danh sách đã duyệt.

---

## 8. Rủi ro & cách giảm

| Rủi ro | Giảm thiểu |
|--------|-----------|
| AI agent "sáng tạo" làm hỏng code đang chạy | `AGENTS.md` cấm viết lại; mỗi task nhỏ + test + tag baseline + commit nhỏ |
| Nội dung sai chính tả/dấu/phát âm | Phụ huynh rà soát trước khi `reviewed: true`; agent không đoán |
| Bé chán vì lặp lại | Đa dạng template, trò chơi tự do, sticker, câu chuyện; độ khó thích ứng |
| Ép bé học quá tay | Phiên 10–15 phút, giới hạn thời gian, không bảng xếp hạng/so sánh |
| Mất tiến độ khi đổi máy | Xuất/nhập JSON (P5-02) |
| Rò dữ liệu/nội dung lạ | Không tracker, video local, cổng phụ huynh cho link ngoài |
| Bản quyền hình/âm thanh | Ghi `ASSETS.md`, chỉ dùng tài nguyên có giấy phép rõ ràng |

---

## 9. Cách dùng bộ tài liệu này với Antigravity

1. Đặt `AGENTS.md`, `todo.md`, `PLAN.md` ở **thư mục gốc repo**.
2. Antigravity đọc `AGENTS.md` (và `GEMINI.md` nếu có) ở root như quy tắc cố định cho mỗi phiên. Quy tắc này chỉ là chỉ dẫn cho model, **không có cơ chế ép tuyệt đối** — nên các "chốt cứng" thật sự là: test, nhánh Git, tag baseline và việc bạn xem diff trước khi merge.
3. Prompt mở đầu mỗi phiên, ví dụ:
   > Đọc AGENTS.md và todo.md. Hôm nay làm task P1-03. Tóm tắt kế hoạch (≤ 5 dòng) và danh sách file sẽ sửa, chờ mình xác nhận rồi mới code.
4. Cuối phiên: yêu cầu agent cập nhật `todo.md` + `CHANGELOG.md` và báo cáo theo `AGENTS.md` mục 8.
