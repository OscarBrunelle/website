"use strict"

const cv = document.getElementById("cv");
const sections = [
	{
		title: "Section 1"
	}, {
		title: "Section 2"
	}
];

function load() {
	for (const section of sections) {
		const sect = docsection(cv);
		doch1(sect, section.title);
	}
}

document.onload = load();