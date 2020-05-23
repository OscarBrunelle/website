var STATES = {
	"NEUTRAL" : 0,
	"OBSTACLE" : 1,
	"PATH" : 2,
	"START" : 3,
	"END" : 4
};

class Square {
	constructor(_xIndex, _yIndex){
		this.xIndex = _xIndex;
		this.yIndex = _yIndex;
		this.state = STATES.NEUTRAL;
	}

	invert(){
		if (this.state === STATES.NEUTRAL) {
			this.state = STATES.OBSTACLE;
		} else if (this.state === STATES.OBSTACLE) {
			this.state = STATES.NEUTRAL;
		} else {
			return;
		}
		this.draw();
	}

	draw(){
		context.fillStyle = COLORS[this.state];
		context.beginPath();
		context.rect(squareSize * this.xIndex + 1, squareSize * this.yIndex + 1, squareSize - 1, squareSize - 1);
		context.fill();
		if (this.state === STATES.NEUTRAL) {
			context.rect(squareSize * this.xIndex, squareSize * this.yIndex, squareSize, squareSize);
			context.stroke();
		}
	}

	setAsObstacle(){
		if (this.state === STATES.NEUTRAL) {
			this.state = STATES.OBSTACLE;
			this.draw();
			return true;
		}
		return false;
	}
}