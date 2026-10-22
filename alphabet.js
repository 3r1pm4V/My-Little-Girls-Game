/**
 * alphabet.js — Quản lý 29 chữ cái Tiếng Việt & Bộ hình sticker minh họa
 * Tách từ app.js để tối ưu hóa bảo trì, module hóa và hiệu năng ứng dụng.
 */

// 1. TỪ ĐIỂN ĐỒ VẬT / CON VẬT MINH HỌA (52 MỤC)
var OBJ = {};
"ant|ant|kiến;apple|apple|quả táo;ball|ball|quả bóng;bear|bear|con gấu;car|car|xe hơi;cat|cat|con mèo;dog|dog|con chó;donut|donut|bánh donut;egg|egg|quả trứng;elephant|elephant|con voi;flower|flower|bông hoa;frog|frog|con ếch;gift|gift|hộp quà;grape|grape|chùm nho;hat|hat|cái mũ;house|house|ngôi nhà;ice_cream|ice cream|cây kem;igloo|igloo|nhà băng;jelly|jelly|thạch;juice|juice|nước ép;key|key|chìa khóa;kite|kite|con diều;leaf|leaf|chiếc lá;lion|lion|sư tử;mango|mango|quả xoài;moon|moon|mặt trăng;nest|nest|tổ chim;notebook|notebook|quyển vở;octopus|octopus|bạch tuộc;orange|orange|quả cam;panda|panda|gấu trúc;pencil|pencil|bút chì;queen|queen|nữ hoàng;quill|quill|bút lông;rainbow|rainbow|cầu vồng;rocket|rocket|tên lửa;star|star|ngôi sao;sun|sun|mặt trời;train|train|tàu hỏa;tree|tree|cái cây;umbrella|umbrella|cái ô;unicorn|unicorn|kỳ lân;vase|vase|bình hoa;volcano|volcano|núi lửa;watermelone|watermelon|dưa hấu;whale|whale|cá voi;x-ray|x-ray|ảnh X-quang;xylophone|xylophone|đàn xylophone;yacht|yacht|du thuyền;yo-yo|yo-yo|yo-yo;zebra|zebra|ngựa vằn;zipper|zipper|khóa kéo".split(";").forEach(function(s){
  var parts = s.split("|");
  var k = parts[0], e = parts[1], v = parts[2];
  OBJ[k] = { en: e, vi: v, L: k[0].toUpperCase() };
});

// 2. BẢNG CHỮ CÁI TIẾNG VIỆT & TIẾNG ANH
var LET_VI = "A,Ă,Â,B,C,D,Đ,E,Ê,G,H,I,K,L,M,N,O,Ô,Ơ,P,Q,R,S,T,U,Ư,V,X,Y".split(",");
var LET_EN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
var LET_ALL = function() {
  var curLang = (typeof lang !== "undefined") ? lang : "vi";
  return curLang === "en" ? LET_EN : LET_VI;
};
var LET = LET_VI;
var LV = "a,ă,â,b,c,d,đ,e,ê,g,h,i,k,l,m,n,o,ô,ơ,p,q,r,s,t,u,ư,v,x,y".split(",");
var byL = function(L) { return Object.keys(OBJ).filter(function(k) { return OBJ[k].L === L; }); };
var HARD = new Set(["quill", "x-ray", "yacht", "igloo", "jelly"]);
var NOPLAY = "QXYZ";
var PO = Object.keys(OBJ).filter(function(k) { return !HARD.has(k) && !NOPLAY.includes(OBJ[k].L); });
var PL = LET_EN.filter(function(L) { return PO.some(function(k) { return OBJ[k].L === L; }); });
var byP = function(L) { return PO.filter(function(k) { return OBJ[k].L === L; }); };

