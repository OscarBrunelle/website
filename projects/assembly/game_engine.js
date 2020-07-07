"use strict"

class GameCanvas {
	constructor(parent_selector, _width, _height, _id = "game_canvas") {
		//create the canvas
		this.canvas = document.createElement("canvas");
		this.id = _id;
		this.width = _width;
		this.height = _height;

		//append the canvas to the parent
		const parent = document.querySelector(parent_selector);
		parent.appendChild(this.canvas);

		this.context = this.canvas.getContext("2d");

		this.canvas.addEventListener("contextmenu", function (event) {
			event.preventDefault();
		});
		this.scale = 1;
		this.canvas.addEventListener("wheel", event => {
			const delta = Math.sign(event.deltaY);
			const multiplicator = delta < 0 ? 2 : 0.5;
			this.context.scale(multiplicator, multiplicator);
			this.scale *= multiplicator;

			const rect = this.canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			this.translate_x = x;
			this.translate_y = y;

			this.clear();
		});

		this.clear();
	}

	set id(value) {
		this.canvas_id = value;
		this.canvas.id = value;
	}
	get id() {
		return this.canvas_id;
	}

	set width(value) {
		this.w = value;
		this.canvas.width = value;
	}
	get width() {
		return this.w;
	}

	set height(value) {
		this.h = value;
		this.canvas.height = value;
	}
	get height() {
		return this.h;
	}

	strokeRect(x, y, width, height, color) {
		x = Math.round(x) + 0.5;
		y = Math.round(y) + 0.5;
		this.context.save();
		this.context.lineWidth = 1;
		this.context.strokeStyle = color;
		this.context.strokeRect(x, y, width, height);
		this.context.restore();
	}

	fillRect(x, y, width, height, color) {
		x = Math.round(x) + 0.5;
		y = Math.round(y) + 0.5;
		this.context.save();
		this.context.lineWidth = 1;
		this.context.fillStyle = color;
		this.context.fillRect(x, y, width, height);
		this.context.restore();
	}

	drawObj(obj) {
		this.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
	}

	drawImage(image, x, y, width, height, angle_rad = 0) {
		if (width == null) {
			width = image.width;
		}
		if (height == null) {
			height = image.height;
		}
		x = Math.round(x) + 0.5;
		y = Math.round(y) + 0.5;

		if (angle_rad != null && angle_rad != 0) {
			this.context.translate(x + width / 2, y + height / 2);
			this.context.rotate(angle_rad);
			try {
				this.context.drawImage(image, -width / 2, -height / 2, width, height);
			} catch (e) {
				console.log(e);
			}
			this.context.rotate(-angle_rad);
			this.context.translate(-(x + width / 2), -(y + height / 2));
		} else {
			try {
				this.context.drawImage(image, x, y, width, height);
			} catch (e) {
				console.log(e);
			}
		}
	}

	onclick(action) {
		const ref = this;
		this.canvas.addEventListener("mousedown", function (event) {
			if (event.button === 0) {
				const rect = ref.canvas.getBoundingClientRect();
				const x = (event.clientX - rect.left) / ref.scale;
				const y = (event.clientY - rect.top) / ref.scale;
				action(x, y);
			}
		});
	}

	resize(_width, _height) {
		this.width = _width;
		this.height = _height;
		this.canvas.width = _width;
		this.canvas.height = _height;
		this.clear();
	}

	clear(x, y, width, height) {
		if (x == null) {
			x = 0;
		}
		if (y == null) {
			y = 0;
		}
		if (width == null) {
			width = this.canvas.width / this.scale;
		}
		if (height == null) {
			height = this.canvas.height / this.scale;
		}
		this.context.clearRect(x, y, width, height);
	}

	cursor(cursor_url) {
		let cursor = (cursor_url != null) ? "url('" + cursor_url + "'), " : "";
		this.canvas.style.cursor = cursor + "auto";
	}
}

