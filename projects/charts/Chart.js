function format_data(data) {
	for (const d of data) {
		d.date = new Date(d.date);
	}
	return data;
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

function create_graph(data) {
	// for (const set_name in data) {

	// }
	data = data["set1"];
	data = format_data(data);
	let [min_index, max_index] = get_index_range(data);
	let [min_value, max_value] = get_value_range(data);
	const svg = docsvg(document.getElementById("main"), "0 0 100 100", "graph");
	svgcontainer(document.getElementById("main"), 0, 0, 100, 100);
	svgline(svg, 0, 0, 100, 100);
}