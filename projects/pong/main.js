var interval, updateTime;
var player1, player2;
var p1Span, p2Span;
var ball, paddle1, paddle2;
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var isStopped = false;

function onLoad() {
  p1Span = document.getElementById("player1Score");
  p2Span = document.getElementById("player2Score");

  /*canvas.setAttribute("tabindex", "1");
  canvas.focus();*/
  document.body.addEventListener('keydown', function (event) {
    if (event.key == "ArrowUp") {
      paddle2.press("up");
    } else if (event.key == "ArrowDown") {
      paddle2.press("down");
    }
    if (event.which == 65) {
      paddle1.press("up");
    } else if (event.which == 81) {
      paddle1.press("down");
    }
    if (event.which == 32) {
      startGame();
    }
  });
  document.body.addEventListener('keyup', function (event) {
    if (event.key == "ArrowUp") {
      paddle2.release("up");
    } else if (event.key == "ArrowDown") {
      paddle2.release("down");
    }
    if (event.which == 65) {
      paddle1.release("up");
    } else if (event.which == 81) {
      paddle1.release("down");
    }
  });
}

function set() {
  var player1Name = prompt("Enter the name of the first player:");
  var player2Name = prompt("Enter the name of the second player:");
  player1 = new Player(player1Name, p1Span);
  player2 = new Player(player2Name, p2Span);

  paddle1 = new Paddle(canvas, context, true);
  paddle2 = new Paddle(canvas, context, false);
  ball = new Ball(canvas, context, paddle1, paddle2);

  updateTime = 10;
  interval = setInterval(update, updateTime);
  isStopped = false;
  update();
  newGame();
}

function newGame() {
  isStopped = true;
  var textSize = 30;
  context.fillStyle = "rgba(255,255,255,1)";
  context.font = textSize + "px Arial"
  context.fillText('Press "Space"', canvas.width / 2 - 100, canvas.height / 2 - textSize);
  context.fillText('      to start', canvas.width / 2 - 100, canvas.height / 2 + textSize * 1.5);
}

function startGame() {
  ball.reset();
  paddle1.reset();
  paddle2.reset();
  ball.start();
  isStopped = false;
}

function update() {
  if (isStopped) {

  } else {
    context.clearRect(0, 0, canvas.width, canvas.height);
    paddle1.move();
    paddle2.move();
    ball.move();
    if (ball.x < paddle1.x + paddle1.width) {
      player2.addPoint();
      newGame();
    } else if (ball.x > paddle2.x) {
      player1.addPoint();
      newGame();
    }
  }
}

function changeColor(color) {
  ball.changeColor(color);
}

document.onload = onLoad();