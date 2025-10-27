#!/usr/bin/env node

/**
 * Comprehensive Validation Script for MP3 Scraper Bot
 * This script thoroughly validates all components and configurations
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 MP3 Scraper Bot - Comprehensive Validation');
console.log('=============================================\n');

let allTestsPassed = true;
const issues = [];

// Test 1: Directory Structure
console.log('📁 Testing directory structure...');
const requiredDirs = ['workflows', 'config', 'scripts', 'downloads'];
requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`✅ ${dir}/ directory exists`);
    } else {
        console.log(`❌ ${dir}/ directory missing`);
        allTestsPassed = false;
        issues.push(`Missing directory: ${dir}/`);
    }
});

// Test 2: Workflow Files
console.log('\n📋 Testing workflow files...');
const workflowFiles = [
    'workflows/mp3-scraper-workflow.json',
    'workflows/simple-mp3-scraper.json'
];

workflowFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
        
        try {
            const content = JSON.parse(fs.readFileSync(file, 'utf8'));
            
            // Validate workflow structure
            if (!content.nodes || !Array.isArray(content.nodes)) {
                throw new Error('Missing or invalid nodes array');
            }
            
            if (!content.connections || typeof content.connections !== 'object') {
                throw new Error('Missing or invalid connections object');
            }
            
            // Check for required nodes
            const nodeTypes = content.nodes.map(node => node.type);
            const requiredNodeTypes = [
                'n8n-nodes-base.cron',
                'n8n-nodes-base.httpRequest',
                'n8n-nodes-base.code'
            ];
            
            requiredNodeTypes.forEach(requiredType => {
                if (!nodeTypes.includes(requiredType)) {
                    throw new Error(`Missing required node type: ${requiredType}`);
                }
            });
            
            console.log(`✅ ${file} has valid workflow structure`);
            
            // Check for potential issues
            const issues = [];
            
            // Check for hardcoded URLs
            content.nodes.forEach(node => {
                if (node.parameters && node.parameters.url === 'https://example.com/mp3-files') {
                    issues.push('Contains example URL - should be updated');
                }
            });
            
            // Check for hardcoded Google Sheet IDs
            content.nodes.forEach(node => {
                if (node.parameters && node.parameters.documentId === '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms') {
                    issues.push('Contains example Google Sheet ID - should be updated');
                }
            });
            
            if (issues.length > 0) {
                console.log(`⚠️  ${file} has configuration issues:`);
                issues.forEach(issue => console.log(`   - ${issue}`));
            }
            
        } catch (error) {
            console.log(`❌ ${file} has invalid JSON: ${error.message}`);
            allTestsPassed = false;
            issues.push(`Invalid JSON in ${file}: ${error.message}`);
        }
    } else {
        console.log(`❌ ${file} missing`);
        allTestsPassed = false;
        issues.push(`Missing file: ${file}`);
    }
});

// Test 3: Configuration Files
console.log('\n⚙️  Testing configuration files...');
const configFiles = [
    'package.json',
    'docker-compose.yml',
    'config/n8n-config.json'
];

configFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`✅ ${file} exists`);
        
        // Validate JSON files
        if (file.endsWith('.json')) {
            try {
                const content = JSON.parse(fs.readFileSync(file, 'utf8'));
                console.log(`✅ ${file} has valid JSON`);
            } catch (error) {
                console.log(`❌ ${file} has invalid JSON: ${error.message}`);
                allTestsPassed = false;
                issues.push(`Invalid JSON in ${file}: ${error.message}`);
            }
        }
    } else {
        console.log(`❌ ${file} missing`);
        allTestsPassed = false;
        issues.push(`Missing file: ${file}`);
    }
});

// Test 4: Scripts
console.log('\n🔧 Testing scripts...');
const scripts = [
    'scripts/setup-google-sheets.js',
    'scripts/start-bot.sh',
    'scripts/test-setup.js'
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
        issues.push(`Missing script: ${script}`);
    }
});

// Test 5: Node.js Environment
console.log('\n🟢 Testing Node.js environment...');
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
if (majorVersion >= 18) {
    console.log(`✅ Node.js version ${nodeVersion} is compatible (>= 18.0.0)`);
} else {
    console.log(`❌ Node.js version ${nodeVersion} is too old (need >= 18.0.0)`);
    allTestsPassed = false;
    issues.push(`Node.js version ${nodeVersion} is too old (need >= 18.0.0)`);
}

// Test 6: Docker Availability
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

// Test 7: Package.json Dependencies
console.log('\n📦 Testing package.json...');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    if (packageJson.dependencies && packageJson.dependencies.n8n) {
        console.log('✅ n8n dependency is configured');
    } else {
        console.log('⚠️  n8n dependency not found in package.json');
        issues.push('n8n dependency not found in package.json');
    }
    
    if (packageJson.scripts && packageJson.scripts.start) {
        console.log('✅ Start script is configured');
    } else {
        console.log('⚠️  Start script not found in package.json');
        issues.push('Start script not found in package.json');
    }
    
    if (packageJson.scripts && packageJson.scripts['install-n8n']) {
        console.log('✅ Install script is configured');
    } else {
        console.log('⚠️  Install script not found in package.json');
        issues.push('Install script not found in package.json');
    }
    
} catch (error) {
    console.log(`❌ Error reading package.json: ${error.message}`);
    allTestsPassed = false;
    issues.push(`Error reading package.json: ${error.message}`);
}

// Test 8: File Permissions
console.log('\n🔐 Testing file permissions...');
const downloadsDir = 'downloads';
if (fs.existsSync(downloadsDir)) {
    try {
        fs.accessSync(downloadsDir, fs.constants.W_OK);
        console.log('✅ downloads/ directory is writable');
    } catch (error) {
        console.log('❌ downloads/ directory is not writable');
        allTestsPassed = false;
        issues.push('downloads/ directory is not writable');
    }
} else {
    console.log('⚠️  downloads/ directory does not exist');
}

// Test 9: Workflow Logic Validation
console.log('\n🧠 Testing workflow logic...');
try {
    const mainWorkflow = JSON.parse(fs.readFileSync('workflows/mp3-scraper-workflow.json', 'utf8'));
    
    // Check for proper error handling
    const hasErrorHandling = mainWorkflow.nodes.some(node => 
        node.name === 'Error Handler' || 
        (node.connections && node.connections.error)
    );
    
    if (hasErrorHandling) {
        console.log('✅ Workflow has error handling');
    } else {
        console.log('⚠️  Workflow lacks error handling');
        issues.push('Main workflow lacks error handling');
    }
    
    // Check for proper scheduling
    const hasScheduling = mainWorkflow.nodes.some(node => 
        node.type === 'n8n-nodes-base.cron'
    );
    
    if (hasScheduling) {
        console.log('✅ Workflow has scheduling configured');
    } else {
        console.log('⚠️  Workflow lacks scheduling');
        issues.push('Main workflow lacks scheduling');
    }
    
} catch (error) {
    console.log(`❌ Error validating workflow logic: ${error.message}`);
    allTestsPassed = false;
    issues.push(`Error validating workflow logic: ${error.message}`);
}

// Summary
console.log('\n📊 Validation Summary');
console.log('====================');

if (allTestsPassed && issues.length === 0) {
    console.log('🎉 All tests passed! Your MP3 scraper bot is ready to use.');
    console.log('\n🚀 Next steps:');
    console.log('   1. Run: ./scripts/start-bot.sh');
    console.log('   2. Update the target URL in the workflow');
    console.log('   3. Set up Google Sheets credentials (if using full workflow)');
    console.log('   4. Import and activate the workflow in n8n');
} else {
    console.log('❌ Some issues were found:');
    issues.forEach(issue => console.log(`   - ${issue}`));
    
    console.log('\n🔧 To fix common issues:');
    console.log('   - Run: chmod +x scripts/*.sh');
    console.log('   - Install Node.js 18+ if not already installed');
    console.log('   - Update hardcoded URLs and Google Sheet IDs in workflows');
    console.log('   - Check file permissions for downloads/ directory');
}

console.log('\n📖 For detailed setup instructions, see README.md');
console.log('🧪 For basic testing, run: node scripts/test-setup.js');