"use strict"

let svg;
let board;
const piecesCodes = {
	"king": "&#9818", //roi
	"queen": "&#9819", //dame
	"rook": "&#9820", //tour
	"bishop": "&#9821", //fou
	"knight": "&#9822", //cavalier
	"pawn": "&#9823", //pion
};
const piecesOrder = ["rook", "knight", "bishop", "queen", "king", "bishop", "knight", "rook"];

class ChessPiece {
	constructor(i, j, pieceType, team) {
		this.pos = {
			"i": i,
			"j": j
		};
		this.pieceType = pieceType;
		this.team = team;
		this.DOMElement = null;
	}

	addTo(parentElement, parentSize) {
		let pieceElement = document.createElementNS(xmlns, "text");

		pieceElement.innerHTML = piecesCodes[this.pieceType];
		pieceElement.setAttributeNS(null, "class", "piece team" + this.team);
		pieceElement.setAttributeNS(null, "x", parentSize/2);
		pieceElement.setAttributeNS(null, "y", parentSize/2);
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
		if (j === 0 || j === 7) {
			return new ChessPiece(i, j, piecesOrder[i], (j === 0 ? 0 : 1));
		} else if (j === 1 || j === 6) {
			return new ChessPiece(i, j, "pawn", (j === 1 ? 0 : 1));
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
			d.addTo(gElement, squareSize);
		}
		return gElement;
	});
}

function loadChess() {
	svg = new BasicSVG(document.getElementById("main"));
	createBoard();
}

document.onload = loadChess();