class Component {
	constructor(x, y, ninputs = 1, noutputs = 1, width = gridWidth, height = gridHeight) {
		this.x = x;
		this.y = y;
		this.ninputs = ninputs;
		this.noutputs = noutputs;
		this.width = width;
		this.height = height;

		this.svgRef = document.createElementNS(xmlns, "svg");
		this.svgRef.setAttributeNS(null, "x", x);
		this.svgRef.setAttributeNS(null, "y", y);
		this.svgRef.setAttributeNS(null, "width", width);
		this.svgRef.setAttributeNS(null, "height", height);
		svg.appendChild(this.svgRef);
	}

	get_input() {
		return this.inputs[0];
	}

	set_input(value, index = 0) {
		this.inputs[index] = value;
		this.update();
	}

	set_output(value, index = 0) {
		this.outputs[index].value = value;
		const links = this.outputs[index].links;
		for (const linkIndex in links) {
			const link = links[linkIndex];
			link.component.set_input(value, link.index);
		}
	}

	linkTo(component, outputIndex = 0, linkedComponentInputIndex = 0) {
		const links = this.outputs[outputIndex].links;
		for (const linkIndex in links) {
			const link = links[linkIndex];
			if (link.component == this) return;
		}
		outputComponent = null;
		outputIndex = null;
		if (linkLine != null) linkLine.remove();

		const outputLine = svgg(svg, "", true);
		const x0 = this.x + this.width,
			y0 = this.y + this.height / 2,
			x1 = component.x,
			y1 = component.y + component.height / 2;
		svgline(outputLine, x0, y0, x1, y1);
		const ar = gridWidth / 8;
		let mid = get_middle(x0, y0, x1, y1);
		const deltaAngle = Math.PI / 4,
			a0 = mid.angle - deltaAngle,
			a1 = mid.angle + deltaAngle;
		svgline(outputLine, mid.x, mid.y, mid.x - Math.cos(a0) * ar, mid.y - Math.sin(a0) * ar);
		svgline(outputLine, mid.x, mid.y, mid.x - Math.cos(a1) * ar, mid.y - Math.sin(a1) * ar);

		this.outputs[outputIndex].links.push({
			"component": component,
			"index": linkedComponentInputIndex,
			"line": outputLine
		});

		this.update();
	}

	addIO() {
		this.inputs = {};
		for (let i = 0; i < this.ninputs; i++) {
			this.inputs[i] = false;
			const cx = 0,
				cy = this.height / (this.ninputs + 1) * (i + 1),
				cr = this.height / 8;
			const inputCircle = svgcircle(this.svgRef, cx, cy, cr, "io-circle input-circle");
			const ref = this;
			inputCircle.addEventListener("click", function (event) {
				if (selectedComponent.value == "link" && outputComponent != null && outputComponent != ref) {
					if (linkLine != null) linkLine.remove();
					linkLine = svgline(svg, outputComponent.x, outputComponent.y + outputIndex / outputComponent.noutputs, cx, cy, "link_line", true);

					outputComponent.linkTo(ref, outputIndex, i);
				}
			});
		}

		this.outputs = {};
		for (let i = 0; i < this.noutputs; i++) {
			this.outputs[i] = {
				value: false,
				links: []
			};
			const cx = this.width,
				cy = this.height / (this.noutputs + 1) * (i + 1),
				cr = this.height / 8;
			const outputCircle = svgcircle(this.svgRef, cx, cy, cr, "io-circle output-circle");
			const ref = this;
			outputCircle.addEventListener("click", function (event) {
				if (selectedComponent.value == "link" && outputComponent != ref) {
					outputComponent = ref;
					outputIndex = i;

					if (linkLine != null) linkLine.remove();
					linkLine = svgline(svg, cx, cy, cx, cy, "link_line", true);
				}
			});
		}
	}

	interact() {}
	update(delta = 0) {}
}

class Clock extends Component {
	constructor(x, y) {
		super(x, y, 0, 1);

		this.isOn = false;
		this.delay = 1000;
		this.currentDelay = 0;
		this.createShape();
		this.addIO();
	}

	createShape() {
		const x0 = 0,
			y0 = this.height,
			x1 = this.width / 4,
			y1 = y0,
			x2 = x1,
			y2 = this.height / 2,
			x3 = this.width * 3 / 4,
			y3 = y2,
			x4 = x3,
			y4 = y0,
			x5 = this.width,
			y5 = y0;
		svgline(this.svgRef, x0, y0, x1, y1);
		svgline(this.svgRef, x1, y1, x2, y2);
		svgline(this.svgRef, x2, y2, x3, y3);
		svgline(this.svgRef, x3, y3, x4, y4);
		svgline(this.svgRef, x4, y4, x5, y5);
	}

	interact() {
		if (this.delay == 1000) {
			this.delay = 100;
		} else {
			this.delay = 1000;
		}
	}

	update(delta = 0) {
		const previousState = this.isOn;
		this.currentDelay += delta;
		while (this.currentDelay > this.delay) {
			this.currentDelay -= this.delay;
			this.isOn = !this.isOn;
		}

		if (this.isOn != previousState) {
			this.set_output(this.isOn);
		}
	}
}

class Switch extends Component {
	constructor(x, y, isOn = false) {
		super(x, y, 0, 1);

		this.isOn = isOn;
		this.createShape();
		this.addIO();
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
		this.update();
	}

	update(delta = 0) {
		this.set_output(this.isOn);
	}
}

class NotGate extends Component {
	constructor(x, y) {
		super(x, y, 1, 1);

		this.createShape();
		this.addIO();
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

	update(delta = 0) {
		this.set_output(!this.get_input());
	}
}

class OrGate extends Component {
	constructor(x, y) {
		super(x, y, 2, 1);

		this.createShape();
		this.addIO();
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

	update(delta = 0) {
		let oneTrue = false;
		for (const inputIndex in this.inputs) {
			if (this.inputs[inputIndex] == true) {
				oneTrue = true;
				break;
			}
		}
		this.set_output(oneTrue);
	}
}

class AndGate extends Component {
	constructor(x, y) {
		super(x, y, 2, 1);

		this.createShape();
		this.addIO();
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
		svgarc(this.svgRef, cx0, cy0, cr0, Math.PI / 2, Math.PI * 3 / 2, true);
		svgline(this.svgRef, x2, y2, x3, y3);
		svgline(this.svgRef, x3, y3, x0, y0);
	}

	update(delta = 0) {
		let allTrue = true;
		for (const inputIndex in this.inputs) {
			if (this.inputs[inputIndex] == false) {
				allTrue = false;
				break;
			}
		}
		this.set_output(allTrue);
	}
}

class Light extends Component {
	constructor(x, y) {
		super(x, y, 1, 0);

		this.isOn = false;
		this.createShape();
		this.addIO();
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
		if (this.isOn == true) {
			svgline(this.svgRef, x0, y0, x1, y1, "sign");
		} else {
			svgcircle(this.svgRef, cx1, cy1, cr1, "sign");
		}
	}

	update(delta = 0) {
		this.isOn = this.get_input();
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
		if (this.isOn == true) {
			svgline(this.svgRef, x0, y0, x1, y1, "sign");
		} else {
			svgcircle(this.svgRef, cx1, cy1, cr1, "sign");
		}
	}
}