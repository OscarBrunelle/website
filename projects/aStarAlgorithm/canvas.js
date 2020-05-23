var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
context.strokeStyle = "black";

const COLORS = {
	0 : "white",
	1 : "black",
	2 : "yellow",
	3 : "green",
	4 : "red"
};
const squareSize = 20;

function clearCanvas(){
	context.clearRect(0, 0, canvas.width, canvas.height);
}

canvas.addEventListener("click", function(evt){
	toggleObstacle(evt);
});

function toggleObstacle(evt){
	var rect = canvas.getBoundingClientRect();
	let x = evt.clientX - rect.left;
	let y = evt.clientY - rect.top;
	let xIndex = Math.floor(x / squareSize);
	let yIndex = Math.floor(y / squareSize);
	if (inBoundaries(xIndex, yIndex)) squares[xIndex][yIndex].invert();
}

function printArray(){
	clearCanvas();

	for (let i = 0; i < squares.length; i++) {
		let arr = squares[i];
		for (let index = 0; index < arr.length; index++) {
			let element = arr[index];
			element.draw();
		}
	}
}