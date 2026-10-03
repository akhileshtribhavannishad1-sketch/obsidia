@echo off
title OBSIDIA — Launcher
echo ========================================================
echo   OBSIDIA — Handmade Gothic Fine Jewelry
echo   Starting local server...
echo ========================================================
echo.

where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js not detected. Opening live online website...
    start https://akhileshtribhavannishad1-sketch.github.io/obsidia/
    pause
    exit /b
)

if not exist "node_modules\" (
    echo First-time run: Installing dependencies, please wait...
    call npm install
)

echo Opening OBSIDIA...
start http://localhost:5173
call npm run dev
pause
