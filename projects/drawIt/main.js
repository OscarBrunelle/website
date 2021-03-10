"use strict"

let svg, shapeSelect;
let tempShape;
let shapes = [];
let mousePressed = false;

function createShape(e) {
	if (shapeSelect.value === "undo" && shapes.length > 0) {
		let shape = shapes.pop();
		shape.remove();
	} else {
		mousePressed = true;
		let pos = getMousePos(svg, e);
		let shape = document.createElementNS(xmlns, shapeSelect.value);
		if (shapeSelect.value === "line") {
			shape.setAttributeNS(null, "x1", pos.x);
			shape.setAttributeNS(null, "y1", pos.y);
			shape.setAttributeNS(null, "x2", pos.x);
			shape.setAttributeNS(null, "y2", pos.y);
		} else if (shapeSelect.value === "rect") {
			shape.setAttributeNS(null, "x", pos.x);
			shape.setAttributeNS(null, "y", pos.y);
			shape.setAttributeNS(null, "width", 0);
			shape.setAttributeNS(null, "height", 0);
		} else if (shapeSelect.value === "circle") {
			shape.setAttributeNS(null, "cx", pos.x);
			shape.setAttributeNS(null, "cy", pos.y);
			shape.setAttributeNS(null, "r", 0);
		} else if (shapeSelect.value === "ellipse") {
			shape.setAttributeNS(null, "cx", pos.x);
			shape.setAttributeNS(null, "cy", pos.y);
			shape.setAttributeNS(null, "rx", 0);
			shape.setAttributeNS(null, "ry", 0);
		}
		svg.appendChild(shape);
		tempShape = shape;
		shapes.push(shape);
	}
}

function moveShape(e) {
	if (mousePressed === true) {
		let pos = getMousePos(svg, e);
		if (shapeSelect.value === "line") {
			tempShape.setAttributeNS(null, "x2", pos.x);
			tempShape.setAttributeNS(null, "y2", pos.y);
		} else if (shapeSelect.value === "rect") {
			let w = Math.abs(pos.x - tempShape.getAttribute("x"));
			let h = Math.abs(pos.y - tempShape.getAttribute("y"));
			tempShape.setAttributeNS(null, "width", w);
			tempShape.setAttributeNS(null, "height", h);
		} else if (shapeSelect.value === "circle") {
			let rx = pos.x - parseFloat(tempShape.getAttribute("cx"));
			let ry = pos.y - parseFloat(tempShape.getAttribute("cy"));
			tempShape.setAttributeNS(null, "r", Math.abs(Math.max(rx, ry)));
		} else if (shapeSelect.value === "ellipse") {
			let rx = Math.abs(pos.x - parseFloat(tempShape.getAttribute("cx")));
			let ry = Math.abs(pos.y - parseFloat(tempShape.getAttribute("cy")));
			tempShape.setAttributeNS(null, "rx", rx);
			tempShape.setAttributeNS(null, "ry", ry);
		}
	}
}

function finishShape(e) {
	if (mousePressed === true) {
		mousePressed = false;
		let pos = getMousePos(svg, e);
		if ((tempShape.getAttribute("x1") == pos.x && tempShape.getAttribute("y1") == pos.y) || tempShape.getAttribute("width") == 0 || tempShape.getAttribute("height") == 0) {
			tempShape.remove();
		}
		tempShape = null;
	}
}

function drawSnowFlake() {
	const numberBranches = 6;
	for (let i = 0; i < numberBranches; i++) {
		drawPart({
			x: 50,
			y: 50
		}, 50, i * Math.PI / (numberBranches/2), 0);
	}
}

function drawPart(prevPos = {
	x: 0,
	y: 0
}, length = 10, orientation = 0, recursion = 0) {
	if (recursion > 3) {
		return;
	}

	let x2 = prevPos.x + length * Math.cos(orientation);
	let y2 = prevPos.y + length * Math.sin(orientation);
	let line = document.createElementNS(xmlns, "line");
	line.setAttributeNS(null, "x1", prevPos.x);
	line.setAttributeNS(null, "y1", prevPos.y);
	line.setAttributeNS(null, "x2", x2);
	line.setAttributeNS(null, "y2", y2);
	svg.appendChild(line)

	let midX2 = prevPos.x + length * Math.cos(orientation)/2;
	let midY2 = prevPos.y + length * Math.sin(orientation)/2;
	drawPart({
		x: midX2,
		y: midY2
	}, length / 2, orientation - Math.PI / 5, recursion + 1);
	// drawPart({
	// 	x: x2,
	// 	y: y2
	// }, length / 2, orientation, recursion + 1);
	drawPart({
		x: midX2,
		y: midY2
	}, length / 2, orientation + Math.PI / 5, recursion + 1);
}

function loadDrawIt() {
	svg = document.getElementById("svg");
	shapeSelect = document.getElementById("shape-select");
	svg.addEventListener("mousedown", createShape);
	svg.addEventListener("mousemove", moveShape);
	svg.addEventListener("mouseup", finishShape);

	drawSnowFlake();
}

document.onload = loadDrawIt();