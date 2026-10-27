@echo off
title Almost There
cd /d "%~dp0"

if exist "node_modules\electron\dist\electron.exe" (
    start "" "node_modules\electron\dist\electron.exe" .
    exit /b 0
)

where electron >nul 2>nul
if %errorlevel% equ 0 (
    start "" electron .
    exit /b 0
)

start index.html
exit /b 0
