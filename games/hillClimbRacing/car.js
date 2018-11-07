var car;
var text = document.getElementById('text');

var UP = false,
  DOWN = false,
  RIGHT = false,
  LEFT = false;

function car() {
  this.width = 63; //128;
  this.height = 44; //64;
  this.x = 0;
  this.y = 50;
  this.leftWheelX = 50;
  this.rightWheelX = 70;
  this.leftWheelY = 50;
  this.rightWheelY = 70;
  this.speedX = 0;
  this.speedY = 0;
  this.gravity = 0.05;
  this.gravitySpeed = 0;
  this.move = function() {
    if (UP && this.speedY > -5) {
      if (this.gravitySpeed > 0) {
        this.gravitySpeed -= this.gravity;
      } else {
        this.speedY -= 0.05;
      }
    }
    if (LEFT && this.speedX > -5) {
      this.speedX -= 0.05;
    }
    if (DOWN && this.speedY < 5) {
      this.speedY += 0.05;
    }
    if (RIGHT && this.speedX < 5) {
      this.speedX += 0.05;
    }
    if ((!UP) && this.speedY < 0) {
      if (this.gravitySpeed < 1) {
        this.gravitySpeed += this.gravity;
      } else if (this.gravitySpeed < 2.5) {
        this.gravitySpeed += this.gravity / 2;
      } else {
        this.speedY += 0.05;
      }
    }
    if ((!LEFT) && this.speedX < -2.5) {
      this.speedX += 0.05;
    }
    if ((!DOWN) && this.speedY > 2.5) {
      this.speedY -= 0.05;
    }
    if ((!RIGHT) && this.speedX > 2.5) {
      this.speedX -= 0.05;
    }/*
    if ((!UP) && this.speedY < 0) {
      this.speedY += 0.025;
    }*/
    if ((!LEFT) && this.speedX < 0) {
      this.speedX += 0.025;
    }
    if ((!DOWN) && this.speedY > 0) {
      this.speedY -= 0.025;
    }
    if ((!RIGHT) && this.speedX > 0) {
      this.speedX -= 0.025;
    }



    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    text.textContent = this.speedY + " and x " + this.speedX + "   " + this.gravitySpeed;
    /*this.hitBottom();
  };
  this.hitBottom = function() {
    var rockbottom = canvas.height - this.height - 2;
    if (this.y > rockbottom) {
      this.gravitySpeed = 0;
      this.y = rockbottom;
      this.speedY = 0;
      return true;
    }
    return false;*/
  };
  this.changeImage = function() {
    this.image = document.getElementById('car');
  };
  this.draw = function() {
    context.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  this.update = function() {
    this.changeImage();
    this.draw();
  };
}









function component(width, height, color, x, y, type) {
  this.type = type;
  this.score = 0;
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  this.x = x;
  this.y = y;
  this.gravity = 0;
  this.gravitySpeed = 0;
  this.update = function() {
    if (this.type == "text") {
      context.font = this.width + " " + this.height;
      context.fillStyle = color;
      context.fillText(this.text, this.x, this.y);
    } else {
      context.fillStyle = color;
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }
  this.newPos = function() {
    this.gravitySpeed += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY + this.gravitySpeed;
    this.hitBottom();
  }
  this.hitBottom = function() {
    var rockbottom = canvas.height - this.height;
    if (this.y > rockbottom) {
      this.y = rockbottom;
      this.gravitySpeed = 0;
    }
  }
  this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    var otherleft = otherobj.x;
    var otherright = otherobj.x + (otherobj.width);
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + (otherobj.height);
    var crash = true;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    return crash;
  }
  this.calculate = function() {
    this.text = 'SCORE: ' + 0;
  }
}







function rotate() {

  // Clear the canvas
  context.clearRect(0, 0, canvasWidth, canvasHeight);

  // Move registration point to the center of the canvas
  context.translate(canvasWidth / 2, canvasWidth / 2);

  // Rotate 1 degree
  context.rotate(Math.PI / 180);

  // Move registration point back to the top left corner of canvas
  context.translate(-canvasWidth / 2, -canvasWidth / 2);

  context.fillStyle = "red";
  context.fillRect(canvasWidth / 4, canvasWidth / 4, canvasWidth / 2, canvasHeight / 4);
  context.fillStyle = "blue";
  context.fillRect(canvasWidth / 4, canvasWidth / 2, canvasWidth / 2, canvasHeight / 4);
}
