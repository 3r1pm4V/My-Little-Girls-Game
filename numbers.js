/**
 * numbers.js — Quản lý số đếm 1–10/20 và các phép tính hình
 * Tách từ app.js để tối ưu hóa bảo trì, module hóa và hiệu năng ứng dụng.
 */

// 1. TÊN ĐỌC SỐ TIẾNG VIỆT & TIẾNG ANH (0–20)
var NV = "không,một,hai,ba,bốn,năm,sáu,bảy,tám,chín,mười,mười một,mười hai,mười ba,mười bốn,mười lăm,mười sáu,mười bảy,mười tám,mười chín,hai mươi".split(",");
var NE = "zero,one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen,seventeen,eighteen,nineteen,twenty".split(",");
(function() {
  var viTens = ["", "", "hai mươi", "ba mươi", "bốn mươi", "năm mươi", "sáu mươi", "bảy mươi", "tám mươi", "chín mươi"];
  var enTens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
  for (var i = 21; i <= 99; i++) {
    var t = Math.floor(i / 10), u = i % 10;
    NV[i] = u === 0 ? viTens[t] : viTens[t] + " " + (u === 1 ? "mốt" : (u === 5 ? "lăm" : NV[u]));
    NE[i] = u === 0 ? enTens[t] : enTens[t] + "-" + NE[u];
  }
  NV[100] = "một trăm";
  NE[100] = "one hundred";
})();

// 2. DANH SÁCH ĐỒ VẬT ĐẾM HÌNH CHO BÉ (21 MẪU ĐỘC NHẤT CHO SỐ 0–20)
var COUNT = [
  "empty",
  "count_sun",        // 1: Mặt trời
  "count_cat",        // 2: Mèo Mimi
  "count_apple",      // 3: Táo đỏ
  "count_flower",     // 4: Bông hoa
  "count_star",       // 5: Ngôi sao
  "count_donut",      // 6: Bánh donut
  "count_grape",      // 7: Chùm nho
  "count_orange",     // 8: Quả cam
  "count_strawberry", // 9: Quả dâu tây
  "count_puppy",      // 10: Chú cún
  "count_balloon",    // 11: Bóng bay
  "count_icecream",   // 12: Cây kem
  "count_banana",     // 13: Quả chuối
  "count_bunny",      // 14: Chú thỏ
  "count_car",        // 15: Chiếc ô tô
  "count_kite",       // 16: Con diều
  "count_watermelon", // 17: Dưa hấu (khác 7 nho)
  "count_butterfly",  // 18: Bướm xinh (khác 8 cam)
  "count_rocket",     // 19: Tên lửa (khác 9 dâu)
  "count_heart"       // 20: Trái tim
];

var COUNT_LABELS = {
  count_sun: ["mặt trời", "suns"],
  count_cat: ["chú mèo", "cats"],
  count_apple: ["quả táo đỏ", "red apples"],
  count_flower: ["bông hoa", "flowers"],
  count_star: ["ngôi sao", "stars"],
  count_donut: ["bánh donut", "donuts"],
  count_grape: ["chùm nho", "grapes"],
  count_orange: ["quả cam", "oranges"],
  count_strawberry: ["quả dâu tây", "strawberries"],
  count_puppy: ["chú cún", "puppies"],
  count_balloon: ["bóng bay", "balloons"],
  count_icecream: ["cây kem", "ice creams"],
  count_banana: ["quả chuối", "bananas"],
  count_bunny: ["chú thỏ", "bunnies"],
  count_car: ["chiếc ô tô", "cars"],
  count_kite: ["con diều", "kites"],
  count_watermelon: ["miếng dưa hấu", "watermelons"],
  count_butterfly: ["chú bướm", "butterflies"],
  count_rocket: ["tên lửa", "rockets"],
  count_heart: ["trái tim", "hearts"]
};

// 3. TIỆN ÍCH PHÁT ÂM & HIỆU ỨNG CHẠM ĐẾM
var sayN = function(n) {
  say(NV[n], NE[n]);
};

