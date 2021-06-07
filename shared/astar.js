const GRID_CASE = {
	EMPTY: 0,
	OBSTACLE: 1,
	START: 2,
	TARGET: 3,
	TARGET_FOUND: 4,
	VISITED: 5,
	PATH: 6,
};

function arr_index_of_p(arr, p) {
	for (const i in arr) {
		if (same(arr[i], p)) {
			return i;
		}
	}
	return -1;
}

function create_grid(w, h, start, targets, obstacles) {
	let grid = [];
	for (let x = 0; x < w; x++) {
		let arr = [];
		for (let y = 0; y < h; y++) {
			arr.push({
				type: GRID_CASE.EMPTY,
				x: x,
				y: y
			});
		}
		grid.push(arr);
	}

	grid[start.x][start.y] = {
		type: GRID_CASE.START,
		x: start.x,
		y: start.y,
		g: 0
	};

	for (const c of targets) {
		if (cons(c.x, 0, w - 1) && cons(c.y, 0, h - 1)) {
			grid[c.x][c.y] = {
				type: GRID_CASE.TARGET,
				x: c.x,
				y: c.y,
				h: 0
			};
		}
	}

	for (const c of obstacles) {
		if (cons(c.x, 0, w - 1) && cons(c.y, 0, h - 1)) {
			grid[c.x][c.y] = {
				type: GRID_CASE.OBSTACLE,
				x: c.x,
				y: c.y
			};
		}
	}

	return grid;
}

function gd(point1, point2) {
	return round_to_nearest(get_distance(point1, point2), 0.1);
}

function get_neighbours(grid, parent, target = null) {
	let neighbours = [];
	let x = parent.x;
	let y = parent.y;
	if (target != null && parent.g == null) {
		parent.g = gd(parent, target);
	}
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if (cons(x + i, 0, grid.length - 1) && cons(y + j, 0, grid[0].length - 1)) {
				const point = grid[x + i][y + j];
				if (point.type == GRID_CASE.OBSTACLE) continue;
				if (target == null) {
					neighbours.push(point);
				} else if (!same(point, parent)) {
					const previous_g = (point.g != null) ? point.g : Number.MAX_VALUE;
					point.g = Math.min(parent.g + gd(point, parent), previous_g);
					point.h = gd(point, target);
					if (point.f == null || (point.f != null && point.f > (point.g + point.h))) {
						point.f = point.g + point.h;
						neighbours.push(point);
					}
				}
			}
		}
	}
	return neighbours;
}

function same(pos1, pos2) {
	return (pos1.x == pos2.x && pos1.y == pos2.y);
}

function retrieve_path(grid, start, path) {
	if (path.length < 1) return [];

	let current = path[0];
	if (same(current, start)) {
		path.unshift(current);
		return path;
	}

	let neighbours = get_neighbours(grid, current);
	let min_f, min_neighbour;
	for (const neighbour of neighbours) {
		if (arr_index_of_p(path, neighbour) < 0 && (neighbour.f != null && (min_f == null || neighbour.f < min_f))) {
			min_f = neighbour.f;
			min_neighbour = neighbour;
		}
	}
	if (min_f == null || min_neighbour == null) return [];

	path.unshift(min_neighbour);
	return retrieve_path(grid, start, path);
}

let call_stack = 0;

function find_best_path_call(grid, start, target, queue = [start], dones = []) {
	if (queue.length < 1) {
		return null;
	} else if (queue.length == 1 && queue[0] == start) {
		call_stack = 0;
		path_rects.innerHTML = "";
		svgrect(path_rects, start.x, start.y, 1, 1, "target");
		svgrect(path_rects, target.x, target.y, 1, 1, "target");
	}
	if (call_stack++ > grid.length * grid[0].length) {
		console.error("Error: Call stack exceeded");
		return null;
	}

	let current = queue.pop();
	dones.push(current);
	if (!same(current, start) && !same(current, target)) {
		current.type = GRID_CASE.VISITED;
	}
	if (same(current, target)) {
		return retrieve_path(grid, start, [target]);
	}
	const neighbours = get_neighbours(grid, current, target);
	for (const neighbour of neighbours) {
		if (arr_index_of_p(queue, neighbour) < 0) {
			queue.push(neighbour);
		}
	}
	queue.sort((a, b) => {
		if (a.f < b.f) {
			return 1;
		} else if (a.f > b.f) {
			return -1;
		}
		return 0;
	});
	return find_best_path_call(grid, start, target, queue, dones);
}

function find_best_path(grid, start, targets, loop = false) {
	const base_grid = deep_copy(grid);
	let path = [];
	let starting_point = start;
	while (targets.length > 0) {
		const min_path = find_min_in_array(targets, function (target, min_v) {
			grid = deep_copy(base_grid);
			const s = grid[starting_point.x][starting_point.y];
			const t = grid[target.x][target.y];
			let best_path = find_best_path_call(grid, s, t);
			if (best_path == null) {
				return {
					v: Number.MAX_VALUE,
					path: []
				};
			} else {
				return {
					v: grid[target.x][target.y].f,
					path: best_path
				};
			}
		});
		if (min_path.r == null) return [];
		path.push(min_path.r.path);
		starting_point = targets[min_path.i];
		targets.splice(min_path.i, 1);
	}
	if (loop) {
		grid = deep_copy(base_grid);
		const s = grid[start.x][start.y];
		const r_path = find_best_path_call(grid, starting_point, s);
		if (r_path != null) {
			path.push(r_path);
		}
	}
	return path;
}