const fs = require('fs')
const path = require('path')

const mainPath = path.join(__dirname, 'styles')
const copyFilePath = path.join(__dirname, 'project-dist', 'bundle.css')

function mergeFiles(main, copyFile) {
    fs.writeFile(copyFile, '', (err) => {
        if (err) throw err;

        function readDir(dir, copy, callback) {
            fs.readdir(dir, {withFileTypes: true}, (err, files) => {
                if (err) throw err

                let index = 0

                function appendNextFile() {
                    if (index < files.length) {
                        const filePath = path.join(dir, files[index].name)
                        
                        if (files[index].isDirectory()) {
                            readDir(filePath, copy, () => {
                                index++;
                                appendNextFile()
                            })
                        } else { 
                            if (path.extname(filePath) === '.css') {
                                fs.readFile(filePath, 'utf8', (err, data) => {
                                    if (err) throw err;
                                    fs.appendFile(copy, data + '\n', (err) => {
                                        if (err) throw err;
                                        console.log('Append file:', files[index].name)
                                        index++
                                        appendNextFile()
                                    })
                                })
                            } else {
                                index++
                                appendNextFile()
                            }
                        } 
                    } else {
                        if (callback) callback()
                    }
                }
                appendNextFile()
            })
        }
        readDir(main, copyFile)
    })
}


mergeFiles(mainPath, copyFilePath)