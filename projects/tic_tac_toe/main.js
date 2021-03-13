const svg = document.getElementById("svg");
const svgWidth = 100,
	svgHeight = 100;

function createGrid() {
	const gridGroup = svgg(svg, "grid");

	let gw = (svgWidth - 1) / 3;
	let gh = (svgHeight - 1) / 3;
	for (let i = 0; i < 4; i++) {
		svgline(gridGroup, i * gw + 0.5, 0, i * gw + 0.5, svgHeight);
		svgline(gridGroup, 0, i * gh + 0.5, svgWidth, i * gh + 0.5);
	}
}

function load() {
	createGrid();
}
document.onload = load();