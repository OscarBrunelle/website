class Part {
	constructor(x, y, width = gridWidth, height = gridHeight) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;

		this.svgRef = document.createElementNS(xmlns, "svg");
		this.svgRef.setAttributeNS(null, "x", x);
		this.svgRef.setAttributeNS(null, "y", y);
		this.svgRef.setAttributeNS(null, "width", width);
		this.svgRef.setAttributeNS(null, "height", height);
		svg.appendChild(this.svgRef);
	}

	linkTo(linkedGate) {
		this.linkedGate = linkedGate;
		if (this.outputLink != null) {
			this.outputLink.remove();
		}
		this.outputLink = svgline(svg, this.x + this.width, this.y + this.height / 2, linkedGate.x, linkedGate.y + linkedGate.height / 2);
		// add small arrow at the middle of line
		inputGate = null;
	}

	interact() {}

	update() {}
}

class Clock extends Part {
	constructor(x, y) {
		super(x, y);

		this.isOn = false;
		this.delay = 1000;
		this.currentDelay = 0;
		this.createShape();
	}

	createShape() {
		svgcircle(this.svgRef, this.width / 2, this.height / 2, this.width / 2);
	}

	interact() {
		if (this.delay == 1000) {
			this.delay = 100;
		} else {
			this.delay = 1000;
		}
	}

	update(delta) {
		this.currentDelay += delta;
		while (this.currentDelay > this.delay) {
			this.currentDelay -= this.delay;
			this.isOn = !this.isOn;
		}
		
		if (this.linkedGate == null) return;
		this.linkedGate.input = this.isOn;
	}
}

class Switch extends Part {
	constructor(x, y, isOn = true) {
		super(x, y);

		this.isOn = isOn;
		this.createShape();
	}

	createShape() {
		const cx0 = this.width / 2,
			cy0 = this.height / 2,
			cr0 = this.width / 2,
			x0 = cx0,
			y0 = cy0 - this.height * 0.2,
			x1 = cx0,
			y1 = cy0 + this.height * 0.2,
			cx1 = cx0,
			cy1 = cy0,
			cr1 = this.width * 0.2;
		svgcircle(this.svgRef, cx0, cy0, cr0);
		if (this.isOn) {
			svgline(this.svgRef, x0, y0, x1, y1, "sign");
		} else {
			svgcircle(this.svgRef, cx1, cy1, cr1, "sign");
		}
	}

	switch () {
		this.isOn = !this.isOn;
		this.svgRef.querySelector(".sign").remove();
		const cx0 = this.width / 2,
			cy0 = this.height / 2,
			cr0 = this.width / 2,
			x0 = cx0,
			y0 = cy0 - this.height * 0.2,
			x1 = cx0,
			y1 = cy0 + this.height * 0.2,
			cx1 = cx0,
			cy1 = cy0,
			cr1 = this.width * 0.2;
		if (this.isOn) {
			svgline(this.svgRef, x0, y0, x1, y1, "sign");
		} else {
			svgcircle(this.svgRef, cx1, cy1, cr1, "sign");
		}
	}

	interact() {
		this.switch();
	}

	update() {
		if (this.linkedGate == null) return;
		this.linkedGate.input = this.isOn;
	}
}

class Gate extends Part {
	constructor(x, y) {
		super(x, y);
	}
}

class NotGate extends Gate {
	constructor(x, y) {
		super(x, y);

		this.createShape();
	}

	createShape() {
		const x0 = 0,
			y0 = 0,
			x1 = this.width * 0.8,
			y1 = this.height / 2,
			cx0 = x1 + this.width * 0.1,
			cy0 = y1,
			cr1 = this.width * 0.1,
			x2 = 0,
			y2 = this.height;

		svgline(this.svgRef, x0, y0, x1, y1);
		svgcircle(this.svgRef, cx0, cy0, cr1);
		svgline(this.svgRef, x1, y1, x2, y2);

		svgline(this.svgRef, x2, y2, x0, y0);
	}

	update() {
		if (this.linkedGate == null) return;
		if (this.input == null) {
			this.linkedGate.input = false;
		} else {
			this.linkedGate.input = !this.input;
		}
	}
}

class OrGate extends Gate {
	constructor(x, y) {
		super(x, y);

		this.createShape();
	}

	createShape() {
		const x0 = 0,
			y0 = 0,
			x1 = this.width,
			y1 = this.height / 2,
			x2 = 0,
			y2 = this.height,
			x3 = this.width * 0.2,
			y3 = this.height / 2;

		svgline(this.svgRef, x0, y0, x1, y1);
		svgline(this.svgRef, x1, y1, x2, y2);
		svgline(this.svgRef, x2, y2, x3, y3);
		svgline(this.svgRef, x3, y3, x0, y0);
	}
}

class AndGate extends Gate {
	constructor(x, y) {
		super(x, y);

		this.createShape();
	}

	createShape() {
		const x0 = 0,
			y0 = 0,
			x1 = this.width * 0.5,
			y1 = 0,
			cx0 = x1,
			cy0 = y1 + this.height / 2,
			cr0 = cy0 - y1,
			x2 = x1,
			y2 = this.height,
			x3 = 0,
			y3 = this.height;
		svgline(this.svgRef, x0, y0, x1, y1);
		svgarc(this.svgRef, cx0, cy0, cr0, 0, 180);
		svgline(this.svgRef, x2, y2, x3, y3);
		svgline(this.svgRef, x3, y3, x0, y0);
	}
}

class Light extends Part {
	constructor(x, y) {
		super(x, y);

		this.isOn = false;
		this.createShape();
	}

	createShape() {
		this.svgRef.innerHTML = "";
		const cx0 = this.width / 2,
			cy0 = this.height / 2,
			cr0 = this.width / 2,
			x0 = cx0,
			y0 = cy0 - this.height * 0.2,
			x1 = cx0,
			y1 = cy0 + this.height * 0.2,
			cx1 = cx0,
			cy1 = cy0,
			cr1 = this.width * 0.2;
		svgcircle(this.svgRef, cx0, cy0, cr0);
		if (this.isOn == true) {
			svgline(this.svgRef, x0, y0, x1, y1, "sign");
		} else {
			svgcircle(this.svgRef, cx1, cy1, cr1, "sign");
		}
	}

	update() {
		this.isOn = this.input;
		this.createShape();
	}
}



// move to shared when finished
// ref: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
	var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

	return {
		x: centerX + (radius * Math.cos(angleInRadians)),
		y: centerY + (radius * Math.sin(angleInRadians))
	};
}

function describeArc(x, y, radius, startAngle, endAngle) {

	var start = polarToCartesian(x, y, radius, endAngle);
	var end = polarToCartesian(x, y, radius, startAngle);

	var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

	var d = [
		"M", start.x, start.y,
		"A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
	].join(" ");

	return d;
}

function svgarc(parent, x, y, r, startAngle, endAngle, className = "") {
	const d = describeArc(x, y, r, startAngle, endAngle);

	let shape = document.createElementNS(xmlns, "path");
	if (className != null) {
		shape.setAttributeNS(null, "class", className);
	}
	shape.setAttributeNS(null, "d", d);
	parent.appendChild(shape);
	return shape;
}