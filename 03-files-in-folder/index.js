const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, {withFileTypes: true}, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
        if (file.isFile()) {
            const filePath = path.join(dirPath, file.name);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error when receiving information about the file:', err);
                    return;
                }
                const extension = path.extname(file.name)
                const name = path.basename(file.name, extension)
                console.log(`${name} - ${extension.slice(1)} - ${stats.size}b`);
            });
        }
    })
});
