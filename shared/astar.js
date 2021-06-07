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

function create_grid(w, h, start, targets, obstacles, end_point = null) {
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

	for (const c of obstacles) {
		if (cons(c.x, 0, w - 1) && cons(c.y, 0, h - 1)) {
			grid[c.x][c.y] = {
				type: GRID_CASE.OBSTACLE,
				x: c.x,
				y: c.y
			};
		}
	}

	grid[start.x][start.y] = {
		type: GRID_CASE.START,
		x: start.x,
		y: start.y
	};

	if (end_point != null) {
		targets.push(end_point);
	}
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

	return grid;
}

function gd(p1, p2) {
	let d = 0;
	const m = Math.min(Math.abs(p1.x - p2.x), Math.abs(p1.y - p2.y));
	d += m * 1.4;
	d += (Math.abs(p1.x - p2.x) - m);
	d += (Math.abs(p1.y - p2.y) - m);
	return Math.round(d * 10);
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
				} else if (!same(point, parent) && point.type != GRID_CASE.VISITED) {
					if (point.g == null || point.g > (parent.g + gd(point, parent))) {
						point.g = parent.g + gd(point, parent);
						point.h = gd(point, target);
						point.f = point.g + point.h;
						point.parent = parent;
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

function retrieve_path(current_node, path = []) {
	if (current_node == null) return null;
	path.push(current_node);
	if (current_node.parent == null) return path;
	return retrieve_path(current_node.parent, path);
}

function find_best_path_call(params) { //grid, start, target, queue = [start], dones = []) {
	if (params.queue == null || params.queue.length < 1) {
		return null;
	}

	let current = params.queue.pop();
	params.dones.push(current);
	if (same(current, params.target)) {
		params.result = retrieve_path(params.target)
		return params.result;
	}
	if (!same(current, params.start) && !same(current, params.target)) {
		current.type = GRID_CASE.VISITED;
	}
	const neighbours = get_neighbours(params.grid, current, params.target);
	for (const neighbour of neighbours) {
		const n_i = arr_index_of_p(params.queue, neighbour);
		if (n_i < 0) {
			params.queue.push(neighbour);
		} else {
			params.queue[n_i] = neighbour;
		}
	}
	params.queue.sort((a, b) => {
		if (a.f < b.f || (a.f == b.f && a.h < b.h)) {
			return 1;
		} else if (a.f > b.f) {
			return -1;
		}
		return 0;
	});
}

function find_best_path_loop(grid, start, target) {
	const grid_copy = deep_copy(grid);
	const s = grid_copy[start.x][start.y];
	const t = grid_copy[target.x][target.y];
	grid_copy[s.x][s.y].g = 0;
	grid_copy[s.x][s.y].h = gd(s, t);
	grid_copy[s.x][s.y].f = grid_copy[s.x][s.y].h;
	if (same(s, t)) {
		s.f = 0;
		return [s];
	}
	let params = {
		grid: grid_copy,
		start: s,
		target: t,
		queue: [s],
		dones: [],
		result: undefined
	};
	let call_stack = 0;
	while (call_stack++ < 1000 && params.result == null && params.queue.length > 0) {
		find_best_path_call(params);
	}
	return params.result;
}

function find_best_path(grid, start, targets, end_point = null) {
	const start_time = new Date();
	let path = [];
	let starting_point = start;
	while (targets.length > 0) {
		const min_path = find_min_in_array(targets, function (target, min_v) {
			let best_path = find_best_path_loop(grid, starting_point, target);
			if (best_path == null) {
				return {
					v: Number.MAX_VALUE,
					path: []
				};
			} else {
				return {
					v: best_path[0].f,
					path: best_path
				};
			}
		});
		if (min_path.r == null) {
			console.error(`No path from (${starting_point.x}, ${starting_point.y})`);
			return []
		}
		path.push(min_path.r.path);
		starting_point = targets[min_path.i];
		targets.splice(min_path.i, 1);
	}
	if (end_point != null) {
		const r_path = find_best_path_loop(grid, starting_point, end_point);
		if (r_path != null) {
			path.push(r_path);
		}
	}
	const end_time = new Date();
	console.log("Finished in " + (end_time - start_time));
	return path;
}