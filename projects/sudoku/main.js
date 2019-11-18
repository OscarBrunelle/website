var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var grid = [];
var selectedCase = null;
var selectedNumber = null;
var primaryMode = false,
  guessMode = false,
  eraseMode = false,
  searchMode = false,
  showPossibleNumbers = false;

function switchMode(n) {
  switch (n) {
    case 0:
      primaryMode = !primaryMode;
      break;
    case 1:
      guessMode = !guessMode;
      break;
    case 2:
      eraseMode = !eraseMode;
      break;
    case 3:
      searchMode = !searchMode;
      break;
    case 4:
      showPossibleNumbers = !showPossibleNumbers;
      update();
      break;
    default:
      console.log("Error while chosing the mode");
      break;
  }
}

function onload() {
  generateSudoku();
  drawGrid();
  update();
  canvas.addEventListener("click", clickEvent);
  document.body.addEventListener("keydown", function (event) {
    var key = event.which;
    if (key >= 49 && key <= 57) {
      selectedNumber = key - 48;
    }
  });
}

function generateSudoku() {
  const exampleGrid = [
    [null, 3, null, null, 5, 1, 2, 6, null],
    [1, 2, null, null, null, null, null, 5, 8],
    [null, null, null, null, null, null, 7, null, 1],
    [null, null, 3, null, 1, null, 9, null, 7],
    [null, null, 5, 8, null, 6, 1, null, null],
    [8, null, 9, null, 2, null, 5, null, null],
    [5, null, 2, null, null, null, null, null, 9],
    [3, 9, null, null, null, null, null, 1, 5],
    [null, 4, 1, 9, 8, null, null, 3, null]
  ];
  const exampleGrid2 = [
    [null, null, 9, null, null, 4, 2, null, null],
    [null, null, null, null, 8, null, null, 4, null],
    [6, null, null, 5, 7, null, null, null, 9],
    [9, null, 3, null, null, null, null, null, null],
    [null, 1, null, null, null, null, null, 9, null],
    [null, null, null, null, null, null, 8, null, 5],
    [7, null, null, null, 1, 9, null, null, 4],
    [null, 6, null, null, 5, null, null, null, null],
    [null, null, 1, 7, null, null, 6, null, null]
  ];
  grid = [];
  for (let i = 0; i < 9; i++) {
    var column = [];
    for (let j = 0; j < 9; j++) {
      const value = exampleGrid2[i][j];
      column.push(new Case(i * 50, j * 50, value, value != null));
    }
    grid.push(column);
  }
  update();
}

function resetGrid() {
  grid = [];
  for (let i = 0; i < 9; i++) {
    var column = [];
    for (let j = 0; j < 9; j++) {
      const value = null;
      column.push(new Case(i * 50, j * 50, value, value != null));
    }
    grid.push(column);
  }
  update();
}

function clickEvent(event) {
  selectCase(event);
  update();
}

function selectCase(event) {
  var point = getMousePosition(event);
  var x = (point.x - (point.x % 50)) / 50;
  var y = (point.y - (point.y % 50)) / 50;
  selectedCase = grid[x][y];
  if (searchMode) {
    console.log(selectedCase.possibleNumbers);
  } else {
    if (!selectedCase.isPrimary) {
      if (eraseMode) {
        selectedCase.number = null;
        selectedCase.guesses = [];
      } else if (primaryMode) {
        selectedCase.isPrimary = true;
        selectedCase.number = selectedNumber;
      } else if (guessMode) {
        selectedCase.guesses.pushIfNotExist(selectedNumber);
      } else {
        selectedCase.number = selectedNumber;
      }
    }
  }
}

function getMousePosition(event) {
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  return new Point(x, y);
}

function drawGrid() {
  for (let index = 0; index < 10; index++) {
    if (index % 3 == 0) {
      context.strokeStyle = "#000";
    } else {
      context.strokeStyle = "#AAA";
    }
    context.beginPath();
    context.moveTo(index * 50, 0);
    context.lineTo(index * 50, canvas.height);
    context.moveTo(0, index * 50);
    context.lineTo(canvas.width, index * 50);
    context.stroke();
  }
}

function update() {
  var isFinished = true;
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var currentCase = grid[i][j];
      currentCase.showPossibleNumbers = showPossibleNumbers;
      currentCase.draw();
      if (currentCase.number == null) {
        isFinished = false;
      }
    }
    drawGrid();
  }
  if (isFinished) {
    alert("You finished the sudoku!");
  }
}

function selectNumber(num) {
  selectedNumber = num;
}

document.onload = onload();