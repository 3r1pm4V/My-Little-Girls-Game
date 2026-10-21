/**
 * spelling.js — Quản lý bộ ghép vần tiếng Việt & Luyện đọc
 * Tách từ app.js để tối ưu hóa bảo trì, module hóa và hiệu năng ứng dụng.
 */

var curTone = 0;
var readTab = "spell", curC = "b", curV = "a", curLes = 1, curStory = 0;

// 1. DANH SÁCH VIDEO BÀI GIẢNG CÔ LAN ANH (YOUTUBE EMBED IDs)
var CO_LAN_ANH_CONSONANTS = {
  "b": "bicX1RNzHos", "c": "uP9Ri14I28o", "d": "SqjCwJRONfU", "đ": "4c7ApUvxNKk",
  "g": "5AIIGSfthV8", "k": "kdrjFqjp9NY", "kh": "Pq6pxF1l2vg", "m": "UqfYtYRHmpY",
  "n": "477qRox5TWA", "ng": "82YileKSdiI", "nh": "6tHKEPP-sYU", "x": "4bq-lpEQI7U"
};

var CO_LAN_ANH_LESSONS = {
  1: "YLM9IUypgqQ", 2: "ww5wazKT7Ck", 3: "iEPpruHON1w", 4: "-O8EgkNBARE",
  5: "aqsjf0zKbXQ", 6: "2P0sVhYOvCw", 7: "kXk2vyXFXFY", 8: "czZBOWlGlaE",
  9: "6zfx2E3jizM", 10: "zJPfge__mUE", 11: "dojtsCRfbfU", 12: "FohTBERmiZc",
  13: "8560ssT_ing", 14: "Ag0Lt6Yvpkc", 15: "SHA2WEoc1js", 16: "JNhEKiIESlU",
  17: "hWy3TdFUAYA", 18: "d1TePylBOLQ", 19: "85TMOE5Npzo", 20: "U9FTdd6eBwA",
  21: "cIinEyjGUQ8", 22: "-15lFJeyxMc", 23: "jsDx9X1nwS0", 24: "D3KgV4yfagM",
  25: "04w8wNfFliw", 26: "YJ8Ms45Ttio", 27: "_9mHo5uIlvA", 28: "y2bFgBHTxUk"
};

// 2. PHÁT ÂM PHỤ ÂM
function playConsonant(c, r) {
  var cFile = (c === "đ" ? "dd" : c);
  var consKey = "cons_" + cFile;
  var target = (window.AUDIO_MAP && (window.AUDIO_MAP[consKey] || window.AUDIO_MAP["cons_" + c] || window.AUDIO_MAP[r])) || ("audio/alpha_vi_" + cFile + ".mp3");
  playSafeAudio(target, "Tưởng Vy");
}

// 3. PHÁT ÂM NGUYÊN ÂM
function playVowel(v) {
  var vNormMap = { "a": "a", "e": "e", "ê": "ee", "i": "i", "o": "o", "ô": "oo", "ơ": "ow", "u": "u", "ư": "uw" };
  var vFile = vNormMap[v] || v;
  var target = (window.AUDIO_MAP && (window.AUDIO_MAP[v] || window.AUDIO_MAP["vi|" + v])) || ("audio/alpha_vi_" + vFile + ".mp3");
  playSafeAudio(target, "Tưởng Vy");
}

// 4. PHÁT ÂM TIẾNG GHÉP HOÀN CHỈNH
function playSyllable(text, c, v, toneIdx, spellText) {
  curTone = toneIdx;
  var headEl = document.querySelector(".spell-head");
  if (headEl) {
    headEl.innerHTML = '<span>' + c + '</span><span style="color:var(--acc2)">+</span><span>' + v + '</span><span style="color:var(--ok)">=</span><span style="font-size:1.15em;text-decoration:underline;color:var(--acc)">' + text + '</span>';
  }
  var subEl = document.querySelector(".spell-sub");
  if (subEl) {
    subEl.innerHTML = '🔊 Đánh vần: <b>' + spellText + '</b>';
    subEl.onclick = function() { playSpell(c, v, toneIdx, text, spellText); };
  }
  document.querySelectorAll(".syl-btn").forEach(function(btn, i) {
    btn.classList.toggle("active", i === toneIdx);
    btn.classList.toggle("on", i === toneIdx);
  });
  var sylKey = "syl_" + c + "_" + v + "_" + toneIdx;
  var target = (window.AUDIO_MAP && (window.AUDIO_MAP[text] || window.AUDIO_MAP["vi|" + text] || window.AUDIO_MAP[sylKey])) || ("audio/" + sylKey + ".mp3");
  playSafeAudio(target, "Tưởng Vy");
}

