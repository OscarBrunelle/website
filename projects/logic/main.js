const svg = document.getElementById("svg");
let gridWidth = 40;
let gridHeight = 40;
let gates = [];
let gateSelected = document.querySelector('input[name="gate"]:checked');

let inputGate;

function svgClicked(event) {
	const pos = getMousePos(svg, event);

	if (gateSelected == null) return;

	pos.x = floor(pos.x, gridWidth);
	pos.y = floor(pos.y, gridHeight);
	for (const gate of gates) {
		if (gate.x == pos.x && gate.y == pos.y) {
			if (gateSelected.value == "link") {
				if (inputGate == null) {
					inputGate = gate;
				} else if (inputGate != gate) {
					inputGate.linkTo(gate);
				}
			}
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
		gate.update();
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

function selectGate(event) {
	gateSelected = document.querySelector('input[name="gate"]:checked');
	inputGate = null;
}

function load() {
	const gateOptions = document.querySelectorAll('input[name="gate"]');
	for (const gateOption of gateOptions) {
		gateOption.addEventListener("change", selectGate);
	}
	createGrid(1000, 1000);
	svg.addEventListener("click", svgClicked);

	frameId = requestAnimationFrame(update);
}

document.onload = load();