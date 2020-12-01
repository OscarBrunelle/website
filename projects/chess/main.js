let svg;
let board;
const piecesOrder = ["tour", "cavalier", "fou", "dame", "roi", "fou", "cavalier", "tour"];

function createBoard() {
	board = create2DArray(8, 8, function (i, j) {
		if (j === 0 || j === 7) {
			return piecesOrder[i];
		} else if (j === 1 || j === 6) {
			return "pion";
		} else {
			return null;
		}
	});

	SVG2DArray(svg, board, function (d, i, j, squareSize) {
		let rectElement = document.createElementNS(xmlns, "rect");
		rectElement.setAttributeNS(null, "class", (((i % 2 === 0 && j % 2!== 0) || (i % 2 !== 0 && j % 2 === 0)) ? "tile-white" : "tile-black"));

		let numberElement = document.createElementNS(xmlns, "text");
		numberElement.innerHTML = d;
		numberElement.setAttributeNS(null, "class", "piece-" + i + "-" + j);
		numberElement.addEventListener("mouseover", function (e) {
			console.log(d);
		});
		rectElement.appendChild(numberElement);
		return rectElement;
	});
}

function loadChess() {
	svg = new BasicSVG(document.getElementById("main"));
	createBoard();
}

document.onload = loadChess();