// 5. ĐÁNH VẦN TỪNG BƯỚC (COMPOSITE AUDIO SEQUENCER HOẶC AUDIO ĐƠN)
function playSpell(c, v, toneIdx, finalWord, spellText) {
  A.pause(); A.onended = null; A.onerror = null;
  if (SS) { try { SS.cancel(); } catch(e){} }
  var my = ++tok;
  busy = true;

  var lananhKey = "lananh_spell_" + c + "_" + v + "_" + toneIdx;
  var spellKey = "spell_" + c + "_" + v + "_" + toneIdx;
  var spoken = spellText.replace(/\s*-\s*/g, " ").trim();
  var subEl = document.querySelector(".spell-sub");
  if (subEl) {
    subEl.innerHTML = '🔊 Đánh vần: <b style="color:var(--ok);font-size:1.15em">▶ ' + spellText + '</b>';
  }
  var fin = function() {
    if (my === tok) {
      busy = false;
      busyEnd = Date.now();
      if (subEl) subEl.innerHTML = '🔊 Đánh vần: <b>' + spellText + '</b>';
    }
  };

  // 1. Nếu có file âm thanh trọn câu (Cô Lan Anh hoặc VieNeu TTS)
  var map = window.AUDIO_MAP || {};
  var targetAudio = map[lananhKey] || map[spellKey] || map[spoken] || map["vi|" + spoken] || getAudio(spoken);
  if (targetAudio && typeof targetAudio === "string" && (targetAudio.startsWith("audio/") || targetAudio.startsWith("http"))) {
    playSafeAudio(targetAudio, "Tưởng Vy", fin);
    return;
  }

  // 2. Ghép chuỗi âm thanh sư phạm tự nhiên (Composite Audio Sequencer)
  var cFile = (c === "đ" ? "dd" : c);
  var vNormMap = { "a": "a", "e": "e", "ê": "ee", "i": "i", "o": "o", "ô": "oo", "ơ": "ow", "u": "u", "ư": "uw" };
  var vFile = vNormMap[v] || v;
  var toneFiles = ["tone_khong_dau.mp3", "tone_huyen.mp3", "tone_sac.mp3", "tone_hoi.mp3", "tone_nga.mp3", "tone_nang.mp3"];

  var seq = [
    "audio/alpha_vi_" + cFile + ".mp3",
    "audio/alpha_vi_" + vFile + ".mp3",
    "audio/syl_" + c + "_" + v + "_0.mp3"
  ];

  if (toneIdx > 0 && toneIdx < toneFiles.length) {
    seq.push("audio/" + toneFiles[toneIdx]);
    seq.push("audio/syl_" + c + "_" + v + "_" + toneIdx + ".mp3");
  }

  var step = 0;
  function playNext() {
    if (my !== tok) return;
    if (step >= seq.length) {
      fin();
      return;
    }
    var currentSrc = seq[step++];
    A.onended = function() {
      if (my !== tok) return;
      setTimeout(playNext, 120);
    };
    A.onerror = function() {
      if (my !== tok) return;
      playNext();
    };
    A.src = currentSrc;
    A.play().catch(function() {
      if (my !== tok) return;
      playNext();
    });
  }

  playNext();
}

// 6. CHỌN PHỤ ÂM
function pickConsonant(c, r) {
  curC = c;
  curTone = 0;
  if (typeof VN_SPELL !== "undefined" && VN_SPELL.valid && !VN_SPELL.valid(curC, curV)) {
    var firstValid = VN_SPELL.V.find(function(v) { return VN_SPELL.valid(curC, v.v); });
    if (firstValid) curV = firstValid.v;
  }
  readL();
  playConsonant(c, r);
}

