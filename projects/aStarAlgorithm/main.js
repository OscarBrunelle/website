const arrayWidth = 10;
const arrayHeight = 15;
const squareSize = 20;
const numberObstacles = 25;

const startCoordinates = [1, 1];
const endCoordinates = [arrayWidth - 1, arrayHeight - 1];

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let array;
createRandomArray();

canvas.addEventListener("click", function(evt){
	var rect = canvas.getBoundingClientRect();
	let x = evt.clientX - rect.left;
	let y = evt.clientY - rect.top;
	let xIndex = Math.floor(x / squareSize);
	let yIndex = Math.floor(y / squareSize);
	if (array[yIndex][xIndex] == 0) {
		array[yIndex][xIndex] = 1;
	} else {
		array[yIndex][xIndex] = 0;
	}
	printArray();
});

function createRandomArray(){
	array = [];

	for (let i = 0; i < arrayWidth; i++) {
		let arr = []
		for (let j = 0; j < arrayHeight; j++) {
			arr.push(0);
		}
		array.push(arr);
	}

	for (let i = 0; i < numberObstacles; i++) {
		let x = Math.floor(Math.random() * arrayWidth);
		let y = Math.floor(Math.random() * arrayHeight);
		if (
			array[x][y] == 1
			|| (x == startCoordinates[0] && y == startCoordinates[1])
			|| (x == endCoordinates[0] && y == endCoordinates[1])
			) i--;
		else array[x][y] = 1;
	}

	printArray();
}

function printArray(){
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "black";

	for (let i = 0; i < array.length; i++) {
		let arr = array[i];
		for (let index = 0; index < arr.length; index++) {
			let element = arr[index];
			context.beginPath();
			context.rect(squareSize*index, squareSize*i, squareSize, squareSize);
			if (element == 1) {
				context.fill();
			} else {
				context.stroke();
			}
		}
	}
}

function findBestPath(){
	let bestPath = findBestPathCall(startCoordinates, [startCoordinates]);
	context.fillStyle = "green";
	for (let i = 0; i < bestPath.length; i++) {
		let x = bestPath[i][0], y = bestPath[i][1];
		context.beginPath();
		context.rect(squareSize*y, squareSize*x, squareSize, squareSize);
		context.fill();
	}
}

function findBestPathCall(coordinates = [0, 0], currentSolution = [[0, 0]]){
	if (isEnd(coordinates)) return currentSolution;
	if (currentSolution.length > 50/*(arrayWidth * 2 + arrayHeight * 2)*/) return null;
	PB LOOP INFINI??

	let x = coordinates[0], y = coordinates[1];

	if (x < 0 || y < 0 || array[x][y] == 1) return null;

	let toTest = [
		[x + 1, y],
		[x, y + 1],
		[x - 1, y],
		[x, y - 1]
	];
	var possibleSolutions = [];

	for (let i = 0; i < toTest.length; i++) {
		let positions = toTest[i];
		if (!inSolution(positions, currentSolution) && checkPosition(positions)) {
			let possibleSolution = Array.from(currentSolution);
			possibleSolution.push(positions);
			possibleSolution = findBestPathCall(positions, possibleSolution);
			if (possibleSolution != null) {
				possibleSolutions.push(possibleSolution);
			}
		}
	}

	if (possibleSolutions.length > 1) console.log("wow multiple solutions");
	if (possibleSolutions.length <= 0) return null;
	let minLength = possibleSolutions[0].length, minIndex = 0;
	for(let i = 1; i < possibleSolutions.length; i++){
		if (possibleSolutions[i].length < minLength) {
			minLength = possibleSolutions[i].length;
			minIndex = i;
		}
	}

	return possibleSolutions[minIndex];
}

function checkPosition(coordinates){
	let x = coordinates[0];
	let y = coordinates[1];

	return !(x < 0 || y < 0 || x >= arrayWidth || y >= arrayHeight || array[x][y] == 1);
}

function isEnd(coordinates){
	return (coordinates[0] == endCoordinates[0] && coordinates[1] == endCoordinates[1]);
}

function inSolution(positions, solution){
	for (let i = 0; i < solution.length; i++) {
		let solutionPositions = solution[i];
		if (positions[0] == solutionPositions[0] && positions[1] == solutionPositions[1]){
			return true
		}
	}

	return false;
}