"use strict"

const svg = document.getElementById("svg");

let pause = false;

function toggle_update(toggle_on = true) {
	if (toggle_on) {
		pause = false;
		update();
	} else {
		pause = true;
	}
}

function update() {
	if (pause) return;
	requestAnimationFrame(update);
}

function load() {
	toggle_update(true);
}

document.onload = load();