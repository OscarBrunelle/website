function searchSolution() {
  primaryMode = false,
    guessMode = false,
    eraseMode = false;
  searchPossibleNumbers();
  addPossibleNumbers();
  update();
}

function searchPossibleNumbers() {
  cleanPossibleNumbersInSquares();
  cleanPossibleNumbersInLinesAndColumns();
  searchSquares();
}

function cleanPossibleNumbersInSquares() {
  for (let num = 1; num < 10; num++) {
    //loop through each 3*3 square
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        //loop inside the square
        for (let x = 0; x < 3; x++) {
          const yAxis = grid[i + x];
          for (let y = 0; y < 3; y++) {
            const number = yAxis[j + y].number;
            if (number != null && number == num) {
              yAxis[j + y].possibleNumbers = [];
              //remove number possibility in the line
              for (let a = 0; a < 3; a++) {
                const column = grid[i + a];
                //remove number possibility in the column
                for (let b = 0; b < 3; b++) {
                  const currentCase = column[j + b];
                  currentCase.possibleNumbers.removeElement(num);
                }
              }
            }
          }
        }
      }
    }
  }
}

function cleanPossibleNumbersInLinesAndColumns() {
  for (let i = 0; i < grid.length; i++) {
    const column = grid[i];
    for (let j = 0; j < column.length; j++) {
      const currentCase = column[j];
      if (currentCase.number != null) {
        for (let x = 0; x < grid.length; x++) {
          grid[x][j].possibleNumbers.removeElement(currentCase.number);
        }
        for (let y = 0; y < column.length; y++) {
          column[y].possibleNumbers.removeElement(currentCase.number);
        }
      }
    }
  }
}

function searchSquares() {
  for (let num = 1; num < 10; num++) {
    var possibleCases = [];
    //loop through each 3*3 square
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        //loop inside the square
        for (let x = 0; x < 3; x++) {
          const yAxis = grid[i + x];
          for (let y = 0; y < 3; y++) {
            const currentCase = grid[i + x][j + y];
            currentCase.possibleNumbers.forEach(element => {
              if (element == num) {
                possibleCases.push(currentCase);
              }
            });
          }
        }
        if (possibleCases.length == 1) {
          possibleCases[0].number = num;
        }
        possibleCases = [];
      }
    }
  }
}

function addPossibleNumbers() {
  for (let i = 0; i < grid.length; i++) {
    const column = grid[i];
    for (let j = 0; j < column.length; j++) {
      const currentCase = column[j];
      if (currentCase.number == null && currentCase.possibleNumbers.length == 1) {
        currentCase.number = currentCase.possibleNumbers[0];
      }
    }
  }
}

function searchDoublesLines() {
  for (let num = 1; num < 10; num++) {
    var possibleCases = [];
    //loop through each 3*3 square
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        //loop inside the square
        var alignedCases = 0;
        var indexColumn = -1;
        var multiplesColumnsFound = false;
        for (let x = 0; x < 3; x++) {
          for (let y = 0; y < 3; y++) {
            const currentCase = grid[i + x][j + y];
            if(currentCase.possibleNumbers.inArray(num)){
              if (indexColumn != -1 && indexColumn != x) {
                multiplesColumnsFound = true;
                break;
              } else {
                indexColumn = x;
                alignedCases++;
              }
            }
          }
        }
      }
    }
  }
}