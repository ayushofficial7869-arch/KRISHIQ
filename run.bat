@echo off
title Krishiq - Farm Command Center
echo ====================================================
echo Starting Krishiq (SIH26132 - Team PYRONEX)
echo ====================================================

REM 1. Activate Python virtual environment if present
if exist venv\Scripts\activate.bat (
    call venv\Scripts\activate.bat
)

REM 2. Start FastAPI backend in background
echo Starting FastAPI backend on http://localhost:8000...
start "Krishiq API Server" cmd /k python -m uvicorn main:app --port 8000 --reload

REM 3. Wait 2 seconds for backend to initialize
timeout /t 2 /nobreak >nul

REM 4. Start Next.js frontend
echo Starting Next.js frontend on http://localhost:3000...
echo Ready! Open http://localhost:3000 in your browser.
npm run dev