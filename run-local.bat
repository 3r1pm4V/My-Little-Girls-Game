@echo off
title Be Hoc Vui - Local Test Server
echo ======================================================================
echo    BE HOC VUI - LOCAL PREVIEW & TEST SERVER
echo    Mo trinh duyet tai: http://localhost:8000/test-local.html
echo ======================================================================
start http://localhost:8000/test-local.html
python -m http.server 8000
