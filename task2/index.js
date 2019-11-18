const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

rl.on('line', function(line) {
  console.log(calculate(line));
}).on('close', function() {
  process.exit(0);
});

function allCombinations() {
  const result = [];
  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        const current = [...arr];
        const next = current.splice(i, 1);
        permute(current, m.concat(next));
      }
    }
  };
  permute([1, 2, 3, 4, 5, 6]);
  return result;
}

function solutionDone(table) {
  return table.reduce((acc, row) => acc && row.reduce((a, i) => a && i.length === 1, true), true);
}

function getRowFromTableByClueIndex(clueIndex, table) {
  let retval = [];
  let row;
  let column;
  let deltaRow = 0;
  let deltaColumn = 0;
  if (clueIndex < 6) {
    column = clueIndex;
    row = 0;
    deltaRow = 1;
  } else if (clueIndex < 12) {
    column = 5;
    row = clueIndex - 6;
    deltaColumn = -1;
  } else if (clueIndex < 18) {
    column = 17 - clueIndex;
    row = 5;
    deltaRow = -1;
  } else {
    column = 0;
    row = 23 - clueIndex;
    deltaColumn = 1;
  }
  for (let i = 0; i < 6; i++) {
    retval.push(table[row][column].slice());
    row += deltaRow;
    column += deltaColumn;
  }
  return retval;
}

function rowClue(heights) {
  let currentMax = 0;
  let clue = 0;
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] > currentMax) {
      currentMax = heights[i];
      clue++;
    }
  }
  return clue;
}

function updateClue(row, allHeights) {
  let clues = allHeights
    .filter(heights => heights.reduce((acc, val, idx) => acc && row[idx].includes(val), true))
    .map(heights => rowClue(heights));
  if (clues.reduce((acc, curr) => acc && curr === clues[0], true)) {
    return clues[0];
  }
  return 0;
}

function calculateRow(clue, possibleHeights, allHeights) {
  if (!clue) return possibleHeights;
  return allHeights
    .filter(heights =>
      heights.reduce((acc, val, idx) => acc && possibleHeights[idx].includes(val), true)
    )
    .filter(arr => rowClue(arr) === clue)
    .reduce((acc, currArr) => {
      return acc.map((item, idx) => item.add(currArr[idx]));
    }, new Array(6).fill().map(i => new Set()))
    .map(item => [...item].sort());
}

function mergeSolutionBackToTable(clueIndex, solution, table) {
  let retTable = table;
  let row;
  let column;
  let deltaRow = 0;
  let deltaColumn = 0;
  if (clueIndex < 6) {
    column = clueIndex;
    row = 0;
    deltaRow = 1;
  } else if (clueIndex < 12) {
    column = 5;
    row = clueIndex - 6;
    deltaColumn = -1;
  } else if (clueIndex < 18) {
    column = 17 - clueIndex;
    row = 5;
    deltaRow = -1;
  } else {
    column = 0;
    row = 23 - clueIndex;
    deltaColumn = 1;
  }
  for (let i = 0; i < 6; i++) {
    retTable[row][column] = retTable[row][column].filter(item => solution[i].includes(item));
    row += deltaRow;
    column += deltaColumn;
  }
  return retTable;
}

function findSolution(clues) {
  const allHeights = allCombinations();
  const emptyArray = new Array(6).fill();
  const row = emptyArray.map(item => [1, 2, 3, 4, 5, 6]);
  let table = emptyArray.map(item => [...row]);
  while (!solutionDone(table)) {
    for (const [clueIdx, clue] of clues.entries()) {
      const currentRow = getRowFromTableByClueIndex(clueIdx, table);
      if (!clue) {
        clues[clueIdx] = updateClue(currentRow, allHeights);
      }
      const solution = calculateRow(clue, currentRow, allHeights);
      table = mergeSolutionBackToTable(clueIdx, solution, table);
    }
  }
  return table.map(row => row.map(col => col[0])).reduce((acc, item) => acc.concat(item));
}

function calculate(line) {
  const array = line.split(',').map(Number);
  const result = findSolution(array).join(',');
  return result;
}

console.log(calculate('3,2,2,3,2,1,1,2,3,3,2,2,5,1,2,2,4,3,3,2,1,2,2,4'));
console.log(calculate('0,0,0,2,2,0,0,0,0,6,3,0,0,4,0,0,0,0,4,4,0,3,0,0'));
