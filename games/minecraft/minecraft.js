var text = document.getElementById('text');
document.onload = setUp();

var interval;
var x = 0;
var y = 0;
var speedX = 0;
var speedY = 0;
var gravity = 0.05;
var gravitySpeed = 0;

var UP = false,
  DOWN = false,
  RIGHT = false,
  LEFT = false;

function setUp() {
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
  interval = setInterval(update, 20);
}

function update() {
  if (UP || speedY < 3) {
    speedY++;
  }
  if (LEFT || speedX > -3) {
    speedX--;
  }
  if (DOWN || speedY > -3) {
    speedY--;
  }
  if (RIGHT || speedX < 3) {
    speedX++;
  }
  if (!UP || speedY > 0) {
    speedY -= 0.5;
  }
  if (!LEFT || speedX < 0) {
    speedX += 0.5;
  }
  if (!DOWN || speedY < 0) {
    speedY += 0.5;
  }
  if (!RIGHT || speedX > 0) {
    speedX -= 0.5;
  }
  if (gravitySpeed < 1.5) {
    gravitySpeed += gravity;
  }

  x += speedX;
  y += speedY + gravitySpeed;
  text.textContent = speedY + " and x " + speedX + "; x: " + x + "and y: " + y;
}
