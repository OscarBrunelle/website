class Gate {
	constructor(x, y) {
		const element = document.createElementNS(xmlns, "text");
		element.innerHTML = x + ":" + y;
		element.setAttributeNS(null, "x", x);
		element.setAttributeNS(null, "y", y);
		svg.appendChild(element);
	}
}

class NotGate extends Gate {
	constructor(x, y) {
		super(x, y);
	}
}

class OrGate extends Gate {
	constructor(x, y) {
		super(x, y);
	}
}

class AndGate extends Gate {
	constructor(x, y) {
		super(x, y);
	}
}