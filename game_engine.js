"use strict"

/*
TODO
multiple layers canvas
this.delete = false; variable
improve collision detection
a* algorithm
*/

const UNDEFINED_IMAGE = new Image();

class GameCanvas {
	constructor(parent_selector, _width, _height, id = "game_canvas") {
		let canvas = document.getElementById(id);
		if (canvas == null) {
			canvas = document.createElement("canvas");
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

		this.canvas.addEventListener("contextmenu", function (event) {
			event.preventDefault();
		});
		this.scale = 1;
		this.canvas.addEventListener("wheel", event => {
			event.preventDefault();
			const delta = Math.sign(event.deltaY);
			const multiplicator = delta < 0 ? 2 : 0.5;
			if (this.scale <= 1 && multiplicator <= 1) {
				return;
			}
			this.context.scale(multiplicator, multiplicator);
			this.scale *= multiplicator;
			this.translate(0, 0);
			/*
						const rect = this.canvas.getBoundingClientRect();
						const x = (event.clientX - rect.left) * this.scale;
						const y = (event.clientY - rect.top) * this.scale;
						let t_x;
						if (x - this.translate_x < this.width / this.scale / 2) {
							t_x = 0;
						} else if (x - this.translate_x > this.width / this.scale * 3 / 2) {
							t_x = this.width / this.scale * 2;
						} else {
							t_x = x - this.translate_x + this.width * this.scale / 2;
						}
						const t_y = y - this.translate_y + this.height * this.scale / 2;
						console.log(x,y,t_x,t_y);
						this.translate(t_x, t_y);
						/**/
		});
		this.translate_x = 0;
		this.translate_y = 0;
		let mouse_x, mouse_y;
		let mouse_buttons_pressed = {};
		this.previous_cursor;
		this.canvas.addEventListener("mousedown", event => {
			if (event.button === 1 || event.button === 2) {
				event.preventDefault();

				mouse_buttons_pressed[event.button] = true;
				const rect = this.canvas.getBoundingClientRect();
				mouse_x = (event.clientX - rect.left);
				mouse_y = (event.clientY - rect.top);
				this.previous_cursor = this.canvas.style.cursor;
				this.cursor("move", false);

				if (event.button === 2 && this.onrightclick != null) {
					this.onrightclick(mouse_x, mouse_y);
				}
			}
		});
		this.canvas.addEventListener("mouseup", event => {
			if (event.button === 1 || event.button === 2) {
				mouse_buttons_pressed[event.button] = false;
				const rect = this.canvas.getBoundingClientRect();
				const x = (event.clientX - rect.left);
				const y = (event.clientY - rect.top);
				let t_x = x - mouse_x;
				let t_y = y - mouse_y;
				this.translate(t_x, t_y);
				this.cursor(this.previous_cursor, false);
			}
		});
		this.canvas.addEventListener("mousemove", event => {
			if (mouse_buttons_pressed["1"] || mouse_buttons_pressed["2"]) {
				const rect = this.canvas.getBoundingClientRect();
				const x = (event.clientX - rect.left);
				const y = (event.clientY - rect.top);
				let t_x = x - mouse_x;
				let t_y = y - mouse_y;
				this.translate(t_x, t_y);
				mouse_x = x;
				mouse_y = y;
			}
		});
		this.key_map = {};
		document.getElementById(this.id).addEventListener("keydown", event => {
			this.key_map[event.key] = true;
			if (this.onkeydown_action != null) {
				this.onkeydown_action(event.key);
			}
		});
		document.getElementById(this.id).addEventListener("keyup", event => {
			this.key_map[event.key] = false;
		});
		document.getElementById(this.id).addEventListener("focusout", event => {
			this.key_map = {};
			mouse_buttons_pressed = {};
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
		if (this.context != null) {
			this.clear();
		}
	}
	get width() {
		return this.w;
	}

	set height(value) {
		this.h = value;
		this.canvas.height = value;
		if (this.context != null) {
			this.clear();
		}
	}
	get height() {
		return this.h;
	}

	strokeRect(x, y, width, height, color) {
		x = x - width / 2;
		y = y - height / 2;
		x = (Math.floor(x / 0.5) * 0.5) % 1 === 0.5 ? (Math.floor(x / 0.5) * 0.5) : (Math.floor((x + 0.5) / 0.5) * 0.5);
		y = (Math.floor(y / 0.5) * 0.5) % 1 === 0.5 ? (Math.floor(y / 0.5) * 0.5) : (Math.floor((y + 0.5) / 0.5) * 0.5);
		width = Math.floor(width);
		height = Math.floor(height);
		this.context.save();
		this.context.lineWidth = 1;
		this.context.strokeStyle = color;
		this.context.strokeRect(x, y, width, height);
		this.context.restore();
	}

	fillRect(x, y, width, height, color) {
		x = x - width / 2;
		y = y - height / 2;
		x = (Math.floor(x / 0.5) * 0.5) % 1 === 0.5 ? (Math.floor(/*++*/x / 0.5) * 0.5) : (Math.floor((x + 0.5) / 0.5) * 0.5);
		y = (Math.floor(y / 0.5) * 0.5) % 1 === 0.5 ? (Math.floor(/*++*/y / 0.5) * 0.5) : (Math.floor((y + 0.5) / 0.5) * 0.5);
		width = Math.floor(width);
		height = Math.floor(height);
		this.context.save();
		this.context.lineWidth = 1;
		this.context.fillStyle = color;
		this.context.fillRect(x, y, width, height);
		this.context.restore();
	}

	fillText(text, x, y) {
		this.context.fillText(text, x, y);
	}

	drawObj(obj) {
		this.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
	}

	drawImage(image, x, y, width, height, rotation_rad = 0) {
		if (width == null) {
			width = image.width;
		}
		if (height == null) {
			height = image.height;
		}
		x = Math.round(x) + 0.5;
		y = Math.round(y) + 0.5;

		if (rotation_rad != null && rotation_rad != 0) {
			this.context.translate(x, y);
			this.context.rotate(rotation_rad);
			try {
				this.context.drawImage(image, -width / 2, -height / 2, width, height);
			} catch (e) {
				console.log(e);
			}
			this.context.rotate(-rotation_rad);
			this.context.translate(-x, -y);
		} else {
			try {
				this.context.drawImage(image, x - width / 2, y - height / 2, width, height);
			} catch (e) {
				console.log(e);
			}
		}
	}

	onclick(action) {
		this.canvas.addEventListener("mousedown", event => {
			if (event.button === 0) {
				const rect = this.canvas.getBoundingClientRect();
				const x = (event.clientX - rect.left) / this.scale - this.translate_x / this.scale;
				const y = (event.clientY - rect.top) / this.scale - this.translate_y / this.scale;
				action(x, y);
			}
		});
	}

	/**
	 * Returns true if the key with name 'key_name' is pressed.
	 * Ifthe key is not registered, returns false.
	 * @param {String} key_name 
	 */
	key_pressed(key_name) {
		return (this.key_map[key_name] != null ? this.key_map[key_name] : false);
	}

	resize(_width, _height) {
		this.width = _width;
		this.height = _height;
		this.canvas.width = _width;
		this.canvas.height = _height;
		this.clear();
	}

	translate(t_x, t_y) {
		if (this.translate_x * this.scale < this.width - this.width * this.scale) {
			t_x = (-this.translate_x * this.scale + (this.width - this.width * this.scale)) / this.scale;
		} else if (this.translate_x > 0 || t_x > -this.translate_x) {
			t_x = -this.translate_x;
		} else if ((this.translate_x + t_x) * this.scale < this.width - this.width * this.scale) {
			t_x = (-this.translate_x * this.scale + (this.width - this.width * this.scale)) / this.scale;
		}
		this.translate_x += t_x;
		if (this.translate_y * this.scale < this.height - this.height * this.scale) {
			t_y = (-this.translate_y * this.scale + (this.height - this.height * this.scale)) / this.scale;
		} else if (this.translate_y > 0 || t_y > -this.translate_y) {
			t_y = -this.translate_y;
		} else if ((this.translate_y + t_y) * this.scale < this.height - this.height * this.scale) {
			t_y = (-this.translate_y * this.scale + (this.height - this.height * this.scale)) / this.scale;
		}
		this.translate_y += t_y;
		this.context.setTransform(this.scale, 0, 0, this.scale, this.translate_x, this.translate_y);
		this.clear();
	}

	cursor(cursors, auto_cursor = true) {
		let cursor = "";
		if (cursors instanceof Array) {
			for (let i = 0; i < cursors.length; i++) {
				const cursor_string = cursors[i];
				cursor += cursor_string;
				if (i !== cursors.length - 1 || auto_cursor) {
					cursor += ", ";
				}
			}
		} else if (cursors != null) {
			cursor = cursors;
			if (auto_cursor) {
				cursor += ", ";
			}
		}
		if (auto_cursor) {
			cursor += "auto";
		}
		this.canvas.style.cursor = cursor;
	}

	clear(x, y, width, height) {
		if (x == null && y == null && width == null && height == null) {
			this.context.save();
			this.context.setTransform(1, 0, 0, 1, 0, 0);
			this.context.clearRect(0, 0, this.width, this.height);
			this.context.restore();
		} else {
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

		if (this.onredraw != null) {
			this.onredraw();
		}
	}

	reset_view() {
		this.scale = 1;
		this.context.setTransform(1, 0, 0, 1, 0, 0);
		this.translate_x = 0;
		this.translate_y = 0;
	}
}

class Grid extends GameCanvas {
	constructor(parent_selector, _width, _height, _number_frames_x, _number_frames_y, _id = "game_canvas", _grid_color = "black") {
		super(parent_selector, _width, _height, _id);
		this.number_frames_x = _number_frames_x;
		this.number_frames_y = _number_frames_y;
		this.grid_color = _grid_color;

		this.context.imageSmoothingEnabled = false;

		this.resize();
		this.clear();
	}

	drawImageFrame(image, x, y, rotation_rad) {
		const pos = this.get_nearest_frame(x, y);
		this.drawImage(image, pos.x + this.frame_width / 2, pos.y + this.frame_height / 2, this.frame_width, this.frame_height, rotation_rad);
	}

	drawImageAtIndex(image, i, j, rotation_rad) {
		const x = i * this.frame_width;
		const y = j * this.frame_height;
		this.drawImageFrame(image, x, y, rotation_rad);
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
		const posx = (indexx + 0.5) * this.frame_width;
		const posy = (indexy + 0.5) * this.frame_height;
		return {
			x: posx,
			y: posy
		};
	}

	get_border_pos_of_index(indexx, indexy, direction) {
		const pos = this.get_pos_of_index(indexx, indexy);
		switch (direction) {
			case 0:
				pos.y += this.frame_height / 2;
				break;
			case 1:
				pos.x -= this.frame_width / 2;
				break;
			case 2:
				pos.y -= this.frame_height / 2;
				break;
			case 3:
				pos.x += this.frame_width / 2;
				break;
			default:
				console.log("Unknown direction " + direction);
				break;
		}
		return pos;
	}

	calculate_frame_size() {
		if (this.number_frames_x != null && this.number_frames_y != null) {
			this.frame_width = Math.floor((this.width - 1) / this.number_frames_x);
			this.frame_height = Math.floor((this.height - 1) / this.number_frames_y);
		}
	}

	resize() {
		this.calculate_frame_size();
		this.width = this.number_frames_x * this.frame_width + 1;
		this.height = this.number_frames_y * this.frame_height + 1;
	}

	draw_grid() {
		if (this.number_frames_x != null && this.number_frames_y != null) {
			for (let x_counter = 0; x_counter < this.number_frames_x; x_counter++) {
				for (let y_counter = 0; y_counter < this.number_frames_y; y_counter++) {
					this.strokeRect(x_counter * this.frame_width + this.frame_width / 2, y_counter * this.frame_height + this.frame_height / 2, this.frame_width, this.frame_height, this.grid_color);
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
	/**
	 * Provides methods to draw more easily objects on a canvas.
	 * @param {GameCanvas} game_canvas 
	 * @param {Array} obj_desc Options:
	 * 		image: Image
	 * 		color: String
	 * 		x: Number
	 * 		y: Number
	 * 		grid_x: Number
	 * 		grid_y: Number
	 * 		width: Number
	 * 		height: Number
	 * 		rotation_rad: Number - Rotation of the object in radians
	 */
	constructor(game_canvas, obj_desc = {}) {
		this.game_canvas = game_canvas;
		this.image = obj_desc["image"] != null ? obj_desc["image"] : null;
		this.color = obj_desc["color"] != null ? obj_desc["color"] : null;
		if (obj_desc["grid_x"] != null && obj_desc["grid_y"] != null) {
			this.grid_x = obj_desc["grid_x"] != null ? obj_desc["grid_x"] : 0;
			this.grid_y = obj_desc["grid_y"] != null ? obj_desc["grid_y"] : 0;
		} else {
			this.x = obj_desc["x"] != null ? obj_desc["x"] : 0;
			this.y = obj_desc["y"] != null ? obj_desc["y"] : 0;
		}
		this.width = obj_desc["width"] != null ? obj_desc["width"] : (this.game_canvas instanceof Grid ? this.game_canvas.frame_width : (this.image != null ? this.image.width : 0));
		this.height = obj_desc["height"] != null ? obj_desc["height"] : (this.game_canvas instanceof Grid ? this.game_canvas.frame_height : (this.image != null ? this.image.height : 0));
		this.rotation_rad = obj_desc["rotation_rad"] != null ? obj_desc["rotation_rad"] : 0;
	}

	// Getters and setters
	/**
	 * Index of the object on the x axis of the grid.
	 * @param {Number} value
	 */
	set grid_x(value) {
		this.x_index = value;
		this.x = (this.x_index + 0.5) * this.game_canvas.frame_width;
	}
	get grid_x() {
		return this.x_index;
	}
	/**
	 * Index of the object on the y axis of the grid.
	 * @param {Number} value
	 */
	set grid_y(value) {
		this.y_index = value;
		this.y = (this.y_index + 0.5) * this.game_canvas.frame_height;
	}
	get grid_y() {
		return this.y_index;
	}

	//functions
	draw() {
		if (this.image != null) {
			this.game_canvas.drawImage(this.image, this.x, this.y, this.width, this.height, this.rotation_rad);
		} else if (this.color != null) {
			this.game_canvas.fillRect(this.x, this.y, this.width, this.height, this.color);
		}
	}

	redraw() {
		const fw = this.game_canvas.frame_width;
		const fh = this.game_canvas.frame_height;
		this.game_canvas.context.clearRect(this.x_index * fw + 1, this.y_index * fh + 1, fw - 2, fh - 2);
		this.draw();
	}
}

class Movable extends Drawable {
	/**
	 * Child of the Drawable class, adds movement capabilities.
	 * @param {GameCanvas} game_canvas 
	 * @param {Array} obj_desc Options:
	 * 		image: Image
	 * 		color: String
	 * 		x: Number
	 * 		y: Number
	 * 		grid_x: Number
	 * 		grid_y: Number
	 * 		width: Number
	 * 		height: Number
	 * 		rotation_rad: Number - Rotation of the object in radians
	 * 		speed: Number
	 */
	constructor(game_canvas, obj_desc) {
		super(game_canvas, obj_desc);
		this.speed = obj_desc["speed"] != null ? obj_desc["speed"] : 0;
		this.acceleration = 0;
		/*
		this.speed_x = obj_desc["speed_x"] != null ? obj_desc["speed_x"] : 0;
		this.speed_y = obj_desc["speed_y"] != null ? obj_desc["speed_y"] : 0;
		*/
		this.enableLeaving = false;
		this.enableGravity = false;
		this.gravity_factor = 1;
		this.enableBouncing = true;
		this.bounce_factor = 0.8;
	}

	update_pos(milli) {
		//TODO: update pos depending on time diff
		const movement_x = this.speed * Math.cos(this.rotation_rad);
		const movement_y = this.speed * Math.sin(this.rotation_rad);
		this.x += movement_x;
		this.y += movement_y;

		let collision = collision_detection(this, this.game_canvas);
		if (!collision.inside && !this.enableLeaving) {
			this.x -= movement_x;
			this.y -= movement_y;
		}
		/*
		if (!this.enableLeaving) {
			if ((this.x - this.width / 2) < (this.game_canvas.x - this.game_canvas.width / 2)) {
				this.x = this.width / 2;
			}
			if ((this.x + this.width / 2) > (this.game_canvas.x + this.game_canvas.width / 2)) {
				this.x = this.game_canvas.x + this.game_canvas.width / 2 - this.width / 2;
			}
			if ((this.y - this.height / 2) < (this.game_canvas.y - this.game_canvas.height / 2)) {
				this.y = this.height / 2;
			}
			if ((this.y + this.height / 2) > (this.game_canvas.y + this.game_canvas.height / 2)) {
				this.y = this.game_canvas.y + this.game_canvas.height / 2 - this.height / 2;
			}
		}
		*/
		if (!collision.inside && this.enableBouncing) {
			this.speed *= -this.bounce_factor;
		}

		return collision;
	}
}

class Controllable extends Movable {
	/**
	 * Child of the Movable class, adds controls capabilities.
	 * @param {GameCanvas} game_canvas 
	 * @param {Array} obj_desc Options:
	 * 		image: Image
	 * 		color: String
	 * 		x: Number
	 * 		y: Number
	 * 		grid_x: Number
	 * 		grid_y: Number
	 * 		width: Number
	 * 		height: Number
	 * 		rotation_rad: Number - Rotation of the object in radians
	 * 		speed: Number
	 */
	constructor(game_canvas, obj_desc) {
		super(game_canvas, obj_desc);

		this.speeding = false;
		this.braking = false;
		this.left_turn = false;
		this.right_turn = false;
	}

	update_pos(milli) {
		const gc = this.game_canvas;
		this.speeding = gc.key_pressed("ArrowUp") || gc.key_pressed("z");
		this.left_turn = gc.key_pressed("ArrowLeft") || gc.key_pressed("q");
		this.braking = gc.key_pressed("ArrowDown") || gc.key_pressed("s");
		this.right_turn = gc.key_pressed("ArrowRight") || gc.key_pressed("d");

		const MAX_SPEED = 10;
		if ((this.speeding && this.braking) || (!this.speeding && !this.braking)) {
			this.acceleration = -(Math.sign(this.speed)) * 0.2;
			if (this.speed > 0) {
				this.speed = Math.max(this.speed + this.acceleration, 0);
			} else {
				this.speed = Math.min(this.speed + this.acceleration, 0);
			}
		} else if (this.speeding) {
			this.acceleration = +0.5;
			this.speed = Math.min(this.speed + this.acceleration, MAX_SPEED);
		} else if (this.braking) {
			this.acceleration = -0.5;
			this.speed = Math.max(this.speed + this.acceleration, -MAX_SPEED);
		}

		if (this.left_turn) {
			if (!this.right_turn) {
				this.rotation_rad -= this.speed / 100;
			}
		} else if (this.right_turn) {
			this.rotation_rad += this.speed / 100;
		}

		super.update_pos();
	}
}

function collision_detection(element, target, side) {
	target.x = target.x != null ? target.x : 0;
	target.y = target.y != null ? target.y : 0;

	let collision_detected = false;
	let min_dist = Infinity;

	const t_sides = {
		top: target.y - target.height / 2,
		left: target.x - target.width / 2,
		bottom: target.y + target.height / 2,
		right: target.x + target.width / 2
	};
	const corners = [
		[-1, 1],
		[-1, -1],
		[1, -1],
		[1, 1]
	];
	let inside = true;
	for (const corner_pos of corners) {
		const corner = {
			x: corner_pos[0] * element.width / 2 * Math.cos(element.rotation_rad) + corner_pos[1] * element.height / 2 * Math.sin(element.rotation_rad),
			y: corner_pos[0] * element.width / 2 * Math.sin(element.rotation_rad) + corner_pos[1] * element.height / 2 * Math.cos(element.rotation_rad),
		};
		const x = element.x + corner.x;
		const y = element.y + corner.y;
		if (x > t_sides.left && x < t_sides.right && y > t_sides.top && y < t_sides.bottom) {
			let dist = Math.min(x - t_sides.left, t_sides.right - x, y - t_sides.top, t_sides.bottom - y);
			if (min_dist == null || dist > min_dist) {
				min_dist = dist;
			}
			collision_detected = true;
		} else {
			inside = false;
		}
	}
	return {
		collision: collision_detected,
		min_dist: min_dist,
		inside: inside
	};

	const el_to = element.y - element.height / 2;
	const el_le = element.x - element.width / 2;
	const el_bo = element.y + element.height / 2;
	const el_ri = element.x + element.width / 2;
	const ta_to = target.y - target.height / 2;
	const ta_le = target.x - target.width / 2;
	const ta_bo = target.y + target.height / 2;
	const ta_ri = target.x + target.width / 2;
	if ((el_le < ta_ri) && (el_ri > ta_le) && (el_to < ta_bo) && (el_bo > ta_to)) {
		function min_distance(a, b) {
			if (a < 0) {
				return b;
			} else if (b < 0) {
				return a;
			} else {
				return Math.min(a, b);
			}
		}
		let top = min_distance(el_to - ta_to, el_bo - ta_to);
		let left = min_distance(el_le - ta_le, el_ri - ta_le);
		let bottom = min_distance(ta_bo - el_bo, ta_bo - el_to);
		let right = min_distance(ta_ri - el_ri, ta_ri - el_le);
		if (side == null) {
			return Math.min(top, left, bottom, right);
		}
		switch (side) {
			case 0:
				return right;
				break;
			case 1:
				return bottom;
				break;
			case 2:
				return left;
				break;
			case 3:
				return top;
				break;
			default:
				console.log("Error: side value '" + side + "' is incorrect.");
				break;
		}
	}
	return -1;
}