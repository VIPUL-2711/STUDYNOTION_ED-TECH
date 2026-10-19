@echo off
title StudyNotion - Fullstack Dev Server
color 0b
echo ========================================================
echo         STARTING STUDYNOTION FULLSTACK APP
echo ========================================================
echo.
echo [1/3] Checking environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed or not found in PATH!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [2/3] Preparing browser...
start /b cmd /c "timeout /t 4 /nobreak >nul && start http://localhost:3000"

echo [3/3] Launching Backend (Port 4000) and Frontend (Port 3000)...
echo.
echo  - Backend API:  http://localhost:4000
echo  - Frontend Web: http://localhost:3000
echo.
echo Press Ctrl + C to stop the servers anytime.
echo ========================================================
echo.

npm run dev

pause
