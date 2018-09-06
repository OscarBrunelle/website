var key;
var speedx = 1;
var speedy = 0;
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');
var x = 64;
var y = 64;

var head;
var tail = [];
var fruit;

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
  initializeFruit();
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
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillRect(this.xpos, this.ypos, 20, 20);
  };
  this.eat = function(fruitX, fruitY) {
    if ((this.xpos <= fruitX && (this.xpos + 20) >= (fruitX+10)) && (this.ypos <= fruitY && (this.ypos + 20) >= (fruitY+10))) {
      return true;
    } else {
      return false;
    }
  };
}

function initializeSnake() {
  head = new Snake(0, 0, true);
  head.draw();
  tail.push(head);
}

function addSnake(x, y) {
  var newS = new Snake(x, y);
  tail.push(newS);
}

function initializeFruit() {
  fruit = new Fruit();
  fruit.draw();
}

function Fruit() {
  this.x = Math.floor( (Math.random() * 631)/32 ) * 32 -10;
  this.y = Math.floor( (Math.random() * 471)/32 ) * 32-10;
  this.draw = function(){
    ctx.fillStyle = 'rgba(255, 255, 255, 1)';
    ctx.fillRect(this.x, this.y, 10, 10);
  };
  this.newFruit = function(){
    //this.x = Math.floor(Math.random() * 631);
    //this.y = Math.floor(Math.random() * 471);
    this.x = Math.floor( (Math.random() * 631)/32 ) * 32-10;
    this.y = Math.floor( (Math.random() * 471)/32 ) * 32-10;
  }
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (var i = tail.length - 1; i >= 0; i--) {
    if (tail[i].isHead) {
      tail[i].setNewPos(speedx, speedy);
      tail[i].draw();
      if (tail[i].eat(fruit.x, fruit.y)) {
        addSnake(tail[tail.length - 1].xpos, tail[tail.length - 1].ypos);
        fruit.newFruit();
      }
    } else {
      tail[i].xpos = tail[i - 1].xpos;
      tail[i].ypos = tail[i - 1].ypos;
      tail[i].draw();
    }
  }
  fruit.draw();
}

document.body.onload = drawPlayground();
window.setInterval(update, 200);