function cnt(b, i) {
  sayN(i);
  b.style.animation = "none";
  void b.offsetWidth;
  b.style.animation = "pop .4s";
}

// 4. MÀN HÌNH HỌC SỐ ĐẾM 0–20 (numL) — DÀN TRANG 1 MÀN HÌNH CHUẨN KHÔNG CUỘN
function numL(n) {
  var isExplicitTap = (typeof n !== "undefined");
  if (typeof n === "undefined") n = 1;
  var o = COUNT[n] || COUNT[n % COUNT.length];
  if (typeof ST !== "undefined") {
    ST.numCount = (ST.numCount || 0) + 1;
    if (typeof svS === "function") svS();
    if (typeof checkBadges === "function") checkBadges();
  }
  var sizeCls = n <= 4 ? " objs-few" : (n <= 10 ? " objs-mid" : " objs-many");
  var objsHtml = n
    ? Array.from({ length: n }, function(_, i) {
        return '<button class="ob" onclick="cnt(this,' + (i + 1) + ')">' + im(o) + '</button>';
      }).join("")
    : '<div class="objs-empty-hint"><span>📦</span><span>' + T("Khay trống · Không có gì", "Empty Tray · Nothing") + '</span></div>';

  var chipsHtml = Array.from({ length: 21 }, function(_, i) {
    return '<button class="chip ' + (i == n ? "on" : "") + '" onclick="numL(' + i + ')">' + i + '</button>';
  }).join("");

  m.innerHTML = `<div class="home-container num-learning-container">${kbc([
    { s: "home", t: T("Trang chủ", "Home"), i: "🏠" },
    { t: T("Học số", "Numbers"), i: "🔢" }
  ], `<button class="pill" onclick="go('numP')">🎮 ${T("Chơi", "Play")}</button>`)}<div class="stage"><button class="nav" onclick="numL(${(n + 20) % 21})">${im("btn_back")}</button><button class="bignum${n > 9 ? " two" : ""}" onclick="sayN(${n})">${n}</button><button class="nav" onclick="numL(${(n + 1) % 21})">${im("btn_next")}</button></div><div class="word" onclick="sayN(${n})" role="button" tabindex="0" style="cursor:pointer" title="${T("Bấm để nghe đọc lại","Tap to listen again")}">🔊 ${NV[n]} · ${NE[n]}</div><div style="text-align:center;margin:2px 0 6px"><button class="pill" onclick="window.__traceFrom='numL';trm='nu';ls.set('trm','nu');trace('${n}')" style="background:#0284c7;color:#fff;font-weight:800;font-size:14px;padding:6px 18px;border:none;box-shadow:0 4px 10px rgba(2,132,199,0.25);border-radius:20px">✍️ ${T("Bé tập tô số " + n, "Trace number " + n)}</button></div><!-- KHU VỰC CHỪA SẴN CỐ ĐỊNH HIỂN THỊ ĐỒ VẬT ĐẾM (KHÔNG NHẢY BẬC BỐ CỤC) --><div class="objs${sizeCls}">${objsHtml}</div><div class="chips num-chips-bar" style="gap:6px">${chipsHtml}</div></div>`;

  if (isExplicitTap && (typeof isBackNav === "undefined" || !isBackNav)) sayN(n);
}

// 5. TRÒ CHƠI ĐỐ ĐẾM SỐ: CÓ BAO NHIÊU? (numP)
function numP() {
  if (!R(0, 2)) return numF();
  var maxObj = Math.min(MX(), 20);
  var n = R(1, maxObj), o = pick(COUNT.slice(1)), c = new Set([n]);
  while (c.size < 3) c.add(R(1, maxObj)); // Giới hạn hình ảnh <= 20 để màn hình gọn rõ
  var lbl = COUNT_LABELS[o] || ["hình", "items"];
  var qVi = "Bé hãy đếm xem có bao nhiêu " + lbl[0] + " rồi chọn số đúng bên dưới nhé!";
  var qEn = "Count the " + lbl[1] + " and tap the right number below!";
  quiz(
    T(qVi, qEn),
    qVi,
    qEn,
    '<div class="objs">' + Array.from({ length: n }, function() { return im(o, ""); }).join("").replace(/<img/g, '<img style="width:clamp(48px,11vw,72px)"') + '</div>',
    shuf(Array.from(c)).map(function(v) { return { k: v, h: '<span class="ans">' + v + '</span>' }; }),
    n,
    numP,
    function() { return ["", NV[n], NE[n]]; }
  );
}

