var enemies = [];
/*
var startingX = pathCoord[0][0]*64;
var startingY = pathCoord[0][1]*64;*/

function enemy(type = 0, x = 0, y = 0) {
  this.type = type;
  this.x = pathCoord[0][0] * 64 + 16;
  this.y = pathCoord[0][1] * 64 + 16;
  this.xSpeed = 0;
  this.ySpeed = 1;
  this.image = monster2Image;
  this.currentGoal = 1;
  this.value = 10;
  this.froze = 0;
  this.fire = 0;
  this.frozeTimer = 0;
  this.fireTimer = 0;
  this.frozeApplied = false;

  if (this.type == 0) {
    this.Overallspeed = 2;
  } else if (this.type == 1) {
    this.Overallspeed = 4;
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
    this.centerX = this.x + 16;
    this.centerY = this.y + 16;
    if (this.centerX == (pathCoord[this.currentGoal][0] * 64 + 32) && this.centerY == (pathCoord[this.currentGoal][1] * 64 + 32)) {
      this.currentGoal++;
      if (this.currentGoal == pathCoord.length) {
        return true;
      }
      if ((pathCoord[this.currentGoal][0] * 64 + 32) > this.centerX) {
        this.xSpeed = 1;
      } else if ((pathCoord[this.currentGoal][0] * 64 + 32) < this.centerX) {
        this.xSpeed = -1;
      } else {
        this.xSpeed = 0;
      }
      if ((pathCoord[this.currentGoal][1] * 64 + 32) > this.centerY) {
        this.ySpeed = 1;
      } else if ((pathCoord[this.currentGoal][1] * 64 + 32) < this.centerY) {
        this.ySpeed = -1;
      } else {
        this.ySpeed = 0;
      }
    }
    this.x += (this.xSpeed * this.Overallspeed);
    this.y += (this.ySpeed * this.Overallspeed);
    /*if (this.y >= canvas.height) {
      return true;
    }*/
    return false;
  };

  this.applyDebuff = function(debuff = 0) {
    if (debuff == "fire") {
      this.fire = 1;
      this.fireTimer = 25;
    } else if (debuff = "freeze") {
      this.freeze = 2;
      this.frozeTimer = 25;
      if (!this.frozeApplied) {
        this.Overallspeed -= this.froze;
        this.frozeApplied = true;
      }
    }
  };

  this.debuffEffects = function() {
    if (this.fireTimer > 0) {
      this.health -= this.fire;
      this.fireTimer--;
    } else if (this.fireTimer <= 0) {
      this.fire = 0;
    }
    if (this.frozeTimer > 0) {
      this.frozeTimer--;
    } else if (this.frozeTimer <= 0) {
      this.Overallspeed += this.froze;
      this.froze = 0;
      this.frozeApplied = false;
    }
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
