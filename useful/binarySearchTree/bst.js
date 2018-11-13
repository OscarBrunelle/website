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
    this.parent = null;
    this.depth = 0;
    this.x = canvas.width / 2;
    this.y = 30;
    this.size = 20;
    if (root == null || root != this) {
      root = this;
    }
  }
  setParent(parent) {
    this.parent = parent;
    this.depth = this.parent.depth + 1;
    if (this.parent.left == this) {
      this.x = this.parent.x - canvas.width / Math.pow(2, this.depth + 1);
    } else if (this.parent.right == this) {
      this.x = this.parent.x + canvas.width / Math.pow(2, this.depth + 1);
    } else {
      console.log("Problem finding the node " + this.value);
    }
    this.y = this.parent.y + 30;
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
  calculatePositon() {
    if (this.parent == null) {
      this.setAsRoot();
    } else {
      this.setParent(this.parent);
    }
  }
  draw() {
    this.ctx.beginPath();
    if (drawCircles) {
      this.ctx.arc(this.x, this.y, this.size, Math.PI * 2, 0, 0);
      this.ctx.stroke();
    }
    this.ctx.font = /*(10-numberDecimal)+*/ "10px Arial"
    this.ctx.fillText(this.value, this.x - 3 * this.valueLength, this.y + 2);
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

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawTree(root);
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
  resizeWindow();
  reset();
  addValue(7);
  addValue(2);
  addValue(18);
  addValue(15);
  addValue(10);
  addValue(5);
  addValue(16);
  update();
  context.font = /*(10-numberDecimal)+*/ "24px Arial";
  context.fillText("This is a demo tree.", canvas.width / 2 - 100, canvas.height / 2 - 80);
  context.fillText("Please press the reset button", canvas.width / 2 - 140, canvas.height / 2 - 50);
  equilibrateTree();
}

function resizeWindow() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 60;
  calculatePositon(root);
  update();
}

function calculatePositon(node) {
  if (node != null) {
    node.calculatePositon();
    calculatePositon(node.left);
    calculatePositon(node.right);
  }
}

function equilibrateTree() {
  findHeightOfNode(root);
  calculatePositon(root);
  update();
}

function findHeightOfNode(node) {
  if (node == null) {
    return 0;
  }
  var leftHeight = 0,
    rightHeight = 0;
  if (node.left != null) {
    leftHeight = findHeightOfNode(node.left);
  }
  if (node.right != null) {
    rightHeight = findHeightOfNode(node.right);
  }
  node.height = Math.max(leftHeight, rightHeight) + 1;
  node.balancement = leftHeight - rightHeight;
  if (node.balancement > 1) {
    if (node.left != null && node.left.balancement > 0) {
      console.log("Value : " + node.value + ", left height: " + leftHeight + ", right height: " + rightHeight);
      balanceNode(node, 1); //CASE 1
    } else {
      balanceNode(node, 2); //CASE 2
    }
  } else if (node.balancement < 1) {
    if (node.right != null && node.right.balancement > 0) {
      balanceNode(node, 3); //CASE 3
    } else {
      balanceNode(node, 4); //CASE 4
    }
  }
  return node.height;
}

function balanceNode(node, caseNumber) {
  switch (caseNumber) {
    case 1:
      if (node == root) {
        node.left.setAsRoot();
        node.left = node.left.right;
        root.right = node;
        node.setParent(root);
      } else {
        if (node.parent.left == node) {
          node.parent.left = node.left;
          node.left.setParent(node.parent);
          node.setParent(node.parent.left);
        } else {
          node.parent.right = node.left;
          node.left.setParent(node.parent);
          node.setParent(node.parent.right);
        }
        node.left = node.left.right;
      }
      node.left.setParent(node);
      node.parent.right = node;
      break;
    case 2:
      if (node == root) {
        node.left = node.left.right;
        node.left.parent.right = node.left.left;
        node.left.right.left = node.left;
        node.left.setParent(node);
        node.left.left.setParent(node.left);
      } else {
        if (node.parent.left == node) {
          node.parent.left = node.left;
          node.left.setParent(node.parent);
          node.setParent(node.parent.left);
        } else {
          node.parent.right = node.left;
          node.left.setParent(node.parent);
          node.setParent(node.parent.right);
        }
        node.left = node.left.right;
      }
      balanceNode(node, 1);
      break;
    case 3:
      if (node == root) {
        node.left.setAsRoot();
        node.left = node.left.right;
        root.right = node;
        node.setParent(root);
      } else {
        if (node.parent.left == node) {
          node.parent.left = node.left;
          node.left.setParent(node.parent);
          node.setParent(node.parent.left);
        } else {
          node.parent.right = node.left;
          node.left.setParent(node.parent);
          node.setParent(node.parent.right);
        }
        node.left = node.left.right;
      }
      balanceNode(node, 4);
      break;
    default:
      if (node == root) {
        node.left.setAsRoot();
        node.left = node.left.right;
        root.right = node;
        node.setParent(root);
      } else {
        if (node.parent.left == node) {
          node.parent.left = node.left;
          node.left.setParent(node.parent);
          node.setParent(node.parent.left);
        } else {
          node.parent.right = node.left;
          node.left.setParent(node.parent);
          node.setParent(node.parent.right);
        }
        node.left = node.left.right;
      }
      break;
  }
}

window.addEventListener("resize", resizeWindow);
document.onload = setDemoTree();