// 6. TRÒ CHƠI TÌM SỐ ĐÚNG (numF)
function numF() {
  var n = R(0, MX()), c = new Set([n]);
  while (c.size < 3) c.add(R(0, MX()));
  var qVi = "Bé hãy tìm và chạm vào số " + (NV[n] || n) + " nhé!";
  var qEn = "Find and tap the number " + (NE[n] || n) + "!";
  quiz(
    T(qVi, qEn),
    qVi,
    qEn,
    "",
    shuf(Array.from(c)).map(function(v) { return { k: v, h: '<span class="ans">' + v + '</span>' }; }),
    n,
    numP,
    function() { return ["", NV[n] || String(n), NE[n] || String(n)]; }
  );
}

// 7. TRÒ CHƠI SO SÁNH NHIỀU HƠN / ÍT HƠN / BẰNG NHAU (cmp)
function cmp() {
  var a = R(1, Math.min(MX(), 10)), b = R(1, Math.min(MX(), 10));
  if (!R(0, 3)) b = a;
  var more = (R(0, 1) === 0), o1 = pick(COUNT.slice(1)), o2 = pick(COUNT.slice(1));
  var right = (a === b) ? "eq" : (more ? (a > b ? "a" : "b") : (a < b ? "a" : "b"));
  var grp = function(n, o) {
    return '<div class="grp">' + Array.from({ length: n }, function() { return im(o); }).join("") + '</div>';
  };
  var q = more
    ? ["Bé hãy đếm và chọn bên có NHIỀU hình hơn nhé!", "Count and tap the side with MORE!"]
    : ["Bé hãy đếm và chọn bên có ÍT hình hơn nhé!", "Count and tap the side with FEWER!"];

  quiz(
    T(q[0], q[1]),
    q[0],
    q[1],
    "",
    [
      { k: "a", h: grp(a, o1) },
      { k: "eq", h: '<span class="ans">=</span>' + T("Bằng nhau", "Same") },
      { k: "b", h: grp(b, o2) }
    ],
    right,
    cmp,
    function() {
      if (a === b) {
        return ['<div class="eq">' + a + ' = ' + b + '</div>', NV[a] + ' bằng ' + NV[b] + '. Hai bên cân bằng nhau thật đẹp!', NE[a] + ' equals ' + NE[b] + '. They are the same!'];
      }
      var w = (right === "a" ? a : b), l = (right === "a" ? b : a);
      return [
        '<div class="eq">' + a + ' ' + (a > b ? ">" : "<") + ' ' + b + '</div>',
        more ? (NV[w] + ' đông vui hơn!') : (NV[w] + ' ít hơn một chút!'),
        NE[w] + ' is ' + (more ? "more" : "fewer") + ' than ' + NE[l]
      ];
    },
    "cmp"
  );
}

