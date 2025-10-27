#!/usr/bin/env node

/**
 * Test Setup Script for MP3 Scraper Bot
 * This script verifies that all components are properly configured
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 MP3 Scraper Bot - Setup Test');
console.log('===============================\n');

let allTestsPassed = true;

// Test 1: Check if required directories exist
console.log('📁 Testing directory structure...');
const requiredDirs = ['workflows', 'config', 'scripts', 'downloads'];
requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`✅ ${dir}/ directory exists`);
    } else {
        console.log(`❌ ${dir}/ directory missing`);
        allTestsPassed = false;
    }
});

// Test 2: Check if workflow files exist
console.log('\n📋 Testing workflow files...');
const workflowFiles = [
    'workflows/mp3-scraper-workflow.json',
    'workflows/simple-mp3-scraper.json'
];
workflowFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
        
        // Validate JSON structure
        try {
            const content = JSON.parse(fs.readFileSync(file, 'utf8'));
            if (content.nodes && content.connections) {
                console.log(`✅ ${file} has valid workflow structure`);
            } else {
                console.log(`⚠️  ${file} may have invalid workflow structure`);
            }
        } catch (error) {
            console.log(`❌ ${file} has invalid JSON: ${error.message}`);
            allTestsPassed = false;
        }
    } else {
        console.log(`❌ ${file} missing`);
        allTestsPassed = false;
    }
});

// Test 3: Check if configuration files exist
console.log('\n⚙️  Testing configuration files...');
const configFiles = [
    'package.json',
    'docker-compose.yml',
    'config/n8n-config.json'
];
configFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
    } else {
        console.log(`❌ ${file} missing`);
        allTestsPassed = false;
    }
});

// Test 4: Check if scripts are executable
console.log('\n🔧 Testing scripts...');
const scripts = [
    'scripts/setup-google-sheets.js',
    'scripts/start-bot.sh'
];
scripts.forEach(script => {
    if (fs.existsSync(script)) {
        console.log(`✅ ${script} exists`);
        try {
            fs.accessSync(script, fs.constants.X_OK);
            console.log(`✅ ${script} is executable`);
        } catch (error) {
            console.log(`⚠️  ${script} is not executable (run: chmod +x ${script})`);
        }
    } else {
        console.log(`❌ ${script} missing`);
        allTestsPassed = false;
    }
});

// Test 5: Check Node.js version
console.log('\n🟢 Testing Node.js environment...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion >= 18) {
    console.log(`✅ Node.js version ${nodeVersion} is compatible (>= 18.0.0)`);
} else {
    console.log(`❌ Node.js version ${nodeVersion} is too old (need >= 18.0.0)`);
    allTestsPassed = false;
}

// Test 6: Check if Docker is available
console.log('\n🐳 Testing Docker availability...');
const { execSync } = require('child_process');
try {
    execSync('docker --version', { stdio: 'ignore' });
    console.log('✅ Docker is available');
    
    try {
        execSync('docker-compose --version', { stdio: 'ignore' });
        console.log('✅ Docker Compose is available');
    } catch (error) {
        console.log('⚠️  Docker Compose not found (Docker Desktop includes it)');
    }
} catch (error) {
    console.log('⚠️  Docker not found - you can still use local installation');
}

// Test 7: Check package.json dependencies
console.log('\n📦 Testing package.json...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    if (packageJson.dependencies && packageJson.dependencies.n8n) {
        console.log('✅ n8n dependency is configured');
    } else {
        console.log('⚠️  n8n dependency not found in package.json');
    }
    
    if (packageJson.scripts && packageJson.scripts.start) {
        console.log('✅ Start script is configured');
    } else {
        console.log('⚠️  Start script not found in package.json');
    }
} catch (error) {
    console.log(`❌ Error reading package.json: ${error.message}`);
    allTestsPassed = false;
}

// Summary
console.log('\n📊 Test Summary');
console.log('===============');

if (allTestsPassed) {
    console.log('🎉 All critical tests passed! Your MP3 scraper bot is ready to use.');
    console.log('\n🚀 Next steps:');
    console.log('   1. Run: ./scripts/start-bot.sh');
    console.log('   2. Follow the setup instructions');
    console.log('   3. Import the workflow into n8n');
    console.log('   4. Configure your target URL and credentials');
} else {
    console.log('❌ Some tests failed. Please fix the issues above before proceeding.');
    console.log('\n🔧 To fix common issues:');
    console.log('   - Run: chmod +x scripts/*.sh');
    console.log('   - Install Node.js 18+ if not already installed');
    console.log('   - Check that all files are in the correct locations');
}

console.log('\n📖 For detailed setup instructions, see README.md');