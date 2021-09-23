"use strict"

const xmlns = "http://www.w3.org/2000/svg";

function addSVGElement(parent, element, className = null, prependEl = false) {
	if (className != null) {
		element.setAttributeNS(null, "class", className);
	}
	if (parent != null) {
		if (prependEl) {
			parent.prepend(element);
		} else {
			parent.appendChild(element);
		}
	}
	return element;
}

function docsvg(parent = null, viewBox = "0 0 100 100", className = null) {
	const element = document.createElementNS(xmlns, "svg");
	element.setAttributeNS(null, "viewBox", viewBox);
	return addSVGElement(parent, element, className);
}

function svgcontainer(parent, x, y, width = null, height = null, className = null) {
	const element = document.createElementNS(xmlns, "svg");
	element.setAttributeNS(null, "x", x);
	element.setAttributeNS(null, "y", y);
	if (width != null) element.setAttributeNS(null, "width", width);
	if (height != null) element.setAttributeNS(null, "height", height);
	return addSVGElement(parent, element, className);
}

function svgg(parent, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "g");
	return addSVGElement(parent, element, className, prependEl);
}

function svgtext(parent, x, y, text, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "text");
	element.setAttributeNS(null, "x", x);
	element.setAttributeNS(null, "y", y);
	element.innerHTML = text;
	return addSVGElement(parent, element, className, prependEl);
}

function svgline(parent, x1, y1, x2, y2, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "line");
	element.setAttributeNS(null, "x1", x1);
	element.setAttributeNS(null, "y1", y1);
	element.setAttributeNS(null, "x2", x2);
	element.setAttributeNS(null, "y2", y2);
	return addSVGElement(parent, element, className, prependEl);
}

function svgpath(parent, d, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "path");
	element.setAttributeNS(null, "d", d);
	return addSVGElement(parent, element, className, prependEl);
}

function svgrect(parent, x, y, width = 1, height = 1, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "rect");
	element.setAttributeNS(null, "x", x);
	element.setAttributeNS(null, "y", y);
	element.setAttributeNS(null, "width", width);
	element.setAttributeNS(null, "height", height);
	return addSVGElement(parent, element, className, prependEl);
}

function svgcircle(parent, x, y, radius, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "circle");
	element.setAttributeNS(null, "cx", x);
	element.setAttributeNS(null, "cy", y);
	element.setAttributeNS(null, "r", radius);
	return addSVGElement(parent, element, className, prependEl);
}

function svgtitle(parent, text = "", className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "title");
	element.innerHTML = text;
	return addSVGElement(parent, element, className, prependEl);
}

// angles in radians
function svgarc(parent, x, y, r, startAngle, endAngle, invert = false, className = "", prependEl = false) {
	if (Math.abs(endAngle - startAngle) == 2 * Math.PI) {
		return svgcircle(parent, x, y, r, className);
	}
	const x0 = x + Math.cos(startAngle) * r,
		y0 = y - Math.sin(startAngle) * r,
		x1 = x + Math.cos(endAngle) * r,
		y1 = y - Math.sin(endAngle) * r;

	let d = "M " + x0 + "," + y0;
	d += " A" + r + "," + r; // radius x and y
	d += " 0"; // x-axis-rotation
	let largeArcFlag;
	if (endAngle > startAngle) {
		largeArcFlag = (endAngle - startAngle < Math.PI ? "0" : "1");
	} else {
		largeArcFlag = (startAngle - endAngle > Math.PI ? "0" : "1");
	}
	d += " " + largeArcFlag; // large-arc-flag -> determine which direction the arc is going
	d += " " + (invert ? "1" : "0"); // sweep-flag -> which circle to use
	d += " " + x1 + "," + y1;

	let element = document.createElementNS(xmlns, "path");
	element.setAttributeNS(null, "d", d);
	return addSVGElement(parent, element, className, prependEl);
}

class BasicSVG {
	constructor(parent = null, width = 400, height = 400) {
		this.width = width;
		this.height = height;

		let svgroot = document.createElementNS(xmlns, "svg");
		svgroot.setAttributeNS(null, "viewBox", "0 0 " + this.width + " " + this.height);
		if (parent != null) {
			parent.appendChild(svgroot);
		}
		this.svgroot = svgroot;
	}
}

function SVG2DArray(basicSVG, array, elementFunction) {
	if (elementFunction == null) {
		elementFunction = function (d, i, j) {
			let textElement = document.createElementNS(null, "text");
			textElement.innerHTML = d;
			return textElement;
		};
	}

	let squareSize = round_to_nearest((basicSVG.width - 1) / array.length, 0.5);
	let gridWidth = squareSize * array.length;
	let gridHeight = squareSize * array[0].length;

	let gridLinesX = document.createElementNS(xmlns, "g");
	gridLinesX.setAttributeNS(null, "class", "gridLines-x");
	basicSVG.svgroot.appendChild(gridLinesX);
	for (let x = 0; x < array.length + 1; x++) {
		let posY = round_to_nearest(x * squareSize, 0.5);
		svgline(gridLinesX, 0, posY, gridWidth, posY, "gridLine-x");
	}

	let gridLinesY = document.createElementNS(xmlns, "g");
	gridLinesY.setAttributeNS(null, "class", "gridLines-y");
	basicSVG.svgroot.appendChild(gridLinesY);
	for (let y = 0; y < array[0].length + 1; y++) {
		let posX = round_to_nearest(y * squareSize, 0.5);
		svgline(gridLinesY, posX, 0, posX, gridHeight, "gridLine-y");
	}


	// squareSize += 1;
	let dataG = document.createElementNS(xmlns, "g");
	dataG.setAttributeNS(null, "class", "data-g");
	basicSVG.svgroot.appendChild(dataG);
	for (let x = 0; x < array.length; x++) {
		for (let y = 0; y < array[0].length; y++) {
			let dataElement = elementFunction(array[x][y], x, y, squareSize);
			if (dataElement != null) {
				let posX = round_to_nearest(x * squareSize, 0.5); // - 0.5;
				let posY = round_to_nearest(y * squareSize, 0.5); // - 0.5;
				dataElement.setAttributeNS(null, "transform", "translate(" + posX + "," + posY + ")");
				// dataElement.setAttributeNS(null, "x", posX);
				// dataElement.setAttributeNS(null, "y", posY);
				// dataElement.setAttributeNS(null, "width", squareSize);
				// dataElement.setAttributeNS(null, "height", squareSize);
				dataG.appendChild(dataElement);
			}
		}
	}
}