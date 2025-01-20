const fs = require('fs')
const path = require('path')

const filePath = __dirname + path.sep + 'text.txt'

const text = fs.createReadStream(filePath, { encoding: 'utf8' })
text.on('data', (chunk) => {
    console.log(chunk)
})