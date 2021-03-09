let numberFrames = 61696;
let targetFrame;

let numberTries = 0, currentGuess, min, max;

function guess(launchedYet) {
	numberTries++;

	let diff;
	if (!launchedYet) {
		min = currentGuess;
		diff = Math.ceil((max - currentGuess) / 2);
	} else {
		max = currentGuess;
		diff = Math.ceil((min - currentGuess) / 2);
	}
	currentGuess += diff;
	if (max - min == 1) {
		return true;
	}

	console.log("Has it launched on frame " + currentGuess + " ?");
	return false;
}

function confirmGuess() {
	console.log("Found frame " + min + " in " + numberTries + " tries.");
}

function load() {
	targetFrame = Math.floor(Math.random() * numberFrames);
	console.log("Target frame: " + targetFrame);
	let guessed = false;
	currentGuess = 0;
	min = 0, max = numberFrames - 1;
	while (!(guessed = guess(currentGuess > targetFrame))) {
		if (numberTries >= 16) {
			break;
		}
	}
	confirmGuess();
}

document.onload = load();