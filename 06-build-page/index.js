const fs = require('fs');
const path = require('path');

function buildPage() {
    const mainPath = path.join(__dirname, 'project-dist');
    const templatePath = path.join(__dirname, 'template.html');
    const componentsPath = path.join(__dirname, 'components');
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
    });
}

buildPage();


        //console.log('🚀  fs.mkdir  path.join', path.join(mainPath, 'style.css'))

        // function mergeStyles(main, newPath) {     
        //     fs.writeFile(newPath, '', (err) => {
        //         console.log('🚀  fs.writeFile  newPath:', newPath)
        //         if (err) throw err;

        //         function readDir(dir, copy, callback) {
        //             fs.readdir(dir, {withFileTypes: true}, (err, files) => {
        //                 console.log('🚀  fs.readdir  files:', files)
        //                 if (err) throw err

        //                 let index = 0

        //                 function appendNextFile() {
        //                     if (index < files.length) {
        //                         const filePath = path.join(dir, files[index].name)
                                
        //                         if (files[index].isDirectory()) {
        //                             readDir(filePath, copy, () => {
        //                                 index++;
        //                                 appendNextFile()
        //                             })
        //                         } else { 
        //                             if (path.extname(filePath) === '.css') {
        //                                 fs.readFile(filePath, 'utf8', (err, data) => {
        //                                     if (err) throw err;
        //                                     fs.appendFile(copy, data + '\n', (err) => {
        //                                         if (err) throw err;
        //                                         console.log('Append file:', files[index].name)
        //                                         index++
        //                                         appendNextFile()
        //                                     })
        //                                 })
        //                             } else {
        //                                 index++
        //                                 appendNextFile()
        //                             }
        //                         } 
        //                     } else {
        //                         if (callback) callback()
        //                     }
        //                 }
        //                 appendNextFile()
        //             })
        //         }
        //         readDir(main, newPath)
        //     })
        // }
        
        // mergeStyles(stylesPath, path.join(mainPath, 'style.css'))