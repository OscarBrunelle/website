var myGamePiece;
var field = [];
var myScore;
var canvas;
var context;
var frameNo = 0;
var interval = setInterval(updateGameArea, 20);
var gameDiv;

document.body.onload = createComponents();

function play() {
  document.getElementById('mainMenu').style.display = 'none';
  gameDiv.style.display = 'block';
  car.update();
}

////////////////////////////////////

function createComponents() {
  gameDiv = document.createElement('div');
  canvas = document.createElement('canvas');
  canvas.width = 480;
  canvas.height = 270;
  canvas.style.border = '1px solid #d3d3d3';
  canvas.style.backgroundColor = '#f1f1f1';
  document.body.addEventListener('keydown', function(event) {
    key = event.key;
    if (key == "ArrowUp") {
      UP = true;
    }
    if (key == "ArrowLeft") {
      LEFT = true;
    }
    if (key == "ArrowDown") {
      DOWN = true;
    }
    if (key == "ArrowRight") {
      RIGHT = true;
    }
  });
  document.body.addEventListener('keyup', function(event) {
    key = event.key;
    if (key == "ArrowUp") {
      UP = false;
    }
    if (key == "ArrowLeft") {
      LEFT = false;
    }
    if (key == "ArrowDown") {
      DOWN = false;
    }
    if (key == "ArrowRight") {
      RIGHT = false;
    }
  });
  context = canvas.getContext('2d');
  gameDiv.appendChild(canvas);
  car = new car(30, 30, 'red', 10, 120);
  myScore = new component('30px', 'Consolas', 'black', 280, 40, 'text');

  var accelerateButton = document.createElement('button');
  accelerateButton.setAttribute('onmousedown', 'accelerate(-0.2)');
  accelerateButton.setAttribute('onmouseup', 'accelerate(0.5)');
  accelerateButton.innerHtml = 'ACCELERATE';
  var p1 = document.createElement('p');
  p1.innerHtml = 'Use the ACCELERATE button to accelerate';
  var p2 = document.createElement('p');
  p1.innerHtml = 'How long can you stay alive?';
  gameDiv.appendChild(accelerateButton);
  gameDiv.appendChild(p1);
  gameDiv.appendChild(p2);
  gameDiv.style.display = 'none';
  document.body.appendChild(gameDiv);
}

function clear() {
  context.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

function updateGameArea() {

  for (i = 0; i < field.length; i += 1) {
    if (car.crashWith(field[i])) {
      return;
    }
  }
  clear();
  frameNo += 1;
  for (i = 0; i < field.length; i += 1) {
    field[i].x += -1;
    field[i].update();
  }
  /*
    myScore.calculate();
    myScore.update();*/
  car.move();
  car.update();
}





////////////////////////////////

function everyinterval(n) {
  if ((frameNo / n) % 1 == 0) {
    return true;
  }
  return false;
}

function accelerate(n) {
  car.gravity = n;
}


/////////////////////////////
