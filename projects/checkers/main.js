"use strict"

let svg;
let board;

function createBoard() {
	board = create2DArray(8, 8, function (i, j) {
		if (((j === 0 || j === 2) && i % 2 === 0) || (j === 1 && i % 2 === 1)) {
			return "pieceWhite";
		} else if (((j === 5 || j === 7) && i % 2 === 1) || (j === 6 && i % 2 === 0)) {
			return "pieceBlack";
		} else {
			return null;
		}
	});

	SVG2DArray(svg, board, function (d, i, j, squareSize) {
		let gElement = document.createElementNS(xmlns, "g");
		gElement.setAttributeNS(null, "class", (((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) ? "tile-white" : "tile-black"));

		let rectElement = document.createElementNS(xmlns, "rect");
		rectElement.setAttributeNS(null, "x", 0);
		rectElement.setAttributeNS(null, "y", 0);
		rectElement.setAttributeNS(null, "width", squareSize);
		rectElement.setAttributeNS(null, "height", squareSize);
		gElement.appendChild(rectElement);

		if (d != null) {
			let pieceElement = document.createElementNS(xmlns, "circle");
			pieceElement.innerHTML = d;
			if (d === "pieceWhite") {
				pieceElement.setAttributeNS(null, "class", "piece pieceWhite");
			} else if (d === "pieceBlack") {
				pieceElement.setAttributeNS(null, "class", "piece pieceBlack");
			}
			pieceElement.setAttributeNS(null, "cx", squareSize / 2);
			pieceElement.setAttributeNS(null, "cy", squareSize / 2);
			pieceElement.setAttributeNS(null, "r", squareSize / 3);
			pieceElement.addEventListener("mouseover", function (e) {
				console.log(d);
			});
			gElement.appendChild(pieceElement);
		}
		return gElement;
	});
}

function loadCheckers() {
	svg = new BasicSVG(document.getElementById("main"));
	createBoard();
}

document.onload = loadCheckers();