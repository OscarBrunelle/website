var slots_div = document.getElementById("slots");
var height = 10;
var width = 20;
var machine_selected = "none";
var money = 0;

function createSlots(){
  for (var i = 0; i < height; i++) {
    d = document.createElement("div");
    d.setAttribute("class", "line");
    for (var j = 0; j < width; j++) {
      b = document.createElement("button");
      im = document.createElement("img");
      im.setAttribute("src", "icons/empty_slot.png");
      im.setAttribute("alt", "Empty Slot");
      b.setAttribute("onclick", "buttonClicked(event)");
      b.setAttribute("class", "case");
      b.setAttribute("pos_x", j);
      b.setAttribute("pos_y", i);
      b.appendChild(im);
      d.appendChild(b);
    }
    slots_div.appendChild(d);
  }
}

function select(machine){
  if (machine == "reset") {
    machine_selected = "none";
    slots_div.style.cursor = "auto";
  } else {
    machine_selected = machine;
    slots_div.style.cursor = "url(icons/empty_slot.png) 16 16,auto";
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

function update() {
  document.getElementById("money").innerHtml = "Money: "+money+"$";
}

document.onload = createSlots();


/////////////////////////////////////////////////////////////





function playGame() {
  welcomeScreen.style.display = "none";
  gameScreen.style.display = "block";
  createImages();
  canvas = document.createElement("canvas");
  canvas.setAttribute("width", "768px");
  canvas.setAttribute("height", "640px");
  gameScreen.appendChild(canvas);
  context = canvas.getContext("2d");
  drawTiles();
}

function drawTiles() {
  var newTile;
  var x = 0;
  var y = 0;
  for (var i = 0; i < 12; i++) {
    for (var j = 0; j < 10; j++) {
      x = i * 64;
      y = j * 64;
      if (i == 5 && (j == 0 || j == 1 || j == 2 || j == 9)) {
        context.beginPath();
        context.lineWidth = "1";
        context.fillStyle = "blue";
        context.rect(x, y, 64, 64);
        context.fill();
      } else if (i == 6 && (j == 0 || j == 2 || j == 7 || j == 8 || j == 9)) {
        context.beginPath();
        context.lineWidth = "1";
        context.fillStyle = "blue";
        context.rect(x, y, 64, 64);
        context.fill();
      } else if (i == 7 && (j == 2 || j == 3 || j == 4 || j == 5 || j == 6 || j == 7)) {
        context.beginPath();
        context.lineWidth = "1";
        context.fillStyle = "blue";
        context.rect(x, y, 64, 64);
        context.fill();
      } else {
        context.beginPath();
        context.lineWidth = "1";
        context.strokeStyle = "blue";
        context.rect(x, y, 64, 64);
        context.stroke();/*
        context.drawImage(monster1Image,x,y,64,64);*/
      }
    }
  }
}