// 3. DANH SÁCH 29 CHỮ CÁI TIẾNG VIỆT KÈM STICKER & TỪ MINH HỌA
var VT = "A|vocab_anh_trai|Anh trai;A|vocab_ao_mua|Áo mưa;A|👕|Áo phông;Ă|📡|Ăng-ten;Ă|🔋|Ắc-quy;Â|🫖|Ấm trà;Â|vocab_am_thanh|Âm nhạc;B|vocab_ba_me|Ba mẹ;B|vocab_bup_be|Búp bê;B|vocab_banh_mi|Bánh mì;C|cat|Con mèo;C|vocab_ca_rot|Cà rốt;C|vocab_cai_bat|Cái bát;D|watermelone|Dưa hấu;D|🥥|Dừa xiêm;D|🥒|Dưa chuột;Đ|e_lamp|Đèn ngủ;Đ|👟|Đôi giày;Đ|vocab_dong_ho|Đồng hồ;E|e_baby|Em bé;E|k_bird|Én bạc;Ê|frog|Ếch con;Ê|📐|Ê-ke;G|bear|Gấu bông;G|🐓|Gà trống;G|🪑|Ghế ngồi;H|flower|Hoa hồng;H|🌾|Hạt gạo;H|gift|Hộp quà;I|🧂|I-ốt;I|🥄|Inox;K|k_candy|Kẹo ngọt;K|vocab_khan_mat|Khăn mặt;K|vocab_kinh_mat|Kính mắt;L|k_pig|Lợn con;L|leaf|Lá cây;L|🥛|Ly nước;M|👩‍👧|Mẹ hiền;M|☁️|Mây trắng;M|🏹|Mũi tên;N|house|Nhà cửa;N|vocab_non_la|Nón lá;N|🧃|Nước uống;O|e_bee|Ong mật;O|🦅|Ó biển;Ô|car|Ô tô;Ô|umbrella|Ô dù;Ô|🐌|Ốc sên;Ơ|🌶️|Ớt đỏ;Ơ|🫑|Ớt chuông;P|🍜|Phở bò;P|✉️|Phong bì;P|🎹|Piano;Q|apple|Quả táo;Q|gift|Quà tặng;Q|🪭|Quạt nan;R|k_turtle|Rùa con;R|🐍|Rắn con;R|🧺|Rổ rá;S|🥛|Sữa tươi;S|k_book|Sách truyện;S|🐛|Sâu bướm;T|train|Tàu hỏa;T|🍉|Trái cây;T|📺|Tivi;U|👢|Ủng đi mưa;U|🦆|Uyên ương;Ư|🦅|Ưng con;Ư|🌱|Ươm mầm;V|duck|Vịt con;V|elephant|Voi con;V|👗|Váy đầm;X|🚲|Xe đạp;X|🛝|Xích đu;X|🌭|Xúc xích;Y|🐦|Yến phụng;Y|👩‍⚕️|Y tá;Y|🥣|Yến mạch".split(";");

// 4. BẢNG TỪ MINH HỌA TỔNG HỢP EXA
var EXA = {};
Object.keys(OBJ).forEach(function(k) {
  EXA[k] = { img: k, t: OBJ[k].en, L: OBJ[k].L, l: "en", hard: HARD.has(k) || NOPLAY.includes(OBJ[k].L) };
});
VT.forEach(function(s, i) {
  var parts = s.split("|");
  var L = parts[0], img = parts[1], t = parts[2];
  EXA["v" + i] = { img: img, t: t, L: L, l: "vi", hard: false };
});

var exL = function(L, l) {
  return Object.keys(EXA).filter(function(k) { return EXA[k].l === l && EXA[k].L === L; });
};
var exP = function(l) {
  return Object.keys(EXA).filter(function(k) { return EXA[k].l === l && !EXA[k].hard; });
};
var exPL = function(l) {
  return (l === "vi" ? LET_VI : LET_EN).filter(function(L) {
    return exP(l).some(function(k) { return EXA[k].L === L; });
  });
};
var exPK = function(l, L) {
  return exP(l).filter(function(k) { return EXA[k].L === L; });
};
var exLD = function(L) {
  var v = exL(L, "vi"), e = exL(L, "en");
  var curLang = (typeof lang !== "undefined") ? lang : "vi";
  return curLang === "vi"
    ? (v.length ? v.slice(0, 3) : e.slice(0, 2))
    : curLang === "en"
      ? e.slice(0, 3)
      : [].concat(v.slice(0, 2), e.slice(0, 2));
};

var sayAs = function(l, vi, en) {
  var o = (typeof ql !== "undefined") ? ql : null;
  if (typeof ql !== "undefined") ql = l;
  say(vi, en);
  if (typeof ql !== "undefined") ql = o;
};

// 5. HIỂN THỊ SPRITE / STICKER MINH HỌA
var spr = function(k, z) {
  var curLang = (typeof lang !== "undefined") ? lang : "vi";
  if (curLang === "vi" && LET_VI.includes(k)) {
    return '<span class="let-vn-big" style="min-height:' + z + '">' + k + '</span>';
  }
  var key = curLang === "en" ? k : ((typeof I !== "undefined" && I["vi_" + k]) ? "vi_" + k : k);
  var alt = (typeof ALT_MAP !== "undefined" && ALT_MAP[key]) || (OBJ[key] ? OBJ[key].vi : key);
  if (typeof I !== "undefined" && I["s_" + key]) {
    return '<span class="spr" style="--z:' + z + ';background-image:url(' + I["s_" + key] + ')" role="img" aria-label="' + alt + '"></span>';
  }
  if (typeof I !== "undefined" && I[key]) {
    return '<img class="spf" data-sk="' + key + '" data-z="' + z + '" src="' + I[key] + '" style="height:' + z + '" alt="' + alt + '">';
  }
  return '<span class="spr-emoji" style="font-size:calc(' + z + ' * 0.82);line-height:1;display:inline-flex;align-items:center;justify-content:center;height:' + z + ';width:' + z + '" role="img" aria-label="' + alt + '">' + k + '</span>';
};

