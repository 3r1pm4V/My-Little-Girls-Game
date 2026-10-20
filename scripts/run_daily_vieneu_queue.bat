@echo off
chcp 65001 >nul
echo [VieNeu Auto Queue] Bắt đầu phiên sinh âm thanh tự động: %date% %time% >> "%~dp0vieneu_scheduler.log"
cd /d "%~dp0\.."

echo === CHẠY TIẾP HÀNG ĐỢI ÂM THANH VIENEU ===
node scripts\generate_spelling_vieneu.js >> "%~dp0vieneu_scheduler.log" 2>&1
node scripts\generate_vocab_vieneu.js >> "%~dp0vieneu_scheduler.log" 2>&1

echo === CẬP NHẬT SERVICE WORKER & ASSET HASH ===
node test-sw-precache.js --fix >> "%~dp0vieneu_scheduler.log" 2>&1

echo === LƯU COMMIT VÀO GIT LOCAL ===
git add audio/ audio-map.js sw.js scripts/vieneu_queue_status.json >> "%~dp0vieneu_scheduler.log" 2>&1
git commit -m "chore(audio): auto-sync daily generated vieneu spelling audios" >> "%~dp0vieneu_scheduler.log" 2>&1

echo [VieNeu Auto Queue] Hoàn tất phiên lúc: %date% %time% >> "%~dp0vieneu_scheduler.log"
