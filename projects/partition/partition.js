let partition = [];
let canvas = document.getElementById("partition-canvas");
// let context = canvas.getContext("2d");
let bc;

let numberLinesGroupPerSheet = 4;
let numberLines = 5;
let partsPerWidth = 4;
let lineRadius = 10;

function addNote(event) {
	let mousePos = getMousePos(canvas, event);
	let x = round_to_nearest(mousePos.x, lineRadius / 2);
	let y = round_to_nearest(mousePos.y, lineRadius / 2);
	addNoteAt(x, y);
}

function addNoteAt(x, y) {
	bc.circle(x - lineRadius / 2, y, lineRadius / 2);
	bc.line(x, y, x, y - lineRadius * 3.25);
	bc.line(x, y - lineRadius * 3.25, x + lineRadius, y - lineRadius * 3.25);
	bc.line(x + lineRadius, y - lineRadius * 3.25, x + lineRadius, y - lineRadius * 3);
}

function createSheet() {
	bc.clear();
	for (let lg = 0; lg < numberLinesGroupPerSheet; lg++) {
		let y = canvas.height / numberLinesGroupPerSheet * lg;
		for (let i = 0; i < numberLines; i++) {
			let lineY = y + i * 10;
			bc.line(0, lineY, canvas.width - 1, lineY);
		}
		for (let i = 0; i < partsPerWidth + 1; i++) {
			let partEndX = (canvas.width - 1) / partsPerWidth * i;
			bc.line(partEndX, y, partEndX, y + (numberLines - 1) * lineRadius);
		}
	}
}

class BasicCanvas {
	constructor(canvasElement) {
		this.canvas = canvasElement;
		this.context = this.canvas.getContext("2d");
	}

	line(x1, y1, x2, y2, color = "black") {
		x1 = round_to_nearest(x1, 0.5);
		y1 = round_to_nearest(y1, 0.5);
		x2 = round_to_nearest(x2, 0.5);
		y2 = round_to_nearest(y2, 0.5);
		this.context.strokeStyle = color;

		this.context.beginPath();
		this.context.moveTo(x1, y1);
		this.context.lineTo(x2, y2);
		this.context.stroke();
	}

	circle(x, y, radius, color = "black") {
		this.context.strokeStyle = color;
		this.context.beginPath();
		this.context.arc(x, y, radius, 0, 2 * Math.PI);
		this.context.fill();
	}

	clear() {
		this.context.clearRect(0, 0, canvas.width, canvas.height);
	}
}

function loadPartition() {
	bc = new BasicCanvas(canvas);
	canvas.addEventListener("click", addNote);
	createSheet();
}

document.onload = loadPartition();