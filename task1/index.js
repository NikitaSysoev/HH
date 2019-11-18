const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function(line) {
  console.log(calculate(line)); // 8 , 11, 46
}).on('close', function() {
  process.exit(0);
});

const siblings = {
  0: [8],
  1: [4, 2],
  2: [1, 3, 5],
  3: [2, 6],
  4: [1, 5, 7],
  5: [2, 4, 6, 8],
  6: [3, 5, 9],
  7: [4, 8],
  8: [5, 7, 9, 0],
  9: [6, 8]
};

function allCombinations(arr) {
  if (arr.length === 1) {
    return arr[0].map(item => String(item));
  }
  const result = [];
  const allCasesOfRest = allCombinations(arr.slice(1));
  for (let i = 0; i < allCasesOfRest.length; i++) {
    for (let j = 0; j < arr[0].length; j++) {
      result.push(arr[0][j] + '' + allCasesOfRest[i]);
    }
  }
  return result;
}

function calculate(line) {
  const nums = [...line].map(item => [...siblings[item], item]);
  const result = allCombinations(nums)
    .sort()
    .join(',');
  return result;
}
