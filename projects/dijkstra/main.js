const game_canvas = new GameCanvas("#main", 500, 500);
let nodes = [];
const RADIUS = 20;
let next_id = 1;

function find_shortest(id1, id2) {
	let node1, node2;
	for (const node of nodes) {
		if (node.id === id1) {
			node1 = node;
		}
		if (node.id === id2) {
			node2 = node;
		}
	}

	if (node1 == null || node2 == null) {
		console.error("Error: Could not find nodes.");
		return;
	}

	return find_shortest_path(node1, node2);
}

function find_shortest_path(starting_node, end_node, previous_path = {
	path: [],
	cost: 0
}) {
	if (starting_node === end_node) {
		return previous_path;
	}

	let lowest_cost;
	let shortest_path;
	for (const path of starting_node.paths) {
		let test_path = find_shortest_path(path.node, end_node);
		if (test_path.cost < 0) {
			continue;
		}
		test_path.cost += path.cost;
		test_path.path.unshift(path.node);
		if (lowest_cost == null || test_path.cost < lowest_cost) {
			lowest_cost = test_path.cost;
			shortest_path = test_path.path;
		}
	}
	if (lowest_cost == null || shortest_path == null) {
		return {
			path: [],
			cost: -1
		};
	}
	return {
		path: previous_path.path.concat(shortest_path),
		cost: previous_path.cost + lowest_cost
	};
}

function draw_arrow(pos1, pos2, text) {
	const dx = pos1.x - pos2.x;
	const dy = pos1.y - pos2.y;
	const theta = Math.atan2(dy, dx);
	let angle1 = theta - Math.PI / 8;
	let angle2 = theta + Math.PI / 8;
	let x1 = pos1.x - RADIUS * Math.cos(angle1);
	let y1 = pos1.y - RADIUS * Math.sin(angle1);
	let x2 = pos2.x + RADIUS * Math.cos(angle2);
	let y2 = pos2.y + RADIUS * Math.sin(angle2);
	const arrow_end = 15;

	game_canvas.context.save();
	game_canvas.context.beginPath();
	game_canvas.context.moveTo(x1, y1);
	/*if (pos1.y < pos2.y) {
		if (pos1.x < pos2.x) {
			game_canvas.context.bezierCurveTo(pos1.x - 50, pos1.y + 50, pos2.x - 50, pos2.y + 50, pos2.x, pos2.y);
		} else {
			game_canvas.context.bezierCurveTo(pos1.x + 50, pos1.y + 50, pos2.x + 50, pos2.y + 50, pos2.x, pos2.y);
		}
	} else {
		game_canvas.context.lineTo(pos2.x, pos2.y);
	}*/
	game_canvas.context.lineTo(x2, y2);
	let left_angle = theta + Math.PI / 4;
	game_canvas.context.lineTo(x2 + arrow_end * Math.cos(left_angle), y2 + arrow_end * Math.sin(left_angle));
	game_canvas.context.moveTo(x2, y2);
	let right_angle = theta - Math.PI / 4;
	game_canvas.context.lineTo(x2 + arrow_end * Math.cos(right_angle), y2 + arrow_end * Math.sin(right_angle));
	game_canvas.context.stroke();
	let text_x = x1 - (x1 - x2 + RADIUS) / 2;
	let text_y = y1 - (y1 - y2 + RADIUS) / 2;
	let text_size = game_canvas.context.measureText(text);
	const TEXT_HEIGHT = 10;
	game_canvas.context.fillStyle = "white";
	game_canvas.fillRect(text_x, text_y, text_size.width, TEXT_HEIGHT);
	game_canvas.context.fillStyle = "black";
	game_canvas.fillText(text, text_x, text_y);
	game_canvas.context.restore();
}

class Node extends Drawable {
	constructor(x, y, id) {
		super(game_canvas, {
			x: x,
			y: y
		});

		this.id = id;
		this.radius = RADIUS;
		this.paths = [];
	}

	add_neighbour(node, cost) {
		this.paths.push({
			node: node,
			cost: cost
		});
	}

