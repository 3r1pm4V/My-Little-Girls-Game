/**
 * games/fruit-ninja.js
 * Ninja Fruit Clone - Trò chơi Chém Trái Cây Chuẩn Cơ Chế Fruit Ninja
 *
 * Mobile-first, HTML5 Canvas 2D thuần, 60 FPS, 0 dependencies, chạy offline.
 * Hỗ trợ đa điểm chạm (Multi-touch 5 ngón), 3 chế độ (Classic, Zen, Arcade),
 * Quả chuối đặc biệt (Freeze, Frenzy, Double), Quả lựu khổng lồ, Combo, Critical,
 * Tùy biến Blades (vệt kiếm phát sáng), Dojos (hình nền), Web Audio Synth SFX.
 *
 * Xuất khẩu: init(container, options), render(), getState(), destroy()
 */

(function (global) {
  "use strict";

  // --- AUDIO SYNTHESIZER (Web Audio API - 100% Thuần, không bản quyền) ---
  const AudioEngine = {
    ctx: null,
    muted: false,

    init() {
      if (!this.ctx && (typeof window !== "undefined" || typeof AudioContext !== "undefined")) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          try {
            this.ctx = new AudioCtx();
          } catch (e) {}
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        const resume = () => {
          this.ctx.resume();
          if (typeof window !== "undefined" && window.removeEventListener) window.removeEventListener("touchstart", resume);
          if (typeof window !== "undefined" && window.removeEventListener) window.removeEventListener("mousedown", resume);
        };
        if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("touchstart", resume, { passive: true });
        if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("mousedown", resume, { passive: true });
      }
    },

    playSwoosh() {
      if (this.muted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(450, t);
        osc.frequency.exponentialRampToValueAtTime(120, t + 0.12);
        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.13);
      } catch (e) {}
    },

    playSplat() {
      if (this.muted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        // FM modulation for squishy cut sound
        const carrier = this.ctx.createOscillator();
        const mod = this.ctx.createOscillator();
        const modGain = this.ctx.createGain();
        const gain = this.ctx.createGain();

        carrier.type = "triangle";
        carrier.frequency.setValueAtTime(600, t);
        carrier.frequency.exponentialRampToValueAtTime(200, t + 0.15);

        mod.type = "sawtooth";
        mod.frequency.setValueAtTime(180, t);

        modGain.gain.setValueAtTime(300, t);
        modGain.gain.exponentialRampToValueAtTime(10, t + 0.15);

        mod.connect(modGain);
        modGain.connect(carrier.frequency);

        gain.gain.setValueAtTime(0.28, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.16);

        carrier.connect(gain);
        gain.connect(this.ctx.destination);

        mod.start(t);
        carrier.start(t);
        mod.stop(t + 0.16);
        carrier.stop(t + 0.16);
      } catch (e) {}
    },

    playBombExplode() {
      if (this.muted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const bufferSize = this.ctx.sampleRate * 0.6;
        const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        const noise = this.ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = this.ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.setValueAtTime(800, t);
        filter.frequency.linearRampToValueAtTime(80, t + 0.55);

        const gain = this.ctx.createGain();
        gain.gain.setValueAtTime(0.65, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.58);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        noise.start(t);
        noise.stop(t + 0.6);
      } catch (e) {}
    },

    playCombo(count) {
      if (this.muted || !this.ctx) return;
      try {
        const notes = [440, 554.37, 659.25, 880, 1108.73];
        const base = notes[Math.min(count - 3, notes.length - 1)] || 659.25;
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(base, t);
        osc.frequency.exponentialRampToValueAtTime(base * 1.5, t + 0.25);
        gain.gain.setValueAtTime(0.35, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.3);
      } catch (e) {}
    },

    playCritical() {
      if (this.muted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(freq, t + idx * 0.05);
          gain.gain.setValueAtTime(0.25, t + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.01, t + idx * 0.05 + 0.2);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(t + idx * 0.05);
          osc.stop(t + idx * 0.05 + 0.22);
        });
      } catch (e) {}
    },

    playFreeze() {
      if (this.muted || !this.ctx) return;
      try {
        const t = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1200, t);
        osc.frequency.linearRampToValueAtTime(400, t + 0.5);
        gain.gain.setValueAtTime(0.3, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.5);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(t);
        osc.stop(t + 0.52);
      } catch (e) {}
    }
  };

  // --- ĐỊNH NGHĨA TRÁI CÂY (CANVAS 2D VECTOR) ---
  const FRUIT_TYPES = {
    watermelon: { id: "watermelon", nameVi: "Dưa hấu", nameEn: "Watermelon", radius: 42, color: "#10b981", innerColor: "#ef4444", points: 1 },
    apple: { id: "apple", nameVi: "Táo đỏ", nameEn: "Apple", radius: 36, color: "#ef4444", innerColor: "#fef08a", points: 1 },
    banana: { id: "banana", nameVi: "Chuối tiêu", nameEn: "Banana", radius: 38, color: "#eab308", innerColor: "#fef9c3", points: 1 },
    strawberry: { id: "strawberry", nameVi: "Dâu tây", nameEn: "Strawberry", radius: 30, color: "#f43f5e", innerColor: "#fda4af", points: 1 },
    orange: { id: "orange", nameVi: "Cam sành", nameEn: "Orange", radius: 36, color: "#f97316", innerColor: "#ffedd5", points: 1 },
    pineapple: { id: "pineapple", nameVi: "Quả dứa", nameEn: "Pineapple", radius: 44, color: "#f59e0b", innerColor: "#fef08a", points: 2 },
    coconut: { id: "coconut", nameVi: "Quả dừa", nameEn: "Coconut", radius: 38, color: "#78350f", innerColor: "#ffffff", points: 2 },
    dragonfruit: { id: "dragonfruit", nameVi: "Thanh long", nameEn: "Dragonfruit", radius: 40, color: "#ec4899", innerColor: "#ffffff", points: 2 },

    // Special arcade bananas
    banana_freeze: { id: "banana_freeze", nameVi: "Chuối Băng Giá", nameEn: "Freeze Banana", radius: 40, color: "#06b6d4", innerColor: "#cffafe", isSpecial: "freeze", points: 3 },
    banana_frenzy: { id: "banana_frenzy", nameVi: "Chuối Cuồng Nộ", nameEn: "Frenzy Banana", radius: 40, color: "#dc2626", innerColor: "#fecaca", isSpecial: "frenzy", points: 3 },
    banana_double: { id: "banana_double", nameVi: "Chuối Nhân Đôi", nameEn: "Double Banana", radius: 40, color: "#9333ea", innerColor: "#f3e8ff", isSpecial: "double", points: 3 }
  };

  // --- LƯỠI KIẾM (BLADES) & ĐẠO QUÁN (DOJOS) ---
  const BLADES = [
    { id: "original", nameVi: "Kiếm Ninja Bạc", nameEn: "Original Blade", color: "#e0f2fe", glow: "#38bdf8", spark: "#bae6fd", unlocked: true },
    { id: "flame", nameVi: "Hỏa Long Kiếm", nameEn: "Flame Katana", color: "#f97316", glow: "#ef4444", spark: "#fef08a", cost: 150 },
    { id: "ice", nameVi: "Băng Lam Kiếm", nameEn: "Ice Dagger", color: "#67e8f9", glow: "#06b6d4", spark: "#e0f2fe", cost: 200 },
    { id: "rainbow", nameVi: "Cầu Vồng Lấp Lánh", nameEn: "Rainbow Blade", color: "rainbow", glow: "#ec4899", spark: "#fef08a", cost: 300 },
    { id: "shadow", nameVi: "Hắc Nguyệt Kiếm", nameEn: "Shadow Blade", color: "#c084fc", glow: "#581c87", spark: "#e9d5ff", cost: 400 }
  ];

  const DOJOS = [
    { id: "wood", nameVi: "Võ Đường Mộc Cung", nameEn: "Classic Wood", bgGradient: ["#1c1917", "#292524", "#0c0a09"], floorColor: "#44403c", unlocked: true },
    { id: "night", nameVi: "Nguyệt Dạ Đạo Quán", nameEn: "Night Dojo", bgGradient: ["#090d16", "#0f172a", "#020617"], stars: true, cost: 150 },
    { id: "cherry", nameVi: "Vườn Hoa Anh Đào", nameEn: "Cherry Garden", bgGradient: ["#3b0764", "#701a75", "#1e1b4b"], blossoms: true, cost: 250 },
    { id: "sunset", nameVi: "Hoàng Hôn Núi Phú Sĩ", nameEn: "Sunset Peak", bgGradient: ["#7c2d12", "#9a3412", "#431407"], cost: 350 }
  ];

  // --- TRẠNG THÁI GAME TOÀN CỤC ---
  let canvas = null;
  let ctx = null;
  let containerEl = null;
  let animId = null;
  let onExitCallback = null;

  let gameState = "MENU"; // MENU, PLAYING, PAUSED, POMEGRANATE, GAMEOVER
  let gameMode = "classic"; // classic, zen, arcade
  let score = 0;
  let comboCount = 0;
  let maxCombo = 0;
  let lives = 3;
  let modeTimer = 0; // seconds remaining for Zen / Arcade
  let blitzValue = 0; // 0 to 100
  let blitzMultiplier = 1;
  let blitzDecayTimer = 0;

  // Active power-ups timer
  let activeFreezeTime = 0;
  let activeFrenzyTime = 0;
  let activeDoubleTime = 0;

  // Pre-game boosters (purchased or toggled)
  let boosterBerry = false;
  let boosterPeach = false;
  let boosterDeflect = false;
  let bombDeflectsLeft = 0;

  // Entities
  let fruits = [];
  let halfFruits = [];
  let particles = [];
  let splatters = [];
  let popTexts = [];
  let screenShake = 0;

  // Pomegranate phase
  let pomActive = false;
  let pomX = 0;
  let pomY = 0;
  let pomRadius = 65;
  let pomHits = 0;
  let pomTimer = 0;

  // Multi-touch tracking
  const activePointers = new Map(); // pointerId -> array of {x, y, time}
  let currentBlade = "original";
  let currentDojo = "wood";
  let starsCurrency = 100;
  let bestScores = { classic: 0, zen: 0, arcade: 0 };

  // Spawner timing
  let spawnTimer = 0;
  let nextWaveDelay = 90;
  let lastTime = 0;

  // Helper i18n
  function _T(vi, en) {
    if (typeof window !== "undefined" && typeof window.T === "function") {
      return window.T(vi, en);
    }
    return vi;
  }

  // --- STORAGE HELPERS ---
  function loadStorage() {
    try {
      bestScores.classic = parseInt(localStorage.getItem("fn_best_classic") || "0", 10);
      bestScores.zen = parseInt(localStorage.getItem("fn_best_zen") || "0", 10);
      bestScores.arcade = parseInt(localStorage.getItem("fn_best_arcade") || "0", 10);
      starsCurrency = parseInt(localStorage.getItem("fn_currency") || "100", 10);
      currentBlade = localStorage.getItem("fn_blade") || "original";
      currentDojo = localStorage.getItem("fn_dojo") || "wood";
    } catch (e) {}
  }

  function saveStorage() {
    try {
      localStorage.setItem("fn_best_classic", bestScores.classic.toString());
      localStorage.setItem("fn_best_zen", bestScores.zen.toString());
      localStorage.setItem("fn_best_arcade", bestScores.arcade.toString());
      localStorage.setItem("fn_currency", starsCurrency.toString());
      localStorage.setItem("fn_blade", currentBlade);
      localStorage.setItem("fn_dojo", currentDojo);
    } catch (e) {}
  }

  // --- VECTOR DRAWING HELPERS ---
  function drawVectorFruit(ctx, type, x, y, r, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);

    if (type.id === "watermelon") {
      // Vỏ dưa hấu tròn xanh sọc đậm, viền bóng
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = "#10b981";
      ctx.fill();
      ctx.lineWidth = 4;
      ctx.strokeStyle = "#047857";
      ctx.stroke();

      // Sọc dưa sẫm màu
      ctx.fillStyle = "#064e3b";
      for (let i = -r + 8; i < r - 8; i += 14) {
        ctx.beginPath();
        ctx.ellipse(i, 0, 3.5, r - 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      // Điểm sáng bóng
      ctx.beginPath();
      ctx.arc(-r * 0.35, -r * 0.35, r * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fill();
    } else if (type.id === "apple") {
      // Táo đỏ căng mọng
      ctx.beginPath();
      ctx.arc(-r * 0.22, 0, r * 0.8, 0, Math.PI * 2);
      ctx.arc(r * 0.22, 0, r * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = "#ef4444";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#b91c1c";
      ctx.stroke();

      // Cuống táo & lá xanh
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.7);
      ctx.quadraticCurveTo(5, -r * 1.1, 8, -r * 1.25);
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "#78350f";
      ctx.stroke();

      ctx.beginPath();
      ctx.ellipse(9, -r * 1.1, 7, 4, Math.PI / 4, 0, Math.PI * 2);
      ctx.fillStyle = "#22c55e";
      ctx.fill();
    } else if (type.id === "banana" || type.id.startsWith("banana_")) {
      // Quả chuối cong vàng hoặc chuối năng lượng
      let bodyCol = type.color;
      let auraCol = type.id === "banana_freeze" ? "#38bdf8" : (type.id === "banana_frenzy" ? "#ef4444" : (type.id === "banana_double" ? "#c084fc" : null));

      if (auraCol) {
        ctx.save();
        ctx.shadowColor = auraCol;
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(0, 0, r * 1.1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.08)";
        ctx.fill();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.moveTo(-r * 0.9, r * 0.4);
      ctx.quadraticCurveTo(0, -r * 0.8, r * 0.9, -r * 0.3);
      ctx.quadraticCurveTo(0, -r * 0.1, -r * 0.9, r * 0.4);
      ctx.fillStyle = bodyCol;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#a16207";
      ctx.stroke();

      // Đầu chuối xanh
      ctx.beginPath();
      ctx.arc(r * 0.88, -r * 0.3, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#65a30d";
      ctx.fill();
    } else if (type.id === "orange") {
      // Quả cam sành
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = "#f97316";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#c2410c";
      ctx.stroke();

      // Cuống cam nhỏ
      ctx.beginPath();
      ctx.arc(0, -r + 2, 4, 0, Math.PI * 2);
      ctx.fillStyle = "#15803d";
      ctx.fill();
    } else if (type.id === "strawberry") {
      // Quả dâu tây đỏ chấm vàng
      ctx.beginPath();
      ctx.moveTo(0, r);
      ctx.bezierCurveTo(-r * 1.1, -r * 0.3, -r * 0.8, -r * 0.9, 0, -r * 0.9);
      ctx.bezierCurveTo(r * 0.8, -r * 0.9, r * 1.1, -r * 0.3, 0, r);
      ctx.fillStyle = "#f43f5e";
      ctx.fill();
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = "#be123c";
      ctx.stroke();

      // Hạt dâu tây
      ctx.fillStyle = "#fef08a";
      for (let i = -12; i <= 12; i += 8) {
        ctx.fillRect(i, -r * 0.3, 2, 3);
        ctx.fillRect(i * 0.7, 0, 2, 3);
        ctx.fillRect(i * 0.4, r * 0.35, 2, 3);
      }

      // Đài lá xanh trên đỉnh
      ctx.beginPath();
      ctx.moveTo(-16, -r * 0.85);
      ctx.lineTo(0, -r * 0.6);
      ctx.lineTo(16, -r * 0.85);
      ctx.lineTo(0, -r * 1.15);
      ctx.fillStyle = "#22c55e";
      ctx.fill();
    } else if (type.id === "pineapple") {
      // Quả dứa hình bầu dục mắt dứa
      ctx.beginPath();
      ctx.ellipse(0, 6, r * 0.75, r * 0.95, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#f59e0b";
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "#b45309";
      ctx.stroke();

      // Mắt dứa chéo
      ctx.strokeStyle = "#d97706";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, -r * 0.2); ctx.lineTo(r * 0.5, r * 0.4);
      ctx.moveTo(-r * 0.5, r * 0.4); ctx.lineTo(r * 0.5, -r * 0.2);
      ctx.stroke();

      // Chùm lá dứa
      ctx.fillStyle = "#15803d";
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.8);
      ctx.lineTo(-12, -r * 1.35);
      ctx.lineTo(0, -r * 1.1);
      ctx.lineTo(12, -r * 1.35);
      ctx.closePath();
      ctx.fill();
    } else {
      // Trái cây chung tròn viền tươi sáng
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = type.color;
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(0,0,0,0.25)";
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawHalfFruit(ctx, half) {
    ctx.save();
    ctx.translate(half.x, half.y);
    ctx.rotate(half.rot);

    const r = half.radius;
    const isLeft = half.side === "left";

    // Cắt nửa bán nguyệt
    ctx.beginPath();
    if (isLeft) {
      ctx.arc(0, 0, r, Math.PI * 0.5, Math.PI * 1.5, false);
      ctx.closePath();
    } else {
      ctx.arc(0, 0, r, Math.PI * 1.5, Math.PI * 0.5, false);
      ctx.closePath();
    }

    // Vỏ ngoài
    ctx.fillStyle = half.type.color;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "rgba(0,0,0,0.2)";
    ctx.stroke();

    // Thịt quả bên trong
    ctx.beginPath();
    if (isLeft) {
      ctx.arc(0, 0, r - 6, Math.PI * 0.5, Math.PI * 1.5, false);
      ctx.closePath();
    } else {
      ctx.arc(0, 0, r - 6, Math.PI * 1.5, Math.PI * 0.5, false);
      ctx.closePath();
    }
    ctx.fillStyle = half.type.innerColor;
    ctx.fill();

    // Nếu là dưa hấu: vẽ hạt đen
    if (half.type.id === "watermelon") {
      ctx.fillStyle = "#1e293b";
      const sX = isLeft ? -12 : 12;
      ctx.fillRect(sX, -10, 3, 4);
      ctx.fillRect(sX * 1.4, 6, 3, 4);
      ctx.fillRect(sX * 0.7, 18, 3, 4);
    }

    ctx.restore();
  }

  function drawBomb(ctx, b) {
    ctx.save();
    ctx.translate(b.x, b.y);
    ctx.rotate(b.rot);

    // Thân bom tròn kim loại
    ctx.beginPath();
    ctx.arc(0, 0, b.radius, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(-b.radius * 0.3, -b.radius * 0.3, 4, 0, 0, b.radius);
    grad.addColorStop(0, "#64748b");
    grad.addColorStop(0.5, "#1e293b");
    grad.addColorStop(1, "#020617");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#475569";
    ctx.stroke();

    // Đầu kíp nổ kim loại
    ctx.fillStyle = "#94a3b8";
    ctx.fillRect(-6, -b.radius - 8, 12, 9);

    // Ngòi dây cháy
    ctx.beginPath();
    ctx.moveTo(0, -b.radius - 8);
    ctx.quadraticCurveTo(8, -b.radius - 18, 16, -b.radius - 22);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#d97706";
    ctx.stroke();

    // Tia lửa xẹt xẹt ngòi nổ
    ctx.save();
    ctx.translate(16, -b.radius - 22);
    ctx.fillStyle = (Math.floor(Date.now() / 60) % 2 === 0) ? "#fef08a" : "#ef4444";
    for (let i = 0; i < 5; i++) {
      const angle = (i * Math.PI * 2) / 5 + (Date.now() * 0.01);
      const dist = 5 + Math.random() * 6;
      ctx.fillRect(Math.cos(angle) * dist, Math.sin(angle) * dist, 3, 3);
    }
    ctx.restore();

    ctx.restore();
  }

  function drawPomegranate(ctx) {
    if (!pomActive) return;
    ctx.save();
    ctx.translate(pomX, pomY);

    // Hào quang lấp lánh quanh quả lựu khổng lồ
    ctx.save();
    ctx.shadowColor = "#f43f5e";
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(0, 0, pomRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#e11d48";
    ctx.fill();
    ctx.restore();

    // Chi tiết vỏ đỏ thẫm
    ctx.beginPath();
    ctx.arc(0, 0, pomRadius, 0, Math.PI * 2);
    const grad = ctx.createRadialGradient(-20, -20, 10, 0, 0, pomRadius);
    grad.addColorStop(0, "#fb7185");
    grad.addColorStop(0.4, "#be123c");
    grad.addColorStop(1, "#881337");
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#ffe4e6";
    ctx.stroke();

    // Vương miện quả lựu
    ctx.fillStyle = "#9f1239";
    ctx.beginPath();
    ctx.moveTo(-20, -pomRadius + 4);
    ctx.lineTo(-28, -pomRadius - 16);
    ctx.lineTo(-10, -pomRadius - 8);
    ctx.lineTo(0, -pomRadius - 22);
    ctx.lineTo(10, -pomRadius - 8);
    ctx.lineTo(28, -pomRadius - 16);
    ctx.lineTo(20, -pomRadius + 4);
    ctx.closePath();
    ctx.fill();

    // Thanh đo số nhát chém trên đỉnh quả lựu
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(-60, -pomRadius - 40, 120, 14);
    const hitPct = Math.min(1, pomHits / 30);
    ctx.fillStyle = "#facc15";
    ctx.fillRect(-58, -pomRadius - 38, 116 * hitPct, 10);

    // Chữ xả chém liên tục
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 13px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(`${_T("CHÉM LIÊN TỤC!", "SLASH RAPIDLY!")} (${pomHits})`, 0, -pomRadius - 48);

    ctx.restore();
  }

  // --- TRAIL VỆT KIẾM (MULTI-TOUCH) ---
  function drawBladeTrail(ctx, points, bladeConfig) {
    if (!points || points.length < 2) return;
    const now = Date.now();

    ctx.save();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    for (let i = 1; i < points.length; i++) {
      const p1 = points[i - 1];
      const p2 = points[i];
      const age = now - p2.time;
      if (age > 180) continue;

      const alpha = 1 - age / 180;
      const width = Math.max(2, 12 * alpha);

      let strokeColor = bladeConfig.color;
      if (bladeConfig.color === "rainbow") {
        const hue = (now * 0.2 + i * 25) % 360;
        strokeColor = `hsl(${hue}, 100%, 65%)`;
      }

      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = width;
      ctx.globalAlpha = alpha;
      ctx.shadowColor = bladeConfig.glow;
      ctx.shadowBlur = 14;
      ctx.stroke();

      // Lõi sáng trắng ở giữa
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = width * 0.4;
      ctx.globalAlpha = alpha * 0.9;
      ctx.shadowBlur = 0;
      ctx.stroke();
    }

    ctx.restore();
  }

  // --- SPATIAL / COLLISION LOGIC ---
  // Khoảng cách từ điểm C đến đoạn thẳng AB
  function distToSegment(cx, cy, x1, y1, x2, y2) {
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (l2 === 0) return Math.hypot(cx - x1, cy - y1);
    let t = ((cx - x1) * (x2 - x1) + (cy - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(cx - (x1 + t * (x2 - x1)), cy - (y1 + t * (y2 - y1)));
  }

  // --- ENTITY CREATION ---
  function spawnWave() {
    if (!canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    // Frenzy mode: quả bay ồ ạt từ hai bên
    if (activeFrenzyTime > 0) {
      for (let i = 0; i < 4; i++) {
        const typeKeys = Object.keys(FRUIT_TYPES).filter(k => !FRUIT_TYPES[k].isSpecial);
        const type = FRUIT_TYPES[typeKeys[Math.floor(Math.random() * typeKeys.length)]];
        const fromLeft = Math.random() > 0.5;
        const x = fromLeft ? -20 : w + 20;
        const y = h * (0.3 + Math.random() * 0.4);
        const vx = (fromLeft ? 1 : -1) * (6 + Math.random() * 4);
        const vy = -(3 + Math.random() * 5);
        fruits.push({
          type,
          x, y, vx, vy,
          g: 0.32,
          rot: 0,
          rotSpeed: (Math.random() - 0.5) * 0.15,
          radius: type.radius,
          isBomb: false
        });
      }
      return;
    }

    // Bình thường: bắn cụm 1 - 4 quả từ đáy màn hình lên
    const waveCount = 1 + Math.floor(Math.random() * (gameMode === "arcade" ? 3 : 2));
    const isBombWave = gameMode !== "zen" && Math.random() < 0.22 && score > 8;

    for (let i = 0; i < waveCount; i++) {
      let type;
      // Arcade mode: xác suất xuất hiện chuối đặc biệt
      if (gameMode === "arcade" && Math.random() < 0.14) {
        const specials = ["banana_freeze", "banana_frenzy", "banana_double"];
        type = FRUIT_TYPES[specials[Math.floor(Math.random() * specials.length)]];
      } else {
        const normalKeys = Object.keys(FRUIT_TYPES).filter(k => !FRUIT_TYPES[k].isSpecial);
        type = FRUIT_TYPES[normalKeys[Math.floor(Math.random() * normalKeys.length)]];
      }

      const spawnX = w * (0.15 + Math.random() * 0.7);
      const spawnY = h + 40;
      const targetApexY = h * (0.16 + Math.random() * 0.28);
      const g = 0.36;
      const distY = spawnY - targetApexY;
      const vy = -Math.sqrt(2 * g * distY);
      const flightTime = Math.abs(vy) / g;
      const centerTarget = w * 0.5 + (Math.random() - 0.5) * (w * 0.4);
      const vx = (centerTarget - spawnX) / flightTime;

      fruits.push({
        type,
        x: spawnX,
        y: spawnY,
        vx, vy, g,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.08,
        radius: type.radius,
        isBomb: false
      });
    }

    // Bổ sung quả bom trong cụm nếu có
    if (isBombWave) {
      const spawnX = w * (0.2 + Math.random() * 0.6);
      const spawnY = h + 40;
      const targetApexY = h * (0.2 + Math.random() * 0.25);
      const g = 0.36;
      const distY = spawnY - targetApexY;
      const vy = -Math.sqrt(2 * g * distY);
      const flightTime = Math.abs(vy) / g;
      const vx = (w * 0.5 - spawnX) / flightTime;

      fruits.push({
        type: { id: "bomb" },
        x: spawnX,
        y: spawnY,
        vx, vy, g,
        rot: 0,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        radius: 35,
        isBomb: true
      });
    }
  }

  function sliceFruit(f, index) {
    fruits.splice(index, 1);

    if (f.isBomb) {
      if (boosterDeflect && bombDeflectsLeft > 0) {
        bombDeflectsLeft--;
        createPopText(f.x, f.y, `🛡️ ${_T("ĐỠ BOM!", "DEFLECTED!")}`, "#38bdf8");
        AudioEngine.playCritical();
        return;
      }

      AudioEngine.playBombExplode();
      screenShake = 22;
      createSplashes(f.x, f.y, "#475569", 25);

      if (gameMode === "arcade") {
        // Arcade: nổ bom trừ 10 điểm, reset blitz, không chết
        score = Math.max(0, score - 10);
        blitzValue = 0;
        blitzMultiplier = 1;
        createPopText(f.x, f.y, "-10 BOM!", "#ef4444");
        // Xóa hết quả đang bay
        fruits = [];
      } else {
        // Classic: nổ bom thua ngay
        triggerGameOver("bomb");
      }
      return;
    }

    // Chém trúng trái cây thường hoặc quả chuối đặc biệt
    AudioEngine.playSplat();

    // Tách làm 2 nửa
    halfFruits.push({
      type: f.type,
      side: "left",
      x: f.x - 8,
      y: f.y,
      vx: f.vx - 3.2,
      vy: f.vy - 1.5,
      rot: f.rot,
      rotSpeed: -0.1,
      radius: f.radius,
      alpha: 1
    });

    halfFruits.push({
      type: f.type,
      side: "right",
      x: f.x + 8,
      y: f.y,
      vx: f.vx + 3.2,
      vy: f.vy - 1.5,
      rot: f.rot,
      rotSpeed: 0.1,
      radius: f.radius,
      alpha: 1
    });

    // Tạo vệt nước & hạt bắn tóe
    createSplashes(f.x, f.y, f.type.color, 14);
    createSplatter(f.x, f.y, f.type.color);

    // Xử lý hiệu ứng chuối đặc biệt
    if (f.type.isSpecial === "freeze") {
      activeFreezeTime = 5;
      AudioEngine.playFreeze();
      createPopText(f.x, f.y, `❄️ ${_T("ĐÔNG LẠNH!", "FREEZE!")}`, "#38bdf8");
    } else if (f.type.isSpecial === "frenzy") {
      activeFrenzyTime = 5;
      AudioEngine.playCritical();
      createPopText(f.x, f.y, `⚡ ${_T("MƯA TRÁI CÂY!", "FRENZY!")}`, "#ef4444");
    } else if (f.type.isSpecial === "double") {
      activeDoubleTime = 5;
      AudioEngine.playCritical();
      createPopText(f.x, f.y, `💎 ${_T("X2 ĐIỂM!", "DOUBLE SCORE!")}`, "#a855f7");
    }

    // Điểm cơ bản
    let earnedPoints = f.type.points || 1;
    if (boosterBerry && f.type.id === "strawberry") {
      earnedPoints += 5;
    }

    // Critical hit ngẫu nhiên 9%
    const isCritical = Math.random() < 0.09;
    if (isCritical) {
      earnedPoints += 10;
      AudioEngine.playCritical();
      createPopText(f.x, f.y, `💥 ${_T("CHÍ MẠNG +10!", "CRITICAL +10!")}`, "#facc15");
    }

    // Multipliers
    if (activeDoubleTime > 0) earnedPoints *= 2;
    if (gameMode === "arcade" && blitzMultiplier > 1) earnedPoints *= blitzMultiplier;

    score += earnedPoints;
    starsCurrency += Math.max(1, Math.floor(earnedPoints / 2));

    // Thưởng hồi mạng trong Classic mỗi 100 điểm
    if (gameMode === "classic" && score > 0 && score % 100 === 0 && lives < 3) {
      lives++;
      createPopText(canvas.width / 2, 80, `❤️ ${_T("HỒI MẠNG!", "+1 LIFE!")}`, "#22c55e");
      AudioEngine.playCombo(4);
    }

    // Cập nhật Blitz Bar
    if (gameMode === "arcade") {
      blitzValue = Math.min(100, blitzValue + 16);
      blitzDecayTimer = 1.6;
      if (blitzValue >= 80) blitzMultiplier = 3;
      else if (blitzValue >= 40) blitzMultiplier = 2;
      else blitzMultiplier = 1;
    }

    comboCount++;
  }

  function createSplashes(x, y, color, count = 12) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      particles.push({
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: 2.5 + Math.random() * 3.5,
        color,
        alpha: 1,
        life: 0.6 + Math.random() * 0.4
      });
    }
  }

  function createSplatter(x, y, color) {
    // Vết nước dính trên background
    splatters.push({
      x, y,
      radius: 20 + Math.random() * 25,
      color,
      alpha: 0.35,
      life: 3.5
    });
    if (splatters.length > 15) splatters.shift();
  }

  function createPopText(x, y, text, color = "#ffffff") {
    popTexts.push({
      x, y,
      text,
      color,
      vy: -1.8,
      alpha: 1,
      life: 0.85
    });
  }

  // --- GAME OVER & RESET ---
  function triggerGameOver(reason = "time") {
    gameState = "GAMEOVER";
    AudioEngine.playBombExplode();

    // Lưu best score
    if (score > bestScores[gameMode]) {
      bestScores[gameMode] = score;
    }
    saveStorage();
  }

  function startNewGame(mode = "classic") {
    gameMode = mode;
    score = 0;
    comboCount = 0;
    maxCombo = 0;
    lives = 3;
    activeFreezeTime = 0;
    activeFrenzyTime = 0;
    activeDoubleTime = 0;
    blitzValue = 0;
    blitzMultiplier = 1;
    bombDeflectsLeft = boosterDeflect ? 3 : 0;

    if (mode === "zen") {
      modeTimer = 90 + (boosterPeach ? 2 : 0);
    } else if (mode === "arcade") {
      modeTimer = 60 + (boosterPeach ? 2 : 0);
    } else {
      modeTimer = 0;
    }

    pomActive = false;
    pomHits = 0;
    fruits = [];
    halfFruits = [];
    particles = [];
    popTexts = [];
    activePointers.clear();
    gameState = "PLAYING";
  }

  // --- GAME LOOP & UPDATES ---
  function update(dt) {
    if (gameState !== "PLAYING" && gameState !== "POMEGRANATE") return;

    // Time slowdown factor when Freeze is active
    const timeScale = activeFreezeTime > 0 ? 0.4 : 1.0;

    if (activeFreezeTime > 0) activeFreezeTime = Math.max(0, activeFreezeTime - dt);
    if (activeFrenzyTime > 0) activeFrenzyTime = Math.max(0, activeFrenzyTime - dt);
    if (activeDoubleTime > 0) activeDoubleTime = Math.max(0, activeDoubleTime - dt);

    // Blitz bar decay in Arcade
    if (gameMode === "arcade" && blitzValue > 0) {
      blitzDecayTimer -= dt;
      if (blitzDecayTimer <= 0) {
        blitzValue = Math.max(0, blitzValue - dt * 25);
        if (blitzValue < 40) blitzMultiplier = 1;
        else if (blitzValue < 80) blitzMultiplier = 2;
      }
    }

    // Countdown timer for Zen & Arcade
    if (gameMode === "zen" || gameMode === "arcade") {
      modeTimer -= dt * timeScale;
      // Arcade: Kích hoạt quả lựu khổng lồ trong 5 giây cuối
      if (gameMode === "arcade" && modeTimer <= 5 && modeTimer > 0 && !pomActive) {
        pomActive = true;
        pomHits = 0;
        pomX = canvas.width / 2;
        pomY = canvas.height * 0.45;
        gameState = "POMEGRANATE";
        fruits = [];
        AudioEngine.playCritical();
      }

      if (modeTimer <= 0) {
        if (pomActive) {
          // Thưởng điểm quả lựu nổ
          score += pomHits * 2;
          AudioEngine.playBombExplode();
          createPopText(pomX, pomY, `🍉 ${_T("LỰU NỔ TUNG!", "POMEGRANATE EXPLODED!")} +${pomHits * 2}`, "#f43f5e");
          pomActive = false;
        }
        triggerGameOver("time");
        return;
      }
    }

    // Spawner logic
    if (gameState === "PLAYING") {
      spawnTimer += dt * (activeFrenzyTime > 0 ? 3.5 : 1);
      if (spawnTimer >= (activeFrenzyTime > 0 ? 0.35 : 1.5)) {
        spawnTimer = 0;
        spawnWave();
      }
    }

    // Update Fruits
    for (let i = fruits.length - 1; i >= 0; i--) {
      const f = fruits[i];
      f.x += f.vx * timeScale;
      f.y += f.vy * timeScale;
      f.vy += f.g * timeScale;
      f.rot += f.rotSpeed * timeScale;

      // Quả rơi khỏi đáy màn hình
      if (f.y > canvas.height + 70 && f.vy > 0) {
        fruits.splice(i, 1);
        if (!f.isBomb && gameMode === "classic") {
          lives--;
          createPopText(f.x, canvas.height - 40, "❌ LỠ QUẢ!", "#ef4444");
          if (lives <= 0) {
            triggerGameOver("miss");
            return;
          }
        }
      }
    }

    // Update Half Fruits
    for (let i = halfFruits.length - 1; i >= 0; i--) {
      const h = halfFruits[i];
      h.x += h.vx * timeScale;
      h.y += h.vy * timeScale;
      h.vy += 0.38 * timeScale;
      h.rot += h.rotSpeed * timeScale;
      h.alpha -= dt * 0.5;
      if (h.y > canvas.height + 80 || h.alpha <= 0) {
        halfFruits.splice(i, 1);
      }
    }

    // Update Particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.2;
      p.alpha -= dt * 1.4;
      if (p.alpha <= 0) particles.splice(i, 1);
    }

    // Update Splatters
    for (let i = splatters.length - 1; i >= 0; i--) {
      const s = splatters[i];
      s.life -= dt;
      if (s.life <= 0) splatters.splice(i, 1);
    }

    // Update Pop Texts
    for (let i = popTexts.length - 1; i >= 0; i--) {
      const pt = popTexts[i];
      pt.y += pt.vy;
      pt.life -= dt;
      pt.alpha = Math.max(0, pt.life / 0.85);
      if (pt.life <= 0) popTexts.splice(i, 1);
    }

    // Collision Check: duyệt qua từng nét vuốt của từng ngón tay
    const now = Date.now();
    let comboInFrame = 0;

    activePointers.forEach((trail) => {
      if (trail.length < 2) return;
      const p1 = trail[trail.length - 2];
      const p2 = trail[trail.length - 1];
      const dist = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      if (dist < 8) return; // quá chậm, không tính là chém

      // Kiểm tra với Quả lựu khổng lồ (Arcade Pomegranate)
      if (pomActive) {
        const d = distToSegment(pomX, pomY, p1.x, p1.y, p2.x, p2.y);
        if (d <= pomRadius + 15) {
          pomHits++;
          createSplashes(p2.x, p2.y, "#f43f5e", 6);
          AudioEngine.playSplat();
        }
      }

      // Kiểm tra với Trái cây đang bay
      for (let i = fruits.length - 1; i >= 0; i--) {
        const f = fruits[i];
        const d = distToSegment(f.x, f.y, p1.x, p1.y, p2.x, p2.y);
        if (d <= f.radius + 12) {
          sliceFruit(f, i);
          comboInFrame++;
        }
      }
    });

    // Tính Combo nếu trong 1 lượt vuốt chém được >= 3 quả
    if (comboInFrame >= 3) {
      const comboBonus = comboInFrame * 2;
      score += comboBonus;
      maxCombo = Math.max(maxCombo, comboInFrame);
      AudioEngine.playCombo(comboInFrame);
      createPopText(canvas.width / 2, canvas.height * 0.35, `🔥 ${_T("COMBO x", "COMBO x")}${comboInFrame}! +${comboBonus}`, "#f59e0b");
    }

    if (screenShake > 0) screenShake -= dt * 45;
  }

  // --- RENDER FUNCTION ---
  function renderScene() {
    if (!ctx || !canvas) return;
    const w = canvas.width;
    const h = canvas.height;

    ctx.save();

    // Rung màn hình khi bom nổ
    if (screenShake > 0) {
      const sx = (Math.random() - 0.5) * screenShake;
      const sy = (Math.random() - 0.5) * screenShake;
      ctx.translate(sx, sy);
    }

    // 1. Vẽ Background Đạo quán (Dojo)
    const dojoConfig = DOJOS.find(d => d.id === currentDojo) || DOJOS[0];
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, dojoConfig.bgGradient[0]);
    bgGrad.addColorStop(0.6, dojoConfig.bgGradient[1]);
    bgGrad.addColorStop(1, dojoConfig.bgGradient[2]);
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Vân gỗ hoặc họa tiết trang trí sàn
    if (dojoConfig.id === "wood") {
      ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
      ctx.lineWidth = 1;
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    }

    // 2. Vẽ Vết nước trái cây bám trên sàn (Splatters)
    splatters.forEach(s => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, s.alpha * (s.life / 3.5));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fillStyle = s.color;
      ctx.fill();
      ctx.restore();
    });

    // 3. Hiệu ứng viền băng khi Freeze
    if (activeFreezeTime > 0) {
      ctx.save();
      ctx.strokeStyle = "rgba(56, 189, 248, 0.55)";
      ctx.lineWidth = 14;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 20;
      ctx.strokeRect(0, 0, w, h);
      ctx.restore();
    }

    // 4. Vẽ Trái cây đang bay
    fruits.forEach(f => {
      if (f.isBomb) {
        drawBomb(ctx, f);
      } else {
        drawVectorFruit(ctx, f.type, f.x, f.y, f.radius, f.rot);
      }
    });

    // 5. Vẽ Nửa quả vỡ đôi
    halfFruits.forEach(hf => drawHalfFruit(ctx, hf));

    // 6. Vẽ Quả lựu khổng lồ (Arcade Pomegranate)
    drawPomegranate(ctx);

    // 7. Vẽ Hạt nước bắn tóe (Particles)
    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.alpha);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
      ctx.restore();
    });

    // 8. Vẽ Vệt kiếm phát sáng (Blade Trails) của từng ngón tay
    const bladeConfig = BLADES.find(b => b.id === currentBlade) || BLADES[0];
    activePointers.forEach(trail => {
      drawBladeTrail(ctx, trail, bladeConfig);
    });

    // 9. Vẽ Chữ bay (Pop texts)
    popTexts.forEach(pt => {
      ctx.save();
      ctx.globalAlpha = pt.alpha;
      ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = pt.color;
      ctx.shadowColor = "rgba(0,0,0,0.85)";
      ctx.shadowBlur = 6;
      ctx.textAlign = "center";
      ctx.fillText(pt.text, pt.x, pt.y);
      ctx.restore();
    });

    // 10. HUD trên Canvas (Điểm, Mạng, Thời gian, Blitz)
    if (gameState === "PLAYING" || gameState === "POMEGRANATE") {
      drawHUD(ctx, w, h);
    }

    ctx.restore();
  }

  function drawHUD(ctx, w, h) {
    ctx.save();

    // Điểm số bên trái
    ctx.fillStyle = "#ffffff";
    ctx.font = "900 28px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.shadowColor = "rgba(0,0,0,0.8)";
    ctx.shadowBlur = 8;
    ctx.fillText(`🍉 ${score}`, 16, 42);

    // Hiển thị Mode / Thời gian ở giữa
    ctx.textAlign = "center";
    if (gameMode === "classic") {
      // 3 dấu X mạng bên phải
      let heartStr = "";
      for (let i = 0; i < 3; i++) {
        heartStr += i < lives ? "❤️ " : "❌ ";
      }
      ctx.textAlign = "right";
      ctx.font = "bold 22px system-ui, sans-serif";
      ctx.fillText(heartStr.trim(), w - 16, 40);
    } else {
      // Zen & Arcade: Đồng hồ đếm ngược
      const sec = Math.max(0, Math.ceil(modeTimer));
      const col = sec <= 10 ? "#ef4444" : "#fef08a";
      ctx.font = "900 26px system-ui, sans-serif";
      ctx.fillStyle = col;
      ctx.fillText(`⏱️ ${sec}s`, w / 2, 42);

      // Thanh Blitz trong Arcade
      if (gameMode === "arcade") {
        const barW = Math.min(220, w * 0.55);
        const barH = 10;
        const bx = (w - barW) / 2;
        const by = 54;
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(bx, by, barW, barH);

        const fillW = (barW - 4) * (blitzValue / 100);
        ctx.fillStyle = blitzMultiplier >= 3 ? "#ef4444" : (blitzMultiplier === 2 ? "#f59e0b" : "#38bdf8");
        ctx.fillRect(bx + 2, by + 2, fillW, barH - 4);

        if (blitzMultiplier > 1) {
          ctx.font = "bold 13px system-ui, sans-serif";
          ctx.fillStyle = "#fef08a";
          ctx.fillText(`⚡ BLITZ x${blitzMultiplier}!`, w / 2, by + 24);
        }
      }
    }

    ctx.restore();
  }

  // --- HTML UI OVERLAYS & MODALS ---
  function buildUI() {
    if (!containerEl) return;

    containerEl.innerHTML = `
      <div class="fn-container" style="position:relative;width:100%;height:100%;min-height:540px;background:#0f172a;user-select:none;overflow:hidden;font-family:system-ui,-apple-system,sans-serif">
        <!-- Nút Header Thoát & Tùy chỉnh nhanh -->
        <div style="position:absolute;top:10px;left:12px;z-index:20;display:flex;gap:8px;align-items:center">
          <button id="fnBackBtn" style="min-height:44px;padding:6px 14px;background:rgba(255,255,255,0.15);color:#fff;border:1.5px solid rgba(255,255,255,0.3);border-radius:22px;font-weight:700;font-size:14px;cursor:pointer;backdrop-filter:blur(8px);display:flex;align-items:center;gap:6px">
            🔙 <span>${_T("Quay lại", "Back")}</span>
          </button>
          <button id="fnMuteBtn" style="min-height:44px;min-width:44px;background:rgba(255,255,255,0.15);color:#fff;border:1.5px solid rgba(255,255,255,0.3);border-radius:22px;font-size:16px;cursor:pointer;backdrop-filter:blur(8px)">
            🔊
          </button>
        </div>

        <div style="position:absolute;top:10px;right:12px;z-index:20">
          <div style="background:rgba(0,0,0,0.5);color:#fef08a;padding:6px 14px;border-radius:20px;font-weight:800;font-size:15px;border:1.5px solid rgba(254,240,138,0.4)">
            ⭐ <span id="fnStarsCurrency">${starsCurrency}</span>
          </div>
        </div>

        <!-- Canvas Game Arena -->
        <canvas id="fnCanvas" style="position:absolute;top:0;left:0;width:100%;height:100%;touch-action:none;display:block"></canvas>

        <!-- MENU CHÍNH OVERLAY -->
        <div id="fnMenuOverlay" style="position:absolute;inset:0;background:rgba(15,23,42,0.85);backdrop-filter:blur(8px);display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:30;padding:16px;text-align:center">
          <div style="font-size:clamp(36px,8vw,52px);font-weight:900;color:#fef08a;text-shadow:0 4px 16px rgba(245,158,11,0.6);margin-bottom:4px">
            🍉 NINJA FRUIT
          </div>
          <p style="color:#94a3b8;font-size:clamp(14px,3.5vw,16px);max-width:420px;margin-bottom:20px">
            ${_T("Vuốt ngón tay thật nhanh để chém ngọt các loại quả và tạo những cú combo rực rỡ!", "Swipe swiftly to slice delicious fruits and perform magnificent combos!")}
          </p>

          <!-- 3 Mode Chọn chơi -->
          <div style="display:flex;flex-direction:column;gap:12px;width:100%;max-width:320px;margin-bottom:18px">
            <button class="fn-btn-play" data-mode="classic" style="padding:14px;background:linear-gradient(135deg,#ef4444,#dc2626);color:#fff;border:none;border-radius:18px;font-weight:800;font-size:18px;box-shadow:0 4px 14px rgba(239,68,68,0.4);cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:12px 20px">
              <span>🗡️ CLASSIC</span>
              <span style="font-size:13px;opacity:0.9">Kỷ lục: ${bestScores.classic}</span>
            </button>
            <button class="fn-btn-play" data-mode="zen" style="padding:14px;background:linear-gradient(135deg,#10b981,#059669);color:#fff;border:none;border-radius:18px;font-weight:800;font-size:18px;box-shadow:0 4px 14px rgba(16,185,129,0.4);cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:12px 20px">
              <span>🧘 ZEN (90s)</span>
              <span style="font-size:13px;opacity:0.9">Kỷ lục: ${bestScores.zen}</span>
            </button>
            <button class="fn-btn-play" data-mode="arcade" style="padding:14px;background:linear-gradient(135deg,#8b5cf6,#6d28d9);color:#fff;border:none;border-radius:18px;font-weight:800;font-size:18px;box-shadow:0 4px 14px rgba(139,92,246,0.4);cursor:pointer;display:flex;align-items:center;justify-content:space-between;padding:12px 20px">
              <span>⚡ ARCADE (60s)</span>
              <span style="font-size:13px;opacity:0.9">Kỷ lục: ${bestScores.arcade}</span>
            </button>
          </div>

          <!-- Nút Shop Kiếm & Dojos -->
          <div style="display:flex;gap:10px;justify-content:center">
            <button id="fnShopBtn" style="padding:10px 18px;background:rgba(255,255,255,0.1);color:#e2e8f0;border:1.5px solid rgba(255,255,255,0.25);border-radius:16px;font-weight:700;font-size:14px;cursor:pointer">
              🛍️ ${_T("Đạo Quán & Kiếm", "Dojo & Blades")}
            </button>
            <button id="fnHelpBtn" style="padding:10px 18px;background:rgba(255,255,255,0.1);color:#e2e8f0;border:1.5px solid rgba(255,255,255,0.25);border-radius:16px;font-weight:700;font-size:14px;cursor:pointer">
              ❓ ${_T("Hướng dẫn", "How to Play")}
            </button>
          </div>
        </div>

        <!-- SHOP & CUSTOMIZATION MODAL -->
        <div id="fnShopModal" style="position:absolute;inset:0;background:rgba(15,23,42,0.92);backdrop-filter:blur(10px);display:none;flex-direction:column;z-index:40;padding:20px;overflow-y:auto">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h2 style="color:#fef08a;margin:0;font-size:22px">🛍️ ${_T("Cửa Hàng Ninja", "Ninja Armory")}</h2>
            <button id="fnCloseShopBtn" style="background:none;border:none;color:#fff;font-size:26px;cursor:pointer">✕</button>
          </div>

          <h3 style="color:#38bdf8;font-size:16px;margin:8px 0">${_T("1. Lưỡi Kiếm Phát Sáng (Blades)", "1. Glowing Blades")}</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:16px" id="fnBladesList"></div>

          <h3 style="color:#38bdf8;font-size:16px;margin:8px 0">${_T("2. Hình Nền Đạo Quán (Dojos)", "2. Dojo Backgrounds")}</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:10px;margin-bottom:16px" id="fnDojosList"></div>
        </div>

        <!-- GAMEOVER MODAL -->
        <div id="fnGameOverModal" style="position:absolute;inset:0;background:rgba(15,23,42,0.9);backdrop-filter:blur(8px);display:none;flex-direction:column;align-items:center;justify-content:center;z-index:35;padding:20px;text-align:center">
          <div style="font-size:52px;line-height:1;margin-bottom:8px">🎉</div>
          <h2 style="color:#facc15;font-size:clamp(24px,6vw,34px);margin:4px 0 8px">${_T("KẾT THÚC VÁN ĐẤU!", "GAME OVER!")}</h2>
          <div style="font-size:clamp(36px,8vw,48px);font-weight:900;color:#ffffff;margin-bottom:4px" id="fnFinalScore">0</div>
          <p style="color:#94a3b8;font-size:15px;margin:0 0 16px" id="fnFinalStats"></p>

          <div style="display:flex;gap:12px;justify-content:center">
            <button id="fnRestartBtn" style="padding:12px 24px;background:#10b981;color:#fff;border:none;border-radius:18px;font-weight:800;font-size:16px;cursor:pointer">
              🔄 ${_T("Chơi lại", "Play Again")}
            </button>
            <button id="fnBackToMenuBtn" style="padding:12px 24px;background:#475569;color:#fff;border:none;border-radius:18px;font-weight:800;font-size:16px;cursor:pointer">
              🏠 ${_T("Menu chính", "Main Menu")}
            </button>
          </div>
        </div>
      </div>
    `;

    canvas = containerEl.querySelector("#fnCanvas");
    ctx = canvas ? canvas.getContext("2d") : null;

    // Kích thước responsive canvas
    function resize() {
      if (!canvas || !containerEl) return;
      canvas.width = containerEl.clientWidth || 360;
      canvas.height = containerEl.clientHeight || 540;
    }
    resize();
    if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("resize", resize, { passive: true });

    // Gắn sự kiện Input Touch & Mouse
    setupInputListeners();

    // Gắn sự kiện UI Buttons
    containerEl.querySelector("#fnBackBtn").onclick = () => {
      destroy();
      if (typeof onExitCallback === "function") {
        onExitCallback();
      } else if (typeof window.go === "function") {
        window.go("games");
      }
    };

    const muteBtn = containerEl.querySelector("#fnMuteBtn");
    muteBtn.onclick = () => {
      AudioEngine.muted = !AudioEngine.muted;
      muteBtn.textContent = AudioEngine.muted ? "🔇" : "🔊";
    };

    containerEl.querySelectorAll(".fn-btn-play").forEach(btn => {
      btn.onclick = () => {
        AudioEngine.init();
        const mode = btn.getAttribute("data-mode");
        containerEl.querySelector("#fnMenuOverlay").style.display = "none";
        startNewGame(mode);
      };
    });

    containerEl.querySelector("#fnShopBtn").onclick = () => {
      renderShopLists();
      containerEl.querySelector("#fnShopModal").style.display = "flex";
    };

    containerEl.querySelector("#fnCloseShopBtn").onclick = () => {
      containerEl.querySelector("#fnShopModal").style.display = "none";
    };

    containerEl.querySelector("#fnHelpBtn").onclick = () => {
      alert(_T(
        "NINJA FRUIT CLONE:\n- Dùng ngón tay vuốt ngang qua các loại quả để chém.\n- Chém từ 3 quả trở lên trong 1 nét vuốt để được nhân đôi điểm Combo!\n- Classic: Có bom (chém là thua), được rơi tối đa 3 quả.\n- Zen: 90 giây tĩnh tâm rèn luyện kiếm pháp.\n- Arcade: 60 giây nghẹt thở có chuối Đông lạnh, Cuồng nộ và Lựu nổ!",
        "NINJA FRUIT CLONE:\n- Swipe across fruits to slice them.\n- Slice 3 or more fruits in a single swipe for a Double Combo!\n- Classic: Beware of bombs and don't let 3 fruits drop.\n- Zen: 90 seconds peaceful slicing.\n- Arcade: 60s intense timer with Freeze, Frenzy bananas & Pomegranate!"
      ));
    };

    containerEl.querySelector("#fnRestartBtn").onclick = () => {
      containerEl.querySelector("#fnGameOverModal").style.display = "none";
      startNewGame(gameMode);
    };

    containerEl.querySelector("#fnBackToMenuBtn").onclick = () => {
      containerEl.querySelector("#fnGameOverModal").style.display = "none";
      containerEl.querySelector("#fnMenuOverlay").style.display = "flex";
      gameState = "MENU";
    };
  }

  function renderShopLists() {
    if (!containerEl) return;
    const bladesWrap = containerEl.querySelector("#fnBladesList");
    const dojosWrap = containerEl.querySelector("#fnDojosList");

    bladesWrap.innerHTML = BLADES.map(b => {
      const isEquipped = currentBlade === b.id;
      return `
        <div style="background:rgba(255,255,255,0.08);border:${isEquipped ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.15)'};border-radius:12px;padding:10px;text-align:center;cursor:pointer" onclick="window.FruitNinja.selectBlade('${b.id}')">
          <div style="font-weight:700;color:#fff;font-size:13.5px;margin-bottom:4px">${b.nameVi}</div>
          <div style="font-size:12px;color:${isEquipped ? '#38bdf8' : '#94a3b8'}">${isEquipped ? 'Đang dùng' : 'Chọn kiếm'}</div>
        </div>
      `;
    }).join("");

    dojosWrap.innerHTML = DOJOS.map(d => {
      const isEquipped = currentDojo === d.id;
      return `
        <div style="background:rgba(255,255,255,0.08);border:${isEquipped ? '2px solid #38bdf8' : '1px solid rgba(255,255,255,0.15)'};border-radius:12px;padding:10px;text-align:center;cursor:pointer" onclick="window.FruitNinja.selectDojo('${d.id}')">
          <div style="font-weight:700;color:#fff;font-size:13.5px;margin-bottom:4px">${d.nameVi}</div>
          <div style="font-size:12px;color:${isEquipped ? '#38bdf8' : '#94a3b8'}">${isEquipped ? 'Đang dùng' : 'Chọn đạo quán'}</div>
        </div>
      `;
    }).join("");
  }

  // --- MULTI-TOUCH & INPUT TRACKING ---
  function setupInputListeners() {
    if (!canvas) return;

    function getCanvasPos(clientX, clientY) {
      const rect = canvas.getBoundingClientRect();
      return {
        x: clientX - rect.left,
        y: clientY - rect.top,
        time: Date.now()
      };
    }

    // Touch events
    canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      AudioEngine.init();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        const pos = getCanvasPos(t.clientX, t.clientY);
        activePointers.set(t.identifier, [pos]);
      }
    }, { passive: false });

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        const pos = getCanvasPos(t.clientX, t.clientY);
        const trail = activePointers.get(t.identifier);
        if (trail) {
          trail.push(pos);
          if (trail.length > 12) trail.shift();
          AudioEngine.playSwoosh();
        }
      }
    }, { passive: false });

    const endTouch = (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        const t = e.changedTouches[i];
        activePointers.delete(t.identifier);
      }
    };
    canvas.addEventListener("touchend", endTouch, { passive: true });
    canvas.addEventListener("touchcancel", endTouch, { passive: true });

    // Mouse events
    let isMouseDown = false;
    canvas.addEventListener("mousedown", (e) => {
      isMouseDown = true;
      AudioEngine.init();
      const pos = getCanvasPos(e.clientX, e.clientY);
      activePointers.set("mouse", [pos]);
    });

    if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("mousemove", (e) => {
      if (!isMouseDown) return;
      const pos = getCanvasPos(e.clientX, e.clientY);
      const trail = activePointers.get("mouse");
      if (trail) {
        trail.push(pos);
        if (trail.length > 12) trail.shift();
        AudioEngine.playSwoosh();
      }
    });

    if (typeof window !== "undefined" && window.addEventListener) window.addEventListener("mouseup", () => {
      isMouseDown = false;
      activePointers.delete("mouse");
    });
  }

  // --- RAF LOOP ---
  function loop(time) {
    if (!lastTime) lastTime = time;
    const dt = Math.min(0.1, (time - lastTime) / 1000);
    lastTime = time;

    update(dt);
    renderScene();

    // Cập nhật GameOver modal khi chết
    if (gameState === "GAMEOVER" && containerEl) {
      const modal = containerEl.querySelector("#fnGameOverModal");
      if (modal && modal.style.display !== "flex") {
        modal.style.display = "flex";
        containerEl.querySelector("#fnFinalScore").textContent = score;
        containerEl.querySelector("#fnFinalStats").textContent = `${_T("Kỷ lục:", "Best:")} ${bestScores[gameMode]} | ${_T("Combo cao nhất:", "Max Combo:")} x${maxCombo}`;
        containerEl.querySelector("#fnStarsCurrency").textContent = starsCurrency;
      }
    }

    animId = requestAnimationFrame(loop);
  }

  // --- PUBLIC API EXPORTS ---
  function init(container, options = {}) {
    containerEl = container || (typeof document !== "undefined" ? document.getElementById("m") : null);
    onExitCallback = options.onExit || null;

    loadStorage();
    buildUI();

    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    lastTime = 0;
    animId = requestAnimationFrame(loop);
  }

  function render(isReplay = false) {
    if (isReplay) {
      startNewGame(gameMode);
    }
  }

  function selectBlade(bladeId) {
    currentBlade = bladeId;
    saveStorage();
    renderShopLists();
  }

  function selectDojo(dojoId) {
    currentDojo = dojoId;
    saveStorage();
    renderShopLists();
  }

  function getState() {
    return {
      gameState,
      gameMode,
      score,
      lives,
      bestScores,
      currentBlade,
      currentDojo,
      starsCurrency
    };
  }

  function destroy() {
    if (animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
    fruits = [];
    halfFruits = [];
    particles = [];
    activePointers.clear();
  }

  const FruitNinjaModule = {
    init,
    render,
    selectBlade,
    selectDojo,
    getState,
    destroy,
    AudioEngine
  };

  if (typeof window !== "undefined") {
    window.FruitNinja = FruitNinjaModule;
  }
  if (typeof module !== "undefined" && module.exports) {
    module.exports = FruitNinjaModule;
  }

})(typeof window !== "undefined" ? window : globalThis);
