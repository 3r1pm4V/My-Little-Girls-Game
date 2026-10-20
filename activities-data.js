// activities-data.js - Clean stub (Đã tinh giản hệ thống bài tập trắc nghiệm phức tạp)
const ACTIVITIES_DATA = [];
function getActivitiesByTier() { return []; }
function getActivityById() { return null; }
function getActivitiesByStage() { return []; }
function getPreschoolJourneyActivities() { return []; }

if (typeof window !== "undefined") {
  window.ACTIVITIES_DATA = ACTIVITIES_DATA;
  window.getActivitiesByTier = getActivitiesByTier;
  window.getActivityById = getActivityById;
  window.getActivitiesByStage = getActivitiesByStage;
  window.getPreschoolJourneyActivities = getPreschoolJourneyActivities;
}
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    ACTIVITIES_DATA,
    getActivitiesByTier,
    getActivityById,
    getActivitiesByStage,
    getPreschoolJourneyActivities
  };
}
