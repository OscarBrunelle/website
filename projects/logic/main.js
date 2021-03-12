const svg = document.getElementById("svg");

function svgClicked(event) {
	const pos = getMousePos(svg, event);
	const gateSelected = document.querySelector('input[name="gate"]:checked');
	if (gateSelected == null) return;
	switch (gateSelected.value) {
		case "not":
			new NotGate(pos.x, pos.y);
			break;
		case "or":
			new OrGate(pos.x, pos.y);
			break;
		case "and":
			new AndGate(pos.x, pos.y);
			break;
		case "switch":
			new Switch(pos.x, pos.y);
			break;
		case "light":
			new Light(pos.x, pos.y);
			break;
	};
}

function update(frameId) {
	requestAnimationFrame(update);
}

function load() {
	svg.addEventListener("click", svgClicked);

	// requestAnimationFrame(update);
}

document.onload = load();