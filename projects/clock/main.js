let currentFrameId;
let p1Time = 600000,
	p2Time = 600000;
let p1Turn = true;
let clockRunning = false;

document.addEventListener("keypress", function (e) {
	if (e.code == "Space") {
		switchPlayer();
	} else if (e.code = "Enter") {
		startClock();
	}
});

function switchPlayer() {
	p1Turn = !p1Turn;
}

let previousUpdateTime;

function updateTime(frameId) {
	currentFrameId = frameId;
	const currentUpdateTime = new Date();
	const deltaTime = currentUpdateTime - previousUpdateTime;
	previousUpdateTime = currentUpdateTime;

	if (p1Turn) {
		p1Time -= deltaTime;
		if (p1Time <= 0) {
			alert("Player 1 lost on time.");
			startClock();
		}
	} else {
		p2Time -= deltaTime;
		if (p2Time <= 0) {
			alert("Player 2 lost on time.");
			startClock();
		}
	}
	updateDisplay();
	requestAnimationFrame(updateTime);
}

function startClock() {
	previousUpdateTime = new Date();
	if (clockRunning) {
		cancelAnimationFrame(currentFrameId);
	} else {
		requestAnimationFrame(updateTime);
	}
	clockRunning = !clockRunning;
	updateDisplay();
}

function format(number) {
	let zeroNumber = "0" + number;
	return zeroNumber.slice(-2);
}

function updateDisplay() {
	let p1Minutes = format(Math.floor(p1Time / 60000));
	let p1Seconds = format(Math.floor((p1Time % 60000 / 1000) % 60));
	p1Seconds = p1Seconds.slice(-2);
	document.getElementById("p1TimeSpan").innerHTML = p1Minutes + ":" + p1Seconds;

	let p2Minutes = format(Math.floor(p2Time / 60000));
	let p2Seconds = format(Math.floor((p2Time % 60000 / 1000) % 60));
	document.getElementById("p2TimeSpan").innerHTML = p2Minutes + ":" + p2Seconds;

	if (p1Turn) {
		document.getElementById("p1TimeSpan").parentElement.className = "active";
		document.getElementById("p2TimeSpan").parentElement.className = "";
	} else {
		document.getElementById("p1TimeSpan").parentElement.className = "";
		document.getElementById("p2TimeSpan").parentElement.className = "active";
	}
}

document.onload = updateDisplay();