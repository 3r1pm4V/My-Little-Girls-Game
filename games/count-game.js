/**
 * games/count-game.js
 * Trò chơi học tập tiền tiểu học: Đếm hình chọn số (Count & Match Game)
 * 
 * Module tách từ app.js (Task P2-06).
 * Xuất khẩu: init(container), render()
 */

// Bể tài nguyên các hình ảnh con vật & đồ vật quen thuộc cho bé
const COUNT_ITEMS_POOL = [
  { emoji: "🍎", nameVi: "quả táo", nameEn: "apples" },
  { emoji: "🐱", nameVi: "chú mèo", nameEn: "cats" },
  { emoji: "🚗", nameVi: "ô tô", nameEn: "cars" },
  { emoji: "⭐", nameVi: "ngôi sao", nameEn: "stars" },
  { emoji: "🎈", nameVi: "bóng bay", nameEn: "balloons" },
  { emoji: "🐥", nameVi: "gà con", nameEn: "chicks" },
  { emoji: "🍓", nameVi: "dâu tây", nameEn: "strawberries" },
  { emoji: "🐰", nameVi: "chú thỏ", nameEn: "bunnies" },
  { emoji: "🍦", nameVi: "cây kem", nameEn: "ice creams" },
  { emoji: "🍉", nameVi: "miếng dưa", nameEn: "watermelons" },
  { emoji: "🐻", nameVi: "chú gấu", nameEn: "teddy bears" },
  { emoji: "🚀", nameVi: "tên lửa", nameEn: "rockets" }
];

// Trạng thái cục bộ của trò chơi
let cgState = {
  qIndex: 0,
  score: 0,
  total: 5,
  questions: [],
  answered: false,
  countedItems: new Set()
};

let cgContainer = null;

// Các hàm trợ giúp tương thích
const _T = (vi, en) => (typeof window !== "undefined" && window.T ? window.T(vi, en) : (typeof lang !== "undefined" && lang === "en" ? en : vi));
const _shuf = (arr) => (typeof window !== "undefined" && window.shuf ? window.shuf(arr) : [...arr].sort(() => Math.random() - 0.5));
const _pick = (arr) => (typeof window !== "undefined" && window.pick ? window.pick(arr) : arr[Math.floor(Math.random() * arr.length)]);
const _R = (a, b) => (typeof window !== "undefined" && window.R ? window.R(a, b) : Math.floor(Math.random() * (b - a + 1)) + a);
const _kbc = (crumbs) => (typeof window !== "undefined" && window.kbc ? window.kbc(crumbs) : "");
const _say = (vi, en) => { if (typeof window !== "undefined" && window.say) window.say(vi, en); };
const _sayN = (n) => { if (typeof window !== "undefined" && window.sayN) window.sayN(n); };
const _catSet = (st) => { if (typeof window !== "undefined" && window.catSet) window.catSet(st); };
const _sfxTap = () => { if (typeof window !== "undefined" && window.sfxTap) window.sfxTap(); };
const _sfxOk = () => { if (typeof window !== "undefined" && window.sfxOk) window.sfxOk(); };
const _sfxNo = () => { if (typeof window !== "undefined" && window.sfxNo) window.sfxNo(); };
const _sfxFanfare = () => { if (typeof window !== "undefined" && window.sfxFanfare) window.sfxFanfare(); };
const _fx = () => { if (typeof window !== "undefined" && window.fx) window.fx(); };
const _rmOn = () => (typeof window !== "undefined" && window.rmOn ? window.rmOn() : false);
const _getNV = (idx) => (typeof window !== "undefined" && window.NV && window.NV[idx] ? window.NV[idx] : idx);
const _getNE = (idx) => (typeof window !== "undefined" && window.NE && window.NE[idx] ? window.NE[idx] : idx);

function initCountQuestions() {
  const pool = _shuf([...COUNT_ITEMS_POOL]);
  const nums = _shuf([1, 2, 3, 4, 5, 6, 7]).slice(0, 5);
  const questions = [];

  for (let i = 0; i < 5; i++) {
    const item = pool[i % pool.length];
    const target = nums[i];
    const c = new Set([target]);

    while (c.size < 3) {
      const offset = _pick([-2, -1, 1, 2, 3]);
      let cand = target + offset;
      if (cand < 1) cand = target + _R(1, 3);
      if (cand > 9) cand = target - _R(1, 3);
      if (cand >= 1 && cand <= 9 && cand !== target) c.add(cand);
    }

    questions.push({
      item,
      target,
      options: _shuf([...c]),
      attempted: false
    });
  }

  cgState = {
    qIndex: 0,
    score: 0,
    total: 5,
    questions,
    answered: false,
    countedItems: new Set()
  };
}

function getContainer() {
  if (cgContainer && cgContainer.isConnected) return cgContainer;
  cgContainer = (typeof document !== "undefined" ? document.getElementById("m") : null) || (typeof document !== "undefined" ? document.body : null);
  return cgContainer;
}

