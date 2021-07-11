"use strict"

// ref: https://www.nayuki.io/page/creating-a-qr-code-step-by-step

let input_string = "Hello";
const svg = document.getElementById("svg");
let structure = svgg(svg, "basic_structure");
let qr_size = 21;
let corner_size = 7;
let safe_zone = 2;

function corner(x, y) {
	svgrect(structure, safe_zone + x, safe_zone + y, corner_size, corner_size, "corner-out");
	svgrect(structure, safe_zone + x + 1, safe_zone + y + 1, corner_size - 2, corner_size - 2, "corner-between");
	svgrect(structure, safe_zone + x + 2, safe_zone + y + 2, corner_size - 4, corner_size - 4, "corner-in");
}

function create_structure() {
	svgrect(structure, 0, 0, qr_size + safe_zone * 2, qr_size + safe_zone * 2, "background");
	for (let x = 0; x < qr_size; x += 2) {
		svgrect(structure, safe_zone + x, safe_zone + corner_size - 1, 1, 1);
	}
	for (let y = 0; y < qr_size; y += 2) {
		svgrect(structure, safe_zone + corner_size - 1, safe_zone + y, 1, 1);
	}
	corner(0, 0);
	corner(0, qr_size - corner_size);
	corner(qr_size - corner_size, 0);
}

function load() {
	create_structure();

	let bits = [];
	for (const dec of (new TextEncoder()).encode(input_string)) {
		bits.push(to_fixed_length(dec_to_bin(dec), 8));
	}
}

document.onload = load();