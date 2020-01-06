var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");

var player, pads = [],
	springs = [];
var interval;
var updateTime = 10;
var yDiff = 0,
	score = 0;
var padImage, springImage;
var isPlaying = false, isWaitingForInput = false;
var lastPadY;

function startGame() {
	reset();
}

function load() {
	padImage = document.getElementById("pad");
	springImage = document.getElementById("spring");
	player = new Player();
	document.body.addEventListener('keydown', function (event) {
		var eventKey = event.which;
		/*if (eventKey == 27) {
			showEscapeMenu();
		}*/
		switch (eventKey) {
			case 37: //left
				player.leftDirection = true;
				player.xDirection = -1;
				break;
			case 39: //right
				player.rightDirection = true;
				player.xDirection = 1;
				break;
			case 32: //space
				if (isWaitingForInput) {
					reset();
				}
				break;
			case 82: //r
				if (isPlaying) {
					reset();
				}
				break;
		}
	});
	document.body.addEventListener('keyup', function (event) {
		var eventKey = event.which;
		/*if (eventKey == 27) {
			showEscapeMenu();
		}*/
		switch (eventKey) {
			case 37: //left
				player.leftDirection = false;
				if (player.rightDirection == true) {
					player.xDirection = -1;
				} else {
					player.xDirection = 0;
				}
				break;
			case 39: //right
				player.rightDirection = false;
				if (player.leftDirection == true) {
					player.xDirection = 1;
				} else {
					player.xDirection = 0;
				}
				break;
		}
	});
	isWaitingForInput = true;
}

function generatePads() {
	for (let i = 0; i < 20; i++) {
		addPad();
	}
}

function update() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	lastPadY -= yDiff;
	for (let i = 0; i < springs.length; i++) {
		let spring = springs[i];
		spring.update();
		if (spring.y > canvas.height) {
			springs.splice(i, 1);
			i--;
		}
	}
	for (let i = 0; i < pads.length; i++) {
		let pad = pads[i];
		pad.update();
		if (pad.y > canvas.height) {
			pads.splice(i, 1);
			i--;
			let pad = addPad();
			if (Math.floor(Math.random() * 15) == 0) {
				springs.push(new Spring(pad.x + (pad.width - springImage.width) / 2, pad.y - springImage.height / 2));
			}
		}
	}
	player.update();
	updateScore();
}

function addPad() {
	let padX = Math.random() * (canvas.width - padImage.width);
	lastPadY -= 30 + Math.random() * (Math.min(40 * score / 10000, 40));
	let pad = new Pad(padX, lastPadY);
	pads.push(pad);
	return pad;
}

function updateScore() {
	score -= yDiff;
	let scoreElement = document.getElementById("currentScore");
	scoreElement.innerHTML = Math.floor(score);
}

function reset() {
	player.reset();
	yDiff = 0;
	score = 0;
	pads = [];
	springs = [];
	let startingPadHeight = player.y + player.height + 10;
	pads.push(new Pad(player.x, startingPadHeight));
	lastPadY = startingPadHeight;
	generatePads();
	clearInterval(interval);
	interval = setInterval(update, updateTime);
	isWaitingForInput = false;
	isPlaying = true;
}

function endGame() {
	clearInterval(interval);
	isWaitingForInput = true;
	isPlaying = false;

	showDiv("restartScreen");
	let scoreElement = document.getElementById("finalScore");
	scoreElement.innerHTML = Math.floor(score);
}

document.onload = load();