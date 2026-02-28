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

        // Replace font-family: ... ; rules, including!important
        const newContent = fileContent.replace(/font-family\s*:\s*.*?;/gi, '');

        if (fileContent !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
console.log('Done scrubbing font-family from CSS files.');
