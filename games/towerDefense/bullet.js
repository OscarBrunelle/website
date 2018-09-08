function bullet() {
  this.draw = function() {
    var x = 0;
    var y = 0;
    context.beginPath();
    /*context.fillStyle=this.fill;
    context.strokeStyle=this.stroke;
    context.lineWidth=this.strokewidth;*/
    context.fillStyle = "black";
    context.strokeStyle = "yellow";
    context.lineWidth = 1;
    context.rect(x, y, 32, 32);
    context.stroke();
    context.fill();
  };
}
