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
	};
}

function load() {
	svg.addEventListener("click", svgClicked);
}

document.onload = load();