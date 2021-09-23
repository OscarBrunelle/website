const size = 100;
const padd_perc = 0.1;

function format_data(data) {
	for (const d of data) {
		d.date = new Date(d.date);
	}
	return data;
}

function sort_data(data) {
	return data.sort(function (a, b) {
		return a - b;
	});
}

function get_index_range(data) {
	let min, max;
	for (const d of data) {
		if (min == null || d.date < min) min = d.date;
		if (max == null || d.date > max) max = d.date;
	}
	return [min, max];
}

function get_value_range(data) {
	let min, max;
	for (const d of data) {
		if (min == null || d.value < min) min = d.value;
		if (max == null || d.value > max) max = d.value;
	}
	return [min, max];
}

function get_pos(value, min_range, max_range) {
	return (value - min_range) / (max_range - min_range) * size * (1 - padd_perc * 2) + (padd_perc * size);
}

function create_graph(data) {
	// for (const set_name in data) {

	// }
	data = data["set1"];
	data = format_data(data);
	data = sort_data(data);
	let [min_index, max_index] = get_index_range(data);
	let [min_value, max_value] = get_value_range(data);
	const svg = docsvg(document.getElementById("main"), `0 0 ${size} ${size}`, "graph");

	let prev_pos;
	for (const d of data) {
		let x = get_pos(d.date, min_index, max_index);
		let y = get_pos(d.value, min_value, max_value);
		const c = svgcontainer(svg, x, y, 4, 4, "container");
		svgcircle(c, 0, 0, 2);
		svgtitle(c, d.label);
		if (prev_pos != null) svgline(svg, prev_pos.x, prev_pos.y, x, y);
		prev_pos = {
			x: x,
			y: y
		};
	}
}