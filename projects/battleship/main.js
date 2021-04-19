let svg = document.getElementById("svg");
const svg_width = 100;
const svg_height = 100;

const BOATS = [2, 3, 3, 4, 5];
let ai_grid = [];
let ai_boats = [];
let player_grid = [];
let player_boats = [];

function create_grid(n_x = 10, n_y = 10) {
	const grid_group = svgg(svg, "grid");
	const rect_width = svg_width / n_x;
	const rect_height = svg_height / n_y;
	for (let i = 0; i < n_x; i++) {
		for (let j = 0; j < n_y; j++) {
			svgrect(grid_group, i * rect_width, j * rect_height, rect_width, rect_height, "grid-rect");
		}
	}
}

function load() {
	create_grid();
}

document.onload = load();