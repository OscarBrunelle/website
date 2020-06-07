var canvas, context;
var grid = [];
var selectedCase = null;
var selectedNumber = null;
var primaryMode = false,
	guessMode = false,
	eraseMode = false,
	searchMode = false,
	showPossibleNumbers = false;
var WIDTH;

$(document).ready(function () {
	const small = window.matchMedia("(max-width: 600px)").matches;
	const canvas_jq = $("<canvas id='canvas' width='" + (small ? 450 : 450) + "px' height='" + (small ? 450 : 450) + "px'></canvas>").prependTo("#main");
	canvas = canvas_jq[0];
	WIDTH = canvas.width / 10;
	context = canvas.getContext("2d");
	create_buttons();

	loadGame();
});

function switchMode(n) {
	switch (n) {
		case 0:
			primaryMode = !primaryMode;
			guessMode = false;
			eraseMode = false;
			if (primaryMode) {
				canvas.style.cursor = "url('cursors/primary-" + selectedNumber + ".png'), auto";
				$("#mode-0").addClass("selected");
			} else {
				canvas.style.cursor = "url('cursors/number-" + selectedNumber + ".png'), auto";
				$("#mode-0").removeClass("selected");
			}
			$("#mode-1").removeClass("selected");
			$("#mode-2").removeClass("selected");
			break;
		case 1:
			primaryMode = false;
			eraseMode = false;
			guessMode = !guessMode;
			if (guessMode) {
				canvas.style.cursor = "url('cursors/guess-" + selectedNumber + ".png'), auto";
				$("#mode-1").addClass("selected");
			} else {
				canvas.style.cursor = "url('cursors/number-" + selectedNumber + ".png'), auto";
				$("#mode-1").removeClass("selected");
			}
			$("#mode-0").removeClass("selected");
			$("#mode-2").removeClass("selected");
			break;
		case 2:
			primaryMode = false;
			guessMode = false;
			eraseMode = !eraseMode;
			if (eraseMode) {
				canvas.style.cursor = "url('cursors/erase.png'), auto";
				$("#mode-2").addClass("selected");
			} else {
				canvas.style.cursor = "url('cursors/number-" + selectedNumber + ".png'), auto";
				$("#mode-2").removeClass("selected");
			}
			$("#mode-0").removeClass("selected");
			$("#mode-1").removeClass("selected");
			break;
		case 3:
			searchMode = !searchMode;
			break;
		case 4:
			showPossibleNumbers = !showPossibleNumbers;
			update();
			break;
		default:
			console.log("Error while chosing the mode");
			break;
	}
}

function create_number_buttons() {
	for (let num = 1; num <= 9; num++) {
		const button = $("<button id='number-" + num + "' class='number-button menu-button' onclick='selectNumber(" + num + ");'>" + num + "</button>").appendTo("#number_buttons");
		if (num === 1) {
			button.click();
		}
	}
}

function create_modes_buttons() {
	const modes = ["Primary", "Guess", "Erase", "Search", "Show Possible Numbers"];
	for (let i = 0; i < modes.length; i++) {
		const mode = modes[i];
		const button = $("<button id='mode-" + i + "' class='mode-button menu-button' onclick='switchMode(" + i + ");'>" + mode + "</button>").appendTo("#mode_buttons");
		if (mode === "Search") {
			button.prop("disabled", true);
		}
	}
}

function create_buttons() {
	create_number_buttons();
	create_modes_buttons();
}

function loadGame() {
	generateSudoku(debutant);
	drawGrid();
	update();
	canvas.addEventListener("click", clickEvent);
	document.body.addEventListener("keydown", function (event) {
		var key = event.which;
		if (key >= 49 && key <= 57) {
			selectedNumber = key - 48;
		}
	});
}

function generateSudoku(level) {
	grid = [];
	for (let i = 0; i < 9; i++) {
		var column = [];
		for (let j = 0; j < 9; j++) {
			const value = level[i][j];
			column.push(new Case(i * 50, j * 50, value, value != null));
		}
		grid.push(column);
	}
	update();
}

function exportGrid() {
	let exp = [];
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			exp.push(grid[i][j].number);
		}
	}
	console.log(exp);
}

function emptyGrid() {
	const confirmation = confirm("Are you sure that you want to empty the grid?");
	if (confirmation) {
		let emptyLine = [],
			emptyGrid = [];
		for (let i = 0; i < 9; i++) {
			emptyLine.push(null);
		}
		for (let i = 0; i < 9; i++) {
			emptyGrid.push(emptyLine);
		}
		generateSudoku(emptyGrid);
		update();
	}
}

function resetGrid() {
	const confirmation = confirm("Are you sure that you want to reset the grid?");
	if (confirmation) {
		loadGame();
		/*
		showPossibleNumbers = false;
		grid = [];
		for (let i = 0; i < 9; i++) {
			var column = [];
			for (let j = 0; j < 9; j++) {
				const value = null;
				column.push(new Case(i * 50, j * 50, value, value != null));
			}
			grid.push(column);
		}
		update();
		*/
	}
}

function clickEvent(event) {
	selectCase(event);
	update();
}

function selectCase(event) {
	var point = getMousePosition(event);
	var x = (point.x - (point.x % 50)) / 50;
	var y = (point.y - (point.y % 50)) / 50;
	selectedCase = grid[x][y];
	if (searchMode) {
		console.log(selectedCase.possibleNumbers);
	} else {
		if (!selectedCase.isPrimary) {
			if (eraseMode) {
				selectedCase.number = null;
				selectedCase.guesses = [];
			} else if (primaryMode) {
				selectedCase.isPrimary = true;
				selectedCase.number = selectedNumber;
			} else if (guessMode) {
				selectedCase.guesses.pushIfNotExist(selectedNumber);
			} else {
				selectedCase.number = selectedNumber;
			}
		}
	}
}

function getMousePosition(event) {
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
	return new Point(x, y);
}

function drawGrid() {
	for (let index = 0; index < 10; index++) {
		if (index % 3 == 0) {
			context.strokeStyle = "#000";
		} else {
			context.strokeStyle = "#AAA";
		}
		context.beginPath();
		context.moveTo(index * 50, 0);
		context.lineTo(index * 50, canvas.height);
		context.moveTo(0, index * 50);
		context.lineTo(canvas.width, index * 50);
		context.stroke();
	}
}

function update() {
	var isFinished = true;
	context.clearRect(0, 0, canvas.width, canvas.height);
	for (let i = 0; i < 9; i++) {
		for (let j = 0; j < 9; j++) {
			var currentCase = grid[i][j];
			currentCase.showPossibleNumbers = showPossibleNumbers;
			currentCase.draw();
			if (currentCase.number == null) {
				isFinished = false;
			}
		}
		drawGrid();
	}
	if (isFinished) {
		alert("You finished the sudoku!");
	}
}

function selectNumber(num) {
	eraseMode = false;
	selectedNumber = num;
	$(".number-button").removeClass("selected");
	$("#number-" + num).addClass("selected");

	if (primaryMode) {
		canvas.style.cursor = "url('cursors/primary-" + selectedNumber + ".png'), auto";
	} else if (guessMode) {
		canvas.style.cursor = "url('cursors/guess-" + selectedNumber + ".png'), auto";
	} else {
		canvas.style.cursor = "url('cursors/number-" + selectedNumber + ".png'), auto";
	}
}