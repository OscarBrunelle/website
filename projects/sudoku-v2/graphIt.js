const xmlns = "http://www.w3.org/2000/svg";

let graph;

class SVGGraph {
	constructor(parent, width, height) {
		this.rootW = width;
		this.rootH = height;
		this.padding = 30;
		this.width = width - this.padding * 2;
		this.height = height - this.padding * 2

		this.svgroot = document.createElementNS(xmlns, "svg");
		this.svgroot.setAttributeNS(null, "width", this.rootW);
		this.svgroot.setAttributeNS(null, "height", this.rootH);
		parent.appendChild(this.svgroot);
		const ref = this;
		this.svgroot.addEventListener("mousemove", function (event) {
			ref.updateToolTip(event);
		});

		this.svggraph = document.createElementNS(xmlns, "g");
		this.svggraph.setAttributeNS(null, "class", "chart");
		// let gScaleX = (this.width - this.padding) / this.width;
		// let gScaleY = (this.height - this.padding) / this.height;
		// this.svggraph.setAttributeNS(null, "transform", "translate(" + this.padding + ", " + this.padding + ") scale(" + gScaleX + ", " + gScaleY + ")");
		// this.svggraph.setAttributeNS(null, "x", 10);
		// this.svggraph.setAttributeNS(null, "y", 10);
		// this.svggraph.setAttributeNS(null, "width", this.width - 10 * 2);
		// this.svggraph.setAttributeNS(null, "height", this.height - 10 * 2);
		this.svgroot.appendChild(this.svggraph);

		this.createAxes();
		this.createTooltip();

	}

	createAxes() {
		let axes = document.createElementNS(xmlns, "g");
		axes.setAttributeNS(null, "class", "axes");
		axes.setAttributeNS(null, "transform", "translate(" + this.padding + ", " + (this.height + this.padding) + ")");
		this.svgroot.appendChild(axes);

		let xAxisGroup = document.createElementNS(xmlns, "g");
		xAxisGroup.setAttributeNS(null, "class", "axis-group-x");
		axes.appendChild(xAxisGroup);
		let xAxisLine = document.createElementNS(xmlns, "line");
		xAxisLine.setAttributeNS(null, "class", "axis-line axis-line-x");
		xAxisLine.setAttributeNS(null, "x1", 0);
		xAxisLine.setAttributeNS(null, "y1", 0);
		xAxisLine.setAttributeNS(null, "x2", this.width);
		xAxisLine.setAttributeNS(null, "y2", 0);
		xAxisGroup.appendChild(xAxisLine);
		let xAxisTicks = document.createElementNS(xmlns, "g");
		xAxisTicks.setAttributeNS(null, "class", "axis-ticks-x");
		xAxisGroup.appendChild(xAxisTicks);

		let yAxisGroup = document.createElementNS(xmlns, "g");
		yAxisGroup.setAttributeNS(null, "class", "axis-group-y");
		axes.appendChild(yAxisGroup);
		let yAxisLine = document.createElementNS(xmlns, "line");
		yAxisLine.setAttributeNS(null, "class", "axis-line axis-line-y");
		yAxisLine.setAttributeNS(null, "x1", 0);
		yAxisLine.setAttributeNS(null, "y1", 0);
		yAxisLine.setAttributeNS(null, "x2", 0);
		yAxisLine.setAttributeNS(null, "y2", -this.height);
		yAxisGroup.appendChild(yAxisLine);
		let yAxisTicks = document.createElementNS(xmlns, "g");
		yAxisTicks.setAttributeNS(null, "class", "axis-ticks-y");
		yAxisGroup.appendChild(yAxisTicks);
	}

	createTooltip() {
		this.tooltip = document.createElementNS(xmlns, "g");
		this.tooltip.setAttributeNS(null, "class", "tooltip");
		this.tooltip.style.display = "none";
		this.svgroot.appendChild(this.tooltip);

		let pointingLine = document.createElementNS(xmlns, "line");
		pointingLine.setAttributeNS(null, "class", "tooltip-line");
		pointingLine.setAttributeNS(null, "x1", 0);
		pointingLine.setAttributeNS(null, "y1", 0);
		pointingLine.setAttributeNS(null, "x2", 0);
		pointingLine.setAttributeNS(null, "y2", 0);
		this.tooltip.appendChild(pointingLine);

		let rect = document.createElementNS(xmlns, "rect");
		rect.setAttributeNS(null, "x", 0);
		rect.setAttributeNS(null, "y", 0);
		rect.setAttributeNS(null, "width", 110);
		rect.setAttributeNS(null, "height", 45);
		rect.setAttributeNS(null, "stroke", "black");
		rect.setAttributeNS(null, "fill", "none");
		this.tooltip.appendChild(rect);

		let xLabel = document.createElementNS(xmlns, "text");
		xLabel.innerHTML = "x value: ";
		xLabel.setAttributeNS(null, "x", 5);
		xLabel.setAttributeNS(null, "y", 15);
		this.tooltip.appendChild(xLabel);

		let xValue = document.createElementNS(xmlns, "text");
		xValue.setAttributeNS(null, "class", "tooltip-xValue");
		xValue.setAttributeNS(null, "x", 60);
		xValue.setAttributeNS(null, "y", 15);
		xValue.innerHTML = "not set";
		this.tooltip.appendChild(xValue);

		let yLabel = document.createElementNS(xmlns, "text");
		yLabel.innerHTML = "y value: ";
		yLabel.setAttributeNS(null, "x", 5);
		yLabel.setAttributeNS(null, "y", 35);
		this.tooltip.appendChild(yLabel);

		let yValue = document.createElementNS(xmlns, "text");
		yValue.setAttributeNS(null, "class", "tooltip-yValue");
		yValue.setAttributeNS(null, "x", 60);
		yValue.setAttributeNS(null, "y", 35);
		yValue.innerHTML = "not set";
		this.tooltip.appendChild(yValue);
	}

