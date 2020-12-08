"use strict"

let svg, shapeSelect;
let tempShape;
let shapes = [];
let mousePressed = false;

function createShape(e) {
	if (shapeSelect.value === "erase" && shapes.length > 0) {
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
			shape.setAttributeNS(null, "x1", pos.x);
			shape.setAttributeNS(null, "y1", pos.y);
			shape.setAttributeNS(null, "x2", pos.x);
			shape.setAttributeNS(null, "y2", pos.y);
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
			tempShape.setAttributeNS(null, "x2", pos.x);
			tempShape.setAttributeNS(null, "y2", pos.y);
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
		if (tempShape.getAttribute("x1") == pos.x && tempShape.getAttribute("y1") == pos.y) {
			tempShape.remove();
		}
		tempShape = null;
	}
}

function loadDrawIt() {
	svg = document.getElementById("svg");
	shapeSelect = document.getElementById("shape-select");
	svg.addEventListener("mousedown", createShape);
	svg.addEventListener("mousemove", moveShape);
	svg.addEventListener("mouseup", finishShape);
}

document.onload = loadDrawIt();