function maxHeap() {
  tree.sort(sorter);
  tree.reverse();
  update();
}

function minHeap() {
  tree.sort(sorter);
  update();
}

function sorter(a, b) {
  if (a < b) return -1; // any negative number works
  if (a > b) return 1; // any positive number works
  return 0; // equal values MUST yield zero
}

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