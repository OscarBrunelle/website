/*
change drawCase function to use only case object as argument
when all mines are flagged, win
*/

var flagMode = false;

const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 12;
const DEFAULT_MINES = 36;
const MIN_WIDTH = 10;
const MAX_WIDTH = 40;
const MIN_HEIGHT = 5;
const MAX_HEIGHT = 20;
const MIN_MINES = 1;
const MAX_MINES = 50;

const CASE_WIDTH = 28;
const CASE_HEIGHT = 28;

const DOM_covered = document.getElementById("covered");
const DOM_uncovered = document.getElementById("uncovered");
const DOM_mines = document.getElementById("mines");
const DOM_timer = document.getElementById("timer");
const DOM_flag = document.getElementById("flagModeButton");

const DOM_canvas = document.getElementById("canvas");
var context = DOM_canvas.getContext("2d");

var width, height, mines;
var nbrUncovered, remainingMines;

var field;

function updateTexts() {
	DOM_covered.innerHTML = "Cases covered: " + (width * height - nbrUncovered);
	DOM_uncovered.innerHTML = "Cases uncovered: " + nbrUncovered;
	DOM_mines.innerHTML = "Mines to find: " + remainingMines;
	DOM_flag.innerHTML = "Flag mode: " + (flagMode ? "ON" : "OFF");
}

function getParameter(parameterName, defaultValue, min, max = null) {
	let parameterValue = prompt("Enter the " + parameterName, defaultValue);
	if (parameterValue < min) {
		console.log("Parameter " + parameterName + " too small. Using default value " + defaultValue + " instead.");
		return defaultValue;
	} else if (max != null && parameterValue > max) {
		console.log("Parameter " + parameterName + " too big. Using default value " + defaultValue + " instead.");
		return defaultValue;
	}
	return parameterValue;
}

function changeSettings(){
	width = getParameter("width", DEFAULT_WIDTH, MIN_WIDTH);
	height = getParameter("height", DEFAULT_HEIGHT, MIN_HEIGHT);
	mines = getParameter("mines", DEFAULT_MINES, MIN_MINES, MAX_MINES);

	reset();
}

function loadGame() {
	width = DEFAULT_WIDTH;
	height = DEFAULT_HEIGHT;
	mines = DEFAULT_MINES;

	timer = new Timer(DOM_timer);

	document.body.addEventListener("keypress", function(e){
		switch(e.which){
			case 102:
				toggleFlagMode();
				break;
			case 114:
				reset();
				break;
			default:
		}
	});

	loadIcons();
}

function reset(){
	flagMode = false;

	nbrUncovered = 0;
	remainingMines = mines;

	context.clearRect(0, 0, canvas.width, canvas.height);

	createField();
	drawField();
	updateTexts();

	timer.reset();

	canvas.removeEventListener("mousedown", click);
	canvas.addEventListener("mousedown", click);
}

function createField() {
	field = [];

	for (var i = 0; i < width; i++) {
		let table = [];
		for (var j = 0; j < height; j++) {
			table.push(new Case());
		}
		field.push(table);
	}

	createMines();
}

function drawField(){
	for (var i = 0; i < field.length; i++) {
		for (var j = 0; j < field[i].length; j++) {
			drawCase(i, j, field[i][j].icon);
		}
	}
}

function createMines() {
	let minesToAdd = mines;

	while (minesToAdd > 0) {
		var i = Math.floor(Math.random() * width);
		var j = Math.floor(Math.random() * height);
		if (!field[i][j].isMined) {
			field[i][j].isMined = true;
			minesToAdd--;
		}
	}

	for (var i = 0; i < width; i++) {
		for (var j = 0; j < height; j++) {
			let total = 0;
			for (var k = Math.max(i - 1, 0); k <= Math.min(i + 1, width - 1); k++) {
				for (var l = Math.max(j - 1, 0); l <= Math.min(j + 1, height - 1); l++) {
					if (field[k][l].isMined) {
						total++;
					}
				}
			}
			field[i][j].neighbooringMines = total;
		}
	}
}

function click(event){
	const rect = canvas.getBoundingClientRect();
	const x = event.clientX - rect.left;
	const y = event.clientY - rect.top;
	const xIndex = Math.floor(x / CASE_WIDTH);
	const yIndex = Math.floor(y / CASE_HEIGHT);

	clickCase(xIndex, yIndex);
}

function clickCase(xIndex, yIndex) {
	if (xIndex < 0 || xIndex >= width || yIndex < 0 || yIndex >= height) {
		return;
	}

	let caseObj = field[xIndex][yIndex];
	if (caseObj === undefined || caseObj.isUncovered) return;

	if (flagMode) {
		let flagged = caseObj.toggleFlag();
		if (flagged) {
			remainingMines--;
		} else {
			remainingMines++;
		}
		drawCase(xIndex, yIndex, caseObj.icon);
	} else {
		let mineClicked = caseObj.uncover(true);
		drawCase(xIndex, yIndex, caseObj.icon);
		
		if (mineClicked) {
			endGame();
			return;
		} else {
			nbrUncovered++;
			if (caseObj.neighbooringMines === 0) {
				uncoverNeighboors(xIndex, yIndex);
			}
		}
	}
	updateTexts();

	if (width * height - mines === nbrUncovered) {
		endGame(true);
	}
}

function uncoverNeighboors(x, y){
	let toTest = [
		[x - 1, y - 1],
		[x - 1, y],
		[x - 1, y + 1],
		[x, y - 1],
		[x, y],
		[x, y + 1],
		[x + 1, y - 1],
		[x + 1, y],
		[x + 1, y + 1]
	];

	for (let i = 0; i < toTest.length; i++) {
		clickCase(toTest[i][0], toTest[i][1]);
	}
}

function drawCase(x, y, icon){
	let xPos = x * CASE_WIDTH;
	let yPos = y * CASE_HEIGHT;

	context.clearRect(xPos, yPos, CASE_WIDTH, CASE_HEIGHT);
	context.drawImage(icon, xPos, yPos);
}

function uncoverAll(){
	for (var i = 0; i < field.length; i++) {
		for (var j = 0; j < field[i].length; j++) {
			let caseObj = field[i][j];
			caseObj.uncover();
			drawCase(i, j, caseObj.icon);
		}
	}
}

function endGame(victory){
	timer.stop();

	uncoverAll();
	if (!victory) {
		console.log("Oops! That was a mine :/");
	} else {
		console.log("Victory!");
	}

	canvas.removeEventListener("mousedown", click);
}

function getIconFileName(iconNumber) {
	switch (iconNumber) {
	case 0:
		return "minesweeper_0.png";
	case 1:
		return "minesweeper_1.png";
	case 2:
		return "minesweeper_2.png";
	case 3:
		return "minesweeper_3.png";
	case 4:
		return "minesweeper_4.png";
	case 5:
		return "minesweeper_5.png";
	case 6:
		return "minesweeper_6.png";
	case 7:
		return "minesweeper_7.png";
	case 8:
		return "minesweeper_8.png";
	case 9:
		return "minesweeper_mine.png";
	case 10:
		return "minesweeper_mineSelected.png";
	case 11:
		return "minesweeper_unopened_square.png";
	case 12:
		return "minesweeper_flag.png";
	default:
		console.log("Error - invalid icon number: " + iconNumber);
		return "";
	}
}

function toggleFlagMode(){
	flagMode = !flagMode;
	updateTexts();
}

window.onload = loadGame();