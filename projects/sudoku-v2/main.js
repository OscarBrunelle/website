let svg;
let board;

function createGrid(boardArray) {
	SVG2DArray(svg, boardArray, function (d, i, j, squareSize) {
		let rectElement = document.createElementNS(xmlns, "rect");

		let numberElement = document.createElementNS(xmlns, "text");
		numberElement.innerHTML = d;
		numberElement.setAttributeNS(null, "class", "number-" + i + "-" + j);
		numberElement.setAttributeNS(null, "x", 0);
		numberElement.setAttributeNS(null, "y", 0);
		rectElement.appendChild(numberElement);
		return rectElement;
	});
}

function loadSudoku() {
	svg = new BasicSVG(document.getElementById("main"));
	board = create2DArray(9, 9, function(i, j) {
		return i;
	});
	createGrid(board);
}

document.onload = loadSudoku();