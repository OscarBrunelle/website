const svg = document.getElementById("svg");
let gridWidth = 40;
let gridHeight = 40;
let gates = [];

function svgClicked(event) {
	const pos = getMousePos(svg, event);
	const gateSelected = document.querySelector('input[name="gate"]:checked');

	if (gateSelected == null) return;

	pos.x = floor(pos.x, gridWidth);
	pos.y = floor(pos.y, gridHeight);
	for (const gate of gates) {
		if (gate.x == pos.x && gate.y == pos.y) {
			return;
		}
	}

	let gate;
	switch (gateSelected.value) {
		case "not":
			gate = new NotGate(pos.x, pos.y);
			break;
		case "or":
			gate = new OrGate(pos.x, pos.y);
			break;
		case "and":
			gate = new AndGate(pos.x, pos.y);
			break;
		case "switch":
			gate = new Switch(pos.x, pos.y);
			break;
		case "light":
			gate = new Light(pos.x, pos.y);
			break;
	};
	if (gate != null) {
		gates.push(gate);
	}
}

let frameId;
let framesHistory = [];
function update(timestamp) {
	for (const gate of gates) {
		// gate.update();
	}
	framesHistory.push(timestamp);
	for (const frameTs of framesHistory) {
		if (timestamp - frameTs > 1000) {
			framesHistory.shift();
		} else {
			break;
		}
	}
	document.getElementById("frame_counter").innerHTML = framesHistory.length;
	requestAnimationFrame(update);
}

function createGrid(width, height) {
	let gridG = svgg(svg, "grid-g");
	for (let x = 0; x < width; x += gridWidth) {
		for (let y = 0; y < height; y += gridHeight) {
			svgrect(gridG, x, y, gridWidth, gridHeight, "grid-rect");
		}
	}
}

/*
when left click on gate, drawline that follows mouse
when click, if possible set input/output
when right click, cancel

set logic of gates

update gates

enjoy
*/

function load() {
	createGrid(1000, 1000);
	svg.addEventListener("click", svgClicked);

	frameId = requestAnimationFrame(update);
}

document.onload = load();