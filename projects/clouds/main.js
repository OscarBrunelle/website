"use strict"

let generators = [];
let bubbles = [];
let animation_frame;

const svg = document.getElementById("svg");
const svg_width = 100, svg_height = 100;
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

let prev_timestamp;

function update(timestamp) {
	if (prev_timestamp == null) {
		prev_timestamp = timestamp;
	}
	const delta = timestamp - prev_timestamp;

	for (const generator of generators) {
		generator.update(delta);
	}
	for (const bubble of bubbles) {
		bubble.update(delta);
	}

	update_frame_rate(timestamp, frame_rate_span);

	prev_timestamp = timestamp;
	animation_frame = requestAnimationFrame(update);
}

function load() {
	generators.push(new Generator(50, 70));
	animation_frame = requestAnimationFrame(update);
}

document.onload = load();