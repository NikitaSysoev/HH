const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

const arr = [];

rl.on('line', function(line) {
    const number = Number(line);
    if (line > 32000 || line < -32000) {
        console.log('Number must be >= -32000 and <= 32000');
        rl.close();
    }
    if( arr.length < 2){
        arr.push(number);
    }
    if(arr.length === 2) {
        const [a, b] = arr;
        console.log(a + b);
        rl.close();
    } 
}).on('close', function() {
  process.exit(0);
});
