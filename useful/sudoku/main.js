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

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Case {
  constructor(x, y, value = null, isPrimary = false) {
    this.x = x;
    this.y = y;
    this.number = value;
    this.isPrimary = isPrimary;
    this.guesses = [];
    if (!isPrimary) {
      this.possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    } else {
      this.possibleNumbers = [];
    }
  }
}

function onload() {
  generateSudoku();
  drawGrid();
  update();
  canvas.addEventListener("click", clickEvent);
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
  context.fillStyle = "rgba(0,0,0,1)";
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      var currentCase = grid[i][j]
      var number = currentCase.number;
      if (number != null) {
        if (currentCase.isPrimary) {
          context.font = "bold 15px Arial";
        } else {
          context.font = "15px Arial";
        }
        context.fillText(number, currentCase.x + 20, currentCase.y + 30);
      } else {
        isFinished = false;
        context.font = "italic 10px Arial";
        /*for (let guessIndex = 0; guessIndex < currentCase.guesses.length; guessIndex++) {
          var guess = currentCase.guesses[guessIndex];*/
        if (showPossibleNumbers) {
          currentCase.possibleNumbers.forEach(guess => {
            context.fillText(guess, currentCase.x + 5 + ((guess - 1) % 3) * 15, currentCase.y + 15 + Math.floor((guess - 1) / 3) * 15);
          });
        } else {
          currentCase.guesses.forEach(guess => {
            context.fillText(guess, currentCase.x + 5 + ((guess - 1) % 3) * 15, currentCase.y + 15 + Math.floor((guess - 1) / 3) * 15);
          });
        }
      }
    }
  }
  if (isFinished) {
    alert("You finished the sudoku!");
  }
}

function selectNumber(num) {
  selectedNumber = num;
}

Array.prototype.inArray = function (element) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == element) return i;
  }
  return -1;
};

Array.prototype.pushIfNotExist = function (element) {
  if (this.inArray(element) == -1) {
    this.push(element);
  }
};

Array.prototype.removeElement = function (element) {
  const index = this.inArray(element);
  if (index != -1) {
    this.splice(index, 1);
  }
};

document.onload = onload();