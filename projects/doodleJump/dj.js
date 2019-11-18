var player, pads = [],
  springs = [];
var canvas, context, interval;
var updateTime = 10;
var yDiff = 0,
  score = 0;
var padImage, springImage;
var isPlaying = false, isWaitingForInput = false;
var lastPadY;

function load() {
  padImage = document.getElementById("pad");
  springImage = document.getElementById("spring");
  canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 400;
  document.body.appendChild(canvas);
  context = canvas.getContext("2d");
  player = new Player();
  document.body.addEventListener('keydown', function (event) {
    var eventKey = event.which;
    /*if (eventKey == 27) {
      showEscapeMenu();
    }*/
    switch (eventKey) {
      case 37: //left
        player.leftDirection = true;
        player.xDirection = -1;
        break;
      case 39: //right
        player.rightDirection = true;
        player.xDirection = 1;
        break;
      case 32: //space
        if (isWaitingForInput) {
          reset();
        }
        break;
      case 82: //r
        if (isPlaying) {
          reset();
        }
        break;
    }
  });
  document.body.addEventListener('keyup', function (event) {
    var eventKey = event.which;
    /*if (eventKey == 27) {
      showEscapeMenu();
    }*/
    switch (eventKey) {
      case 37: //left
        player.leftDirection = false;
        if (player.rightDirection == true) {
          player.xDirection = -1;
        } else {
          player.xDirection = 0;
        }
        break;
      case 39: //right
        player.rightDirection = false;
        if (player.leftDirection == true) {
          player.xDirection = 1;
        } else {
          player.xDirection = 0;
        }
        break;
    }
  });
  context.font = "15px Arial";
  context.fillStyle = "black";
  context.fillText("Press spacebar", 20, 80);
  context.fillText("to start playing", 20, 100);
  isWaitingForInput = true;
}

function generatePads() {
  for (let i = 0; i < 20; i++) {
    addPad();
  }
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  lastPadY -= yDiff;
  for (let i = 0; i < springs.length; i++) {
    let spring = springs[i];
    spring.update();
    if (spring.y > canvas.height) {
      springs.splice(i, 1);
      i--;
    }
  }
  for (let i = 0; i < pads.length; i++) {
    let pad = pads[i];
    pad.update();
    if (pad.y > canvas.height) {
      pads.splice(i, 1);
      i--;
      let pad = addPad();
      if (Math.floor(Math.random() * 15) == 0) {
        springs.push(new Spring(pad.x + (pad.width - springImage.width) / 2, pad.y - springImage.height / 2));
      }
    }
  }
  player.update();
  updateScore();
}

function addPad() {
  let padX = Math.random() * (canvas.width - padImage.width);
  lastPadY -= 20 + Math.random() * (Math.min(40 * score / 10000, 40));
  let pad = new Pad(padX, lastPadY);
  pads.push(pad);
  return pad;
}

class Pad {
  constructor(x, y) {
    this.image = padImage;
    this.x = x;
    this.y = y;
    this.width = padImage.width;
    this.height = padImage.height;
  }

  update() {
    this.y -= yDiff;
    this.draw();
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Spring {
  constructor(x, y) {
    this.image = springImage;
    this.x = x;
    this.y = y;
    this.width = this.image.width;
    this.height = this.image.height;
  }

  update() {
    this.y -= yDiff;
    this.draw();
  }

  draw() {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

function updateScore() {
  score -= yDiff;
  context.fillText("Score: " + Math.floor(score), 0, 20);
}

function reset() {
  player.reset();
  yDiff = 0;
  score = 0;
  pads = [];
  springs = [];
  lastPadY = canvas.height;
  generatePads();
  clearInterval(interval);
  interval = setInterval(update, updateTime);
  isWaitingForInput = false;
  isPlaying = true;
}

function endGame() {
  clearInterval(interval);
  context.fillStyle = "rgba(0,0,0,0.05)";
  context.fillRect(40, 60, canvas.width - 40, 70);
  context.fillStyle = "rgba(0,0,0,1)";
  context.fillText("Final score: " + Math.floor(score), 50, 80);
  context.fillText("Press spacebar", 50, 100);
  context.fillText("to play again", 50, 120);
  isWaitingForInput = true;
  isPlaying = false;
}

document.onload = load();