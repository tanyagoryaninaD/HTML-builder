const fs = require('fs')
const path = require('path')

const dirPath = path.join(__dirname, 'files')
const newPathDir = path.join(__dirname, 'files-copy')

function copyFiles(main, copy) {
    fs.readdir(main, { withFileTypes: true }, (err, files) => {
        if (err) throw err;

        files.forEach(file => {
            const srcPath = path.join(main, file.name);
            const destPath = path.join(copy, file.name);

            if (file.isDirectory()) {
                copyDir(srcPath, destPath);
            } else {
                fs.copyFile(srcPath, destPath, (err) => {
                    if (err) throw err;
                    console.log(`Copied file: ${file.name}`);
                });
            }
        });
    });
}

function copyDir(dir, newDir) {
    fs.mkdir(newDir, { recursive: true }, (err) => {
        if (err) throw err

        fs.readdir(newDir, {withFileTypes: true}, (err, files) => {
            if (err) throw err

            let deleteCount = files.length;
            if (deleteCount === 0) {
                copyFiles(dir, newDir);
            } else {
                files.forEach(file => {
                    const destPath = path.join(newDir, file.name)        
                    fs.rm(destPath, { recursive: true, force: true }, (err) => {
                        if (err) throw err;
                        console.log(`Deleted: ${file.name}`);
                        deleteCount--;
                        if (deleteCount === 0) {
                            copyFiles(dir, newDir);
                        }
                    });
                });
            }
        })
    });
}

copyDir(dirPath, newPathDir)