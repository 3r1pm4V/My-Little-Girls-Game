/**
 * progress.js
 * Hệ thống theo dõi tiến độ học tập và mức độ thành thạo kỹ năng (Mastery Learning System)
 * 
 * Lưu trữ: localStorage key "blg.progress.v2"
 * Các cấp độ kỹ năng: 'new' | 'learning' | 'mastered'
 */

(function () {
  const PROGRESS_STORAGE_KEY = "blg.progress.v2";

  /**
   * Truy cập localStorage an toàn trên môi trường trình duyệt và Node.js test
   */
  function getStorage() {
    try {
      if (typeof localStorage !== "undefined") return localStorage;
      if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
      if (typeof global !== "undefined" && global.localStorage) return global.localStorage;
    } catch (e) {}
    return null;
  }

  // Bộ nhớ đệm tạm thời phòng trường hợp không có localStorage
  const _memoryStore = {};

  /**
   * Đọc dữ liệu tiến độ từ kho lưu trữ
   */
  function readProgressData() {
    const store = getStorage();
    let raw = null;
    if (store) {
      try {
        raw = store.getItem(PROGRESS_STORAGE_KEY);
      } catch (e) {
        raw = null;
      }
    } else {
      raw = _memoryStore[PROGRESS_STORAGE_KEY] || null;
    }

    if (!raw) {
      return { version: 2, skills: {}, updatedAt: Date.now() };
    }

    try {
      const data = JSON.parse(raw);
      if (!data || typeof data !== "object") {
        return { version: 2, skills: {}, updatedAt: Date.now() };
      }
      if (!data.skills || typeof data.skills !== "object") {
        data.skills = {};
      }
      return data;
    } catch (e) {
      return { version: 2, skills: {}, updatedAt: Date.now() };
    }
  }

  /**
   * Lưu dữ liệu tiến độ vào kho lưu trữ
   */
  function saveProgressData(data) {
    if (!data || typeof data !== "object") return;
    data.updatedAt = Date.now();
    const raw = JSON.stringify(data);
    const store = getStorage();
    if (store) {
      try {
        store.setItem(PROGRESS_STORAGE_KEY, raw);
      } catch (e) {
        console.warn("Không thể lưu tiến độ vào localStorage:", e);
      }
    } else {
      _memoryStore[PROGRESS_STORAGE_KEY] = raw;
    }
  }

  /**
   * Chuyển đổi timestamp thành chuỗi ngày YYYY-MM-DD theo giờ địa phương
   */
  function getLocalDateString(ts) {
    const d = ts instanceof Date
      ? ts
      : (typeof ts === "number" && !isNaN(ts) ? new Date(ts) : new Date());
    if (isNaN(d.getTime())) return new Date().toISOString().slice(0, 10);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  /**
   * Cập nhật tiến độ của một kỹ năng sau mỗi câu trả lời của bé
   * @param {string} skillId Định danh hoặc tên kỹ năng
   * @param {boolean} isCorrect Kết quả trả lời (true: đúng, false: sai)
   * @param {number|Date} [timestamp] Thời điểm ghi nhận (mặc định Date.now())
   * @returns {object} Dữ liệu kỹ năng sau khi cập nhật
   */
  function updateProgress(skillId, isCorrect, timestamp) {
    if (!skillId) return null;
    const sId = String(skillId).trim();
    if (!sId) return null;

    const right = Boolean(isCorrect);
    const ts = (typeof timestamp === "number" && !isNaN(timestamp))
      ? timestamp
      : (timestamp instanceof Date && !isNaN(timestamp.getTime())
          ? timestamp.getTime()
          : Date.now());
    const dateStr = getLocalDateString(ts);

    const data = readProgressData();
    if (!data.skills[sId]) {
      data.skills[sId] = {
        history: [],
        sessions: {}
      };
    }

    const skill = data.skills[sId];
    if (!Array.isArray(skill.history)) {
      skill.history = [];
    }
    if (!skill.sessions || typeof skill.sessions !== "object") {
      skill.sessions = {};
    }

    // 1. Thêm bản ghi vào lịch sử chi tiết
    skill.history.push({
      correct: right,
      timestamp: ts,
      date: dateStr
    });

    // 2. Thống kê theo phiên ngày
    if (!skill.sessions[dateStr]) {
      skill.sessions[dateStr] = {
        date: dateStr,
        total: 0,
        correct: 0,
        attempts: []
      };
    }

    const session = skill.sessions[dateStr];
    session.total = (session.total || 0) + 1;
    if (right) {
      session.correct = (session.correct || 0) + 1;
    }
    if (!Array.isArray(session.attempts)) {
      session.attempts = [];
    }
    session.attempts.push({
      correct: right,
      timestamp: ts
    });

    saveProgressData(data);
    return skill;
  }

  /**
   * Kiểm tra xem bé đã đạt mức Thành Thạo (Mastery) kỹ năng chưa
   * Tiêu chuẩn: Bé đúng >= 4/5 lần trong ít nhất 2 phiên khác ngày
   * @param {string} skillId Định danh kỹ năng
   * @returns {boolean}
   */
  function checkMastery(skillId) {
    if (!skillId) return false;
    const sId = String(skillId).trim();
    if (!sId) return false;

    const data = readProgressData();
    const skill = data.skills[sId];
    if (!skill) return false;

    const sessions = skill.sessions || {};
    const history = Array.isArray(skill.history) ? skill.history : [];
    if (history.length === 0) return false;

    const dateKeys = Object.keys(sessions).sort();
    if (dateKeys.length < 2) {
      // Yêu cầu tối thiểu 2 phiên khác ngày
      return false;
    }

    // Hàm phụ: Kiểm tra xem danh sách câu hỏi có cửa sổ 5 câu liên tiếp nào đạt >= 4 câu đúng
    function has5WindowWith4Correct(attempts) {
      if (!attempts || attempts.length < 5) return false;
      for (let i = 0; i <= attempts.length - 5; i++) {
        const slice = attempts.slice(i, i + 5);
        const correctCount = slice.filter(x => (typeof x === "object" ? x.correct : x)).length;
        if (correctCount >= 4) return true;
      }
      return false;
    }

    // Hàm phụ: Đánh giá một phiên ngày có đạt điều kiện thành thạo (>= 4/5) hay không
    function isSessionPassed(sess) {
      if (!sess) return false;
      const total = sess.total || (sess.attempts ? sess.attempts.length : 0);
      const correct = sess.correct || 0;

      // Nếu làm >= 5 câu trong ngày:
      if (total >= 5) {
        // Tỷ lệ >= 80% (>= 4/5) và đúng >= 4 câu
        if (correct >= 4 && (correct / total >= 0.8 || has5WindowWith4Correct(sess.attempts))) {
          return true;
        }
        // Hoặc xét 5 câu gần nhất trong ngày đạt >= 4 đúng
        if (sess.attempts && sess.attempts.length >= 5) {
          const last5 = sess.attempts.slice(-5);
          const c5 = last5.filter(x => x.correct).length;
          if (c5 >= 4) return true;
        }
      } else if (total >= 4 && correct >= 4) {
        // Làm 4 câu đúng cả 4/4 (100% >= 80%)
        return true;
      }
      return false;
    }

    // Cách 1: Đếm số ngày độc lập đạt chuẩn >= 4/5
    let passedDaysCount = 0;
    for (const d of dateKeys) {
      if (isSessionPassed(sessions[d])) {
        passedDaysCount++;
      }
    }
    if (passedDaysCount >= 2) {
      return true;
    }

    // Cách 2: Chuỗi 5 câu liên tiếp gần nhất (sliding window) trải rộng qua >= 2 ngày khác nhau
    // (ví dụ: ngày 1 làm đúng 3/3 câu, ngày 2 làm đúng 2/2 câu -> tổng 5 câu liên tiếp đúng 5/5)
    if (history.length >= 5) {
      for (let i = history.length - 5; i >= 0; i--) {
        const window5 = history.slice(i, i + 5);
        const uniqueDates = new Set(window5.map(h => h.date));
        if (uniqueDates.size >= 2) {
          const correctCount = window5.filter(h => h.correct).length;
          if (correctCount >= 4) {
            return true;
          }
        }
      }
    }

    // Cách 3: Tổng thể toàn bộ lịch sử nếu có >= 2 ngày và tổng số câu >= 5, tỷ lệ đúng >= 80% (>= 4/5)
    // với cả 2 ngày đều có đóng góp câu trả lời đúng
    if (dateKeys.length >= 2 && history.length >= 5) {
      const totalCorrect = history.filter(h => h.correct).length;
      if (totalCorrect >= 4 && (totalCorrect / history.length >= 0.8)) {
        const activeDatesWithCorrect = dateKeys.filter(d => sessions[d] && sessions[d].correct > 0);
        if (activeDatesWithCorrect.length >= 2) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Lấy trạng thái cấp độ của kỹ năng: 'new' | 'learning' | 'mastered'
   * @param {string} skillId Định danh kỹ năng
   * @returns {'new' | 'learning' | 'mastered'}
   */
  function getSkillLevel(skillId) {
    if (!skillId) return "new";
    const sId = String(skillId).trim();
    if (!sId) return "new";

    const data = readProgressData();
    const skill = data.skills[sId];
    if (!skill || !skill.history || skill.history.length === 0) {
      return "new";
    }

    if (checkMastery(sId)) {
      return "mastered";
    }

    return "learning";
  }

  // ========================================================
  // XUẤT BẢN API CHO TRÌNH DUYỆT & TEST ENVIRONMENTS
  // ========================================================
  if (typeof window !== "undefined") {
    window.updateProgress = updateProgress;
    window.checkMastery = checkMastery;
    window.getSkillLevel = getSkillLevel;
    window.Progress = {
      updateProgress,
      checkMastery,
      getSkillLevel,
      readProgressData,
      saveProgressData,
      STORAGE_KEY: PROGRESS_STORAGE_KEY
    };
  }

  if (typeof global !== "undefined") {
    global.updateProgress = updateProgress;
    global.checkMastery = checkMastery;
    global.getSkillLevel = getSkillLevel;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      updateProgress,
      checkMastery,
      getSkillLevel,
      readProgressData,
      saveProgressData,
      PROGRESS_STORAGE_KEY
    };
  }
})();
