const fs = require('fs');
const path = require('path');

function buildPage() {
    const mainPath = path.join(__dirname, 'project-dist');
    const templatePath = path.join(__dirname, 'template.html');
    const componentsPath = path.join(__dirname, 'components');
    const stylesPath = path.join(__dirname, 'styles');
    const stylePath = path.join(mainPath, 'style.css');
    const srcDir = path.join(__dirname, 'assets');
    const destDir = path.join(mainPath, 'assets');
    const regexp = /{{[^}]+}}/g;

    fs.mkdir(mainPath, { recursive: true }, (err) => {
        if (err) throw err;
        console.log('Creates a folder "project-dist"');

        function replaceTags() {
            fs.readFile(templatePath, 'utf8', (err, dataTemplate) => {
                if (err) {
                    console.error(err);
                    return;
                }
    
                let updatedData = dataTemplate;
                const tags = dataTemplate.match(regexp);
    
                if (!tags) {
                    fs.writeFile(path.join(mainPath, 'index.html'), updatedData, (err) => {
                        if (err) {
                            console.error(err);
                        } else {
                            console.log('The file was created successfully');
                        }
                    });
                    return;
                }
    
                const sections = tags.map(item => item.slice(2, -2));
    
                let indexItem = 0;
    
                function replaceTag() {
                    if (indexItem < sections.length) {
                        const sectionPath = path.join(componentsPath, sections[indexItem] + '.html');
    
                        fs.readFile(sectionPath, 'utf8', (err, dataSection) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
    
                            updatedData = updatedData.replace(tags[indexItem], '\n' + dataSection);
                            console.log('Replaced template tag:', tags[indexItem]);
                            indexItem++;
                            replaceTag();
                        });
                    } else {
                        fs.writeFile(path.join(mainPath, 'index.html'), updatedData, (err) => {
                            if (err) {
                                console.error(err);
                            }
                        });
                    }
                }
    
                replaceTag();
            });
        }

        replaceTags()
        function mergeStyles() {
            fs.writeFile(stylePath, '', (err) => {
                if (err) throw err;

                function readDir(dir, copy, callback) {
                    console.log('🚀  readDir  dir:', dir)
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
                readDir(stylesPath, stylePath)
            })
        }
        mergeStyles()

        function copyDir() {
            fs.cp(srcDir, destDir, { recursive: true, force: true }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                } else {
                    console.log('Copied the assets folder')
                }
            });
        }
        copyDir()

    });
}

buildPage();