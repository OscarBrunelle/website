class Gate {
	constructor(x, y, width = 10, height = 10) {
		this.svgRef = document.createElementNS(xmlns, "svg");
		this.svgRef.setAttributeNS(null, "x", x);
		this.svgRef.setAttributeNS(null, "y", y);
		this.svgRef.setAttributeNS(null, "width", width);
		this.svgRef.setAttributeNS(null, "height", height);
		svg.appendChild(this.svgRef);
	}
}

class NotGate extends Gate {
	constructor(x, y) {
		super(x, y);

		svgline(this.svgRef, 0, 0, 0, 10);

		svgline(this.svgRef, 0, 0, 7.5, 5);
		svgline(this.svgRef, 0, 10, 7.5, 5);
		svgcircle(this.svgRef, 8, 5, 1);
	}
}

class OrGate extends Gate {
	constructor(x, y) {
		super(x, y);

		svgline(this.svgRef, 0, 0, 4, 5);
		svgline(this.svgRef, 0, 10, 4, 5);

		svgline(this.svgRef, 0, 0, 10, 5);
		svgline(this.svgRef, 0, 10, 10, 5);
	}
}

class AndGate extends Gate {
	constructor(x, y) {
		super(x, y);

		svgline(this.svgRef, 0, 0, 4, 3);
		svgline(this.svgRef, 4, 3, 4, 7);
		svgline(this.svgRef, 4, 7, 0, 10);

		svgline(this.svgRef, 0, 0, 7, 1);
		svgline(this.svgRef, 7, 1, 10, 3);
		svgline(this.svgRef, 10, 3, 10, 7);
		svgline(this.svgRef, 10, 7, 7, 9);
		svgline(this.svgRef, 7, 9, 0, 10);
	}
}