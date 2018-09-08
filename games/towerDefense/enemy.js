var enemies = [];
/*
var startingX = pathCoord[0][0]*64;
var startingY = pathCoord[0][1]*64;*/

function enemy(type = 0, x = 0, y = 0) {
  this.type = type;
  this.x = pathCoord[0][0] * 64 + 16;
  this.y = pathCoord[0][1] * 64 + 16;
  this.image = monster2Image;
  this.currentGoal = 1;

  if (this.type == 0) {
    this.speed = 1;
  } else if (this.type == 1) {
    this.speed = 2;
  }

  this.setHealth = function() {
    if (this.type == 0) {
      this.baseHealth = 100;
      this.maxHealth = 150;
    } else if (this.type == 1) {
      this.baseHealth = 150;
      this.maxHealth = 250;
    }
    this.bonusHealth = nbrEnemiesKilled;
    this.health = this.baseHealth + this.bonusHealth;
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth;
    }
    this.startingHealth = this.health;
  }
  this.draw = function() {
    context.drawImage(this.image, this.x, this.y);
    context.beginPath();
    context.fillStyle = "red";
    context.strokeStyle = "black";
    context.lineWidth = 1;
    context.rect(this.x + 16, this.y + 6, 32 * (this.health / this.startingHealth), 5);
    context.stroke();
    context.fill();
  };
  this.move = function() {
    this.x += 0; //this.speed;
    this.y += this.speed;
    if (this.y >= canvas.height) {
      return true;
    }
    return false;
  };
  this.die = function(amount) {
    this.health -= amount;
    if (this.health <= 0) {
      return true;
    }
    return false;
  };
}

function addEnemy() {
  var newEnemy = new enemy();
  newEnemy.setHealth();
  newEnemy.draw();
  enemies.push(newEnemy);
  if (nbrEnemiesKilled > 10) {

  }
}