// 8. TRÒ CHƠI CHỌN DẤU SO SÁNH > = < (cmpS)
function cmpS() {
  var mx = MX();
  var numericMode = (mx > 20 && R(0, 3) > 0);
  var a, b;
  if (numericMode) {
    a = R(11, mx);
    if (!R(0, 4)) {
      b = a;
    } else if (!R(0, 3) && a >= 12 && a <= 99 && (a % 10) !== Math.floor(a / 10)) {
      var swapped = (a % 10) * 10 + Math.floor(a / 10);
      b = swapped <= mx ? swapped : R(11, mx);
    } else {
      b = R(11, mx);
    }
  } else {
    a = R(1, Math.min(mx, 10));
    b = R(1, Math.min(mx, 10));
    if (!R(0, 3)) b = a;
  }
  var o1 = pick(COUNT.slice(1)), o2 = pick(COUNT.slice(1));
  var g = function(n, o) {
    if (numericMode) {
      return '<div style="flex:0 1 auto;min-width:96px;padding:12px 24px;background:#fff;border:3px solid #cbd5e1;border-radius:22px;font-size:clamp(46px,10vw,74px);font-weight:900;color:#1e293b;text-align:center;box-shadow:0 6px 14px rgba(15,23,42,0.08)">' + n + '</div>';
    }
    return '<div class="grp" style="flex:1">' + Array.from({ length: n }, function() { return im(o); }).join("") + '</div>';
  };
  var s = (a > b ? ">" : (a < b ? "<" : "="));

  quiz(
    T("Bé hãy so sánh hai bên rồi chọn dấu (> , = , <) đúng nhé!", "Compare both sides and tap the right sign (> , = , <)!"),
    "Chọn chiếc cầu đúng nối hai bên nhé!",
    "Pick the right sign",
    '<div class="stage" style="gap:10px">' + g(a, o1) + '<span style="font-size:64px;font-weight:800;color:var(--acc)">?</span>' + g(b, o2) + '</div>',
    [">", "=", "<"].map(function(v) {
      return { k: v, h: '<span class="ans">' + (v === ">" ? "&gt;" : (v === "<" ? "&lt;" : "=")) + '</span>' };
    }),
    s,
    cmpS,
    function() {
      var nvA = NV[a] || String(a), nvB = NV[b] || String(b);
      var neA = NE[a] || String(a), neB = NE[b] || String(b);
      return [
        '<div class="eq">' + a + ' ' + s + ' ' + b + '</div>',
        (a === b) ? (nvA + ' bằng ' + nvB + '. Hai bên cân bằng nhau thật đẹp!') : (a > b ? (nvA + ' lớn hơn ' + nvB + '!') : (nvA + ' bé hơn ' + nvB + '!')),
        (a === b) ? (neA + ' equals ' + neB) : (neA + ' is ' + (a > b ? "greater" : "less") + ' than ' + neB)
      ];
    }
  );
}

// 9. TRÒ CHƠI SỐ CÒN THIẾU TRONG DÃY: ĐOÀN TÀU SÂU RÓM & BÓNG BAY SỐ (mis)
function mis() {
  // Hỗ trợ dãy số tới 100 theo cài đặt phụ huynh; bước nhảy 1, 2, 5 hoặc 10
  var rangeMax = (typeof window !== "undefined" && typeof window.getNumberRangeMax === "function") ? window.getNumberRangeMax() : 100;
  var mx = Math.max(5, rangeMax);
  var step = 1;
  if (mx >= 50) step = pick([1, 1, 2, 5, 10]);
  else if (mx >= 10 && R(0, 3) === 0) step = 2;
  var s;
  if (step === 5 || step === 10) {
    var maxMult = Math.max(1, Math.floor((mx - 4 * step) / step));
    s = R(1, maxMult) * step;
  } else {
    s = R(1, Math.max(1, mx - 4 * step));
  }
  var h = R(1, 3), n = s + h * step, c = new Set([n]);
  var offsets = [-step, step, -1, 1, -2, 2, -10, 10];
  var guard = 0;
  while (c.size < 4 && guard < 30) {
    guard++;
    var cand = guard < 15 ? (n + pick(offsets)) : R(1, mx);
    if (cand >= 1 && cand <= mx && cand !== n) c.add(cand);
  }
  while (c.size < 4) c.add(R(1, mx));
  var isCaterpillar = R(0, 1) === 0;
  var objsHtml = isCaterpillar
    ? '<div class="rv-caterpillar-wrap" style="margin:10px auto">' +
        '<div class="rv-caterpillar-head">🐛</div>' +
        [0, 1, 2, 3, 4].map(function(i) {
          var isMys = (i == h);
          return '<div class="rv-caterpillar-body' + (isMys ? ' mystery' : '') + '"><span>' + (isMys ? "?" : (s + i * step)) + '</span></div>';
        }).join("") +
      '</div>'
    : '<div class="rv-balloons-seq-wrap" style="margin:10px auto">' +
        [0, 1, 2, 3, 4].map(function(i) {
          var isMys = (i == h);
          return '<div class="rv-seq-balloon' + (isMys ? ' mystery' : '') + '"><span>' + (isMys ? "?" : (s + i * step)) + '</span></div>';
        }).join("") +
      '</div>';

  var misQVi = isCaterpillar
    ? "Đoàn tàu sâu róm thiếu một toa rồi! Bé tìm giúp số còn thiếu nhé!"
    : "Quả bóng bay nào đang vắng mặt? Bé đoán xem đó là số mấy?";

  quiz(
    T("Bé hãy tìm số còn thiếu để điền vào dấu hỏi (?) nhé!", "Find the missing number for the (?) spot!"),
    misQVi,
    "Which number is missing?",
    objsHtml,
    shuf(Array.from(c)).map(function(v) { return { k: v, h: '<span class="ans">' + v + '</span>' }; }),
    n,
    mis,
    function() { return ["", "Giỏi lắm! Số " + (NV[n] || String(n)) + " đã xuất hiện rồi!", NE[n] || String(n)]; }
  );
}

