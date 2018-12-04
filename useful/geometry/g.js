var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
const nbrPoints = 3,
  percent = 0.5;
var points = [];
var actualPoint;

function load() {
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 50;
  actualPoint = new Point(0, 0);
  reset();
  setInterval(draw, 1);
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  setX(x) {
    this.x = x;
  }
  setY(y) {
    this.y = y;
  }
  getX() {
    return this.x;
  }
  getY() {
    return this.y;
  }
}

function reset() {
  let point;/*
  for (let i = 0; i < nbrPoints; i++) {
    point = new Point(10, 20);
    points.push(point);
  }*/
  points.push(new Point(0, 500));
  points.push(new Point(500, 0));
  points.push(new Point(1000, 500));
}

function draw() {
  let pointIndex = Math.floor(Math.random() * points.length);
  actualPoint.setX(Math.floor(actualPoint.getX() + (points[pointIndex].getX() - actualPoint.getX()) * percent));
  actualPoint.setY(Math.floor(actualPoint.getY() + (points[pointIndex].getY() - actualPoint.getY()) * percent));
  drawPixel(actualPoint.getX(), actualPoint.getY(), 255 * ((pointIndex + 1) % 1), 255 * ((pointIndex + 1) % 2), 255 * ((pointIndex + 1) % 3), 1);
  /*context.fillStyle = "rgb(" + 255 * ((pointIndex + 1) % 1) + ", " + 255 * ((pointIndex + 1) % 2) + ", " + 255 * ((pointIndex + 1) % 3) + ")";*/
  context.fillRect(actualPoint.getX(), actualPoint.getY(), 1, 1);
  updateCanvas();
}

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var canvasData = context.getImageData(0, 0, canvasWidth, canvasHeight);

// That's how you define the value of a pixel //
function drawPixel(x, y, r, g, b, a) {
  var index = (x + y * canvasWidth) * 4;

  canvasData.data[index + 0] = r;
  canvasData.data[index + 1] = g;
  canvasData.data[index + 2] = b;
  canvasData.data[index + 3] = a;
}

// That's how you update the canvas, so that your //
// modification are taken in consideration
function updateCanvas() {
  context.putImageData(canvasData, 0, 0);
}

document.onload = load();