	resetGraph() {
		this.svggraph.innerHTML = "";
		this.svgroot.querySelectorAll(".axis .tick").forEach(function (element) {
			element.remove();
		});
	}

	setDetails(details) {
		this.details = details;
	}

	setData(data) {
		this.resetGraph();
		this.data = data;

		let svglines = document.createElementNS(xmlns, "g");
		svglines.setAttribute("class", "lines");
		this.svggraph.appendChild(svglines);
		let svgtexts = document.createElementNS(xmlns, "g");
		svgtexts.setAttribute("class", "texts");
		this.svggraph.appendChild(svgtexts);

		let mm = this.getGoodMinMax(data);
		let min = mm.min;
		let max = mm.max;
		let range = max - min;

		this.updateAxes(data, mm);

		let dataPointGap = this.width / (data.length - 1);
		let prevX, prevY;
		let prevYValue;
		for (let i = 0; i < data.length; i++) {
			let xValue = data[i][this.details.xAxisValue];
			let yValue = data[i][this.details.yAxisValue];
			let x = this.padding + dataPointGap * (i);
			let y = this.padding + (1 - ((yValue - min) / range)) * this.height;

			let svgText = document.createElementNS(xmlns, "text");
			svgText.setAttributeNS(null, "x", x);
			svgText.setAttributeNS(null, "y", y);
			svgText.innerHTML = yValue;
			this.svggraph.querySelector("g.texts").appendChild(svgText);

			if (i > 0) {
				let svgLine = document.createElementNS(xmlns, "line");
				svgLine.setAttributeNS(null, "class", "data-line");
				svgLine.setAttributeNS(null, "x1", prevX);
				svgLine.setAttributeNS(null, "y1", prevY);
				svgLine.setAttributeNS(null, "x2", x);
				svgLine.setAttributeNS(null, "y2", y);
				svglines.appendChild(svgLine);
			}
			prevX = x;
			prevY = y;
			prevYValue = yValue;
		}
	}

	getGoodMinMax(data) {
		let min = data[0][this.details.yAxisValue];
		let max = data[0][this.details.yAxisValue];
		for (let i = 0; i < data.length; i++) {
			let yValue = data[i][this.details.yAxisValue];
			if (yValue < min) {
				min = yValue;
			}
			if (yValue > max) {
				max = yValue;
			}
		}
		let range = max - min;

		let strRange = (Math.floor(range) === 0) ? range.toString().replace("0.", "") : Math.floor(range).toString();
		let nearestPow = Math.pow(10, strRange.length - 1);
		// min = Math.floor(min / (10 * nearestPow)) * (10 * nearestPow);
		max = Math.ceil(max / (10 * nearestPow)) * (10 * nearestPow);

		return {
			min: min,
			max: max
		};
	}

	updateAxes(data = this.data, mm = null) {
		if (mm == null) {
			mm = this.getGoodMinMax(data);
		}
	}

	updateToolTip(event) {
		const x = event.x - 8;
		const y = event.y - 8;
		if (x < this.padding || x > (this.width + this.padding) || y < this.padding || y > (this.height + this.padding)) {
			this.tooltip.style.display = "none";
			return;
		}

		let dataPointGap = this.width / (this.data.length - 1);
		let index = Math.floor((x - this.padding) / dataPointGap);

		if (index < 0 || index >= this.data.length) {
			this.tooltip.style.display = "none";
			return;
		}

		let xValue = this.data[i][this.details.xAxisValue];
		let yValue = this.data[i][this.details.yAxisValue];
		let dataPointY = this.padding + (1 - ((yValue - min) / range)) * this.height;

		this.tooltip.style.display = "block";
		let lineX;
		let tooltipX;
		let tooltipY = (y - 45);
		if ((x - this.padding) < (this.width / 2)) {
			lineX = 0;
			tooltipX = x;
		} else {
			lineX = 110;
			tooltipX = x - 110;
		}
		this.tooltip.setAttributeNS(null, "transform", "translate(" + tooltipX + ", " + tooltipY + ")");
		this.tooltip.querySelector(".tooltip-line").setAttributeNS(null, "x1", lineX);
		this.tooltip.querySelector(".tooltip-line").setAttributeNS(null, "x2", lineX);
		let lineY1, lineY2;
		if (y < dataPointY) {
			this.tooltip.querySelector(".tooltip-line").setAttributeNS(null, "y1", 0);
			this.tooltip.querySelector(".tooltip-line").setAttributeNS(null, "y2", this.height - tooltipY + this.padding);
		} else {
			this.tooltip.querySelector(".tooltip-line").setAttributeNS(null, "y1", y);
			this.tooltip.querySelector(".tooltip-line").setAttributeNS(null, "y2", this.height - tooltipY + this.padding);
		}

		this.tooltip.querySelector(".tooltip-xValue").innerHTML = xValue;
		this.tooltip.querySelector(".tooltip-yValue").innerHTML = yValue;
	}
}

function loadGraphIt() {
	graph = new SVGGraph(document.body, 400, 400);
	graph.setDetails({
		xAxisValue: "ts",
		xAxisUnit: "s",
		yAxisValue: "value",
		yAxisUnit: "$"
	});
	let data = [];
	for (let i = 0; i < 20; i++) {
		data.push({
			ts: 0,
			value: Math.floor(Math.random() * 100)
		});
	}
	graph.setData(data);

	graph.svggraph.addEventListener("click", graph.resetGraph);
}

document.onload = loadGraphIt();