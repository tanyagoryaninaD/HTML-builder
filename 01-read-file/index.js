const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

const text = fs.createReadStream(filePath, { encoding: 'utf8' });

text.on('data', (chunk) => {
    console.log(chunk)
})

text.on('error', (err) => {
    console.error('Error reading the file:', err);
});