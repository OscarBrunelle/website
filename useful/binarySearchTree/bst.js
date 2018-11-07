var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var tree = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var drawCircles = true;

function drawTree() {
  var change = 1;
  var xAugmentation = canvas.width;
  var x = -(xAugmentation / 2);
  var yAugmentation = 30;
  var y = yAugmentation;
  var size = 1;
  var value, node;
  for (var index = 0; index < tree.length; index++) {
    if (index == change) {
      change += index + 1;
      xAugmentation = xAugmentation / 2;
      size *= 0.9;
      x = -xAugmentation / 2;
      y += yAugmentation;
    }
    value = tree[index];
    x += xAugmentation;
    node = new Node(value, x, y, size, context);
    node.draw();
  }
}
/*
function Node(value, x, y, size) {
  this.draw = function () {
    context.arc(x, y, 10 * size, 0, 0, 0);
    context.fillText(value, x, y);
  };
}
*/
class Node {
  constructor(value, x, y, size, context) {
    this.value = value;
    this.x = x;
    this.y = y;
    this.size = size;
    this.ctx = context;
  }
  draw() {
    var numberDecimal = 1;
    var tempValue = this.value;
    while (tempValue >= 10) {
      numberDecimal++;
      tempValue /= 10;
    }
    this.ctx.beginPath();
    if (drawCircles) {
      this.ctx.arc(this.x, this.y, 20 * this.size, Math.PI * 2, 0, 0);
      this.ctx.stroke();
    }
    this.ctx.font = /*(10-numberDecimal)+*/ "10px Arial"
    this.ctx.fillText(this.value, this.x-4*numberDecimal, this.y+2);
  };
}

function switchCircles() {
  drawCircles = !drawCircles;
  context.clearRect(0,0,canvas.width, canvas.height);
  drawTree();
}

document.onload = drawTree();