function renderCountQuestion() {
  const c = getContainer();
  if (!c) return;

  const { qIndex, total, questions } = cgState;
  if (qIndex >= total) {
    renderCountResult();
    return;
  }

  cgState.answered = false;
  cgState.countedItems = new Set();
  const q = questions[qIndex];
  const item = q.item;
  const count = q.target;
  const viPrompt = `Có bao nhiêu ${item.nameVi}?`;
  const enPrompt = `How many ${item.nameEn}?`;

  const bcHtml = _kbc([
    { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
    { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
    { t: _T("Đếm hình chọn số", "Count & Match"), i: "🍎" }
  ]);

  const dotsHtml = Array.from({ length: total }, (_, i) => {
    const cls = i < qIndex ? "done" : (i === qIndex ? "cur" : "");
    return `<span class="cg-dot ${cls}"></span>`;
  }).join("");

  const itemsHtml = Array.from({ length: count }, (_, i) => {
    return `<button class="cg-item-btn" data-i="${i + 1}" onclick="window.__cgCountTap(this, ${i + 1})" aria-label="${i + 1}">
      ${item.emoji}
      <span class="cg-badge">${i + 1}</span>
    </button>`;
  }).join("");

  const optsHtml = q.options.map(num => {
    return `<button class="cg-opt-btn" data-n="${num}" onclick="window.__cgChoose(${num}, this)">
      <span class="cg-opt-num">${num}</span>
    </button>`;
  }).join("");

  c.innerHTML = `${bcHtml}
  <div class="cg-wrap">
    <div class="cg-progress">
      <span>${_T(`Câu ${qIndex + 1} / ${total}`, `Question ${qIndex + 1} / ${total}`)}</span>
      <div class="cg-progress-bar">
        <div class="cg-progress-fill" style="width:${Math.round(((qIndex + 1) / total) * 100)}%"></div>
      </div>
      <div class="cg-dots">${dotsHtml}</div>
    </div>

    <div class="cg-stage">
      <div class="cg-prompt" id="cgPrompt" onclick="say('${viPrompt}', '${enPrompt}')" title="${_T("Bấm để nghe lại câu hỏi", "Tap to listen again")}">
        <span>🔊</span> ${_T(viPrompt, enPrompt)}
      </div>
      <div class="cg-items-box">
        ${itemsHtml}
      </div>
      <div class="cg-hint-text">${_T("💡 Chạm vào từng hình để bé cùng đếm nhé!", "💡 Tap each item to count together!")}</div>
      
      <div class="cg-opts">
        ${optsHtml}
      </div>

      <div class="cg-feedback" id="cgFeedback"></div>
    </div>
  </div>`;

  _say(viPrompt, enPrompt);
  _catSet("thinking");
}

function renderCountResult() {
  const c = getContainer();
  if (!c) return;

  const { score, total } = cgState;
  const starCount = score === 5 ? 3 : (score >= 3 ? 2 : 1);

  if (typeof window !== "undefined") {
    if (typeof window.stars === "number") {
      window.stars += starCount;
      if (window.ls) window.ls.set("stars", window.stars);
    }
    if (window.recordDailyActivity) window.recordDailyActivity();
    if (window.head) window.head();
    if (window.checkBadges) window.checkBadges();
  }

  const now = new Date();
  const dateFormatted = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")} - ${now.getDate()}/${now.getMonth() + 1}`;
  const saveObj = {
    score,
    total,
    stars: starCount,
    timestamp: Date.now(),
    dateStr: dateFormatted
  };

  if (typeof window !== "undefined" && window.ls) {
    window.ls.set("kids_count_game_last", JSON.stringify(saveObj));
  }

  let lastRecordText = "";
  try {
    const raw = typeof window !== "undefined" && window.ls ? window.ls.get("kids_count_game_last", "") : "";
    if (raw) {
      const parsed = typeof raw === "string" ? JSON.parse(raw) : raw;
      if (parsed && parsed.score !== undefined) {
        lastRecordText = _T(
          `🕒 Lần chơi gần nhất: ${parsed.score}/${parsed.total} câu đúng (${parsed.dateStr})`,
          `🕒 Last played: ${parsed.score}/${parsed.total} correct (${parsed.dateStr})`
        );
      }
    }
  } catch (e) {}

  const starsHtml = Array.from({ length: 3 }, (_, i) => {
    return i < starCount ? `<span>⭐</span>` : `<span style="opacity:0.25;filter:grayscale(1)">⭐</span>`;
  }).join("");

  let msgVi = "Bé rất chăm chỉ và đáng khen!";
  let msgEn = "Great effort! Keep practicing!";
  if (score === 5) {
    msgVi = "Xuất sắc! Bé là thiên tài đếm số! 🌟";
    msgEn = "Outstanding! You are a counting master! 🌟";
  } else if (score >= 4) {
    msgVi = "Rất giỏi! Bé đếm số rất cừ khôi! 👏";
    msgEn = "Awesome job! You did so well! 👏";
  } else if (score >= 3) {
    msgVi = "Tốt lắm! Cùng luyện tập để đạt điểm tuyệt đối nhé! 💪";
    msgEn = "Good job! Play again to get 3/3 stars! 💪";
  }

  const bcHtml = _kbc([
    { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
    { s: "games", t: _T("Trò chơi", "Games"), i: "🎮" },
    { t: _T("Kết quả", "Results"), i: "🏆" }
  ]);

  c.innerHTML = `${bcHtml}
  <div class="cg-wrap">
    <div class="cg-result-card">
      <div class="cg-result-trophy">🏆</div>
      <h2>${_T("Hoàn thành vòng chơi!", "Game Complete!")}</h2>
      <div class="cg-result-stars">${starsHtml}</div>
      <div class="cg-result-score">${_T(`Bé làm đúng ${score} / ${total} câu`, `You got ${score} / ${total} right`)}</div>
      <p class="cg-result-msg">${_T(msgVi, msgEn)}</p>
      ${lastRecordText ? `<div class="cg-result-last">${lastRecordText}</div>` : ""}
      <div class="cg-result-btns">
        <button class="cg-btn-replay" onclick="window.countGame(true)">
          🔄 ${_T("Chơi lại", "Play Again")}
        </button>
        <button class="cg-btn-back" onclick="window.go('games')">
          🔙 ${_T("Quay lại", "Back to Games")}
        </button>
      </div>
    </div>
  </div>`;

  _sfxFanfare();
  _fx();
  _catSet("celebrate");

  if (typeof window !== "undefined" && window.triggerCelebration) {
    window.triggerCelebration(
      _T("Hoàn thành xuất sắc!", "All Done!"),
      _T(`Bé làm đúng ${score} / ${total} câu! Nhận được ${starCount} sao!`, `You got ${score}/${total} right and earned ${starCount} stars!`),
      "🏆",
      Array(starCount).fill("⭐").join("")
    );
  }

  _say(
    `Hoan hô bé! Bé làm đúng ${_getNV(score)} trên ${_getNV(total)} câu. Nhận được ${_getNV(starCount)} sao vàng!`,
    `Hooray! You got ${_getNE(score)} out of ${_getNE(total)}. You earned ${_getNE(starCount)} stars!`
  );
}

// Cài đặt các hàm xử lý tương tác toàn cục
if (typeof window !== "undefined") {
  window.__cgCountTap = function(btn, num) {
    if (_rmOn()) return;
    _sfxTap();
    btn.classList.add("counted");
    btn.style.animation = "pop .3s ease";
    setTimeout(() => { btn.style.animation = ""; }, 300);
    cgState.countedItems.add(num);
    _sayN(num);
  };

  window.__cgChoose = function(chosen, btn) {
    if (cgState.answered) return;
    const q = cgState.questions[cgState.qIndex];
    const fb = document.getElementById("cgFeedback");

    if (chosen === q.target) {
      cgState.answered = true;
      if (!q.attempted) {
        cgState.score++;
      }
      btn.classList.add("good");
      _sfxOk();
      _fx();
      _catSet("celebrate");

      const praises = (typeof window !== "undefined" && window.PR) || [
        ["Giỏi quá!", "Great job!"],
        ["Xuất sắc!", "Brilliant!"],
        ["Bé thông minh lắm!", "So smart!"],
        ["Tuyệt vời!", "Wonderful!"]
      ];
      const praise = _pick(praises);

      if (fb) {
        fb.className = "cg-feedback good";
        fb.innerHTML = `🎉 ${_T(praise[0], praise[1])} ${_T("Đúng rồi!", "That's right!")} ⭐`;
      }
      _say(`${praise[0]} Có ${_getNV(q.target)} ${q.item.nameVi}.`, `${praise[1]} There are ${_getNE(q.target)} ${q.item.nameEn}.`);

      setTimeout(() => {
        cgState.qIndex++;
        renderCountQuestion();
      }, 1250);
    } else {
      q.attempted = true;
      btn.classList.add("bad");
      btn.disabled = true;
      _sfxNo();
      _catSet("sad");
      if (fb) {
        fb.className = "cg-feedback bad";
        fb.innerHTML = `💡 ${_T("Bé đếm lại cẩn thận rồi chọn nhé!", "Count again carefully and try!")}`;
      }
      _say("Bé thử đếm lại nhé", "Try counting again");
      setTimeout(() => {
        _catSet("thinking");
      }, 900);
    }
  };
}

/**
 * Khởi tạo trò chơi với phần tử container chỉ định
 * @param {HTMLElement} container DOM element để render giao diện
 */
function init(container) {
  cgContainer = container || (typeof document !== "undefined" ? document.getElementById("m") : null) || (typeof document !== "undefined" ? document.body : null);
  initCountQuestions();
}

/**
 * Hiển thị giao diện câu hỏi hoặc kết quả trò chơi
 * @param {boolean} isReplay Nếu true sẽ bắt đầu lại lượt chơi mới
 */
function render(isReplay = false) {
  if (isReplay || !cgState.questions || cgState.questions.length !== 5 || cgState.qIndex >= 5) {
    initCountQuestions();
  }
  renderCountQuestion();
}

// Hỗ trợ phổ quát cho cả trình duyệt (window.CountGame) và ES Module (import/export)
if (typeof window !== "undefined") {
  window.CountGame = { init, render };
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { init, render };
}

export { init, render };
export default { init, render };
