class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Case {
  constructor(x, y, value = null, isPrimary = false) {
    this.x = x;
    this.y = y;
    this.width = 45;
    this.height = 45;
    this.number = value;
    this.isPrimary = isPrimary;
    this.guesses = [];
    if (!isPrimary) {
      this.possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    } else {
      this.possibleNumbers = [];
    }
    this.highlight = false;
  }

  draw() {
    if (this.highlight) {
      context.fillStyle = "rgb(210,210,210)";
    } else {
      context.fillStyle = "rgb(230,230,230)";
    }
    context.fillRect(this.x, this.y, this.width, this.height);
    if (this.isPrimary) {
      context.font = "bold 15px Arial";
    } else {
      context.font = "15px Arial";
    }
    context.fillStyle = "rgba(0,0,0,1)";
    if (this.number != null) {
      context.fillText(this.number, this.x + 20, this.y + 30);
    }
    context.font = "italic 10px Arial";
    if (this.showPossibleNumbers) {
      this.possibleNumbers.forEach(guess => {
        context.fillText(guess, this.x + 5 + ((guess - 1) % 3) * 15, this.y + 15 + Math.floor((guess - 1) / 3) * 15);
      });
    } else {
      this.guesses.forEach(guess => {
        context.fillText(guess, this.x + 5 + ((guess - 1) % 3) * 15, this.y + 15 + Math.floor((guess - 1) / 3) * 15);
      });
    }
  }
}

Array.prototype.inArray = function (element) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == element) return i;
  }
  return -1;
};

Array.prototype.pushIfNotExist = function (element) {
  if (this.inArray(element) == -1) {
    this.push(element);
  }
};

Array.prototype.removeElement = function (element) {
  const index = this.inArray(element);
  if (index != -1) {
    this.splice(index, 1);
  }
};