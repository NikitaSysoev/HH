const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

let res = 0;
let count = 0;

rl.on('line', function(line = 0) {
  const number = Number(line);
  
  if (number > 20000000 || number < -20000000) {
    rl.close();
  }

  count += 1;
  res += number;

  if (count === 40 || line === '\u0003') {
    process.exit(1);
  }
}).on('close', function() {
  process.exit(0);
});

process.on('exit', () => console.log(res));