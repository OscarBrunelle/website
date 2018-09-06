var key;
var speedx = 1;
var speedy = 0;
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
var x = 64;
var y = 64;

var head;
var tail = [];

function drawPlayground() {

  canvas.setAttribute("tabindex", "1");
  canvas.focus();
  canvas.style.background = "grey";

  canvas.addEventListener('keydown', function(event) {
    key = event.key;
    if (key == "ArrowUp") {
      speedx = 0;
      speedy = -1;
    } else if (key == "ArrowRight") {
      speedx = +1;
      speedy = 0;
    } else if (key == "ArrowDown") {
      speedx = 0;
      speedy = +1;
    } else if (key == "ArrowLeft") {
      speedx = -1;
      speedy = 0;
    }
  });

  initializeSnake();
}

function Snake(xpos = 0, ypos = 0, isHead = false) {
  this.xpos = xpos;
  this.ypos = ypos;
  this.isHead = isHead;
  this.setNewPos = function(xspeed, yspeed) {
    this.xpos += xspeed * 20;
    this.ypos += yspeed * 20;
  };
  this.draw = function() {
    ctx.fillRect(this.xpos, this.ypos, 20, 20);
  };
}

function initializeSnake() {
  head = new Snake(64, 64, true);
  head.draw();
  tail.push(head);
}

function addSnake(){
  var newS = new Snake();
  tail.push(newS);
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = tail.length - 1; i >= 0; i--) {
    if (tail[i].isHead) {
      tail[i].setNewPos(speedx, speedy);
      tail[i].draw();
    } else {
      tail[i].xpos = tail[i - 1].xpos;
      tail[i].ypos = tail[i - 1].ypos;
      tail[i].draw();
    }
  }
}

document.body.onload = drawPlayground();
window.setInterval(update, 200);
window.setInterval(addSnake,2000);
