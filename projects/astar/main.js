const DEFAULT_NUMBER_NODES_X = 45;
let number_nodes_x = DEFAULT_NUMBER_NODES_X;
const DEFAULT_NUMBER_NODES_Y = 30;
let number_nodes_y = DEFAULT_NUMBER_NODES_Y;
const DEFAULT_NUMBER_OBSTACLES = 300;
let number_obstacles = DEFAULT_NUMBER_OBSTACLES;
const DEFAULT_SEARCH_SPEED = 5;
let search_speed = 5;

let grid;
const svg = document.getElementById("svg");

let nodes = [];
let start = {
	x: 0,
	y: 0
};
let end = {
	x: number_nodes_x - 1,
	y: number_nodes_y - 1
};

function load() {
	grid = new Grid("#grid-div", 300, 200, number_nodes_x, number_nodes_y, "grid");

	create_grid();

	grid.onclick((x, y) => {
		let pos = grid.get_index_of_pos(x, y);
		let node = get_node(pos.x, pos.y);
		clearInterval(best_path_interval);
		node.is_obstacle = !node.is_obstacle;
		find_best_path();
	});
	grid.onredraw = function () {
		for (const node of nodes) {
			node.draw();
		}
	};

	document.getElementById("number_obstacles-input").addEventListener("change", parameter_change);
	document.getElementById("number_nodes_x-input").addEventListener("change", parameter_change);
	document.getElementById("number_nodes_y-input").addEventListener("change", parameter_change);
	document.getElementById("start-x-input").addEventListener("change", parameter_change);
	document.getElementById("start-y-input").addEventListener("change", parameter_change);
	document.getElementById("end-x-input").addEventListener("change", parameter_change);
	document.getElementById("end-y-input").addEventListener("change", parameter_change);
	document.getElementById("search_speed-input").addEventListener("change", parameter_change);
}

function reset_start_and_end() {
	start.x = 0;
	start.y = 0;
	end.x = number_nodes_x - 1;
	end.y = number_nodes_y - 1;
	document.getElementById("start-x-input").value = start.x;
	document.getElementById("start-y-input").value = start.y;
	document.getElementById("end-x-input").value = end.x;
	document.getElementById("end-y-input").value = end.y;
}

function parameter_change(event) {
	let element = event.target;
	let value = parse_input(element.value, true);
	if (value == null) {
		return;
	}

	switch (element.name) {
		case "number_obstacles":
			if (check_number(value, 0, number_nodes_x * number_nodes_y - 2)) {
				number_obstacles = value;
			} else {
				console.log("Error: invalid number of obstacles.");
				console.log("still here");
				return;
			}
			break;
		case "number_nodes_x":
			if (value > 0 && number_obstacles <= (value * number_nodes_y - 2)) {
				number_nodes_x = value;
				reset_start_and_end();
			} else {
				console.error("Error: invalid number of x nodes.");
				return;
			}
			break;
		case "number_nodes_y":
			if (value > 0 && number_obstacles <= (number_nodes_x * value - 2)) {
				number_nodes_y = value;
				reset_start_and_end();
			} else {
				return;
			}
			break;
		case "start-x":
			if (check_number(value, 0, number_nodes_x - 1)) {
				start.x = value;
			} else {
				return;
			}
			break;
		case "start-y":
			if (check_number(value, 0, number_nodes_y - 1)) {
				start.y = value;
			} else {
				return;
			}
			break;
		case "end-x":
			if (check_number(value, 0, number_nodes_x - 1)) {
				end.x = value;
			} else {
				return;
			}
			break;
		case "end-y":
			if (check_number(value, 0, number_nodes_y - 1)) {
				end.y = value;
			} else {
				return;
			}
			break;
		case "search_speed":
			if (check_number(value, 0, 50)) {
				search_speed = value;
				reset_interval();
			} else {
				return;
			}
			break;
		default:
			return;
	}

	document.getElementById("number_obstacles-input").max = (number_nodes_x * number_nodes_y - 2);
	document.getElementById("start-x-input").max = number_nodes_x - 1;
	document.getElementById("start-y-input").max = number_nodes_y - 1;
	document.getElementById("end-x-input").max = number_nodes_x - 1;
	document.getElementById("end-y-input").max = number_nodes_y - 1;

	create_grid();
}

function create_grid() {
	if (number_obstacles > (number_nodes_x * number_nodes_y - 2)) {
		return;
	} else if (
		start.x < 0 || start.x >= number_nodes_x ||
		start.y < 0 || start.y >= number_nodes_y ||
		end.x < 0 || end.x >= number_nodes_x ||
		end.y < 0 || end.y >= number_nodes_y ||
		(start.x === end.x && start.y === end.y)
	) {
		return;
	}
	clearInterval(best_path_interval);
	nodes = [];

	for (let index_x = 0; index_x < number_nodes_x; index_x++) {
		for (let index_y = 0; index_y < number_nodes_y; index_y++) {
			let node = new GridNode(index_x, index_y);
			if (index_x === start.x && index_y === start.y) {
				node.is_start = true;
			} else if (index_x === end.x && index_y === end.y) {
				node.is_end = true;
			}
			nodes.push(node);
		}
	}

	for (let i = number_obstacles; i > 0;) {
		let index_x = Math.floor(Math.random() * number_nodes_x);
		let index_y = Math.floor(Math.random() * number_nodes_y);
		let node = get_node(index_x, index_y);
		if (!node.is_obstacle && !node.is_start && !node.is_end) {
			node.is_obstacle = true;
			i--;
		}
	}

	draw_nodes();
	find_best_path();
}

