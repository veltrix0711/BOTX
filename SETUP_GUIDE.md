# 🎵 MP3 Scraper Bot - Complete Setup Guide

## ✅ **Issues Fixed & Improvements Made**

### 🔧 **Critical Fixes Applied:**

1. **Workflow Logic Fixed:**
   - ✅ Corrected node connections and flow
   - ✅ Added proper error handling with Error Handler node
   - ✅ Fixed download check logic
   - ✅ Added timeout settings for HTTP requests

2. **File Path Issues Resolved:**
   - ✅ Fixed Docker volume mounting paths
   - ✅ Corrected file paths for both local and Docker environments
   - ✅ Updated file paths to use `/home/node/.n8n/downloads/` for Docker

3. **JavaScript Code Improvements:**
   - ✅ Added null safety checks (`|| ''`)
   - ✅ Enhanced filename sanitization (removes invalid characters)
   - ✅ Added support for `src` attribute MP3 links
   - ✅ Improved file size calculation with MB display
   - ✅ Added proper status tracking

4. **Error Handling Enhanced:**
   - ✅ Added Error Handler node for download failures
   - ✅ Added error connections to Download MP3 and Save File nodes
   - ✅ Improved status updates with error information

5. **Configuration Validated:**
   - ✅ All JSON files validated and corrected
   - ✅ Docker Compose configuration optimized
   - ✅ Package.json dependencies verified

## 🚀 **Quick Start (Updated)**

### **Option 1: Docker (Recommended)**

```bash
# 1. Start the bot
./scripts/start-bot.sh

# 2. Choose option 1 (Docker)

# 3. Access n8n at http://localhost:5678
#    Login: admin / admin123

# 4. Import workflow: workflows/mp3-scraper-workflow.json
```

### **Option 2: Local Installation**

```bash
# 1. Start the bot
./scripts/start-bot.sh

# 2. Choose option 2 (Local)

# 3. Access n8n at http://localhost:5678
```

## 📋 **Configuration Steps**

### **1. Update Target URL**
- Open the imported workflow
- Edit the "Web Scraper" node
- Change URL from `https://example.com/mp3-files` to your target website

### **2. Google Sheets Setup (Full Workflow Only)**
```bash
# Run the setup helper
node scripts/setup-google-sheets.js
```

**Manual Steps:**
1. Create Google Sheet at https://sheets.google.com
2. Set up Google Cloud Project with Sheets API
3. Create service account and download credentials
4. Share sheet with service account email
5. Update workflow with your Sheet ID

### **3. Test Your Setup**
```bash
# Run comprehensive validation
node scripts/validate-setup.js

# Run basic test
node scripts/test-setup.js
```

## 🔍 **What the Bot Does**

### **Enhanced MP3 Detection:**
- ✅ Finds MP3 links in `<a href="">` tags
- ✅ Detects direct MP3 links in `href` attributes
- ✅ Discovers MP3 files in `src` attributes
- ✅ Sanitizes filenames (removes invalid characters)
- ✅ Extracts names from link text or URL

### **Smart File Management:**
- ✅ Downloads MP3 files automatically
- ✅ Saves to organized directory structure
- ✅ Tracks file sizes in bytes and MB
- ✅ Updates status (Pending → Downloaded → Failed)
- ✅ Handles download errors gracefully

### **Spreadsheet Integration:**
- ✅ Creates detailed spreadsheet with columns:
  - `fileName` - Clean filename
  - `mp3Url` - Direct download URL
  - `timestamp` - Discovery time
  - `fileSize` - Size in bytes
  - `fileSizeMB` - Size in MB
  - `status` - Download status

## 🛠️ **Customization Options**

### **Change Schedule:**
Edit the "Schedule Trigger" node:
- Every minute: `* * * * *`
- Every hour: `0 * * * *`
- Daily at 2 AM: `0 2 * * *`
- Weekly on Monday: `0 9 * * 1`

### **Add Other File Types:**
Modify the "Extract MP3 Data" node JavaScript:
```javascript
// For WAV files
const wavRegex = /<a[^>]*href=[\"']([^\"']*\.wav)[\"'][^>]*>([^<]+)<\/a>/gi;

// For FLAC files
const flacRegex = /<a[^>]*href=[\"']([^\"']*\.flac)[\"'][^>]*>([^<]+)<\/a>/gi;
```

### **Disable Downloads:**
Set `downloadEnabled: false` in the JavaScript code to only collect URLs without downloading.

## 📊 **Output Examples**

### **Google Sheets Output:**
| fileName | mp3Url | timestamp | fileSize | fileSizeMB | status |
|----------|--------|-----------|----------|------------|--------|
| song_name | https://example.com/song.mp3 | 2024-01-15T10:30:00Z | 5242880 | 5.00 MB | Downloaded |

### **JSON Output (Simple Workflow):**
```json
{
  "fileName": "song_name",
  "mp3Url": "https://example.com/song.mp3",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

## 🔧 **Troubleshooting**

### **Common Issues & Solutions:**

1. **No MP3 files found:**
   - Check target URL is correct
   - Verify website structure
   - Test regex patterns manually

2. **Download failures:**
   - Check file permissions in downloads/
   - Verify network connectivity
   - Check file size limits

3. **Google Sheets errors:**
   - Verify service account credentials
   - Check sheet sharing permissions
   - Ensure Google Sheets API is enabled

4. **Docker issues:**
   - Ensure Docker is running
   - Check port 5678 is available
   - Verify volume permissions

### **Debug Mode:**
1. Go to n8n Settings > Workflows
2. Enable "Debug Mode"
3. Check execution logs for detailed information

## 📁 **Project Structure (Updated)**

```
mp3-scraper-bot/
├── workflows/
│   ├── mp3-scraper-workflow.json    # Full-featured workflow
│   └── simple-mp3-scraper.json      # Basic workflow
├── config/
│   ├── n8n-config.json              # n8n configuration
│   └── sample-config.json           # Sample configuration
├── scripts/
│   ├── setup-google-sheets.js       # Google Sheets setup
│   ├── start-bot.sh                 # Startup script
│   ├── test-setup.js                # Basic validation
│   └── validate-setup.js            # Comprehensive validation
├── downloads/                        # Downloaded MP3 files
├── docker-compose.yml               # Docker configuration
├── package.json                     # Dependencies
├── README.md                        # Main documentation
└── SETUP_GUIDE.md                   # This guide
```

## ✅ **Validation Results**

All critical components have been tested and validated:

- ✅ **Directory Structure** - All required directories exist
- ✅ **Workflow Files** - Both workflows are valid and functional
- ✅ **Configuration Files** - All JSON files are valid
- ✅ **Scripts** - All scripts are executable and functional
- ✅ **Node.js Environment** - Compatible version (v22.16.0)
- ✅ **File Permissions** - Downloads directory is writable
- ✅ **Workflow Logic** - Error handling and scheduling configured
- ✅ **Error Handling** - Comprehensive error management added

## 🎉 **Ready to Use!**

Your MP3 scraper bot is now fully functional with:
- ✅ Robust error handling
- ✅ Smart file detection
- ✅ Automatic downloads
- ✅ Spreadsheet integration
- ✅ Scheduled execution
- ✅ Comprehensive validation

**Next Steps:**
1. Run `./scripts/start-bot.sh`
2. Update your target URL
3. Set up Google Sheets (if using full workflow)
4. Import and activate the workflow
5. Monitor the results!

---

**Happy Scraping! 🎵**