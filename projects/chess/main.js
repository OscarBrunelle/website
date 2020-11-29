let svg;
let board;
const piecesOrder = ["tour", "cavalier", "fou", "dame", "roi", "fou", "cavalier", "tour"];

function createBoard() {
	board = create2DArray(8, 8, function(i, j) {
		if (j === 0 || j === 7) {
			return piecesOrder[i];
		} else if (j === 1 || j === 6) {
			return "pion";
		} else {
			return null;
		}
	});

	SVG2DArray(svg, board, function (d, i, j) {
		let numberElement = document.createElementNS(xmlns, "text");
		numberElement.innerHTML = d;
		numberElement.setAttributeNS(null, "class", "piece-" + i + "-" + j);
		return numberElement;
	});
}

function loadChess() {
	svg = new BasicSVG(document.getElementById("main"));
	createBoard();
}

document.onload = loadChess();