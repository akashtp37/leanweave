/**
 * Service Pages Optimization Script
 * This script optimizes all service pages for consistency and logo visibility
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    servicePages: [
        'scala-services.html',
        'react-services.html',
        'angular-services.html',
        'vue-services.html',
        'nodejs-services.html',
        'python-services.html',
        'java-services.html',
        'php-services.html',
        'ruby-services.html',
        'golang-services.html',
        'dotnet-services.html',
        'rust-services.html',
        'frontend-services.html',
        'backend-services.html'
    ],
    logoHandlerScript: 'js/logo-handler.js',
    outputDir: './optimized'
};

// Logo mapping for different technologies
const logoMapping = {
    // Frontend
    'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
    'Vue': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    'HTML5': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'CSS3': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    
    // Backend
    'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
    'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    'Java': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
    'Ruby': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ruby/ruby-original.svg',
    'Go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg',
    'Scala': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg',
    'Rust': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-plain.svg',
    '.NET': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg',
    
    // Databases & Tools
    'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
    'PostgreSQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
    'Redis': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
    'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
    'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg',
    'AWS': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original.svg',
    'Azure': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoft/microsoft-original.svg',
    'GCP': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg'
};

// Function to optimize a single service page
function optimizeServicePage(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Add logo handler script if not present
        if (!content.includes('logo-handler.js')) {
            content = content.replace(
                /(<script src="[^"]*\.js"><\/script>)/,
                '$1\n    <script src="js/logo-handler.js"></script>'
            );
        }
        
        // Fix logo-icon elements with data-fallback
        content = content.replace(
            /<div class="logo-icon" data-fallback="([^"]+)"><\/div>/g,
            (match, fallback) => {
                const logoUrl = logoMapping[fallback] || logoMapping['JavaScript']; // Default fallback
                return `<div class="logo-icon">
                    <img src="${logoUrl}" alt="${fallback}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span style="display: none;">${fallback}</span>
                </div>`;
            }
        );
        
        // Ensure proper logo structure
        content = content.replace(
            /<div class="tech-logo">\s*<div class="logo-icon">\s*<img[^>]+>\s*<\/div>\s*<span>([^<]+)<\/span>\s*<\/div>/g,
            (match, techName) => {
                return `<div class="tech-logo">
                    <div class="logo-icon">
                        <img src="${logoMapping[techName] || logoMapping['JavaScript']}" alt="${techName}" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <span style="display: none;">${techName}</span>
                    </div>
                    <span>${techName}</span>
                </div>`;
            }
        );
        
        // Clean up duplicate whitespace
        content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
        
        // Write optimized content
        const outputPath = path.join(config.outputDir, path.basename(filePath));
        fs.writeFileSync(outputPath, content, 'utf8');
        
        console.log(`✅ Optimized: ${filePath}`);
        return true;
        
    } catch (error) {
        console.error(`❌ Error optimizing ${filePath}:`, error.message);
        return false;
    }
}

// Function to create output directory
function createOutputDir() {
    if (!fs.existsSync(config.outputDir)) {
        fs.mkdirSync(config.outputDir, { recursive: true });
        console.log(`📁 Created output directory: ${config.outputDir}`);
    }
}

// Function to copy logo handler script
function copyLogoHandler() {
    const sourcePath = config.logoHandlerScript;
    const destPath = path.join(config.outputDir, config.logoHandlerScript);
    
    if (fs.existsSync(sourcePath)) {
        // Create js directory if it doesn't exist
        const jsDir = path.dirname(destPath);
        if (!fs.existsSync(jsDir)) {
            fs.mkdirSync(jsDir, { recursive: true });
        }
        
        fs.copyFileSync(sourcePath, destPath);
        console.log(`📋 Copied logo handler script to: ${destPath}`);
    } else {
        console.warn(`⚠️  Logo handler script not found: ${sourcePath}`);
    }
}

// Main optimization function
function optimizeAllServices() {
    console.log('🚀 Starting service pages optimization...\n');
    
    createOutputDir();
    copyLogoHandler();
    
    let successCount = 0;
    let totalCount = config.servicePages.length;
    
    config.servicePages.forEach(page => {
        if (fs.existsSync(page)) {
            if (optimizeServicePage(page)) {
                successCount++;
            }
        } else {
            console.warn(`⚠️  Service page not found: ${page}`);
        }
    });
    
    console.log(`\n🎉 Optimization complete!`);
    console.log(`✅ Successfully optimized: ${successCount}/${totalCount} pages`);
    console.log(`📁 Output directory: ${config.outputDir}`);
    
    if (successCount === totalCount) {
        console.log(`\n✨ All service pages have been optimized successfully!`);
    } else {
        console.log(`\n⚠️  Some pages could not be optimized. Check the logs above.`);
    }
}

// Run optimization if script is executed directly
if (require.main === module) {
    optimizeAllServices();
}

module.exports = {
    optimizeServicePage,
    optimizeAllServices,
    config
};
