const size = 100;
const padd_perc = 0.1;
const colors = ["black", "red"];

function format_data(data) {
	for (const d of data) {
		d.date = new Date(d.date);
	}
	return data;
}

function sort_data(data) {
	return data.sort(function (a, b) {
		return a.date - b.date;
	});
}

function get_index_range(data_sets) {
	let min, max;
	for (const set_name in data_sets) {
		const data = data_sets[set_name];
		for (const d of data) {
			if (min == null || d.date < min) min = d.date;
			if (max == null || d.date > max) max = d.date;
		}
	}
	return [min, max];
}

function get_value_range(data_sets) {
	let min, max;
	for (const set_name in data_sets) {
		const data = data_sets[set_name];
		for (const d of data) {
			if (min == null || d.value < min) min = d.value;
			if (max == null || d.value > max) max = d.value;
		}
	}
	return [min, max];
}

function get_pos(value, min_range, max_range, reverse = false) {
	let pos = (value - min_range) / (max_range - min_range) * size * (1 - padd_perc * 2) + (padd_perc * size);
	if (reverse) pos = size - pos;
	return pos;
}

function create_graph(parent, data_sets, options = {}) {
	const svg = docsvg(parent, `0 0 ${size} ${size}`, "graph");
	docstyle(svg, `.graph{aspect-ratio: 1/1; border: 1px solid black; background-color: white;}
	.graph line{stroke-linecap: round;}`);
	let set_index = 0;

	for (const set_name in data_sets) {
		let data = data_sets[set_name];
		data = format_data(data);
		data = sort_data(data);
		data_sets[set_name] = data;
	}

	let [min_index, max_index] = get_index_range(data_sets);
	let min_value, max_value;
	if (options.min == null && options.max == null) {
		[min_value, max_value] = get_value_range(data_sets);
	} else {
		min_value = options.min;
		max_value = options.max;
	}

	for (const set_name in data_sets) {
		let data = data_sets[set_name];

		const gset = svgg(svg, `set ${set_name}`);
		docstyle(gset, `g.set.${set_name} line{stroke: ${colors[set_index]};}
		g.set.${set_name} circle{fill: ${colors[set_index]};}
		g.set.${set_name} .container {overflow: visible;}`);
		const glines = svgg(gset, "lines");
		const gpoints = svgg(gset, "points");

		let prev_pos;
		for (const d of data) {
			let x = get_pos(d.date, min_index, max_index);
			let y = get_pos(d.value, min_value, max_value, true);
			const c = svgcontainer(gpoints, x, y, null, null, "container");
			svgcircle(c, 0, 0, 2);
			svgtitle(c, `Value: ${d.value}\nLabel: ${d.label}`);
			if (prev_pos != null) svgline(glines, prev_pos.x, prev_pos.y, x, y);
			prev_pos = {
				x: x,
				y: y
			};
		}
		set_index++;
	}

	const gborders = svgg(svg, "borders");
	docstyle(gborders, `g.borders line{stroke: black;}`);
	let ox = (size * padd_perc);
	let oy = size - (size * padd_perc);
	svgline(gborders, ox, oy, ox, (size * padd_perc), "border");
	svgline(gborders, ox, oy, size - (size * padd_perc), oy, "border");
}