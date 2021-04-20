let svg = document.getElementById("svg");
const svg_width = 100;
const svg_height = 100;

const STATES = {
	"GUESSING": 0,
	"PLACING_BOAT": 1
};
let current_state = STATES.GUESSING;
let selected_boat_size = null;
let boat_rotated = false;

let rect_width, rect_height;

const BOATS = [2, 3, 3, 4, 5];
let ai_grid = [];
let ai_boats = [];
let player_grid = [];
let player_boats = [];

/*
TODO: check positions relative to the other boats
change cursor depending on guess and boat being placed
add visual feedback when placing a boat (previsualisation of boat pos)
add visual feedback when wrong position
play against ai?
add opponent grid ?
*/

class Boat {
	constructor(x, y, size, rotated = false) {
		this.positions = [];
		for (let i = 0; i < size; i++) {
			const container = document.getElementById("grid-square-" + x + "-" + y);
			svgrect(container, 0, 0, rect_width, rect_height, "grid-boat");
			if (!rotated) {
				x++;
			} else {
				y++;
			}
		}
	}
}

function add_boat(i, j) {
	if (selected_boat_size == null || get_remaining_boats(selected_boat_size) <= 0) return;
	const max_x = svg_width / rect_width;
	const max_y = svg_height / rect_height;
	if (!(check_n(i, 0, max_x) && check_n(j, 0, max_y) && ((!boat_rotated && check_n(i + selected_boat_size, 0, max_x)) || (boat_rotated && check_n(j + selected_boat_size, 0, max_y))))) {
		return;
	}

	player_boats.push(new Boat(i, j, selected_boat_size, boat_rotated));
	set_remaining_boats(selected_boat_size);
}

function create_grid(n_x = 10, n_y = 10) {
	const grid_group = svgg(svg, "grid");
	rect_width = svg_width / n_x;
	rect_height = svg_height / n_y;
	for (let i = 0; i < n_x; i++) {
		for (let j = 0; j < n_y; j++) {
			let container = svgcontainer(grid_group, i * rect_width, j * rect_height, rect_width, rect_height, "grid-square");
			container.id = "grid-square-" + i + "-" + j;
			let rect = svgrect(container, 0, 0, rect_width, rect_height, "grid-rect");
			rect.addEventListener("click", function () {
				if (current_state == STATES.GUESSING) {
					svgline(container, 0, 0, rect_width, rect_height, "grid-line");
					svgline(container, rect_width, 0, 0, rect_height, "grid-line");
				} else if (current_state == STATES.PLACING_BOAT) {
					add_boat(i, j);
				}
			});
		}
	}
}

function get_remaining_boats(boat_size) {
	return parseInt(document.querySelector("#boat-" + boat_size + " span").innerHTML.split(" ")[0]);
}

function set_remaining_boats(boat_size, n_remaining = get_remaining_boats(boat_size) - 1) {
	let doc_boat_text = document.querySelector("#boat-" + boat_size + " span");
	doc_boat_text.innerHTML = n_remaining + " restant";
	if (n_remaining > 0) {
		doc_boat_text.innerHTML = doc_boat_text.innerHTML + "s";
	} else {
		doc_boat_text.parentElement.disabled = true;
	}
}

function select_boat(boat_size) {
	if (get_remaining_boats(boat_size) > 0) {
		current_state = STATES.PLACING_BOAT;
		selected_boat_size = boat_size;
	} else {
		console.log("All boats of size " + boat_size + " have been placed.");
	}
}

function load() {
	svg.addEventListener("click", function (e) {});
	svg.addEventListener("contextmenu", function (e) {
		e.preventDefault();
		if (current_state == STATES.PLACING_BOAT) {
			boat_rotated = !boat_rotated;
		}
	});
	create_grid();
}

document.onload = load();