function upSpr() {
  if (typeof m === "undefined" || !m) return;
  m.querySelectorAll("img.spf").forEach(function(e) {
    var k = e.dataset.sk;
    if (typeof I === "undefined" || !I["s_" + k]) return;
    var s = document.createElement("span");
    s.className = "spr";
    s.style.cssText = "--z:" + e.dataset.z + ";background-image:url(" + I["s_" + k] + ")";
    e.replaceWith(s);
  });
}

function rp(b) {
  var s = b.querySelector(".spr");
  if (s) {
    s.style.animation = "none";
    void s.offsetWidth;
    s.style.animation = "";
  }
}

// 6. MÀN HÌNH BẢNG CHỮ CÁI (letL)
function letL() {
  var arr = LET_ALL();
  m.innerHTML = kbc([
    { s: "home", t: T("Trang chủ", "Home"), i: "🏠" },
    { t: T("Chữ cái", "Letters"), i: "🔤" }
  ], '<button class="pill" onclick="go(\'letP\')">🎮 ' + T("Chơi", "Play") + '</button>') +
  '<h2 id="letLQ" role="button" tabindex="0" onclick="say(\'Chạm vào chữ cái nhé\',\'Tap a letter\')" style="cursor:pointer" title="' + T("Bấm để nghe đọc lại", "Tap to listen again") + '">🔊 ' + T("Chạm vào chữ cái", "Tap a letter") + '</h2>' +
  '<div class="lgrid">' + arr.map(function(L) { return '<button onclick="go(\'letD\',\'' + L + '\')">' + imL(L) + '</button>'; }).join("") + '</div>';
  sayPrompt("letL", "Chạm vào chữ cái nhé", "Tap a letter", 180000);
  need("s");
}

// 7. MÀN HÌNH CHI TIẾT 1 CHỮ CÁI (letD)
function letD(L) {
  var arr = LET_ALL(), i = arr.indexOf(L), it = exLD(L);
  var curLang = (typeof lang !== "undefined") ? lang : "vi";
  var fb = curLang === "vi" && !exL(L, "vi").length;
  if (typeof ST !== "undefined") {
    ST.letCount = (ST.letCount || 0) + 1;
    if (typeof svS === "function") svS();
    if (typeof checkBadges === "function") checkBadges();
  }
  m.innerHTML = kbc([
    { s: "home", t: T("Trang chủ", "Home"), i: "🏠" },
    { s: "letL", t: T("Chữ cái", "Letters"), i: "🔤" },
    { t: T("Chữ " + L, "Letter " + L), i: "✨" }
  ]) +
  '<div class="stage">' +
    '<button class="nav" onclick="letD(\'' + arr[(i + arr.length - 1) % arr.length] + '\')">' + im("btn_back") + '</button>' +
    '<button onclick="sayAs(\'' + (curLang === "vi" ? "vi" : "en") + '\',\'' + L + '\',\'' + L + '\');rp(this)">' + spr(L, "clamp(120px,25vw,190px)") + '</button>' +
    '<button class="nav" onclick="letD(\'' + arr[(i + 1) % arr.length] + '\')">' + im("btn_next") + '</button>' +
  '</div>' +
  '<div style="text-align:center;margin:6px 0 10px">' +
    '<button class="pill" onclick="window.__traceFrom=\'letD\';trm=getGroupForLetter(\'' + L + '\');ls.set(\'trm\',trm);trace(\'' + L.toLowerCase() + '\')" style="background:#ec4899;color:#fff;font-weight:800;font-size:15px;padding:8px 20px;border:none;box-shadow:0 4px 12px rgba(236,72,153,0.3);border-radius:24px">✍️ ' + T("Bé tập tô chữ " + L, "Trace letter " + L) + '</button>' +
  '</div>' +
  (fb ? '<div class="note">' + T("Chữ " + L + " ít dùng trong tiếng Việt, thường gặp ở từ mượn. Mình xem từ tiếng Anh nhé", "The letter " + L + " is rare in Vietnamese. Here are English words") + '</div>' : "") +
  '<div class="pair">' + it.map(function(k) {
    var x = EXA[k];
    return '<button onclick="sayAs(\'' + x.l + '\',\'' + x.t + '\',\'' + x.t + '\');rp(this)">' +
      spr(x.img, "100px") +
      '<span>' + x.t + '</span>' +
      ((curLang === "both" || x.l !== curLang) ? '<small>' + (x.l === "vi" ? "🇻🇳" : "🇬🇧") + '</small>' : "") +
    '</button>';
  }).join("") + '</div>';
  sayAs(curLang === "vi" ? "vi" : "en", L, L);
  need("s").then(upSpr);
}

