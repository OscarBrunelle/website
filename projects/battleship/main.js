let svg = document.getElementById("svg");
const svg_width = 100;
const svg_height = 100;

const STATES = {
	"GUESSING": 0,
	"PLACING_BOAT": 1
};
let current_state = STATES.PLACING_BOAT;
let boat_selected = null;
let boat_rotated = false;

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
			let container = svgcontainer(grid_group, i * rect_width, j * rect_height, rect_width, rect_height, "grid-square");
			let rect = svgrect(container, 0, 0, rect_width, rect_height, "grid-rect");
			rect.addEventListener("click", function () {
				console.log(rect);
				svgline(container, 0, 0, rect_width, rect_height, "grid-line");
				svgline(container, rect_width, 0, 0, rect_height, "grid-line");
			});
		}
	}
}

function set_remaining_boats(boat_size, n_remaining) {
	document.querySelector("#boat-" + boat_size + " span").innerHTML = n_remaining + " restant" + (n_remaining > 1 ? "s" : "");
}

function select_boat(boat_size) {

}

function load() {
	svg.addEventListener("click", function (e) {
		console.log("svg right");
	});
	svg.addEventListener("contextmenu", function (e) {
		e.preventDefault();
		if (current_state == STATES.PLACING_BOAT) {
			boat_rotated = !boat_rotated;
		}
	});
	create_grid();
}

document.onload = load();