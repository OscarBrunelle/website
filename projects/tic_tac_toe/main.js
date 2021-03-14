const svg = document.getElementById("svg");
const svgWidth = 100;
const svgHeight = 100;
const gridWidth = (svgWidth - 1) / 3;
const gridHeight = (svgHeight - 1) / 3;
let p1Turn = true;

function createGrid() {
	const gridGroup = svgg(svg, "grid");

	for (let i = 0; i < 4; i++) {
		svgline(gridGroup, i * gridWidth + 0.5, 0, i * gridWidth + 0.5, svgHeight);
		svgline(gridGroup, 0, i * gridHeight + 0.5, svgWidth, i * gridHeight + 0.5);
	}
}

function clickSVG(event) {
	const pos = getMousePos(svg, event);

	pos.x = pos.x / svg.clientWidth * svgWidth;
	pos.y = pos.y / svg.clientHeight * svgHeight;

	pos.x = floor(pos.x, gridWidth);
	pos.y = floor(pos.y, gridHeight);

	const container = svgcontainer(svg, pos.x, pos.y, gridWidth, gridHeight);
	if (p1Turn) {
		svgline(container, 0, 0, gridWidth, gridHeight);
		svgline(container, 0, gridHeight, gridWidth, 0);
	} else {
		svgcircle(container, gridWidth / 2, gridHeight / 2, gridWidth / 2);
	}
	p1Turn = !p1Turn;
}

function load() {
	createGrid();
	svg.addEventListener("click", clickSVG);
}
document.onload = load();