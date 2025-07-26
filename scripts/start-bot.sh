#!/bin/bash

# MP3 Scraper Bot Startup Script
# This script helps you start the bot with proper configuration

set -e

echo "🎵 MP3 Scraper Bot - Startup Script"
echo "==================================="

# Check if Docker is available
if command -v docker &> /dev/null; then
    echo "✅ Docker found"
    DOCKER_AVAILABLE=true
else
    echo "⚠️  Docker not found, will use local installation"
    DOCKER_AVAILABLE=false
fi

# Check if Node.js is available
if command -v node &> /dev/null; then
    echo "✅ Node.js found"
    NODE_AVAILABLE=true
else
    echo "❌ Node.js not found. Please install Node.js 18+ first."
    exit 1
fi

# Function to start with Docker
start_with_docker() {
    echo "🚀 Starting with Docker..."
    
    # Check if docker-compose is available
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ docker-compose not found. Please install docker-compose first."
        exit 1
    fi
    
    # Create downloads directory if it doesn't exist
    mkdir -p downloads
    
    # Start the containers
    docker-compose up -d
    
    echo "✅ n8n is starting up..."
    echo "⏳ Please wait a moment for the service to be ready..."
    
    # Wait for n8n to be ready
    for i in {1..30}; do
        if curl -s http://localhost:5678 > /dev/null 2>&1; then
            echo "✅ n8n is ready!"
            break
        fi
        echo "⏳ Waiting for n8n to start... ($i/30)"
        sleep 2
    done
    
    echo ""
    echo "🎉 MP3 Scraper Bot is running!"
    echo "📱 Access n8n at: http://localhost:5678"
    echo "🔑 Login with: admin / admin123"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Import the workflow from workflows/mp3-scraper-workflow.json"
    echo "   2. Set up Google Sheets credentials"
    echo "   3. Configure your target URL"
    echo "   4. Activate the workflow"
    echo ""
    echo "📖 For detailed setup instructions, see README.md"
}

# Function to start locally
start_locally() {
    echo "🚀 Starting locally..."
    
    # Check if n8n is installed
    if ! command -v n8n &> /dev/null; then
        echo "📦 Installing n8n..."
        npm install -g n8n
    fi
    
    # Install dependencies
    if [ -f "package.json" ]; then
        echo "📦 Installing dependencies..."
        npm install
    fi
    
    # Create downloads directory if it doesn't exist
    mkdir -p downloads
    
    echo "✅ Starting n8n..."
    echo "📱 n8n will be available at: http://localhost:5678"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Import the workflow from workflows/mp3-scraper-workflow.json"
    echo "   2. Set up Google Sheets credentials"
    echo "   3. Configure your target URL"
    echo "   4. Activate the workflow"
    echo ""
    echo "🛑 Press Ctrl+C to stop n8n"
    
    # Start n8n
    n8n start
}

# Main script logic
echo ""
echo "Choose your startup method:"
echo "1. Docker (Recommended - easier setup)"
echo "2. Local installation"
echo ""

read -p "Enter your choice (1 or 2): " choice

case $choice in
    1)
        if [ "$DOCKER_AVAILABLE" = true ]; then
            start_with_docker
        else
            echo "❌ Docker not available. Please install Docker first or choose option 2."
            exit 1
        fi
        ;;
    2)
        start_locally
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again and choose 1 or 2."
        exit 1
        ;;
esac