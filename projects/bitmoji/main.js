"use strict"

const svg = document.getElementById("svg");
const parts = [FACES, EYES, NOSES, MOUTHS, HAIR, HAIRS, CLOTHES, ACCESSORIES];

function load() {
	for (const part of parts) {
		svgpath(svg, part[0].path);
	}
}

document.onload = load();