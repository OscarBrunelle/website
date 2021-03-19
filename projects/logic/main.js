const svg = document.getElementById("svg");
let gridWidth = 40;
let gridHeight = 40;
let components = [];
let clocks = [];
let selectedComponent = document.querySelector('input[name="component"]:checked');

let inputComponent;

function svgClicked(event) {
	const pos = getMousePos(svg, event);

	if (selectedComponent == null) return;

	pos.x = floor(pos.x, gridWidth);
	pos.y = floor(pos.y, gridHeight);
	for (const component of components) {
		if (component.x == pos.x && component.y == pos.y) {
			if (selectedComponent.value == "link") {
				if (inputComponent == null) {
					inputComponent = component;
				} else if (inputComponent != component) {
					inputComponent.linkTo(component);
				}
			} else if (selectedComponent.value == "interact") {
				component.interact();
			}
			return;
		}
	}

	let component;
	switch (selectedComponent.value) {
		case "clock":
			component = new Clock(pos.x, pos.y);
			clocks.push(component);
			break;
		case "switch":
			component = new Switch(pos.x, pos.y);
			break;
		case "not":
			component = new NotGate(pos.x, pos.y);
			break;
		case "or":
			component = new OrGate(pos.x, pos.y);
			break;
		case "and":
			component = new AndGate(pos.x, pos.y);
			break;
		case "light":
			component = new Light(pos.x, pos.y);
			break;
	};

	if (component != null) {
		components.push(component);
	}
}

let frameId;
let framesHistory = [];

let previousTimestamp;
function update(timestamp) {
	const deltaTime = timestamp - previousTimestamp;
	for (const clock of clocks) {
		clock.update(deltaTime);
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
	previousTimestamp = timestamp;
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

function selectComponent(event) {
	selectedComponent = document.querySelector('input[name="component"]:checked');
	inputComponent = null;
}

function load() {
	const componentChoices = document.querySelectorAll('input[name="component"]');
	for (const componentChoice of componentChoices) {
		componentChoice.addEventListener("change", selectComponent);
	}
	createGrid(2000, 2000);
	svg.addEventListener("click", svgClicked);

	frameId = requestAnimationFrame(update);
}