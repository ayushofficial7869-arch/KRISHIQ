#!/bin/bash
echo "===================================================="
echo "Starting Krishiq (SIH26132 - Team PYRONEX)"
echo "===================================================="

# Activate virtualenv if present
if [ -d "venv" ]; then
    source venv/bin/activate
fi

# Start FastAPI backend in background
echo "Starting FastAPI backend on http://localhost:8000..."
python -m uvicorn main:app --port 8000 --reload &
BACKEND_PID=$!

trap "kill $BACKEND_PID" EXIT

sleep 2

echo "Starting Next.js frontend on http://localhost:3000..."
echo "Ready! Open http://localhost:3000 in your browser."
npm run dev