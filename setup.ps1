# MOYE Setup Script for Windows PowerShell
# This script helps you set up the MOYE project quickly

Write-Host "MOYE - Setup Script" -ForegroundColor Yellow
Write-Host "======================" -ForegroundColor Yellow
Write-Host ""

# Check Node.js
try {
    $nodeVersion = node -v
    Write-Host "Node.js $nodeVersion detected" -ForegroundColor Green
}
catch {
    Write-Host "Node.js is not installed. Please install Node.js 18+ first." -ForegroundColor Red
    exit 1
}

# Check Docker
try {
    $dockerVersion = docker -v
    Write-Host "Docker detected" -ForegroundColor Green
}
catch {
    Write-Host "Docker is not installed. You'll need it for LibreTranslate." -ForegroundColor Yellow
    Write-Host "Install from: https://docs.docker.com/get-docker/" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Cyan
npm install

Write-Host ""
Write-Host "Setting up environment variables..." -ForegroundColor Cyan

if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "Created .env file from .env.example" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: You need to configure your .env file with:" -ForegroundColor Yellow
    Write-Host "1. Supabase URL and API key" -ForegroundColor Yellow
    Write-Host "2. Gemini API key" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "See QUICKSTART.md for detailed instructions." -ForegroundColor Yellow
}
else {
    Write-Host ".env file already exists, skipping..." -ForegroundColor Cyan
}

Write-Host ""
Write-Host "Starting LibreTranslate with Docker..." -ForegroundColor Cyan

try {
    npm run docker:up
    Write-Host "LibreTranslate started on http://localhost:5000" -ForegroundColor Green
}
catch {
    Write-Host "Could not start Docker services" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Configure your .env file (see QUICKSTART.md)"
Write-Host "2. Set up Supabase database (run supabase/schema.sql)"
Write-Host "3. Optionally load seed data (run supabase/seed.sql)"
Write-Host "4. Start the dev server: npm run dev"
Write-Host ""
Write-Host "For detailed instructions, see QUICKSTART.md" -ForegroundColor Cyan
Write-Host ""
