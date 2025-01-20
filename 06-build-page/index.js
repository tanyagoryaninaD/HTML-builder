const fs = require('fs')
const path = require('path')

const mainPath = path.join(__dirname, 'project-dist')
const templatePath = path.join(__dirname, 'template.html') 
const componentsPath = path.join(__dirname, 'components') 
const regexp = /{{[^}]+}}/g;

function buildPage() {
    fs.mkdir(mainPath, { recursive: true }, (err) => {
        if (err) throw err;
        console.log('Creates a folder "project-dist"')

        function findTags() {
            fs.readFile(templatePath, 'utf8', (err, dataTemplate) => {
                if (err) throw err;

                const tags = dataTemplate.match(regexp)
                const sections = tags.map(item => item.slice(2, -2))

                let indexItem = 0
                let updatedData = dataTemplate

                function replaceTags() {
                    if (indexItem < sections.length) {
                        const sectionPath = path.join(__dirname, 'components', sections[indexItem] + '.html')
    
                        fs.readFile(sectionPath, 'utf8', (err, dataSection) => {
                            if (err) throw err;

                            updatedData = updatedData.replace(tags[indexItem], '\n' + dataSection)
        
                            fs.writeFile(templatePath, updatedData, (err) => {
                                if (err) throw err;
                                console.log('Replaced template tag:', tags[indexItem])
                                indexItem++
                                replaceTags()
                            })
                        })
                    }
                }
                replaceTags()
            })
        }
        findTags()
    });
}
buildPage()