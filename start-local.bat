@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js wurde nicht gefunden. Installiere zuerst Node.js von nodejs.org.
  pause
  exit /b 1
)
if not exist node_modules (
  echo Installiere Abhaengigkeiten ...
  call npm install
  if errorlevel 1 pause & exit /b 1
)
start "" http://localhost:3000
npm start
