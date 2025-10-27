#!/usr/bin/env node

/**
 * Google Sheets Setup Script for MP3 Scraper Bot
 * This script helps you set up the Google Sheets integration
 */

const fs = require('fs');
const path = require('path');

console.log('🎵 MP3 Scraper Bot - Google Sheets Setup');
console.log('==========================================\n');

console.log('To set up Google Sheets integration, follow these steps:\n');

console.log('1. Create a new Google Sheet:');
console.log('   - Go to https://sheets.google.com');
console.log('   - Create a new spreadsheet');
console.log('   - Name it "MP3 Scraper Data"\n');

console.log('2. Set up Google Cloud Project:');
console.log('   - Go to https://console.cloud.google.com');
console.log('   - Create a new project or select existing one');
console.log('   - Enable Google Sheets API');
console.log('   - Create a service account');
console.log('   - Download the JSON credentials file\n');

console.log('3. Share your Google Sheet:');
console.log('   - Open your Google Sheet');
console.log('   - Click "Share" button');
console.log('   - Add your service account email (from credentials)');
console.log('   - Give it "Editor" permissions\n');

console.log('4. Get your Sheet ID:');
console.log('   - The Sheet ID is in the URL:');
console.log('   - https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit');
console.log('   - Copy the YOUR_SHEET_ID_HERE part\n');

console.log('5. Configure n8n:');
console.log('   - Open n8n at http://localhost:5678');
console.log('   - Go to Settings > Credentials');
console.log('   - Add Google Sheets credentials');
console.log('   - Upload your service account JSON file\n');

console.log('6. Update the workflow:');
console.log('   - Open the MP3 Scraper workflow');
console.log('   - Update the Google Sheets nodes with your Sheet ID');
console.log('   - Test the connection\n');

// Create a sample configuration file
const sampleConfig = {
  googleSheets: {
    sheetId: 'YOUR_SHEET_ID_HERE',
    sheetName: 'MP3 Files',
    credentials: 'path/to/your/service-account.json'
  },
  scraping: {
    targetUrl: 'https://example.com/mp3-files',
    schedule: 'every 30 minutes',
    downloadEnabled: true
  },
  storage: {
    downloadPath: '/downloads',
    maxFileSize: '100MB'
  }
};

const configPath = path.join(__dirname, '..', 'config', 'sample-config.json');
fs.writeFileSync(configPath, JSON.stringify(sampleConfig, null, 2));

console.log('\n✅ Sample configuration created at:', configPath);
console.log('\n📝 Next steps:');
console.log('   - Update the sample config with your actual values');
console.log('   - Import the workflow into n8n');
console.log('   - Set up your credentials');
console.log('   - Test the workflow\n');

console.log('🎉 Setup complete! Your MP3 scraper bot is ready to use.');