// 8. ĐỌC TÊN CHỮ CÁI VÀ CÁC TỪ VÍ DỤ (sayL)
function sayL(L) {
  var curLang = (typeof lang !== "undefined") ? lang : "vi";
  if (curLang === "en") {
    var itE = exLD(L), eWords = itE.filter(function(k) { return EXA[k].l === "en"; }).map(function(k) { return EXA[k].t; });
    say(L, L + (eWords.length ? ". " + eWords.join(". ") : ""));
    return;
  }
  var it = exLD(L);
  var v = it.filter(function(k) { return EXA[k].l === "vi"; }).map(function(k) { return EXA[k].t; });
  var e = it.filter(function(k) { return EXA[k].l === "en"; }).map(function(k) { return EXA[k].t; });
  var fb = curLang === "vi" && !v.length;
  say(L + (v.length ? ". " + v.join(". ") : ""), L + (!fb && e.length ? ". " + e.join(". ") : ""));
}

// 9. TRÒ CHƠI ĐỐ CHỮ CÁI (letP)
function letP() {
  if (!R(0, 2)) return letO();
  var l = (typeof qL === "function") ? qL() : "vi";
  if (typeof ql !== "undefined") ql = l;
  var k = pick(exP(l)), L = EXA[k].L, c = new Set([L]);
  while (c.size < 3) c.add(pick(exPL(l)));
  quiz(
    T("Chữ cái đầu tiên là gì?", "What letter does it start with?"),
    "Chữ cái đầu tiên là gì?",
    "What letter does it start with?",
    im(EXA[k].img, "big"),
    shuf(Array.from(c)).map(function(v) { return { k: v, h: imL(v) }; }),
    L,
    letP,
    function() {
      return [
        "",
        l === "vi" ? (LET_VI.indexOf(L) >= 0 ? LV[LET_VI.indexOf(L)] : L) + ". " + EXA[k].t : "",
        l === "en" ? L + ". " + EXA[k].t : ""
      ];
    }
  );
}

// 10. TRÒ CHƠI ĐOÁN ĐỒ VẬT THEO CHỮ CÁI (letO)
function letO() {
  var l = (typeof qL === "function") ? qL() : "vi";
  if (typeof ql !== "undefined") ql = l;
  var L = pick(exPL(l)), k = pick(exPK(l, L)), c = new Set([k]);
  while (c.size < 3) {
    var o = pick(exP(l));
    if (EXA[o].L !== L) c.add(o);
  }
  quiz(
    T("Hình nào bắt đầu bằng chữ " + L + "?", "Which starts with " + L + "?"),
    "Hình nào bắt đầu bằng chữ " + LV[LET.indexOf(L)] + "?",
    "Which one starts with " + L + "?",
    imL(L, "big"),
    shuf(Array.from(c)).map(function(v) { return { k: v, h: im(EXA[v].img) }; }),
    k,
    letP,
    function() {
      return [
        "",
        l === "vi" ? LV[LET.indexOf(L)] + ". " + EXA[k].t : "",
        l === "en" ? L + ". " + EXA[k].t : ""
      ];
    }
  );
}

// 11. GẮN CÁC BIẾN VÀ HÀM LÊN WINDOW ĐỂ TRUY CẬP TOÀN CỤC
if (typeof window !== "undefined") {
  window.OBJ = OBJ;
  window.LET_VI = LET_VI;
  window.LET_EN = LET_EN;
  window.LET_ALL = LET_ALL;
  window.LET = LET;
  window.LV = LV;
  window.byL = byL;
  window.HARD = HARD;
  window.NOPLAY = NOPLAY;
  window.PO = PO;
  window.PL = PL;
  window.byP = byP;
  window.VT = VT;
  window.EXA = EXA;
  window.exL = exL;
  window.exP = exP;
  window.exPL = exPL;
  window.exPK = exPK;
  window.exLD = exLD;
  window.sayAs = sayAs;
  window.spr = spr;
  window.upSpr = upSpr;
  window.rp = rp;
  window.letL = letL;
  window.letD = letD;
  window.sayL = sayL;
  window.letP = letP;
  window.letO = letO;
}
