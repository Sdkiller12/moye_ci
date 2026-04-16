#!/bin/bash

# MOYÉ Setup Script
# This script helps you set up the MOYÉ project quickly

set -e

echo "🌅 MOYÉ - Setup Script"
echo "======================"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version must be 18 or higher. Current: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "⚠️  Docker is not installed. You'll need it for LibreTranslate."
    echo "   Install from: https://docs.docker.com/get-docker/"
else
    echo "✅ Docker $(docker -v | cut -d' ' -f3 | cut -d',' -f1) detected"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "📝 Setting up environment variables..."

if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env file from .env.example"
    echo ""
    echo "⚠️  IMPORTANT: You need to configure your .env file with:"
    echo "   1. Supabase URL and API key"
    echo "   2. Gemini API key"
    echo ""
    echo "   See QUICKSTART.md for detailed instructions."
else
    echo "ℹ️  .env file already exists, skipping..."
fi

echo ""
echo "🐳 Starting LibreTranslate with Docker..."

if command -v docker &> /dev/null; then
    npm run docker:up
    echo "✅ LibreTranslate started on http://localhost:5000"
else
    echo "⚠️  Skipping Docker setup (Docker not installed)"
fi

echo ""
echo "✨ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Configure your .env file (see QUICKSTART.md)"
echo "   2. Set up Supabase database (run supabase/schema.sql)"
echo "   3. Optionally load seed data (run supabase/seed.sql)"
echo "   4. Start the dev server: npm run dev"
echo ""
echo "🚀 For detailed instructions, see QUICKSTART.md"
echo ""
