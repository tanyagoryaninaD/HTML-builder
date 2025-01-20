const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, {withFileTypes: true}, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        const filePath = path.join(file.path, file.name);
        fs.stat(filePath, (err, stats) => {
            if (file.isFile()) {  
                if (err) throw err;
                const extension = path.extname(filePath)
                const name = path.basename(file.name, extension)
                console.log(`${name} - ${extension.slice(1, extension.length)} - ${stats.size / 1000}kb`);
            }
        });
    })
});
