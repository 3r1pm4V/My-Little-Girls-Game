# scripts/run_daily_vieneu_queue.ps1
# Script tự động tiếp tục hàng đợi âm thanh VieNeu và cập nhật Git local

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ProjectDir = Split-Path -Parent $ScriptDir
Set-Location $ProjectDir

$LogFile = Join-Path $ScriptDir "vieneu_scheduler.log"
$Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path $LogFile -Value "[$Timestamp] [VieNeu Auto Queue] Bắt đầu phiên sinh âm thanh..."

Write-Host "=== ĐANG CHẠY HÀNG ĐỢI ÂM THANH VIENEU ==="
node scripts/generate_spelling_vieneu.js *>> $LogFile

Write-Host "=== CẬP NHẬT SERVICE WORKER & PRECACHE ==="
node test-sw-precache.js --fix *>> $LogFile

Write-Host "=== LƯU COMMIT VÀO GIT LOCAL ==="
git add audio/ audio-map.js sw.js scripts/vieneu_queue_status.json *>> $LogFile
git commit -m "chore(audio): auto-sync daily generated vieneu spelling audios" *>> $LogFile

$EndTimestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
Add-Content -Path $LogFile -Value "[$EndTimestamp] [VieNeu Auto Queue] Hoàn tất phiên sinh âm thanh.`n"
Write-Host "✔ Hoàn tất và ghi log tại: $LogFile"
