"use strict"

let bubbles = [];
let animation_frame;

const frame_rate_span = document.getElementById("frame_rate-span");

const SECOND_TO_MILLI = 1000;
let frames = [];

function update_frame_rate(timestamp, element) {
	frames.push(timestamp);
	for (const frame_timestamp of frames) {
		if (frame_timestamp < (timestamp - SECOND_TO_MILLI)) {
			frames.shift();
		} else {
			break;
		}
	}
	element.innerHTML = frames.length;
}

function update(timestamp) {


	update_frame_rate(timestamp, frame_rate_span);
	animation_frame = requestAnimationFrame(update);
}

function load() {
	animation_frame = requestAnimationFrame(update);
}

document.onload = load();