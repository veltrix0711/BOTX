# 🎵 MP3 Scraper Bot

A powerful web scraping bot built with n8n that automatically discovers MP3 files from websites, downloads them, and organizes the data in a Google Sheets spreadsheet.

## ✨ Features

- **Automated Web Scraping**: Scans websites for MP3 files using intelligent regex patterns
- **Smart File Detection**: Finds MP3 links in various HTML formats
- **Google Sheets Integration**: Automatically saves file information to spreadsheets
- **File Download**: Downloads MP3 files to local storage
- **Scheduled Execution**: Runs on a configurable schedule (default: every 30 minutes)
- **Status Tracking**: Tracks download status and file metadata
- **Docker Support**: Easy deployment with Docker Compose

## 🚀 Quick Start

### Option 1: Docker (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   cd /workspace
   ```

2. **Start the n8n container:**
   ```bash
   docker-compose up -d
   ```

3. **Access n8n:**
   - Open http://localhost:5678
   - Login with: `admin` / `admin123`

4. **Import the workflow:**
   - Go to Workflows
   - Click "Import from file"
   - Select `workflows/mp3-scraper-workflow.json`

### Option 2: Local Installation

1. **Install dependencies:**
   ```bash
   npm install
   npm run install-n8n
   ```

2. **Start n8n:**
   ```bash
   npm start
   ```

3. **Access n8n:**
   - Open http://localhost:5678

## 📋 Setup Instructions

### 1. Google Sheets Configuration

Run the setup script to get detailed instructions:

```bash
node scripts/setup-google-sheets.js
```

**Manual Setup:**

1. **Create Google Sheet:**
   - Go to [Google Sheets](https://sheets.google.com)
   - Create new spreadsheet named "MP3 Scraper Data"
   - Note the Sheet ID from the URL

2. **Set up Google Cloud Project:**
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable Google Sheets API
   - Create service account
   - Download JSON credentials

3. **Share Sheet:**
   - Share your Google Sheet with service account email
   - Grant "Editor" permissions

### 2. Configure n8n Credentials

1. **Open n8n:**
   - Go to Settings > Credentials
   - Click "Add Credential"
   - Select "Google Sheets"
   - Upload your service account JSON file

2. **Update Workflow:**
   - Open the MP3 Scraper workflow
   - Update Google Sheets nodes with your Sheet ID
   - Test the connection

### 3. Configure Target URL

1. **Update Web Scraper node:**
   - Change the URL to your target website
   - Example: `https://example.com/music-files`

2. **Customize scraping patterns:**
   - Modify the Code node if needed
   - Adjust regex patterns for your specific site

## 🔧 Configuration

### Workflow Settings

The workflow includes these configurable options:

- **Schedule**: Default runs every 30 minutes
- **Download Enabled**: Toggle file downloads on/off
- **Target URL**: Website to scrape for MP3 files
- **File Storage**: Local download directory

### Environment Variables

```bash
# n8n Configuration
N8N_BASIC_AUTH_USER=admin
N8N_BASIC_AUTH_PASSWORD=admin123
N8N_HOST=localhost
N8N_PORT=5678

# Google Sheets (optional)
GOOGLE_SHEETS_CREDENTIALS_PATH=/path/to/credentials.json
```

## 📊 Output Format

The bot creates a Google Sheet with these columns:

| Column | Description |
|--------|-------------|
| fileName | Name of the MP3 file |
| mp3Url | Direct URL to the MP3 file |
| timestamp | When the file was discovered |
| fileSize | Size of the downloaded file |
| status | Download status (Pending/Downloaded) |

## 🛠️ Customization

### Adding New File Types

To scrape other file types, modify the regex patterns in the "Extract MP3 Data" node:

```javascript
// For WAV files
const wavRegex = /<a[^>]*href=[\"']([^\"']*\.wav)[\"'][^>]*>([^<]+)<\/a>/gi;

// For FLAC files  
const flacRegex = /<a[^>]*href=[\"']([^\"']*\.flac)[\"'][^>]*>([^<]+)<\/a>/gi;
```

### Custom Scraping Logic

The "Extract MP3 Data" node uses JavaScript to parse HTML. You can customize it for:

- Different HTML structures
- AJAX-loaded content
- Authentication requirements
- Rate limiting

### Scheduling Options

Modify the "Schedule Trigger" node for different intervals:

- Every minute: `* * * * *`
- Every hour: `0 * * * *`
- Daily at 2 AM: `0 2 * * *`
- Weekly on Monday: `0 9 * * 1`

## 🔍 Troubleshooting

### Common Issues

1. **No MP3 files found:**
   - Check if the target URL is correct
   - Verify the website structure
   - Test regex patterns manually

2. **Google Sheets connection failed:**
   - Verify service account credentials
   - Check sheet sharing permissions
   - Ensure Google Sheets API is enabled

3. **Downloads failing:**
   - Check file permissions in `/downloads` directory
   - Verify network connectivity
   - Check file size limits

### Debug Mode

Enable debug logging in n8n:

1. Go to Settings > Workflows
2. Enable "Debug Mode"
3. Check execution logs for detailed information

## 📁 Project Structure

```
mp3-scraper-bot/
├── workflows/
│   └── mp3-scraper-workflow.json    # Main n8n workflow
├── config/
│   ├── n8n-config.json              # n8n configuration
│   └── sample-config.json           # Sample configuration
├── scripts/
│   └── setup-google-sheets.js       # Setup helper script
├── downloads/                        # Downloaded MP3 files
├── docker-compose.yml               # Docker configuration
├── package.json                     # Node.js dependencies
└── README.md                        # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## ⚠️ Legal Notice

This tool is for educational and personal use only. Please ensure you have permission to scrape any website and download files. Respect robots.txt files and website terms of service.

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section
2. Review n8n documentation
3. Open an issue on GitHub
4. Check execution logs in n8n

---

**Happy Scraping! 🎵**