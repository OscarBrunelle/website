var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var tree = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
var drawCircles = true;
var root = null;

function drawTree(node) {
  /*var change = 1;
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
  }*/
  if (node != null) {
    node.draw();
    drawTree(node.left);
    drawTree(node.right);
  }
}

class Node {
  constructor(inputValue, context) {
    this.value = inputValue;
    this.ctx = context;
    this.left = null;
    this.right = null;
    this.valueLength = this.findNumberDecimals();
  }
  setAsRoot() {
    this.depth = 0;
    this.x = canvas.width / 2;
    this.y = 30;
    this.size = 20;
    root = this;
  }
  setParent(parent) {
    this.parent = parent;
    this.depth = this.parent.depth + 1;
    if (this.parent.left == this) {
      this.x = this.parent.x - canvas.width / Math.pow(2, this.depth + 1);
    } else if (this.parent.right == this){
      this.x = this.parent.x + canvas.width / Math.pow(2, this.depth + 1);
    } else {
      console.log("Problem finding the node");
    }
    this.y = this.parent.y + 20;
    this.size = 20 * (Math.pow(0.9, this.depth));
  }
  findNumberDecimals() {
    var numberDecimal = 1;
    var tempValue = this.value;
    while (tempValue >= 10) {
      numberDecimal++;
      tempValue /= 10;
    }
    return numberDecimal;
  }
  draw() {
    this.ctx.beginPath();
    if (drawCircles) {
      this.ctx.arc(this.x, this.y, this.size, Math.PI * 2, 0, 0);
      this.ctx.stroke();
    }
    this.ctx.font = /*(10-numberDecimal)+*/ "10px Arial"
    this.ctx.fillText(this.value, this.x - 4 * this.valueLength, this.y + 2);
  }
}

function switchCircles() {
  drawCircles = !drawCircles;
  update();
}

function reset() {
  root = null;
  update();
}

function askValue() {
  var value = prompt("Enter the value");
  while (value != null && value != "") {
    value = parseInt(value);
    addValue(value);
    value = prompt("Enter the value");
  }
  update();
}

function add(node, tested) {
  if (tested.value >= node.value) {
    if (tested.left != null) {
      return add(node, tested.left);
    } else {
      tested.left = node;
      node.setParent(tested);
      return node;
    }
  } else {
    if (tested.right != null) {
      return add(node, tested.right);
    } else {
      tested.right = node;
      node.setParent(tested);
      return node;
    }
  }
}

function maxHeap() {
  tree.sort(sorter);
  tree.reverse();
  update();
}

function minHeap() {
  tree.sort(sorter);
  update();
}

function bst(array) {

}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawTree(root);
}

function sorter(a, b) {
  if (a < b) return -1; // any negative number works
  if (a > b) return 1; // any positive number works
  return 0; // equal values MUST yield zero
}

function addValue(value) {
  var node = new Node(value, context);
  if (root == null) {
    node.setAsRoot();
  } else {
    add(node, root);
  }
}

function setDemoTree() {
  reset();
  addValue(7);
  addValue(2);
  addValue(11);
  addValue(10);
  addValue(9);
  addValue(5);
  update();
}

document.onload = setDemoTree();

function createBST() {
  var value;
  var bst = [];
  var index;
  value = prompt("Enter the value");
  while (value != null && value != "") {
    value = parseInt(value);
    /*
        if(bst.length == 0){
          bst.push(value);
        } else {
          index = 0;
          while(index <= bst.length && bst[index] != null){
            if(bst[index]>=value){
              index = index *2+1;
            } else {
              index = index*2+2;
            }
          }
          bst.splice(index, 0, value);
        }*/
    bst.push(value);
    value = prompt("Enter the value");
  }
  bst.sort(sorter);
  /*
    var change = 1;
    var xAugmentation = canvas.width;
    var x = -(xAugmentation / 2);
    var yAugmentation = 30;
    var y = yAugmentation;
    var size = 1;
    var value, node;
    for (var index = 0; index < bst.length; index++) {
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
  */
  tree = bst;
  bst(bst);
  update();
}