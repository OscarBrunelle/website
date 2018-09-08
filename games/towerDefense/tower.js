var towers = [];
var selectedType = "classic";

var mouseX;
var mouseY;

function tower(type = "classic", x = 0, y = 0, range = 10, damage = 10) {
  this.type = type;
  this.x = x;
  this.y = y;

  if (this.type == "classic") {
    this.image = classicImage;
    this.range = 1;
    this.damage = 10;
    this.fireRate = 2;
    this.cost = 50;
    this.color = "green";
  } else if (this.type == "sniper") {
    this.image = sniperImage;
    this.range = 2;
    this.damage = 10;
    this.fireRate = 1;
    this.cost = 50;
    this.color = "yellow";
  } else if (this.type == "fire") {
    this.image = fireImage;
    this.range = 1;
    this.damage = 20;
    this.fireRate = 1;
    this.cost = 50;
    this.color = "red";
  } else if (this.type == "freezer") {
    this.image = freezerImage;
    this.range = 1;
    this.damage = 20;
    this.fireRate = 1;
    this.cost = 50;
    this.color = "blue";
  }

  this.findEnemy = function() {
    var enemyX;
    var enemyY;
    for (var i = 0; i < enemies.length; i++) {
      enemyX = enemies[i].x;
      enemyY = enemies[i].y;
      if (((this.x - this.range * 64) <= (enemyX + 32) && enemyX <= (this.x + this.range * 64 + 64)) && ((this.y - this.range * 64) <= (enemyY + 32) && enemyY <= (this.y + this.range * 64 + 64))) {
        return i;
      }
    }
    return -1;
  }
  this.fire = function() {

  };
  this.draw = function() {
    context.drawImage(this.image, this.x + 16, this.y + 16);
  };
}

function selectTower(selection = "classic") {
  selectedType = selection;
  document.body.style.cursor = "url(images/" + selection + ".png) 16 16, auto";
}

function addTower(event) {
  mouseX = Math.floor(event.offsetX / 64) * 64;
  mouseY = Math.floor(event.offsetY / 64) * 64;
  money -= 50;
  if (isPossibleToPlace(mouseX, mouseY)) {
    var newTower = new tower(selectedType, mouseX, mouseY);
    newTower.draw();
    towers.push(newTower);
  }
}

function isPossibleToPlace(xCoord, yCoord) {
  for (var i = 0; i < towers.length; i++) {
    if (towers[i].x == xCoord && towers[i].y == yCoord) {
      return false;
    }
  }
  for (var j = 0; j < pathCoord.length; j++) {
    if (xCoord == (pathCoord[j][0] * 64) && yCoord == (pathCoord[j][1] * 64)) {
      return false;
    }
  }
  return true;
}






//to draw the circle around
/*context.beginPath();
context.fillStyle = this.color;
context.strokeStyle = "black";
context.lineWidth = 1;
context.rect(this.x, this.y, 32, 32);
context.stroke();
context.fill();*/
