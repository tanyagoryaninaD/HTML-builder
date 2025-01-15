const fs = require('fs')
const path = require('path')
const readline = require('readline')


const filePath = path.join(__dirname, 'text.txt');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('Введите текст для добавления или "exit" для выхода');

rl.on('line', (input) => {
    if (input === 'exit') {
        rl.close()
    }
    fs.appendFile(filePath, `${input}\n`, (err) => {
        if (err) throw err;
    })
})

rl.on('close', () => {
    console.log('All data was added successfully!');
    process.exit(0);
});