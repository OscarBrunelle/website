"use strict"

let svg = document.getElementById("svg");
let svg_size = 100;
let line_hours_length = svg_size/4;
let line_hours;
let line_minutes_length = svg_size/2.3;
let line_minutes;
let line_seconds_length = svg_size/2.1;
let line_seconds;

function build_clock() {
	let center = svg_size / 2;
	svgcircle(svg, center, center, svg_size/2-0.1);
	for (let i = 0; i < 12; i++) {
		let x = Math.cos(Math.PI*2*i/12);
		let y = Math.sin(Math.PI*2*i/12);
		svgline(svg, center + x*center, center + y*center, center + x*(center-5), center + y*(center-5), "tick");
	}
	for (let i = 0; i < 60; i++) {
		let x = Math.cos(Math.PI*2*i/60);
		let y = Math.sin(Math.PI*2*i/60);
		svgline(svg, center + x*center, center + y*center, center + x*(center-1), center + y*(center-1), "tick");
	}
	line_hours = svgline(svg, center, center, center, center, "line_hours");
	line_minutes = svgline(svg, center, center, center, center, "line_minutes");
	line_seconds = svgline(svg, center, center, center, center, "line_seconds");
}

function update_line(value, total, line, line_length, offset) {
	let x = 50 + line_length * Math.cos(Math.PI*value/total*2 + offset);
	let y = 50 + line_length * Math.sin(Math.PI*value/total*2 + offset);
	line.setAttributeNS(null, "x2", x);
	line.setAttributeNS(null, "y2", y);
}

function update_clock() {
	let date = new Date();

	let seconds = date.getSeconds() + date.getMilliseconds() / 1000;
	update_line(seconds, 60, line_seconds, line_seconds_length, -Math.PI/2);

	let minutes = date.getMinutes() + seconds / 60;
	update_line(minutes, 60, line_minutes, line_minutes_length, -Math.PI/2);

	let hours = date.getHours() + minutes / 60;
	update_line(hours, 24, line_hours, line_hours_length, Math.PI);
	
	requestAnimationFrame(update_clock);
}

function load() {
	build_clock();
	update_clock();
}

document.onload = load();