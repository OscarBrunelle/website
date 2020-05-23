const iLength = 10, jLength = 15;
const numberObstacles = 20;

const startCoordinates = [1, 1];
const endCoordinates = [iLength - 2, jLength - 2];

var squares;

function inBoundaries(x, y){
	return (x >= 0 && y >= 0 && x < iLength && y < jLength);
}

function createRandomArray(){
	clearInterval(inter);
	squares = [];

	for (let i = 0; i < iLength; i++) {
		let tempArray = []
		for (let j = 0; j < jLength; j++) {
			let sq = new Square(i, j);
			if (i === startCoordinates[0] && j === startCoordinates[1]) sq.state = STATES.START;
			else if (i === endCoordinates[0] && j === endCoordinates[1]) sq.state = STATES.END;
			sq.draw();

			tempArray.push(sq);
		}
		squares.push(tempArray);
	}

	for (let i = numberObstacles; i > 0;) {
		let x = Math.floor(Math.random() * 10);
		let y = Math.floor(Math.random() * 15);
		let sq = squares[x][y];
		if (sq.setAsObstacle()) i--;
	}
}