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

	for (const o of obstacles) {
		if (cons(c.x, 0, w) && cons(c.y, 0, h)) {
			grid[c.x][c.y] = {
				type: GRID_CASE.OBSTACLE,
				x: x,
				y: y
			};
		}
	}

	return grid;
}

function get_neighbours(grid, parent, end = null) {
	let neighbours = [];
	let x = parent.x;
	let y = parent.y;
	for (let i = -1; i < 2; i++) {
		for (let j = -1; j < 2; j++) {
			if (cons(x + i, 0, grid.length - 1) && cons(y + j, 0, grid[0].length - 1)) {
				const point = grid[x + i][y + j];
				if (end != null && !same(point, parent) && point.type != GRID_CASE.OBSTACLE.type) {
					const previous_g = (point.g != null) ? point.g : Number.MAX_VALUE;
					point.g = Math.min(parent.g + get_distance(point, parent), previous_g);
					point.h = get_distance(point, end);
					point.f = point.g + point.h;
				}
				neighbours.push(point);
			}
		}
	}
	return neighbours;
}

function same(pos1, pos2) {
	return (pos1.x == pos2.x && pos1.y == pos2.y);
}

function retrieve_path(grid, start, path) {
	if (path.length < 1) {
		return [];
	}
	let current = path[0];
	let neighbours = get_neighbours(grid, current);
	let min_f, min_neighbour;
	for (const neighbour of neighbours) {
		if (same(neighbour, start)) {
			path.unshift(neighbour);
			return path;
		}
		if (arr_index_of_p(path, neighbour) < 0 && (min_f == null || (neighbour.f != null && neighbour.f < min_f))) {
			min_f = neighbour.f;
			min_neighbour = neighbour;
		}
	}
	if (min_f == null || min_neighbour == null) {
		return [];
	}
	path.unshift(min_neighbour);
	return retrieve_path(grid, start, path);
}

function find_best_path_call(grid, start, target, queue, dones = []) {
	if (queue.length < 1) {
		return null;
	}
	let current = queue.pop();
	dones.push(current);
	if (!same(current, start) && !same(current, target)) {
		current.type = GRID_CASE.VISITED;
		svgrect(map, current.x, current.y, 1, 1, "visited");
	}
	if (same(current, target)) {
		return retrieve_path(grid, start, [target]);
	}
	const neighbours = get_neighbours(grid, current, target);
	for (const neighbour of neighbours) {
		if (arr_index_of_p(queue, neighbour) < 0 && arr_index_of_p(dones, neighbour) < 0) queue.push(neighbour);
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

function find_best_path(grid, start, targets) {
	let path = [];
	while (targets.length > 0) {
		const min_path = find_min_in_array(targets, function (target, min_v) {
			const s = grid[start.x][start.y];
			const t = grid[target.x][target.y];
			let best_path = find_best_path_call(grid, s, t, [s]);
			console.log(best_path);
			if (best_path == null) {
				best_path = {
					v: Number.MAX_VALUE,
					path: []
				};
			}
			return {
				v: best_path.cost,
				best_path: best_path
			};
		});
		if (min_path.r == null) return [];
		path.push(min_path.r.best_path.path);
		targets.splice(min_path.i, 1);
	}
	return path;
}