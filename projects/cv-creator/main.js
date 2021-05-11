"use strict"

const cv = document.getElementById("cv");
const side_top = document.getElementById("top");
const left = document.getElementById("left");
const right = document.getElementById("right");

const sections = [
	{
		side: 0,
		title: "Section 1"
	}, {
		side: 0,
		title: "Section 2"
	}, {
		side: 0,
		title: "Section 2"
	}, {
		side: 0,
		title: "Section 2"
	}, {
		side: 0,
		title: "Section 2"
	}, {
		side: 0,
		title: "Section 2"
	}
];
const cv_data = {
	first_name: "Oscar",
	last_name: "Brunelle",
	position: "Développeur web",
	description: "blablabla",
	sections: sections
};

function load() {
	doch1(side_top, `${cv_data.first_name} ${cv_data.last_name.toUpperCase()}`);
	docspan(side_top, cv_data.position);
	docp(side_top, cv_data.description);

	for (const section of sections) {
		const sect = docsection(section.side == 0 ? left : right);
		doch1(sect, section.title);
	}
}

document.onload = load();