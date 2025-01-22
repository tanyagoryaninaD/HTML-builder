const fs = require('fs')
const path = require('path')
const readline = require('readline')

const filePath = path.join(__dirname, 'text.txt');

fs.writeFile(filePath, '', { flag: 'a' }, (err) => {
    if (err) {
        console.error('Error creating file:', err);
        return;
    }

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log('Enter text to add or "exit" to quit.');

    rl.on('line', (input) => {
        if (input.trim() === 'exit') {
            rl.close();
            return;
        }
        fs.appendFile(filePath, `${input}\n`, (err) => {
            if (err) {
                console.error('Error writing to file:', err);
            } else {
                console.log('Text added to file.');
            }
        });
    });

    rl.on('close', () => {
        console.log('All data was added successfully!');
        process.exit(0);
    });
});