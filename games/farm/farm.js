var Lands = [];
var Trees = [];
var Animals = [];
var types = {
  Lands,
  Trees,
  Animals
}

var Landmode = false;

var canvas = document.getElementById("canvas");
var context;

var chicken;
var walker;



function show() {
  document.getElementById("showButton").style.display = "none";
  document.getElementById("webPage").style.display = "block";
  setTimeout(putSomething(), 2000);
}

/*function update(){
	var type;
	for (var i = types.length - 1; i >= 0; i--) {
		type = types[i];
		for (var i = type.length - 1; i >= 0; i--) {
			type[i].setIcon();
		}
	}
}*/

function toggleLand() {
  if (Landmode) {
    Landmode = false;
    document.getElementById("webPage").style.cursor = 'url(icons/land.png), all-scroll';
  } else {
    Landmode = true;
    document.getElementById("webPage").style.cursor = "auto";
  }
}

function harvest(event) {
  var clicked = event.target;

}

function putSomething() {
  context = canvas.getContext("2d");
  chicken = new chicken();
  walker = new walker();
  //getImages();
  window.setInterval(update, 250);
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  chicken.draw();
  walker.draw();
}




function chicken(x = 0, y = 0) {
  this.x = x;
  this.y = y;
  this.image = chickenImage1;
  this.deg = 5;
  this.draw = function() {
    context.drawImage(this.image, this.x, this.y /*, this.width, this.height*/ );
    document.getElementById("webPage").style.mozTransform = 'rotate(' + this.deg + 'deg)';
    if (this.image == chickenImage1) {
      this.image = chickenImage2;
    } else if (this.image == chickenImage2) {
      this.image = chickenImage1;
    }
  };
}

function walker(x = 0, y = 100) {
  this.x = x;
  this.y = y;
  this.image = walkingImage1;
  this.way = 1;
  this.draw = function() {
    context.drawImage(this.image, this.x, this.y /*, this.width, this.height*/ );
    if (this.image == walkingImage1) {
      this.image = walkingImage2;
    } else if (this.image == walkingImage2) {
      this.image = walkingImage1;
    }
    this.move();
  };
  this.move = function() {
    if (this.x + 40 >= canvas.width) {
      this.way = -1;
    } else if (this.x <= 0) {
      this.way = 1;
    }
    this.x += this.way * 10;
  }
}