// 7. PHÁT AUDIO BÀI HỌC CÔ LAN ANH
function playLessonAudio(audioUrl, fallbackText) {
  var my = ++tok;
  busy = true;
  var fin = function() { if (my === tok) { busy = false; busyEnd = Date.now(); } };
  var target = audioUrl ? (getAudio(audioUrl) || audioUrl) : fallbackText;
  playSafeAudio(target, "Tưởng Vy", fin);
}

// 8. MÀN HÌNH ĐÁNH VẦN & LUYỆN ĐỌC (readL)
function readL(tab) {
  if (tab) readTab = tab;
  var tabs = [
    ["spell", "🔤 Ghép tiếng", "Spelling"],
    ["lessons", "📚 28 Bài Vần", "Phonics"],
    ["stories", "📖 Tập đọc trơn", "Stories"]
  ];
  var body = "";

  if (readTab === "spell") {
    if (typeof VN_SPELL !== "undefined" && VN_SPELL.valid && !VN_SPELL.valid(curC, curV)) {
      var firstValid = VN_SPELL.V.find(function(v) { return VN_SPELL.valid(curC, v.v); });
      if (firstValid) curV = firstValid.v;
    }
    var cObj = (typeof VN_SPELL !== "undefined" && VN_SPELL.C) ? (VN_SPELL.C.find(function(x) { return x.c === curC; }) || VN_SPELL.C[0]) : { c: curC, r: "" };
    var vObj = (typeof VN_SPELL !== "undefined" && VN_SPELL.V) ? (VN_SPELL.V.find(function(x) { return x.v === curV; }) || VN_SPELL.V[0]) : { v: curV };
    var syls = (typeof VN_SPELL !== "undefined" && VN_SPELL.syl) ? [0, 1, 2, 3, 4, 5].map(function(t) { return VN_SPELL.syl(cObj, vObj, t); }) : [];
    if (curTone >= syls.length) curTone = 0;
    var curSyl = syls[curTone] || { text: curC + curV, spell: curC + "-" + curV, ex: "", hasMeaning: true };

    var ytClip = CO_LAN_ANH_CONSONANTS[cObj.c];
    var ytBadge = ytClip
      ? '<div style="margin:4px auto"><a href="https://www.youtube.com/watch?v=' + ytClip + '" target="_blank" rel="noopener" class="pill" style="font-size:13px;padding:3px 12px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;background:#e74c3c;color:#fff;font-weight:700;box-shadow:0 3px 0 #922b21">▶ Video Cô Lan Anh dạy chữ ' + cObj.c.toUpperCase() + '</a></div>'
      : "";

    var meanBadge = curSyl.hasMeaning
      ? '<div style="background:#eafaf1;border:2px solid var(--ok);color:#196f3d;border-radius:18px;display:inline-block;padding:3px 14px;font-size:15px;font-weight:700;margin:4px auto">💡 Từ ví dụ: <b>' + curSyl.ex + '</b></div>'
      : '<div style="background:#fff3cd;border:2px solid #f39c12;color:#856404;border-radius:18px;display:inline-block;padding:3px 14px;font-size:13px;font-weight:600;margin:4px auto">⚠ Tiếng này ít dùng trong tiếng Việt</div>';

    body = '<div class="spell-board">' +
      '<div class="spell-head"><span>' + cObj.c + '</span><span style="color:var(--acc2)">+</span><span>' + vObj.v + '</span><span style="color:var(--ok)">=</span><span style="font-size:1.15em;text-decoration:underline;color:var(--acc)">' + curSyl.text + '</span></div>' +
      meanBadge +
      ytBadge +
      '<div class="spell-sub" style="cursor:pointer" onclick="playSpell(\'' + cObj.c + '\',\'' + vObj.v + '\',' + curTone + ',\'' + curSyl.text + '\',\'' + curSyl.spell + '\')">🔊 Đánh vần: <b>' + curSyl.spell + '</b></div>' +
      '<div class="syl-grid">' +
        syls.map(function(s, idx) {
          var isAct = idx === curTone;
          var opStyle = s.hasMeaning ? "" : "opacity:0.4;";
          var exText = s.hasMeaning
            ? '<span class="syl-ex" style="display:block;font-size:11px;color:var(--ok);font-weight:700;line-height:1.1;margin-top:2px">' + s.ex + '</span>'
            : '<span class="syl-ex" style="display:block;font-size:10px;color:#888;font-style:italic;line-height:1.1;margin-top:2px">ít dùng</span>';
          return '<button class="syl-btn' + (isAct ? " active on" : "") + '" style="' + opStyle + '" onclick="playSyllable(\'' + s.text + '\',\'' + cObj.c + '\',\'' + vObj.v + '\',' + idx + ',\'' + s.spell + '\');rp(this)"><b class="n" style="font-size:28px">' + s.text + '</b><small>' + (VN_SPELL.TONES[idx] ? VN_SPELL.TONES[idx].n : "") + '</small>' + exText + '</button>';
        }).join("") +
      '</div>' +
    '</div>' +
    '<div style="margin:10px 0 4px"><b>1. Chọn Phụ âm:</b></div>' +
    '<div class="chips" style="gap:10px">' + (VN_SPELL.C || []).map(function(x) {
      return '<button class="chip ' + (x.c === curC ? "on" : "") + '" style="width:auto;min-width:48px;min-height:48px;border-radius:18px;padding:4px 12px;font-size:22px;margin:2px" onclick="pickConsonant(\'' + x.c + '\',\'' + x.r + '\')">' + x.c + '</button>';
    }).join("") + '</div>' +
    '<div style="margin:12px 0 4px"><b>2. Chọn Nguyên âm:</b></div>' +
    '<div class="chips" style="gap:10px">' + (VN_SPELL.V || []).map(function(x) {
      var ok = VN_SPELL.valid(curC, x.v);
      var dis = ok ? "" : "opacity:0.22;pointer-events:none;filter:grayscale(1);";
      return '<button class="chip ' + (x.v === curV ? "on" : "") + '" style="width:50px;height:50px;min-width:48px;min-height:48px;font-size:22px;margin:2px;' + dis + '" ' + (ok ? 'onclick="curV=\'' + x.v + '\';curTone=0;readL();playVowel(\'' + x.v + '\')"' : "disabled") + '>' + x.v + '</button>';
    }).join("") + '</div>';
  } else if (readTab === "lessons") {
    var L = (typeof VN_LESSONS !== "undefined" && VN_LESSONS.find(function(x) { return x.id === curLes; })) || (typeof VN_LESSONS !== "undefined" ? VN_LESSONS[0] : { id: 1, title: "", rhymes: [], words: [], sentence: "" });
    var ytLes = CO_LAN_ANH_LESSONS[L.id];
    var ytLesBtn = ytLes
      ? '<a href="https://www.youtube.com/watch?v=' + ytLes + '" target="_blank" rel="noopener" class="pill" style="font-size:13px;padding:3px 10px;text-decoration:none;display:inline-flex;align-items:center;gap:4px;background:#e74c3c;color:#fff;font-weight:700;box-shadow:0 3px 0 #922b21">▶ Video Cô Lan Anh</a>'
      : "";
    var rhymeList = (L.rhymes || []).map(function(r) { return typeof r === "string" ? r : (r.rhyme || ""); });
    var highlightRhymes = function(text) {
      var res = (typeof esc === "function") ? esc(text) : text;
      rhymeList.forEach(function(rh) {
        if (!rh) return;
        var re = new RegExp("(" + rh + ")", "gi");
        res = res.replace(re, '<b style="color:var(--acc);text-decoration:underline">$1</b>');
      });
      return res;
    };
    body = '<div class="chips" style="max-height:85px;overflow-y:auto;padding:2px">' +
      (typeof VN_LESSONS !== "undefined" ? VN_LESSONS.map(function(l) {
        var shortRhymes = (l.rhymes || []).map(function(r) { return typeof r === "string" ? r : r.rhyme; }).join("-");
        return '<button class="pill ' + (l.id === curLes ? "on" : "") + '" style="font-size:15px;padding:3px 8px;margin:2px" onclick="curLes=' + l.id + ';readL()">' +
          (l.id <= 28 ? "Bài " + l.id + " (" + shortRhymes + ")" : l.title) +
        '</button>';
      }).join("") : "") +
    '</div>' +
    '<div class="lesson-card">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">' +
        '<h3 style="margin:0;font-size:24px;color:var(--acc)">' + L.title + '</h3>' +
        '<div style="display:flex;gap:6px;flex-wrap:wrap;align-items:center">' +
          ytLesBtn +
          '<button class="pill on" style="font-size:14px;padding:4px 12px" onclick="playLessonAudio(\'' + (L.sentenceAudio || "") + '\',\'' + L.sentence.replace(/'/g, "\\'") + '\');rp(this)">🔊 Nghe cô đọc câu mẫu</button>' +
        '</div>' +
      '</div>' +
      '<div style="font-weight:800;margin:6px 0 4px;color:var(--ink)">1. Đánh vần Vần (Cô Lan Anh):</div>' +
      '<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px">' +
        (L.rhymes || []).map(function(r) {
          var rName = typeof r === "string" ? r : r.rhyme;
          var rFormula = typeof r === "string" ? ("Vần " + r) : (r.formula || rName);
          var rAudioSpell = typeof r === "object" ? r.audioSpell : "";
          var rAudioRhyme = typeof r === "object" ? r.audioRhyme : "";
          return '<div class="rhyme-box" onclick="playLessonAudio(\'' + rAudioSpell + '\',\'' + rFormula + '\');rp(this)">' +
            '<div class="rhyme-big">' + rName + '</div>' +
            '<div class="rhyme-formula">👉 ' + rFormula + '</div>' +
            '<div style="display:flex;gap:4px;margin-top:6px;justify-content:center;flex-wrap:wrap">' +
              '<button class="pill" style="font-size:13px;padding:2px 8px" onclick="event.stopPropagation();playLessonAudio(\'' + rAudioRhyme + '\',\'' + rName + '\');rp(this)">🔊 Đọc: ' + rName + '</button>' +
              '<button class="pill on" style="font-size:13px;padding:2px 8px" onclick="event.stopPropagation();playLessonAudio(\'' + rAudioSpell + '\',\'' + rFormula + '\');rp(this)">🔤 Đánh vần</button>' +
            '</div>' +
          '</div>';
        }).join("") +
      '</div>' +
      '<div style="font-weight:800;margin:10px 0 6px;color:var(--ink)">2. Đánh vần tiếng & Từ mẫu (Cô Lan Anh):</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:8px;margin-bottom:12px">' +
        (L.words || []).map(function(w) {
          var wText = typeof w === "string" ? w : w.word;
          var wSpell = typeof w === "string" ? w : w.spell;
          var wAudio = typeof w === "object" ? w.audio : "";
          return '<div class="spell-sample" onclick="playLessonAudio(\'' + wAudio + '\',\'' + wSpell.replace(/'/g, "\\'") + '\');rp(this)">' +
            '<div>' +
              '<b>' + wText + '</b>' +
              '<div style="font-size:14px;color:var(--ink);opacity:.85;margin-top:2px">Đánh vần: ' + wSpell + '</div>' +
            '</div>' +
            '<span style="font-size:24px">🔊</span>' +
          '</div>';
        }).join("") +
      '</div>' +
      '<div style="font-weight:800;margin:10px 0 6px;color:var(--ink)">3. Câu luyện đọc ứng dụng (Cô Lan Anh):</div>' +
      '<div class="story-box" style="margin:4px 0;font-size:21px;cursor:pointer;background:var(--card);border:3px solid var(--ok);line-height:1.6" onclick="playLessonAudio(\'' + (L.sentenceAudio || "") + '\',\'' + L.sentence.replace(/'/g, "\\'") + '\');rp(this)">' +
        '<div style="display:flex;align-items:flex-start;gap:10px">' +
          '<span style="font-size:28px">📖</span>' +
          '<div>' +
            '<div>' + highlightRhymes(L.sentence) + '</div>' +
            '<div style="font-size:14px;color:var(--ok);font-weight:700;margin-top:6px">▶ Bấm vào đây để nghe cô đọc câu mẫu</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
    playLessonAudio(L.sentenceAudio || "", L.title);
  } else {
    var S = (typeof VN_STORIES !== "undefined" && VN_STORIES[curStory]) || (typeof VN_STORIES !== "undefined" ? VN_STORIES[0] : { title: "", sentences: [] });
    body = '<div class="chips">' + (typeof VN_STORIES !== "undefined" ? VN_STORIES.map(function(s, idx) {
      return '<button class="pill ' + (idx === curStory ? "on" : "") + '" onclick="curStory=' + idx + ';readL()">' + s.title + '</button>';
    }).join("") : "") + '</div>' +
    '<div class="story-box">' +
      '<h3 style="margin:0 0 10px;color:var(--acc);text-align:center">' + S.title + '</h3>' +
      (S.sentences || []).map(function(st) {
        return '<div class="story-line" onclick="say(\'' + st + '\',\'' + st + '\')"><span>🔊</span><span>' + st + '</span></div>';
      }).join("") +
      '<div style="text-align:center;margin-top:12px"><button class="pill on" onclick="say(\'' + (S.sentences || []).join(". ") + '\',\'' + (S.sentences || []).join(". ") + '\')">🔊 Nghe đọc toàn bài</button></div>' +
    '</div>';
    say(S.title, S.title);
  }

  var lanAnhBanner = '<div style="background:linear-gradient(135deg,#fef3c7,#fde68a);border:2px solid #f59e0b;border-radius:14px;padding:8px 14px;margin:8px auto 12px;max-width:580px;display:flex;align-items:center;justify-content:space-between;gap:8px">' +
    '<div style="font-size:13.5px;font-weight:700;color:#92400e;text-align:left">' +
      '👩‍🏫 <b>Bài học Đánh vần Cô Lan Anh (Lớp 1)</b><br>' +
      '<span style="font-size:12px;color:#b45309;font-weight:500">Video sinh động, nhận biết mặt chữ và bài tập ghép vần</span>' +
    '</div>' +
    '<button class="pill on" onclick="go(\'tierActLanAnh\')" style="font-size:13px;padding:6px 14px;background:#ea580c;color:#fff;border:0;flex-shrink:0">Học ngay ▶</button>' +
  '</div>';

  m.innerHTML = kbc([
    { s: "home", t: T("Trang chủ", "Home"), i: "🏠" },
    { t: T("Đánh vần & Luyện đọc", "Reading & Phonics"), i: "📚" }
  ]) +
  '<h2 id="readLQ" role="button" tabindex="0" onclick="say(\'Đánh vần và luyện đọc nhé\',\'Reading and phonics\')" style="cursor:pointer" title="' + T("Bấm để nghe đọc lại", "Tap to listen again") + '">🔊 ' + T("Đánh vần & Luyện đọc", "Reading & Phonics") + '</h2>' +
  lanAnhBanner +
  '<div class="chips" style="margin-bottom:10px">' + tabs.map(function(item) {
    return '<button class="pill' + (readTab === item[0] ? " on" : "") + '" onclick="readL(\'' + item[0] + '\')">' + T(item[1], item[2]) + '</button>';
  }).join("") + '</div>' +
  body;

  sayPrompt("readL", "Đánh vần và luyện đọc nhé", "Reading and phonics", 180000);
}

// 9. GẮN CÁC BIẾN VÀ HÀM LÊN WINDOW ĐỂ TRUY CẬP TOÀN CỤC
if (typeof window !== "undefined") {
  window.CO_LAN_ANH_CONSONANTS = CO_LAN_ANH_CONSONANTS;
  window.CO_LAN_ANH_LESSONS = CO_LAN_ANH_LESSONS;
  window.playConsonant = playConsonant;
  window.playVowel = playVowel;
  window.playSyllable = playSyllable;
  window.playSpell = playSpell;
  window.pickConsonant = pickConsonant;
  window.playLessonAudio = playLessonAudio;
  window.readL = readL;
}
