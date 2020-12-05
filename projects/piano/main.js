"use strict"

let numberKeys = 20;
let noteDuration = 0.5;
let noteNumber = 4;
let mouseClicked = false;

let records = [];
let recording;
let recordedNotes;
let startingTime;

function createPiano() {
	let keysDiv = document.getElementById("keysDiv");
	keysDiv.addEventListener("mousedown", function (e) {
		mouseClicked = true;
	});
	keysDiv.addEventListener("mouseup", function (e) {
		mouseClicked = false;
	});

	for (let i = 0; i < numberKeys; i++) {
		let key = document.createElement("button");
		key.className = "key";
		key.addEventListener("click", function (e) {
			clickKey(i);
		});
		key.addEventListener("mouseover", function (e) {
			if (mouseClicked) {
				clickKey(i);
			}
		});
		keysDiv.appendChild(key);
	}
}

function clickKey(i) {
	let note = NOTES[i % NOTES.length] + (4 + Math.floor(i / NOTES.length));
	let noteFreq = get_note_frequency(note);
	play_frequency(noteFreq, noteDuration);

	if (recording === true) {
		recordedNotes.push({
			timestamp: (new Date() - startingTime),
			noteFreq: noteFreq
		});
	}
}

function startRecording() {
	if (startingTime == null) {
		recording = true;
		recordedNotes = [];
		startingTime = new Date();
	} else {
		startingTime = new Date();
	}
}

function pauseRecording() {
	recording = false;
	pausedTime = new Date();
}

function stopRecording() {
	recording = false;
	startingTime = null;
	console.log(recordedNotes);
	let playButton = document.createElement("button");
	let recordNumber = records.length;
	playButton.innerHTML = "Play record " + (recordNumber + 1);
	playButton.addEventListener("click", function () {
		playRecording(recordNumber);
	});
	document.getElementById("main").appendChild(playButton);
	records.push(recordedNotes);
}

function playRecording(recordIndex) {
	playRecordedNote(records[recordIndex]);
}

function playRecordedNote(selectedRecord, i = 0) {
	if (i + 1 < selectedRecord.length) {
		let delayNextNote = selectedRecord[i + 1].timestamp - selectedRecord[i].timestamp;
		setTimeout(() => {
			playRecordedNote(selectedRecord, i + 1);
		}, delayNextNote);
	}
	play_frequency(selectedRecord[i].noteFreq, noteDuration);
}

function loadPiano() {
	createPiano();
}

document.onload = loadPiano();