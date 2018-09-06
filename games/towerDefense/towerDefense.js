var welcomeScreen = document.getElementById("welcomeScreen");
var gameScreen = document.getElementById("gameScreen");
var levelSelectionScreen = document.getElementById("levelSelectionScreen");

var monster1Image;
var monster2Image;

var canvas;
var context;

var numberOfLevels = 3;

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

function createImages(){
  monster1Image = document.createElement("img");
  monster2Image = document.createElement("img");
  monster1Image.setAttribute("src", "images/monster1.png");
  monster2Image.setAttribute("src", "images/monster2.png");
  monster1Image.setAttribute("alt", "Monster 1");
  monster1Image.setAttribute("alt", "Monster 2");
  gameScreen.appendChild(monster1Image);
  gameScreen.appendChild(monster2Image);

}

document.onload = playGame();









function startGame() {
  welcomeScreen.style.display = "none";
  levelSelectionScreen.style.display = "block";

  var levelString;
  var levelImage;

  for (var i = 1; i < numberOfLevels + 1; i++) {
    levelString = "level" + (i);
    levelImage = document.createElement("img");
    levelImage.setAttribute("src", levelString + ".png");
    levelImage.setAttribute("alt", "Level " + (i));
    levelImage.setAttribute("onclick", "selectLevel(" + i + ")");
    levelSelectionScreen.appendChild(levelImage);
  }
}

function selectLevel(levelSelected) {
  levelSelectionScreen.style.display = "none";
}
