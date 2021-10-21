"use strict"

class Canvas {
	constructor(parent_selector, _width, _height, id = "game_canvas") {
		let canvas = document.getElementById(id);
		if (canvas == null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("width", _width);
			canvas.setAttribute("height", _height);
			document.querySelector(parent_selector).appendChild(canvas);
		}
		this.canvas = canvas;
		this.canvas.tabIndex = 1;
		this.id = id;
		this.width = _width;
		this.height = _height;
		this.x = this.width / 2;
		this.y = this.height / 2;

		this.context = this.canvas.getContext("2d");
		this.context.textAlign = "center";
		this.context.textBaseline = "middle";
	}

	rect(x, y, w, h) {
		this.context.fillRect(x, y, w, h);
	}
}