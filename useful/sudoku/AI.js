function searchSolution() {
  primaryMode = false,
    guessMode = false,
    eraseMode = false;
  searchPossibleNumbers();
  addPossibleNumbers();
  update();
}

function searchPossibleNumbers() {
  searchLinesAndColumns();
  searchSquares();
}

function searchLinesAndColumns() {
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
  for (let i = 0; i < 9; i += 3) {
    for (let j = 0; j < 9; j += 3) {
      for (let x = 0; x < 3; x++) {
        const yAxis = grid[i + x];
        for (let y = 0; y < 3; y++) {
          const number = yAxis[j + y].number;
          if (number != null) {
            for (let a = 0; a < 3; a++) {
              const column = grid[i + a];
              for (let b = 0; b < 3; b++) {
                const currentCase = column[j + b];
                currentCase.possibleNumbers.removeElement(number);
              }
            }
          }
        }
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