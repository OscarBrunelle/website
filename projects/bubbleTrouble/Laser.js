class Laser {
  constructor(x) {
    this.x = x;
    this.y = bottom;
    this.width = 1;
    this.height = 1;
    this.speed = 4;
  }

  update(){
    this.move();
    this.draw();
  }

  move(){
    this.y -= this.speed;
    this.height += this.speed;
  }

  draw(){
    context.fillStyle = "rgb(0, 0, 0)";
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  reachTop() {
    if (this.y <= levelTop) {
      return true;
    }
    return false;
  }
}