// 10. PHÉP TOÁN HÌNH PHẠM VI 10 (math10)
function math10() {
  var isAdd = (lvl === 1 ? true : (R(0, 1) === 0));
  var a, b, res;
  if (isAdd) {
    var maxAdd = (lvl === 1 ? 5 : 10);
    a = R(1, maxAdd - 1);
    b = R(1, maxAdd - a);
    res = a + b;
  } else {
    var maxSub = (lvl === 1 ? 5 : 10);
    a = R(2, maxSub);
    b = R(1, a - 1);
    res = a - b;
  }
  var op = isAdd ? "+" : "-", o = pick(COUNT.slice(1));
  var c = new Set([res]);
  while (c.size < 3) { c.add(R(1, 10)); }

  var qVi = isAdd ? (NV[a] + " cộng " + NV[b] + " bằng mấy?") : (NV[a] + " trừ " + NV[b] + " bằng mấy?");
  var qEn = isAdd ? ("What is " + NE[a] + " plus " + NE[b] + "?") : ("What is " + NE[a] + " minus " + NE[b] + "?");
  var grp = function(n) {
    return '<span style="display:inline-flex;flex-wrap:wrap;gap:2px;max-width:130px;justify-content:center">' +
      Array.from({ length: n }, function() { return im(o, ""); }).join("").replace(/<img/g, '<img style="width:34px">') +
    '</span>';
  };
  var visual = '<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin:8px auto">' +
    grp(a) + '<b style="font-size:44px;color:var(--acc)">' + op + '</b>' + grp(b) + '<b style="font-size:44px;color:var(--acc)">= ?</b>' +
  '</div>';

  quiz(
    T(a + " " + op + " " + b + " = ?", a + " " + op + " " + b + " = ?"),
    qVi,
    qEn,
    visual,
    shuf(Array.from(c)).map(function(v) { return { k: v, h: '<span class="ans">' + v + '</span>' }; }),
    res,
    math10,
    function() {
      return [
        '<div class="eq">' + a + ' ' + op + ' ' + b + ' = ' + res + '</div>',
        qVi.replace("bằng mấy?", "bằng") + " " + NV[res] + "!",
        qEn.replace("What is ", "").replace("?", " equals") + " " + NE[res] + "!"
      ];
    }
  );
}

// 11. GẮN CÁC BIẾN VÀ HÀM LÊN WINDOW ĐỂ TRUY CẬP TOÀN CỤC
if (typeof window !== "undefined") {
  window.NV = NV;
  window.NE = NE;
  window.COUNT = COUNT;
  window.sayN = sayN;
  window.cnt = cnt;
  window.numL = numL;
  window.numP = numP;
  window.numF = numF;
  window.cmp = cmp;
  window.cmpS = cmpS;
  window.mis = mis;
  window.math10 = math10;
}
