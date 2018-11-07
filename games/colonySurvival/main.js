var interval;
//hay day, stardew valley
var context;
var WIDTH_OF_GAME, HEIGHT_OF_GAME;
var imagesArray = ["default", "ground", "path", "water", "castle", "castleEmbrasure", "castleEntrance1", "castleEntrance2", "drawBridge", "tree", "animal", "chicken", "cow", "pig", "ready", "seeds", "growing", "grown", "guard", "enemy", "player"];
var map = [];

var player;

////////////////////////////////////////////////////////////////////////////////

/*
function called when the page loads
*/
function main() {

  preloadImages();
  var canvas = document.getElementById("canvas");
  canvas.tabIndex = 0;
  canvas.focus();
  context = canvas.getContext("2d");
  WIDTH_OF_GAME = canvas.width;
  HEIGHT_OF_GAME = canvas.height;

  player = new Player();

  createMap();
  interval = window.setInterval(update, 1000);
}

/*
called at the beggining
stores the map as an double array of images
*/
function createMap() {
  console.log("generate map");
  var defaultI = imagesArray[0];
  var ground = imagesArray[1];
  var path = imagesArray[2];
  var water = imagesArray[3];
  var castle = imagesArray[4];
  var castleEmbrasure = imagesArray[5];
  var castleEntrance1 = imagesArray[6];
  var castleEntrance2 = imagesArray[7];
  var drawBridge = imagesArray[8];
  var tree = imagesArray[9];
  var guard = imagesArray[18];
  /*var nextColumn = [];
  for (var i = 0; i < WIDTH_OF_GAME / 32; i++) {
    for (var j = 0; j < HEIGHT_OF_GAME / 32; j++) {
      nextColumn.push(defaultI);
    }
    map.push(nextColumn);
  }*/
  map = [
    [
      defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, tree, tree, tree, tree, tree, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, water, water, water, water, tree, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, castleEmbrasure, castle, castle, water, guard, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, castleEntrance1, castleEntrance2, drawBridge, path, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, castleEmbrasure, castle, castle, water, guard, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, water, water, water, water, tree, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, tree, tree, tree, tree, tree, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground, ground,
      defaultI
    ],

    [
      defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI, defaultI
    ]
  ]
}

/*
preloads and store all the images used
*/
function preloadImages() {
  var url;
  for (var i = 0; i < imagesArray.length; i++) {
    url = imagesArray[i];
    imagesArray[i] = new Image();
    imagesArray[i].src = "images/" + url + ".png";
  }
}

/*
used to update the components, and draw them
*/
function update() {
  console.log("update");
  context.clearRect(0, 0, canvas.width, canvas.height);
  updateView();
}

function updateView() {
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      context.drawImage(map[i][j], i * 32, j * 32, 32, 32);
    }
  }
  player.draw();
}

////////////////////////////////////////////////////////////////////////////////

/*
parent function of all the entities
stores their variables, and functions to update and draw them
*/
function Entity(x = 0, y = 0, image = "defaultImage") {
  this.x = x;
  this.y = y;
  this.image = image;
  this.draw = function() {
    context.drawImage(image, x, y, 32, 32);
  }
}

/*
inherits from Entity
used to create the player in game
*/
function Player() {
  Entity.call(this, WIDTH_OF_GAME / 2, HEIGHT_OF_GAME / 2, imagesArray[imagesArray.length - 1]);
  console.log("player");
}

/*
parent function of all the animals in game
inherits from Entity
*/
function Animal() {
  this.size = 0;
}



////////////////////////////////////////////////////////////////////////////////

/*
document.onload = main();
*/
