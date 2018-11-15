var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

var drawCircles = true;
var drawLines = true;
var root = null;

function drawTree(node) {
  if (node != null) {
    node.draw();
    var coef = Math.cos(Math.PI / 4);
    if (node.left != null) {
      if (drawLines) {
        context.beginPath();
        context.moveTo(node.x - coef * node.size, node.y + coef * node.size);
        context.lineTo(node.left.x + coef * node.left.size, node.left.y - coef * node.left.size);
        context.stroke();
      }
      drawTree(node.left);
    }
    if (node.right != null) {
      if (drawLines) {
        context.beginPath();
        context.moveTo(node.x + coef * node.size, node.y + coef * node.size);
        context.lineTo(node.right.x - coef * node.right.size, node.right.y - coef * node.right.size);
        context.stroke();
      }
      drawTree(node.right);
    }
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
    this.y = this.parent.y + 40;
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

function switchLines() {
  drawLines = !drawLines;
  update();
}

function reset() {
  root = null;
  drawCircles = true;
  drawLines = true;
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
  equilibrateTree();
  context.font = /*(10-numberDecimal)+*/ "24px Arial";
  context.fillText("This is a demo tree.", canvas.width / 2 - 100, canvas.height / 2 - 80);
  context.fillText("Please press the reset button", canvas.width / 2 - 140, canvas.height / 2 - 50);
}

function resizeWindow() {
  canvas.width = window.innerWidth - 10;
  canvas.height = window.innerHeight - 80;
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
    if (node.left != null) {
      if (node.left.balancement > 0) {
        balanceNode(node, 1); //CASE 1
      } else if (node.left.balancement < 0) {
        balanceNode(node, 2); //CASE 2
      } else {
        balanceNode(node, 2); //CASE 2
      }
    }
  } else if (node.balancement < -1) {
    if (node.right != null) {
      if (node.right.balancement > 0) {
        balanceNode(node, 3); //CASE 3
      } else if (node.right.balancement < 0) {
        balanceNode(node, 4); //CASE 4
      } else {
        balanceNode(node, 4); //CASE 4
      }
    }
  }
  return node.height;
}

function balanceNode(node, caseNumber) {
  console.log("Node " + node.value + " case " + caseNumber);
  switch (caseNumber) {
    case 1:
      if (node == root) {
        node.left.setAsRoot();
        node.left = node.left.right;
        root.right = node;
        node.setParent(root);
        if (node.left != null) {
          node.left.setParent(node);
        }
        node.parent.right = node;
      } else {
        if (node.left.right != null) {
          node.left.right.setParent(node);
        }
        node.left.setParent(node.parent);
        if (node.parent.left == node) {
          node.parent.left = node.left;
        } else {
          node.parent.right = node.left;
        }
        node.setParent(node.left);
        node.left = node.left.right;
        node.parent.right = node;
      }
      break;
    case 2:
      node.left.setParent(node.left.right);
      if (node.left.right.left != null) {
        node.left.right.left.setParent(node.left);
      }
      node.left.right = node.left.right.left;
      node.left.parent.left = node.left;
      node.left = node.left.parent;
      node.left.setParent(node);
      balanceNode(node, 1);
      break;
    case 3:
      node.right.setParent(node.right.left);
      if (node.right.left.right != null) {
        node.right.left.right.setParent(node.right);
      }
      node.right.left = node.right.left.right;
      node.right.parent.right = node.right;
      node.right = node.right.parent;
      node.right.setParent(node);
      balanceNode(node, 4);
      break;
    default:
      if (node == root) {
        node.right.setAsRoot();
        node.right = node.right.left;
        root.left = node;
        node.setParent(root);
        if (node.right != null) {
          node.right.setParent(node);
        }
        node.parent.left = node;
      } else {
        if (node.right.left != null) {
          node.right.left.setParent(node);
        }
        node.right.setParent(node.parent);
        if (node.parent.right == node) {
          node.parent.right = node.right;
        } else {
          node.parent.left = node.right;
        }
        node.setParent(node.right);
        node.right = node.right.left;
        node.parent.left = node;
      }
      break;
  }
}

window.addEventListener("resize", resizeWindow);
document.onload = setDemoTree();