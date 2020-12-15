"use strict"

let svg;
let board;

let teamPlaying;
let selectedPiece;

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
			// console.log(ref);
		});
		pieceElement.addEventListener("click", function (e) {
			if (ref.team != teamPlaying) {
				return;
			}

			unselectPiece();

			$(this).addClass("active");
			selectedPiece = ref;

			ref.getPossibleMoves();
		});
		parentElement.appendChild(pieceElement);
	}

	moveTo(i, j) {
		this.DOMElement.remove();
		document.querySelector(".tile-" + i + "-" + j).appendChild(this.DOMElement);
		this.pos.i = i;
		this.pos.j = j;
	}

	getPossibleMoves() {
		resetPossibleMoves();

		if (this.isKing === true) {

		} else {
			let moveDirection = (this.team === 0) ? 1 : -1;
			let j1 = this.pos.j + moveDirection
			if (j1 >= 0 && j1 < 8) {
				let i1 = this.pos.i - 1
				if (i1 >= 0 && i1 < 8) {
					let enemyPresent = false;
					for (const boardLine of board) {
						for (const piece of boardLine) {
							if (piece != null && piece.pos.i === i1 && piece.pos.j === j1) {
								enemyPresent = true;
								break;
							}
						}
					}
					if (!enemyPresent) {
						let width = document.querySelector(".tile-" + i1 + "-" + j1 + " .tile-rect").getAttributeNS(null, "width");
						let height = document.querySelector(".tile-" + i1 + "-" + j1 + " .tile-rect").getAttributeNS(null, "height");
						let text = document.createElementNS(xmlns, "text");
						text.innerHTML = "-";
						text.setAttributeNS(null, "class", "possible_move-text");
						text.setAttributeNS(null, "x", width / 2);
						text.setAttributeNS(null, "y", height / 2);
						text.addEventListener("click", function (e) {
							selectedPiece.moveTo(i1, j1);
							nextTurn();
						});
						document.querySelector(".tile-" + i1 + "-" + j1).appendChild(text);
						$(".tile-" + i1 + "-" + j1 + " .tile-rect").addClass("possible_move");
					}
				}
				let i2 = this.pos.i + 1;
				if (i2 >= 0 && i2 < 8) {
					let enemyPresent = false;
					for (const boardLine of board) {
						for (const piece of boardLine) {
							if (piece != null && piece.pos.i === i2 && piece.pos.j === j1) {
								enemyPresent = true;
								break;
							}
						}
					}
					if (!enemyPresent) {
						let width = document.querySelector(".tile-" + i2 + "-" + j1 + " .tile-rect").getAttributeNS(null, "width");
						let height = document.querySelector(".tile-" + i2 + "-" + j1 + " .tile-rect").getAttributeNS(null, "height");
						let text = document.createElementNS(xmlns, "text");
						text.innerHTML = "-";
						text.setAttributeNS(null, "class", "possible_move-text");
						text.setAttributeNS(null, "x", width / 2);
						text.setAttributeNS(null, "y", height / 2);
						text.addEventListener("click", function (e) {
							selectedPiece.moveTo(i2, j1);
							nextTurn();
						});
						document.querySelector(".tile-" + i2 + "-" + j1).appendChild(text);
						$(".tile-" + i2 + "-" + j1 + " .tile-rect").addClass("possible_move");
					}
				}
			}
		}
	}
}

function unselectPiece() {
	for (const boardLine of board) {
		for (const piece of boardLine) {
			if (piece != null) {
				$(piece.DOMElement).removeClass("active");
			}
		}
	}
	selectedPiece = null;
	resetPossibleMoves();
}

function resetPossibleMoves() {
	let rectTiles = document.querySelectorAll("svg .tile-rect");

	for (const rectTile of rectTiles) {
		$(rectTile).removeClass("possible_move");
	}

	$(".possible_move-text").remove();
}

function eat(eater, victim) {
	// if (eater != null && eater.team === teamPlaying) {
	eater.moveTo(victim.pos.i, victim.pos.j);
	victim.DOMElement.remove();
	nextTurn();
	// }
}

function startGame() {

}

function nextTurn() {
	teamPlaying = (teamPlaying === 0) ? 1 : 0;
	unselectPiece();
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
		let isWhiteTile = ((i % 2 === 0 && j % 2 !== 0) || (i % 2 !== 0 && j % 2 === 0));
		gElement.setAttributeNS(null, "class", "tile tile-" + i + "-" + j + " " + (isWhiteTile ? "tile-white" : "tile-black"));

		let rectElement = document.createElementNS(xmlns, "rect");
		rectElement.setAttributeNS(null, "class", "tile-rect");
		rectElement.setAttributeNS(null, "x", 0);
		rectElement.setAttributeNS(null, "y", 0);
		rectElement.setAttributeNS(null, "width", squareSize);
		rectElement.setAttributeNS(null, "height", squareSize);
		rectElement.addEventListener("click", function (e) {
			if (selectedPiece != null && selectedPiece.team === teamPlaying) {
				if (!isWhiteTile && rectElement.getAttributeNS(null, "class").search("possible_move") >= 0) {
					selectedPiece.moveTo(i, j);
					nextTurn();
				}
			}
		});
		gElement.appendChild(rectElement);

		if (d != null) {
			d.addTo(gElement, squareSize);
		}

		return gElement;
	});
}

function loadCheckers() {
	svg = new BasicSVG(document.getElementById("main"));
	createBoard();
	teamPlaying = 0;
}

document.onload = loadCheckers();