	draw() {
		this.game_canvas.context.beginPath();
		this.game_canvas.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		this.game_canvas.context.stroke();
		this.game_canvas.fillText(this.id, this.x, this.y);
		for (const neighbour of this.paths) {
			let pos1 = {
				x: this.x,
				y: this.y
			};
			let pos2 = {
				x: neighbour.node.x,
				y: neighbour.node.y
			};
			draw_arrow(pos1, pos2, neighbour.cost);
		}
	}
}

function draw_nodes() {
	game_canvas.clear();
	for (const node of nodes) {
		node.draw();
	}
}

function add_path(starting_node, end_node, cost) {
	for (let i = 0; i < starting_node.paths.length; i++) {
		const path = starting_node.paths[i];
		if (path.node === end_node) {
			if (cost < 0) {
				starting_node.paths.splice(i, 1);
			} else {
				starting_node.paths[i].cost = cost;
			}
			draw_nodes();
			return;
		}
	}

	starting_node.add_neighbour(end_node, cost);
	draw_nodes();
}

let starting_node;

function click_action(x, y) {
	let too_near = false;
	for (const node of nodes) {
		if (Math.abs(x - node.x) < node.radius && Math.abs(y - node.y) < node.radius) {
			if (starting_node == null) {
				starting_node = node;
				update_shortest();
				return;
			} else {
				if (node === starting_node) {
					return;
				}
				let cost = prompt("Enter the path cost from node " + starting_node.id + " to node " + node.id + " (negative value to delete)", 1);
				if (cost != null && !Number.isNaN(parseInt(cost))) {
					add_path(starting_node, node, parseInt(cost));
					update_shortest();
				}
				starting_node = null;
				return;
			}
		} else if (Math.abs(x - node.x) < 2 * node.radius && Math.abs(y - node.y) < 2 * node.radius) {
			too_near = true;
		}
	}

	if (!too_near) {
		let node = new Node(x, y, next_id++);
		nodes.push(node);

		draw_nodes();
		update_shortest();
	}
}

function update_shortest() {
	let node1 = parseInt(document.querySelector("input[name='node1']").value);
	let node2 = parseInt(document.querySelector("input[name='node2']").value);
	//node1 == null ||node2 == null

	let result;
	if (Number.isNaN(node1) || Number.isNaN(node2)) {
		result = "Invalid.";
	} else if (node1 > nodes.length || node2 > nodes.length) {
		result = "Node doesn't exist.";
	} else {
		let path = find_shortest(node1, node2);
		if (path.cost < 0) {
			result = "No path possible.";
		} else {
			result = "Cost: " + path.cost;
			for (const node of path.path) {
				result += "<br>Node " + node.id;
			}
		}
	}

	document.querySelector(".result").innerHTML = result;
}

function load_dijkstra() {
	game_canvas.onclick(click_action);
	game_canvas.onredraw = function () {
		for (const node of nodes) {
			node.draw();
		}
	};
	game_canvas.onrightclick = function (x, y) {
		let clicked_node;
		for (let i = 0; i < nodes.length; i++) {
			const node = nodes[i];
			if (Math.abs(x - node.x) < node.radius && Math.abs(y - node.y) < node.radius) {
				clicked_node = node;
				nodes.splice(i, 1);
			}
		}
		if (clicked_node != null) {
			for (const node of nodes) {
				for (let i = 0; i < node.paths.length; i++) {
					const path = node.paths[i];
					if (path.node === clicked_node) {
						node.paths.splice(i--, 1);
					}
				}
			}
		}
		draw_nodes();
	};

	let node1 = document.querySelector("input[name='node1']");
	node1.addEventListener("change", update_shortest);
	node1.addEventListener("keypress", update_shortest);
	node1.addEventListener("paste", update_shortest);
	node1.addEventListener("input", update_shortest);
	let node2 = document.querySelector("input[name='node2']");
	node2.addEventListener("change", update_shortest);
	node2.addEventListener("keypress", update_shortest);
	node2.addEventListener("paste", update_shortest);
	node2.addEventListener("input", update_shortest);
}

document.onload = load_dijkstra();