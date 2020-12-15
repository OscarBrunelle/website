"use strict"

let svg;
let circles;
let board;

/*
- depaclement normal
x prise
*/

class CheckersPiece {
	constructor(i, j, team) {
		this.pos = {
			"i": i,
			"j": j
		};
		this.team = team;
		this.DOMElement = null;
	}

	addTo(parentElement, parentSize) {
		let pieceElement = document.createElementNS(xmlns, "circle");
		pieceElement.setAttributeNS(null, "class", "piece team" + this.team);
		pieceElement.setAttributeNS(null, "cx", parentSize / 2);
		pieceElement.setAttributeNS(null, "cy", parentSize / 2);
		pieceElement.setAttributeNS(null, "r", parentSize / 3);
		this.DOMElement = pieceElement;

		const ref = this;
		pieceElement.addEventListener("mouseover", function (e) {
			console.log(ref);
		});
		pieceElement.addEventListener("click", function (e) {
			for (const boardLine of board) {
				for (const piece of boardLine) {
					if (piece != null) {
						$(piece.DOMElement).removeClass("active");
					}
				}
			}

			$(this).addClass("active");
		});
		parentElement.appendChild(pieceElement);
	}
}

function createBoard() {
	board = create2DArray(8, 8, function (i, j) {
		if (((j === 0 || j === 2) && i % 2 === 0) || (j === 1 && i % 2 === 1)) {
			return new CheckersPiece(i, j, 0);
		} else if (((j === 5 || j === 7) && i % 2 === 1) || (j === 6 && i % 2 === 0)) {
			return new CheckersPiece(i, j, 1);
		} else {
			return null;
		}
	});

	SVG2DArray(svg, board, function (d, i, j, squareSize) {
		// globalss = squareSize;
		let gElement = document.createElementNS(xmlns, "g");
		gElement.setAttributeNS(null, "class", "tile tile-" + i + "-" + j + " " + (((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0)) ? "tile-white" : "tile-black"));

		let rectElement = document.createElementNS(xmlns, "rect");
		rectElement.setAttributeNS(null, "x", 0);
		rectElement.setAttributeNS(null, "y", 0);
		rectElement.setAttributeNS(null, "width", squareSize);
		rectElement.setAttributeNS(null, "height", squareSize);
		gElement.appendChild(rectElement);

		if(d!=null){
			d.addTo(gElement, squareSize);

		}

		return gElement;
	});
}

function loadCheckers() {
	svg = new BasicSVG(document.getElementById("main"));
	circles = document.createElementNS(xmlns, "g");
	circles.id = "circles";
	svg.svgroot.appendChild(circles);
	createBoard();
}

document.onload = loadCheckers();