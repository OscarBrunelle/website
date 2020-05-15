/*
change drawCase function to use only case object as argument
when all mines are flagged, win
when clicking a flag, wins the game??
*/

const GAME_DIV_ID = "game";
const GAME_DIV_SEL = "#game";

var screen_width = document.body.clientWidth;

const NORMAL_SIZE = 28;
const SMALL_SIZE = 14;
var CASE_WIDTH = screen_width > 600 ? NORMAL_SIZE : SMALL_SIZE;
var CASE_HEIGHT = screen_width > 600 ? NORMAL_SIZE : SMALL_SIZE;;

const game = new Game("body", GAME_DIV_ID);
const instructions_text = "Don't click the mines.";
const menu_options = [
	new MenuOption("Sound") //TODO: add active / not active icons options
];
let menu_buttons = [
	new PlayButton(GAME_DIV_SEL, reset),
	new InstructionsButton(GAME_DIV_SEL, instructions_text),
	new OptionsButton(GAME_DIV_SEL, menu_options),
	new ExitButton()
];
const game_menu = new GameMenu(GAME_DIV_SEL, "Minesweeper", menu_buttons);
const game_canvas = new GameCanvas(GAME_DIV_SEL, 600, 400);
game_canvas.onclick(click);

const end_popup = new Modal("#gameplay_div", "end_popup", "", reset);

window.onresize = function () {
	const old_screen_width = screen_width;
	screen_width = document.body.clientWidth;
	if (old_screen_width >= 600 && screen_width < 600) {
		CASE_WIDTH = SMALL_SIZE;
		CASE_HEIGHT = SMALL_SIZE;
		game_canvas.resize(width * CASE_WIDTH, height * CASE_HEIGHT);
		drawField();
	} else if (old_screen_width < 600 && screen_width >= 600) {
		CASE_WIDTH = NORMAL_SIZE;
		CASE_HEIGHT = NORMAL_SIZE;
		game_canvas.resize(width * CASE_WIDTH, height * CASE_HEIGHT);
		drawField();
	}
};

var flagMode = false;
var game_won = false;

const DEFAULT_WIDTH = 20;
const DEFAULT_HEIGHT = 12;
const DEFAULT_MINES = 36;
const MIN_WIDTH = 10;
const MAX_WIDTH = 40;
const MIN_HEIGHT = 5;
const MAX_HEIGHT = 20;
const MIN_MINES = 1;
const MAX_MINES = 50;


const DOM_canvas = game_canvas.canvas;
const context = game_canvas.context;

var width, height, mines;
var nbrUncovered, remainingMines;

var field;

function updateTexts() {
	$("#covered").text("Cases covered: " + (width * height - nbrUncovered));
	$("#uncovered").text("Cases uncovered: " + nbrUncovered);
	$("#mines").text("Mines to find: " + remainingMines);
	if (flagMode) {
		$("#flagModeButton").text("FLAG ON").addClass("active");
	} else {
		$("#flagModeButton").text("FLAG OFF").removeClass("active");
	}
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

function changeSettings() {
	width = getParameter("width", DEFAULT_WIDTH, MIN_WIDTH);
	height = getParameter("height", DEFAULT_HEIGHT, MIN_HEIGHT);
	mines = getParameter("mines", DEFAULT_MINES, MIN_MINES, MAX_MINES);

	reset();
}

function stop_game() {}

function loadGame() {
	width = DEFAULT_WIDTH;
	height = DEFAULT_HEIGHT;
	mines = DEFAULT_MINES;

	timer = new Timer("#timer");

	$("#gameplay_div").append('<div class="usefulButtons"><button onclick="reset();">Reset</button><button onclick="changeSettings();">Custom game</button><button id="flagModeButton" onclick="toggleFlagMode();">Flag mode: OFF</button></div><div id="info"><span id="covered"></span><span> || </span><span id="uncovered"></span><span> || </span><span id="mines"></span><span> || </span><span id="timer"></span></div>');
	game_canvas.add_return_button(stop_game);

	$("#canvas").on("contextmenu", function (e) {
		return false;
	});

	document.body.addEventListener("keypress", function (e) {
		switch (e.which) {
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

function reset() {
	flagMode = false;

	nbrUncovered = 0;
	remainingMines = mines;
	game_won = false;

	game_canvas.resize(width * CASE_WIDTH, height * CASE_HEIGHT);

	createField();
	drawField();
	updateTexts();

	timer.reset();
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

function drawField() {
	game_canvas.clear();
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

function click(x, y, button) {
	const xIndex = Math.floor(x / CASE_WIDTH);
	const yIndex = Math.floor(y / CASE_HEIGHT);

	if (button === 0) { //left click
		clickCase(xIndex, yIndex, flagMode);
	} else if (button === 1) { //middle click
		const c = confirm("Are you sure you want to reset?");
		if (c) {
			reset();
		}
	} else if (button === 2) { //right click
		clickCase(xIndex, yIndex, true);
	}
}

function clickCase(xIndex, yIndex, flag) {
	if (game_won) {
		return;
	}
	if (xIndex < 0 || xIndex >= width || yIndex < 0 || yIndex >= height) {
		return;
	}

	let caseObj = field[xIndex][yIndex];
	if (caseObj === undefined || caseObj.isUncovered) return;

	if (flag) {
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
			return true;
		} else {
			nbrUncovered++;
			if (width * height - mines === nbrUncovered) {
				endGame(true);
				return true;
			} else if (caseObj.neighbooringMines === 0) {
				uncoverNeighboors(xIndex, yIndex);
			}
		}
	}
	updateTexts();
}

function uncoverNeighboors(x, y) {
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
		if (clickCase(toTest[i][0], toTest[i][1])) {
			break;
		}
	}
}

function drawCase(x, y, icon) {
	const xPos = x * CASE_WIDTH;
	const yPos = y * CASE_HEIGHT;

	context.drawImage(icon, xPos, yPos, CASE_WIDTH, CASE_HEIGHT);
}

function uncoverAll() {
	canvas.removeEventListener("mousedown", click);

	for (var i = 0; i < field.length; i++) {
		for (var j = 0; j < field[i].length; j++) {
			let caseObj = field[i][j];
			caseObj.uncover();
			drawCase(i, j, caseObj.icon);
		}
	}
}

function endGame(victory) {
	timer.stop();
	game_won = true;

	uncoverAll();
	updateTexts();
	const vict_text = "Victory!<br />Time: " + timer.getTime();
	const lost_text = "Oops! That was a mine :/<br />Time: " + timer.getTime();

	end_popup.text = victory ? vict_text : lost_text;
	end_popup.show();
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

function toggleFlagMode() {
	flagMode = !flagMode;
	updateTexts();
}

window.onload = loadGame();