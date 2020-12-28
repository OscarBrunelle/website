"use strict"

let svg;
let board;

function createGrid(boardArray) {
	SVG2DArray(svg, boardArray, function (d, i, j, squareSize) {
		let gElement = document.createElementNS(xmlns, "g");
		gElement.setAttributeNS(null, "class", (((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) ? "tile-white" : "tile-black"));

		let rectElement = document.createElementNS(xmlns, "rect");
		rectElement.setAttributeNS(null, "x", 2);
		rectElement.setAttributeNS(null, "y", 2);
		rectElement.setAttributeNS(null, "width", squareSize - 4);
		rectElement.setAttributeNS(null, "height", squareSize - 4);
		gElement.appendChild(rectElement);

		let pieceElement = document.createElementNS(xmlns, "text");
		pieceElement.innerHTML = d;
		pieceElement.setAttributeNS(null, "class", "piece-" + i + "-" + j);
		pieceElement.setAttributeNS(null, "x", -1 + squareSize / 2);
		pieceElement.setAttributeNS(null, "y", -1 + squareSize / 2);
		pieceElement.addEventListener("mouseover", function (e) {
			console.log(d);
		});
		gElement.appendChild(pieceElement);
		return gElement;
	});
}

function loadSudoku() {
	svg = new BasicSVG(document.getElementById("main"));
	board = create2DArray(9, 9, function (i, j) {
		return i * 9 + j;
	});
	createGrid(board);
}

document.onload = loadSudoku();