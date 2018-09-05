/*
invert height and width
use a function to get images
array for images
inspire more from the old files
add getter for button class
*/

var flagMode = false;
var flagModeButton = document.getElementById("flagModeButton");

var DEFAULT_WIDTH = 20;
var DEFAULT_HEIGHT = 12;
var DEFAULT_MINES = 36;

var width = 20;
var height = 12;
var nbrCovered = 20 * 12;
var nbrUncovered = 0;
var minesToFind = 36;
var time = 0;

var model = [];

function update() {
  document.getElementById("covered").innerHTML = "Cases covered: " + nbrCovered;
  document.getElementById("uncovered").innerHTML = "Cases uncovered: " + nbrUncovered;
  document.getElementById("mines").innerHTML = "Mines to find: " + minesToFind;
  document.getElementById("timer").innerHTML = "Time: " + time;
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
  minesToFind = mines;
  document.getElementById("mines").innerHTML = "Mines to find: " + mines;
  createField(width, height);
  createMines(mines);
  update();
}

function createField(width = 20, height = 12) {
  var field = document.getElementById("field");
  var mini_width = width * 30;
  //field.setAttribute("min-width",mini_width + "px");
  for (var i = 0; i < height; i++) {
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
      /*b.setAttribute("covered", true);
      b.setAttribute("mined", false);
      b.setAttribute("neighbooringMines", 0);
      /*
    	this.iconNumber = iconNumber;
    	setBackground(Color.WHITE);
    	setIcon(getImageIcon());
    	Border emptyBorder = BorderFactory.createEmptyBorder(0, 0, 0, 0);
    	setBorder(emptyBorder);
    	setBorderPainted(false);
      */
      b.appendChild(im);
      d.appendChild(b);
    }
    field.appendChild(d);
  }
}

function createMines(mines = 36) {
  var minesToAdd = mines;
  for (var i = 0; i < height; i++) {
    var table = [];
    for (var j = 0; j < width; j++) {
      update();
      var new_button = new Button();
      table.push(new_button);
    }
    model.push(table);
  }
  while (minesToAdd > 0) {
    var i = Math.floor(Math.random() * height);
    var j = Math.floor(Math.random() * width);
    if (!model[i][j].isMined) {
      model[i][j].setMined();
      minesToAdd--;
    }
  }


  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      var total = 0;
      for (var k = Math.max(i - 1, 0); k <= Math.min(i + 1, height - 1); k++) {
        for (var l = Math.max(j - 1, 0); l <= Math.min(j + 1, width - 1); l++) {
          if (model[k][l].isMined) {
            total++;
          }
        }
      }
      model[i][j].setNeighbooringMines(total);
    }
  }
}

function buttonClicked(event) {
  var clicked = event.target;
  var x = clicked.getAttribute("pos_x");
  var y = clicked.getAttribute("pos_y");
  var childs = clicked.childNodes;
  if (flagMode) {
    childs[0].setAttribute("src", "icons/minesweeper_flag.png");
    minesToFind--;
  } else if (model[y][x].isMined) {
    /*model[y][x].setClicked();
    uncoverAll();
    */
    alert("Oops! That was a mine :/ /br Try again? Press OK to continue");
    //
    childs[0].setAttribute("src", "icons/minesweeper_mineSelected.png");
  } else {
    var name = getIconFileName(model[y][x].neighbooringMines);
    childs[0].setAttribute("src", "icons/" + name);
    nbrCovered--;
    nbrUncovered++;
  }

  update();
}

function getIconFileName(iconNumber) {
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

function Button(isMined = false, neighbooringMines = 0) {
  this.isMined = isMined;
  this.neighbooringMines = neighbooringMines;
  this.covered = true;
  Button.prototype.setMined = function() {
    this.isMined = true;
  };
  Button.prototype.setNeighbooringMines = function(neighboors) {
    this.neighbooringMines = neighboors;
  };
}

function toggleFlagMode() {
  if (flagMode == true) {
    flagMode = false;
    flagModeButton.innerHTML = "Flag mode: OFF";
  } else {
    flagMode = true;
    flagModeButton.innerHTML = "Flag mode: ON ";
  }
}

document.body.onload = createField();
document.body.onload = createMines();
