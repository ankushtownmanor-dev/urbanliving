const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ?
            walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir(directoryPath, function (filePath) {
    if (filePath.endsWith('.css') && !filePath.endsWith('App.css') && !filePath.endsWith('index.css')) {
        let fileContent = fs.readFileSync(filePath, 'utf8');

        // Replace font-weight: bold; and font-weight: 500/600/700/800/900; with font-weight: 400;
        const newContent = fileContent
            .replace(/font-weight\s*:\s*(bold|bolder|500|600|700|800|900)\s*(!important)?\s*;/gi, 'font-weight: 300 !important;')
            .replace(/font-weight\s*:\s*[5-9]00/gi, 'font-weight: 300')
            .replace(/font-weight\s*:\s*bold/gi, 'font-weight: 300');

        if (fileContent !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
console.log('Done scrubbing bold font weights from CSS files.');