function draw_node(node) {
	const rect = svgrect(svg, node.grid_x * 160 / number_nodes_x, node.grid_y * 90 / number_nodes_y, 160 / number_nodes_x, 90 / number_nodes_y, "square");
	rect.style.fill = node.color;
}

function draw_nodes() {
	grid.clear();
	svg.innerHTML = "";
	for (const node of nodes) {
		draw_node(node);
	}
}

function get_node(grid_x, grid_y) {
	for (const node of nodes) {
		if (node.grid_x === grid_x && node.grid_y === grid_y) {
			return node;
		}
	}
	return null;
}

function parse_input(value, int_value) {
	if (value == null || value === "") {
		return null;
	} else if (int_value) {
		return parseInt(value);
	}
	return value;
}

let nodes_queue = [];
let nodes_done = [];
let best_path_interval;

function reset_interval() {
	clearInterval(best_path_interval);
	if (search_speed == 0) {
		find_best_path_call(true);
		return;
	}
	best_path_interval = setInterval(find_best_path_call, search_speed);
}

function find_best_path() {
	clearInterval(best_path_interval);
	nodes_queue = [];
	nodes_done = [];
	for (const node of nodes) {
		node.is_path = false;
	}
	draw_nodes();
	let starting_node = get_node(start.x, start.y);
	starting_node.g = 0;
	nodes_queue.push(starting_node);

	reset_interval();
}

function find_best_path_call(no_wait = false) {
	if (nodes_queue.length < 1) {
		clearInterval(best_path_interval);
		return;
	}
	let node = nodes_queue.pop();
	nodes_done.push(node);
	let end_node = get_node(end.x, end.y);
	if (node !== get_node(start.x, start.y) && node !== end_node) {
		node.color = "cyan";
		draw_node(node);
	}
	if (node === end_node) {
		clearInterval(best_path_interval);
		let path = retrieve_path();
		for (const path_node of path) {
			path_node.is_path = true;
		}
		draw_nodes();
		return;
	}
	let neighbours = get_neighbours(node);
	for (const neighbour of neighbours) {
		if (nodes_queue.indexOf(neighbour) < 0 && nodes_done.indexOf(neighbour) < 0) {
			nodes_queue.push(neighbour);
		}
	}
	nodes_queue.sort((a, b) => {
		if (a.f < b.f) {
			return 1;
		} else if (a.f > b.f) {
			return -1;
		}
		return 0;
	});
	if (no_wait == true) {
		find_best_path_call(no_wait);
	}
}

function find_distance(a, b) {
	let dist_x = Math.abs(a.grid_x - b.grid_x);
	let dist_y = Math.abs(a.grid_y - b.grid_y);

	return Math.sqrt((dist_x ** 2 + dist_y ** 2));
}

function get_neighbours(parent_node) {
	let neighbours = [];
	let x = parent_node.grid_x;
	let y = parent_node.grid_y;
	let end_node = get_node(end.x, end.y);
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			let node = get_node(x + i, y + j);
			if (node != null && node != parent_node && !node.is_obstacle) {
				let previous_g = node.g != null ? node.g : Number.MAX_VALUE;
				node.g = Math.min(parent_node.g + find_distance(node, parent_node), previous_g);
				node.h = find_distance(node, end_node);
				node.f = node.g + node.h;
				neighbours.push(node);
			}
		}
	}
	/*neighbours.sort((a, b) => {
		if (a.f < b.f) {
			return -1;
		} else if (a.f > b.f) {
			return 1;
		}
		return 0;
	});*/
	return neighbours;
}

function retrieve_path(path = [get_node(end.x, end.y)]) {
	if (path.length < 1) {
		return [];
	}
	let node = path[0];
	let neighbours = get_neighbours(node);
	let min_f, min_neighbour;
	for (const neighbour of neighbours) {
		if (neighbour === get_node(start.x, start.y)) {
			path.unshift(neighbour);
			return path;
		}
		if (path.indexOf(neighbour) < 0 && (min_f == null || (neighbour.f != null && neighbour.f < min_f))) {
			min_f = neighbour.f;
			min_neighbour = neighbour;
		}
	}
	if (min_f == null || min_neighbour == null) {
		return [];
	}
	path.unshift(min_neighbour);
	return retrieve_path(path);
}

class GridNode extends Drawable {
	constructor(grid_x, grid_y) {
		super(grid, {
			grid_x: grid_x,
			grid_y: grid_y,
		});

		this.is_obstacle = false;
		this.is_path = false;
		this.is_start = false;
		this.is_end = false;
	}

	update_color() {
		if (this.is_start) {
			this.color = "green";
		} else if (this.is_end) {
			this.color = "red";
		} else if (this.is_obstacle) {
			this.color = "grey";
		} else if (this.is_path) {
			this.color = "blue";
		} else {
			this.color = null;
		}
	}

	set is_obstacle(value) {
		this.obstacle = value;
		this.update_color();
		return true;
	}

	get is_obstacle() {
		return this.obstacle != null ? this.obstacle : false;
	}

	set is_path(value) {
		this.path = value;
		this.update_color();
		return true;
	}

	get is_path() {
		return this.path != null ? this.path : false;
	}

	set is_start(value) {
		this.start = value;
		this.update_color();
	}

	get is_start() {
		return this.start != null ? this.start : false;
	}

	set is_end(value) {
		this.end = value;
		this.update_color();
	}

	get is_end() {
		return this.end != null ? this.end : false;
	}
}

document.onload = load();