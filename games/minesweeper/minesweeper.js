var DEFAULT_WIDTH = 20;
var DEFAULT_HEIGHT = 12;
var DEFAULT_MINES = 36;

var width = 20;
var height = 12;
var nbrCovered = 20 * 12;
var nbrUncovered = 0;
var time = 0;

function update() {
  covered = document.getElementById("covered");
  uncovered = document.getElementById("uncovered");
  timer = document.getElementById("timer");
  covered.innerHtml = "Cases covered: " + nbrCovered;
  uncovered.innerHtml = "Cases uncovered: " + nbrUncovered;
  timer.innerHtml = "Time: " + time;
}

function start() {
  width = prompt("input the width", "Minimum: 10");
  if (width < 10) {
    alert("Too small! Using default parameter instead");
    width = 20;
  }
  height = prompt("input the height", "Minimum: 5");
  if (height < 5) {
    alert("Too small! Using default parameter instead");
    height = 12;
  }
  mines = prompt("input the mines", "Minimum: 1");
  if (mines < 1) {
    alert("Too small! Using default parameter instead");
    mines = 36;
  } else if (mines > width * height) {
    alert("Too much! Using default parameter instead");
    mines = 36;
  }
  nbrCovered = width * height;
  document.getElementById("mines").innerHtml = "Mines to find: " + mines;
  createField(width, height);
  createMines(mines);
  update();
}

function createField(width = 20, height = 12) {
  var field = document.getElementById("field");
  for (var i = 0; i < height; i++) {
    p = document.createElement("p");
    d = document.createElement("div");
    d.setAttribute("class", "line");
    for (var j = 0; j < width; j++) {
      b = document.createElement("button");
      im = document.createElement("img");
      im.setAttribute("src", "icons/minesweeper_unopened_square.png");
      im.setAttribute("alt", "Mine?");
      b.setAttribute("onclick", "buttonClicked(event)");
      b.setAttribute("class", "case");
      b.setAttribute("pos_x", j);
      b.setAttribute("pos_y", i);
      b.setAttribute("covered", true);
      b.setAttribute("mined", false);
      b.setAttribute("neighbooringMines", 0);
      b.appendChild(im);
      d.appendChild(b);
      //buttons_array[i][j] = b;
    }
    field.appendChild(d);
  }
}

function createMines(mines = 36) {
  var model = [height][width];
  document.getElementById("text").innerHtml = "yo";
  var txt = 0;
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      txt++;
      document.getElementById("text").innerHtml = txt;
      model[i][j] = new Button();
    }
  }
  while (mines > 0) {
    var i = Math.floor(Math.random() * width);
    var j = Math.floor(Math.random() * height);
    if (!model[i][j].isMined()) {
      model[i][j].isMined = true;
      mines--;
    }
  }
}

function buttonClicked(event) {
  var clicked = event.target;
  var x = clicked.getAttribute("pos_x");
  var y = clicked.getAttribute("pos_y");
  alert(x);
  /*if (x.) {

  }*/
  nbrUncovered++;
  nbrCovered--;
}

function getIconFileName() {
  switch (iconNumber) {
    case 0:
      return "minesweeper_0.png";
    case 1:
      return "minesweeper_1.png";
    case 2:
      return "minesweeper_2.png";
    case 3:
      return "minesweeper_3.png";
    case 4:
      return "minesweeper_4.png";
    case 5:
      return "minesweeper_5.png";
    case 6:
      return "minesweeper_6.png";
    case 7:
      return "minesweeper_7.png";
    case 8:
      return "minesweeper_8.png";
    case 9:
      return "minesweeper_mine.png";
    case 10:
      return "minesweeper_mineSelected.png";
    case 11:
      return "minesweeper_unopened_square.png";
    case 12:
      return "minesweeper_flag.png";
    default:
      alert("Invalid icon number: " + iconNumber);
      return "";
  }
}

function Button(isMined = false, neighbooringMines = 0){
  this.isMined = isMined;
  this.neighbooringMines = neighbooringMines;
}

document.body.onload = createField();
document.body.onload = createMines();
