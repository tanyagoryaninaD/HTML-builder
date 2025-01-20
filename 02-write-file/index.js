const fs = require('fs')
const path = require('path')
const readline = require('readline')

const filePath = path.join(__dirname, 'text.txt');

fs.writeFileSync(filePath, '', { flag: 'a' }); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Enter text for add or "exit" for exit.');

rl.on('line', (input) => {
    if (input.trim() === 'exit') {
        rl.close()
    }
    fs.appendFile(filePath, `${input}\n`, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log('Text added to file.');
        }
    })
})

rl.on('close', () => {
    console.log('All data was added successfully!');
    process.exit(0);
});