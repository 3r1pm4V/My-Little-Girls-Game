/**
 * games/safekids-games.js
 * Kho Trò Chơi Học Tập & Tư Duy An Toàn Cho Bé (Safe Kid Games Edition)
 * Lấy cảm hứng từ www.safekidgames.com:
 * 1. Math Sum Game (Phép tính hình trực quan: Cộng / Trừ hình vui nhộn)
 * 2. Animal Path Game (Đường về tổ của bạn thú: Nối số dẫn đường tư duy)
 * Tuân thủ Antigravity Design: 100dvh không scrollbar, giao diện Glassmorphism bồng bềnh,
 * vùng chạm lớn >= 56px, âm thanh dịu dàng, phản hồi tức thì.
 */
(function() {
  "use strict";

  const _T = (vi, en) => (typeof window !== "undefined" && window.T ? window.T(vi, en) : vi);
  const _shuf = (arr) => (typeof window !== "undefined" && window.shuf ? window.shuf([...arr]) : [...arr].sort(() => Math.random() - 0.5));
  const _pick = (arr) => (typeof window !== "undefined" && window.pick ? window.pick(arr) : arr[Math.floor(Math.random() * arr.length)]);
  const _R = (a, b) => (typeof window !== "undefined" && window.R ? window.R(a, b) : Math.floor(Math.random() * (b - a + 1)) + a);
  const _kbc = (crumbs) => (typeof window !== "undefined" && window.kbc ? window.kbc(crumbs) : "");
  const _say = (vi, en) => { if (typeof window !== "undefined" && window.say) window.say(vi, en); };
  const _catSet = (st) => { if (typeof window !== "undefined" && window.catSet) window.catSet(st); };
  const _sfxTap = () => { if (typeof window !== "undefined" && window.sfxTap) window.sfxTap(); };
  const _sfxOk = () => { if (typeof window !== "undefined" && window.sfxOk) window.sfxOk(); };
  const _sfxNo = () => { if (typeof window !== "undefined" && window.sfxNo) window.sfxNo(); };
  const _sfxTing = () => { if (typeof window !== "undefined" && window.sfxTingTing) window.sfxTingTing(); else _sfxOk(); };
  const _fx = () => { if (typeof window !== "undefined" && window.fx) window.fx(); };

  function getContainer() {
    return (typeof document !== "undefined" && (document.getElementById("m") || document.body)) || null;
  }

  function rewardStarsAndProgress(starAdd, skillKey) {
    if (typeof window === "undefined") return;
    try {
      if (typeof window.stars !== "undefined" && window.ls) {
        window.stars += starAdd;
        window.ls.set("stars", window.stars);
      }
      if (typeof window.head === "function") window.head();
      if (typeof window.checkBadges === "function") window.checkBadges();
      if (typeof window.recordDailyActivity === "function") window.recordDailyActivity();
      if (skillKey && typeof window.updateProgress === "function") {
        window.updateProgress(skillKey, true);
      }
    } catch (e) {}
  }

  // ============================================================================
  // 1. MATH SUM GAME (Phép tính hình trực quan - Safe Kid Games)
  // ============================================================================

  const MATH_THEMES = [
    { emoji: "🍎", nameVi: "Quả táo", nameEn: "Apple" },
    { emoji: "🍓", nameVi: "Quả dâu", nameEn: "Strawberry" },
    { emoji: "🥕", nameVi: "Cà rốt", nameEn: "Carrot" },
    { emoji: "🐥", nameVi: "Gà con", nameEn: "Chick" },
    { emoji: "🐱", nameVi: "Mèo con", nameEn: "Kitten" },
    { emoji: "⭐", nameVi: "Ngôi sao", nameEn: "Star" },
    { emoji: "🎈", nameVi: "Bóng bay", nameEn: "Balloon" },
    { emoji: "🌸", nameVi: "Bông hoa", nameEn: "Flower" }
  ];

  let mathSumState = {
    isAnswered: false,
    autoTimer: null
  };

  function mathSumGame(isReplay) {
    const m = getContainer();
    if (!m) return;
    if (typeof window !== "undefined") window.__traceFrom = "mathSumGame";
    if (mathSumState.autoTimer) clearTimeout(mathSumState.autoTimer);
    mathSumState.isAnswered = false;

    // Xác định phép toán (+ hoặc -)
    const isSubtraction = Math.random() < 0.35; // 35% trừ, 65% cộng
    let numA, numB, correctAns, opSign;

    if (!isSubtraction) {
      opSign = "+";
      numA = _R(1, 5);
      numB = _R(1, 5);
      correctAns = numA + numB;
    } else {
      opSign = "-";
      numA = _R(2, 7);
      numB = _R(1, numA - 1);
      correctAns = numA - numB;
    }

    const theme = _pick(MATH_THEMES);

    // Tạo các phương án lựa chọn (1 đúng + 2 sai)
    const opts = [correctAns];
    while (opts.length < 3) {
      const delta = _pick([-2, -1, 1, 2]);
      const fake = correctAns + delta;
      if (fake >= 0 && fake <= 10 && !opts.includes(fake)) {
        opts.push(fake);
      }
    }
    const shuffledOpts = _shuf(opts);

    // Render HTML
    m.innerHTML = `
      <div class="home-container safekids-game-container">
        ${_kbc([
          { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
          { s: "games", t: _T("Góc vui chơi", "Games"), i: "🎮" },
          { t: _T("Phép tính hình", "Math Sums"), i: "🧮" }
        ])}

        <div class="sk-game-header">
          <div class="sk-title-row">
            <span class="sk-badge">🎒 ${_T("Tiền tiểu học · 6-7 tuổi", "Grade 1 Prep")}</span>
            <h2 class="sk-title">🧮 ${_T("Bé đếm hình làm phép tính nhé!", "Count and solve the math sum!")}</h2>
          </div>
          <p class="sk-subtitle">${_T("Chạm vào từng hình để nghe đếm · Bấm đáp án số bên dưới", "Tap objects to count · Pick the correct answer")}</p>
        </div>

        <div class="ms-arena">
          <!-- Nhóm 1 -->
          <div class="ms-group-box ms-group-1">
            <div class="ms-items-cloud">
              ${Array.from({ length: numA }).map((_, i) => `
                <button type="button" class="ms-item-btn" onclick="window.__msTapItem(this, ${i + 1})">
                  ${theme.img ? `<img src="${theme.img}" class="ms-item-img" alt="${theme.nameVi}">` : `<span class="ms-emoji">${theme.emoji}</span>`}
                  <span class="ms-item-num">${i + 1}</span>
                </button>
              `).join("")}
            </div>
            <div class="ms-group-count">${numA}</div>
          </div>

          <!-- Dấu phép toán -->
          <div class="ms-op-badge ${opSign === '+' ? 'op-plus' : 'op-minus'}">${opSign}</div>

          <!-- Nhóm 2 -->
          <div class="ms-group-box ms-group-2">
            <div class="ms-items-cloud">
              ${Array.from({ length: numB }).map((_, i) => `
                <button type="button" class="ms-item-btn ${isSubtraction ? 'ms-subtracted' : ''}" onclick="window.__msTapItem(this, ${!isSubtraction ? numA + i + 1 : i + 1})">
                  ${theme.img ? `<img src="${theme.img}" class="ms-item-img" alt="${theme.nameVi}">` : `<span class="ms-emoji">${theme.emoji}</span>`}
                  <span class="ms-item-num">${!isSubtraction ? numA + i + 1 : i + 1}</span>
                  ${isSubtraction ? '<span class="ms-cross-mark">✕</span>' : ''}
                </button>
              `).join("")}
            </div>
            <div class="ms-group-count">${numB}</div>
          </div>

          <!-- Dấu bằng và ô kết quả -->
          <div class="ms-op-badge op-equal">=</div>
          <div class="ms-target-box" id="msTargetBox">
            <span class="ms-target-q">?</span>
          </div>
        </div>

        <!-- Khay đáp án chọn số -->
        <div class="ms-options-wrap" id="msOptionsWrap">
          ${shuffledOpts.map(val => `
            <button type="button" class="ms-opt-btn" onclick="window.__msCheckAnswer(${val}, ${correctAns}, '${opSign}', ${numA}, ${numB}, this)">
              <span class="ms-opt-num">${val}</span>
            </button>
          `).join("")}
        </div>

        <div id="msFeedbackRow" class="sk-feedback-row"></div>
      </div>
    `;

    _say(
      !isSubtraction ? `${numA} cộng ${numB} bằng mấy?` : `${numA} trừ ${numB} bằng mấy?`,
      !isSubtraction ? `What is ${numA} plus ${numB}?` : `What is ${numA} minus ${numB}?`
    );
  }

  // Tương tác chạm hình
  if (typeof window !== "undefined") {
    window.__msTapItem = function(btn, num) {
      _sfxTap();
      btn.classList.remove("ms-item-bounce");
      void btn.offsetWidth;
      btn.classList.add("ms-item-bounce");
      _say(String(num), String(num));
    };

    window.__msCheckAnswer = function(chosen, correct, op, a, b, btn) {
      if (mathSumState.isAnswered) return;

      if (chosen === correct) {
        mathSumState.isAnswered = true;
        _sfxTing();
        _fx();
        _catSet("happy");
        rewardStarsAndProgress(1, "math");

        btn.classList.add("ms-opt-correct");
        const targetBox = document.getElementById("msTargetBox");
        if (targetBox) {
          targetBox.innerHTML = `<span class="ms-target-ans">${correct}</span>`;
          targetBox.classList.add("ms-target-success");
        }

        const fb = document.getElementById("msFeedbackRow");
        if (fb) {
          const viText = op === "+"
            ? `Đúng rồi! ${a} cộng ${b} bằng ${correct}! Bé xuất sắc quá!`
            : `Đúng rồi! ${a} trừ ${b} bằng ${correct}! Bé xuất sắc quá!`;
          fb.innerHTML = `
            <div class="sk-banner sk-banner-good">
              <span>🎉 ${viText}</span>
              <button class="sk-next-btn" onclick="window.mathSumGame(true)">
                ${_T("Làm câu tiếp ➡️", "Next Sum ➡️")}
              </button>
            </div>
          `;
          _say(viText, `Correct! Great job!`);
        }

        // Tự động chuyển câu sau 2.8 giây
        mathSumState.autoTimer = setTimeout(() => {
          if (mathSumState.isAnswered) {
            mathSumGame(true);
          }
        }, 2800);
      } else {
        _sfxNo();
        _catSet("think");
        btn.classList.add("ms-opt-wrong");
        setTimeout(() => btn.classList.remove("ms-opt-wrong"), 600);
        _say("Chưa đúng rồi, bé thử đếm lại các hình xem nhé!", "Try counting the items again!");
      }
    };
  }

  // ============================================================================
  // 2. ANIMAL PATH GAME (Đường về tổ của bạn thú - Safe Kid Games)
  // Đa dạng 3 chế độ thử thách:
  // - forward: Dẫn đường tiến tuần tự (1 -> 6 hoặc 1 -> 8)
  // - backward: Dẫn đường đếm lùi (6 -> 1 hoặc 8 -> 1)
  // - maze: Mê cung ngã rẽ chọn số đúng giữa các phương án nhiễu
  // ============================================================================

  const ANIMAL_STORIES = [
    { id: "bunny", animalImg: "img/animals/bunny.png", targetImg: "img/animals/carrot.png", animalEmoji: "🐰", targetEmoji: "🥕", nameVi: "Thỏ trắng", nameEn: "Bunny", targetVi: "Củ cà rốt ngọt giòn", targetEn: "Carrot" },
    { id: "kitten", animalImg: "img/animals/kitten.png", targetImg: "img/animals/fish.png", animalEmoji: "🐱", targetEmoji: "🐟", nameVi: "Mèo mimi", nameEn: "Kitty", targetVi: "Đĩa cá thơm ngon", targetEn: "Fish" },
    { id: "puppy", animalImg: "img/animals/puppy.png", targetImg: "img/animals/bone.png", animalEmoji: "🐶", targetEmoji: "🦴", nameVi: "Cún con", nameEn: "Puppy", targetVi: "Khúc xương đồ chơi", targetEn: "Bone" },
    { id: "bee", animalImg: "img/animals/bee.png", targetImg: "img/animals/flower.png", animalEmoji: "🐝", targetEmoji: "🌸", nameVi: "Ong nhỏ", nameEn: "Bee", targetVi: "Bông hoa tươi", targetEn: "Flower" },
    { id: "bear", animalImg: "img/animals/bear.png", targetImg: "img/animals/honey.png", animalEmoji: "🐻", targetEmoji: "🍯", nameVi: "Gấu nâu", nameEn: "Bear", targetVi: "Hũ mật ong", targetEn: "Honey" }
  ];

  let animalPathState = {
    story: null,
    mode: "forward", // "forward" | "backward" | "maze"
    sequence: [],
    curStepIndex: 0,
    isCompleted: false,
    autoTimer: null
  };

  function getAnimalAvatarHtml(story) {
    return `<span class="ap-animal-avatar" id="apAnimalAvatar">
      <img src="${story.animalImg}" onerror="this.outerHTML='${story.animalEmoji}'" class="ap-avatar-img" alt="${story.nameVi}">
    </span>`;
  }

  function getTargetGoalHtml(story) {
    return `<img src="${story.targetImg}" onerror="this.outerHTML='${story.targetEmoji}'" class="ap-target-img" alt="${story.targetVi}">`;
  }

  function animalPathGame(isReplay, forcedMode) {
    const m = getContainer();
    if (!m) return;
    if (typeof window !== "undefined") window.__traceFrom = "animalPathGame";
    if (animalPathState.autoTimer) clearTimeout(animalPathState.autoTimer);

    const story = _pick(ANIMAL_STORIES);
    // Luân phiên 3 chế độ chơi nếu không chỉ định
    const modes = ["forward", "backward", "maze"];
    const mode = forcedMode || _pick(modes);

    let sequence = [];
    let instructionsVi = "";
    let instructionsEn = "";

    if (mode === "forward") {
      sequence = [1, 2, 3, 4, 5, 6];
      instructionsVi = `Bé hãy chạm lần lượt các viên đá theo thứ tự từ 1 đến 6 nhé!`;
      instructionsEn = `Tap stepping stones in order from 1 to 6!`;
    } else if (mode === "backward") {
      sequence = [6, 5, 4, 3, 2, 1];
      instructionsVi = `Thử thách đếm lùi: Bé hãy chạm từ số 6 lùi dần về 1 để đưa bạn về nhé!`;
      instructionsEn = `Count backwards: Tap stones from 6 down to 1!`;
    } else {
      // Chế độ maze (ngã rẽ logic)
      sequence = [1, 2, 3, 4, 5];
      instructionsVi = `Mê cung ngã rẽ: Ở mỗi bước, bé hãy chọn viên đá có số tiếp theo chính xác nhé!`;
      instructionsEn = `Maze path: Choose the correct next stepping stone!`;
    }

    animalPathState.story = story;
    animalPathState.mode = mode;
    animalPathState.sequence = sequence;
    animalPathState.curStepIndex = 0;
    animalPathState.isCompleted = false;

    const modeBadge = mode === "forward" 
      ? `🌱 ${_T("Đường thẳng tiến · 1 → 6", "Forward Path · 1 → 6")}`
      : mode === "backward"
      ? `🍂 ${_T("Đếm lùi dốc núi · 6 → 1", "Countdown Path · 6 → 1")}`
      : `🧩 ${_T("Mê cung chọn số · Thử thách", "Maze Path · Logic")}`;

    m.innerHTML = `
      <div class="home-container safekids-game-container">
        ${_kbc([
          { s: "home", t: _T("Trang chủ", "Home"), i: "🏠" },
          { s: "games", t: _T("Góc vui chơi", "Games"), i: "🎮" },
          { t: _T("Đường về tổ", "Animal Path"), i: "🐾" }
        ])}

        <div class="sk-game-header">
          <div class="sk-title-row">
            <span class="sk-badge">${modeBadge}</span>
            <h2 class="sk-title">🐾 ${_T(`Dẫn bạn ${story.nameVi} về ăn ${story.targetVi}!`, `Help ${story.nameEn} reach the ${story.targetEn}!`)}</h2>
          </div>
          <p class="sk-subtitle">${_T(instructionsVi, instructionsEn)}</p>
        </div>

        <div class="ap-track-arena ${mode === 'maze' ? 'ap-arena-maze' : ''}">
          <div class="ap-path-grid" id="apPathGrid">
            ${mode !== 'maze' ? sequence.map((stepNum, i) => {
              const isStart = i === 0;
              return `
                <div class="ap-step-wrap" id="apStepWrap_${i}">
                  <button type="button" class="ap-stone-btn ${isStart ? 'ap-stone-active' : ''}" 
                          id="apStone_${i}"
                          onclick="window.__apTapStone(${i}, ${stepNum})">
                    <span class="ap-stone-num">${stepNum}</span>
                    <span class="ap-stone-foot" id="apFoot_${i}">🐾</span>
                    ${isStart ? getAnimalAvatarHtml(story) : ''}
                  </button>
                  ${i < sequence.length - 1 ? '<span class="ap-connector-line">➜</span>' : ''}
                </div>
              `;
            }).join("") : renderMazeTrackHtml(story, sequence)}

            <!-- Đích đến -->
            <div class="ap-goal-wrap">
              <div class="ap-goal-dish" id="apGoalDish">
                <span class="ap-goal-icon">${getTargetGoalHtml(story)}</span>
              </div>
            </div>
          </div>
        </div>

        <div id="apFeedbackRow" class="sk-feedback-row"></div>
      </div>
    `;

    _say(
      `Bé hãy giúp bạn ${story.nameVi} nhé! ${instructionsVi}`,
      `Help ${story.nameEn}! ${instructionsEn}`
    );
  }

  function renderMazeTrackHtml(story, sequence) {
    // Với mỗi bước trong sequence, hiển thị 1 ô đúng và 1 ô nhiễu đặt cạnh nhau
    return sequence.map((correctNum, stepIdx) => {
      const isStart = stepIdx === 0;
      // Tạo số nhiễu không trùng correctNum
      let fakeNum = correctNum + _pick([-1, 1, 2]);
      if (fakeNum <= 0) fakeNum = correctNum + 2;
      const stones = _shuf([
        { val: correctNum, isCorrect: true },
        { val: fakeNum, isCorrect: false }
      ]);

      return `
        <div class="ap-maze-fork" id="apMazeFork_${stepIdx}">
          <div class="ap-fork-stones">
            ${stones.map(st => `
              <button type="button" class="ap-stone-btn ${isStart && st.isCorrect ? 'ap-stone-active' : ''}"
                      data-correct="${st.isCorrect ? '1' : '0'}"
                      data-step="${stepIdx}"
                      id="apMazeStone_${stepIdx}_${st.val}"
                      onclick="window.__apTapMazeStone(this, ${stepIdx}, ${st.val}, ${st.isCorrect})">
                <span class="ap-stone-num">${st.val}</span>
                <span class="ap-stone-foot">🐾</span>
                ${isStart && st.isCorrect ? getAnimalAvatarHtml(story) : ''}
              </button>
            `).join("")}
          </div>
          ${stepIdx < sequence.length - 1 ? '<span class="ap-connector-line">➜</span>' : ''}
        </div>
      `;
    }).join("");
  }

  if (typeof window !== "undefined") {
    // Xử lý chạm cho chế độ thẳng (tiến / lùi)
    window.__apTapStone = function(stepIdx, stepNum) {
      if (animalPathState.isCompleted) return;
      const expectedIdx = animalPathState.curStepIndex;

      if (stepIdx === expectedIdx) {
        _sfxTap();
        _say(String(stepNum), String(stepNum));

        const prevStone = document.getElementById(`apStone_${stepIdx - 1}`);
        if (prevStone) {
          prevStone.classList.remove("ap-stone-active");
          prevStone.classList.add("ap-stone-visited");
        }

        const curStone = document.getElementById(`apStone_${stepIdx}`);
        if (curStone) {
          curStone.classList.add("ap-stone-active", "ap-stone-hop");
          setTimeout(() => curStone.classList.remove("ap-stone-hop"), 400);

          const animalAvatar = document.getElementById("apAnimalAvatar");
          if (animalAvatar) animalAvatar.remove();
          curStone.insertAdjacentHTML("beforeend", getAnimalAvatarHtml(animalPathState.story));
        }

        animalPathState.curStepIndex++;

        if (animalPathState.curStepIndex >= animalPathState.sequence.length) {
          finishAnimalPath();
        } else {
          const nextStone = document.getElementById(`apStone_${animalPathState.curStepIndex}`);
          if (nextStone) nextStone.classList.add("ap-stone-next");
        }
      } else if (stepIdx > expectedIdx) {
        _sfxNo();
        const wrongStone = document.getElementById(`apStone_${stepIdx}`);
        if (wrongStone) {
          wrongStone.classList.add("ap-stone-shake");
          setTimeout(() => wrongStone.classList.remove("ap-stone-shake"), 500);
        }
        const expectedNum = animalPathState.sequence[expectedIdx];
        _say(`Bé tìm số ${expectedNum} trước nhé!`, `Find number ${expectedNum} first!`);
      }
    };

    // Xử lý chạm cho chế độ Mê cung ngã rẽ
    window.__apTapMazeStone = function(btnEl, stepIdx, tappedNum, isCorrect) {
      if (animalPathState.isCompleted) return;
      const expectedIdx = animalPathState.curStepIndex;

      if (stepIdx !== expectedIdx) {
        _sfxNo();
        btnEl.classList.add("ap-stone-shake");
        setTimeout(() => btnEl.classList.remove("ap-stone-shake"), 500);
        return;
      }

      if (isCorrect) {
        _sfxTap();
        _say(String(tappedNum), String(tappedNum));

        // Đánh dấu các viên đá ở ngã rẽ trước
        if (stepIdx > 0) {
          const prevFork = document.getElementById(`apMazeFork_${stepIdx - 1}`);
          if (prevFork) {
            prevFork.querySelectorAll(".ap-stone-btn").forEach(b => b.classList.add("ap-stone-visited"));
          }
        }

        btnEl.classList.add("ap-stone-active", "ap-stone-hop");
        setTimeout(() => btnEl.classList.remove("ap-stone-hop"), 400);

        const animalAvatar = document.getElementById("apAnimalAvatar");
        if (animalAvatar) animalAvatar.remove();
        btnEl.insertAdjacentHTML("beforeend", getAnimalAvatarHtml(animalPathState.story));

        animalPathState.curStepIndex++;

        if (animalPathState.curStepIndex >= animalPathState.sequence.length) {
          finishAnimalPath();
        }
      } else {
        _sfxNo();
        btnEl.classList.add("ap-stone-shake", "ap-stone-wrong");
        setTimeout(() => btnEl.classList.remove("ap-stone-shake"), 500);
        const correctNum = animalPathState.sequence[stepIdx];
        _say(`Chưa đúng ngã rẽ rồi, bé hãy chọn viên đá có số ${correctNum} nhé!`, `Wrong turn! Choose number ${correctNum}!`);
      }
    };

    function finishAnimalPath() {
      animalPathState.isCompleted = true;
      _sfxTing();
      _fx();
      _catSet("happy");
      rewardStarsAndProgress(1, "logic");

      const goalDish = document.getElementById("apGoalDish");
      if (goalDish) goalDish.classList.add("ap-goal-celebrate");

      const fb = document.getElementById("apFeedbackRow");
      if (fb) {
        const viWin = `Hoan hô! Bạn ${animalPathState.story.nameVi} đã về đến đích ăn ${animalPathState.story.targetVi} rồi! Bé giỏi quá!`;
        fb.innerHTML = `
          <div class="sk-banner sk-banner-good">
            <span>🎉 ${viWin}</span>
            <button class="sk-next-btn" onclick="window.animalPathGame(true)">
              ${_T("Chơi màn tiếp 🐾", "Next Path 🐾")}
            </button>
          </div>
        `;
        _say(viWin, "Hooray! You guided the animal home!");
      }

      animalPathState.autoTimer = setTimeout(() => {
        if (animalPathState.isCompleted) {
          animalPathGame(true);
        }
      }, 3400);
    }

    window.mathSumGame = mathSumGame;
    window.animalPathGame = animalPathGame;
  }

  // CommonJS export cho test suite Node.js
  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      mathSumGame,
      animalPathGame,
      MATH_THEMES,
      ANIMAL_STORIES
    };
  }
})();
