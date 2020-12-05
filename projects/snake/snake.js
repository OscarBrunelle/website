const NUMBER_FRAMES_X = 10;
const NUMBER_FRAMES_Y = 10;

const DIRECTIONS = {
	"UP": 0,
	"LEFT": 1,
	"DOWN": 2,
	"RIGHT": 3
};

let grid;
let snake;
let score;
let fruit;

let game_lost;

let speed = 100;

let d_t;
let previous_time;
let previous_direction;

function update(time_from_start = 0) {
	d_t += time_from_start - previous_time;
	previous_time = time_from_start;

	if (d_t > speed || time_from_start === 0) {
		d_t = 0;
		previous_direction = snake.direction;
		grid.clear();
		snake.update();
		snake.draw();
		fruit.draw();
	}

	if (!game_lost) {
		requestAnimationFrame(update);
	}
}

function load_snake() {
	grid = new Grid("#main", 400, 400, NUMBER_FRAMES_X, NUMBER_FRAMES_Y);
	grid.canvas.focus();
	snake = new Snake();
	fruit = new Fruit();

	game_lost = false;

	grid.onkeydown_action = function (key) {
		switch (key) {
			case "ArrowUp":
				if (previous_direction !== DIRECTIONS.DOWN) {
					snake.direction = DIRECTIONS.UP;
				}
				break;
			case "ArrowLeft":
				if (previous_direction !== DIRECTIONS.RIGHT) {
					snake.direction = DIRECTIONS.LEFT;
				}
				break;
			case "ArrowDown":
				if (previous_direction !== DIRECTIONS.UP) {
					snake.direction = DIRECTIONS.DOWN;
				}
				break;
			case "ArrowRight":
				if (previous_direction !== DIRECTIONS.LEFT) {
					snake.direction = DIRECTIONS.RIGHT;
				}
				break;
			default:
				break;
		}
	};

	update();
}

function lose() {
	game_lost = true;
	alert("Lost");
	reset();
	update();
}

function reset() {
	game_lost = false;
	snake.reset();
	previous_direction = null;
	fruit.reset();

	//update();
}

class Snake extends Controllable {
	constructor() {
		let starting_pos = random_pos();
		super(grid, {
			grid_x: starting_pos.x,
			grid_y: starting_pos.y
		});

		this.add_part();
	}

	add_part() {
		let new_part;
		if (this.parts == null || this.parts.length < 1) {
			this.parts = [];
			new_part = new SnakePart(this.grid_x, this.grid_y);
		} else {
			let last_part = this.parts[this.parts.length - 1];
			new_part = new SnakePart(last_part.grid_x, last_part.grid_y, this.parts.length);
			new_part.direction = last_part.direction;
		}
		this.parts.push(new_part);
		new_part.draw();
	}

	draw() {
		for (const part of this.parts) {
			part.draw();
		}
	}

	update() {
		if (this.parts == null) {
			return;
		}

		let parts_length = this.parts.length;
		let last_direction = this.direction;
		let head = this.parts[0];
		let next_head_pos = head.next_position();
		if (next_head_pos.x < 0 || next_head_pos.x > grid.number_frames_x || next_head_pos.y < 0 || next_head_pos.y > grid.number_frames_y) {
			head.color = "red";
			lose();
			return;
		}

		if (next_head_pos.x === fruit.grid_x && next_head_pos.y === fruit.grid_y) {
			this.add_part();
			fruit.reset();
		}

		for (let i = 0; i < parts_length; i++) {
			const part = this.parts[i];
			if (this.direction != null) {
				[part.direction, last_direction] = [last_direction, part.direction];
			}
			part.update();
		}

		for (let i = 1; i < this.parts.length; i++) {
			const part = this.parts[i];
			if (part.grid_x === head.grid_x && part.grid_y === head.grid_y) {
				head.color = "red";
				lose();
				return;
			}
		}
	}

	reset() {
		this.parts = [];
		let starting_pos = random_pos();
		this.grid_x = starting_pos.x;
		this.grid_y = starting_pos.y;
		this.direction = null;

		this.add_part();
	}
}

class SnakePart extends Movable {
	constructor(x, y, index = 0) {
		let multiplier = Math.max(0.5, 1 - index / 50);
		super(grid, {
			grid_x: x,
			grid_y: y,
			width: grid.frame_width * multiplier,
			height: grid.frame_height * multiplier,
			color: "brown"
		});
	}

	next_position() {
		let x = this.grid_x;
		let y = this.grid_y;
		switch (this.direction) {
			case DIRECTIONS.UP:
				y--;
				break;
			case DIRECTIONS.LEFT:
				x--;
				break;
			case DIRECTIONS.DOWN:
				y++;
				break;
			case DIRECTIONS.RIGHT:
				x++;
				break;
			default:
				break;
		}
		return {
			x: x,
			y: y
		};
	}

	update() {
		let next_pos = this.next_position();
		this.grid_x = next_pos.x;
		this.grid_y = next_pos.y;
	}
}

class Fruit extends Drawable {
	constructor() {
		let starting_pos = random_pos();
		super(grid, {
			grid_x: starting_pos.x,
			grid_y: starting_pos.y,
			width: grid.frame_width / 2,
			height: grid.frame_height / 2,
			color: "green"
		});

		this.reset();
	}

	reset() {
		let pos = random_pos();
		while (test_for_conflict(pos)) {
			pos = random_pos();
		}
		this.grid_x = pos.x;
		this.grid_y = pos.y;
	}
}

function random_pos() {
	let x = Math.floor(Math.random() * NUMBER_FRAMES_X);
	let y = Math.floor(Math.random() * NUMBER_FRAMES_Y);

	return {
		x: x,
		y: y
	};
}

function test_for_conflict(pos) {
	for (let i = 1; i < snake.parts.length; i++) {
		const part = snake.parts[i];
		if (part.grid_x === pos.x && part.grid_y === pos.y) {
			return true;
		}
	}
	return false;
}

document.onload = load_snake();