class Grid extends GameCanvas {
	constructor(parent_selector, _width, _height, _nbr_frames_x, _nbr_frames_y, _id = "game_canvas", _grid_color = "black") {
		super(parent_selector, _width, _height, _id);
		this.nbr_frames_x = _nbr_frames_x;
		this.nbr_frames_y = _nbr_frames_y;
		this.grid_color = _grid_color;

		this.resize();
		this.clear();
	}

	drawImageFrame(image, x, y, angle_rad) {
		this.context.imageSmoothingEnabled = false;
		const pos = this.get_nearest_frame(x, y);
		this.drawImage(image, pos.x, pos.y, this.frame_width, this.frame_height, angle_rad);
	}

	drawImageAtIndex(image, i, j, angle_rad) {
		const x = i * this.frame_width;
		const y = j * this.frame_height;
		this.drawImageFrame(image, x, y, angle_rad);
	}

	get_nearest_frame(x, y) {
		const posx = x - (x % this.frame_width);
		const posy = y - (y % this.frame_height);
		return {
			x: posx,
			y: posy
		};
	}

	get_index_of_pos(x, y) {
		const indexx = Math.floor(x / this.frame_width);
		const indexy = Math.floor(y / this.frame_height);
		return {
			x: indexx,
			y: indexy
		};
	}

	get_pos_of_index(indexx, indexy) {
		const posx = indexx * this.frame_width;
		const posy = indexy * this.frame_height;
		return {
			x: posx,
			y: posy
		};
	}

	calculate_frame_size() {
		if (this.nbr_frames_x != null && this.nbr_frames_y != null) {
			this.frame_width = Math.floor((this.width - 1) / this.nbr_frames_x);
			this.frame_height = Math.floor((this.height - 1) / this.nbr_frames_y);
		}
	}

	resize() {
		this.calculate_frame_size();
		this.width = this.nbr_frames_x * this.frame_width + 1;
		this.height = this.nbr_frames_y * this.frame_height + 1;
	}

	draw_grid() {
		if (this.nbr_frames_x != null && this.nbr_frames_y != null) {
			for (let x_counter = 0; x_counter < this.nbr_frames_x; x_counter++) {
				for (let y_counter = 0; y_counter < this.nbr_frames_y; y_counter++) {
					this.strokeRect(x_counter * this.frame_width, y_counter * this.frame_height, this.frame_width, this.frame_height, this.grid_color);
				}
			}
		}
	}

	clear() {
		super.clear();
		this.draw_grid();
	}

	set width(value) {
		super.width = value;
		this.calculate_frame_size();
	}
	get width() {
		return super.width;
	}

	set height(value) {
		super.height = value;
		this.calculate_frame_size();
	}
	get height() {
		return super.height;
	}
}

class Drawable {
	constructor(_game_canvas, _image, _x, _y, _angle_rad = 0) {
		this.game_canvas = _game_canvas;
		this.image = _image;
		this.x = _x;
		this.y = _y;
		this.angle_rad = _angle_rad;
	}

	draw() {
		this.game_canvas.drawImage(this.image, this.x, this.y, this.image.width, this.image.height, this.angle_rad);
	}
}

class GridDrawable {
	constructor(_game_canvas, _image, _x_index, _y_index, _angle_rad = 0) {
		this.game_canvas = _game_canvas;
		this.image = _image;
		this.x_index = _x_index;
		this.y_index = _y_index;
		this.angle_rad = _angle_rad;
	}

	draw() {
		this.game_canvas.drawImageAtIndex(this.image, this.x_index, this.y_index, this.angle_rad);
	}

	redraw() {
		const fw = this.game_canvas.frame_width,
			fh = this.game_canvas.frame_height;
		this.game_canvas.context.clearRect(this.x_index * fw + 1, this.y_index * fh + 1, fw - 2, fh - 2);
		this.draw();
	}
}