const size = 100;
const padd_perc = 0.1;
const colors = ["black", "red", "green", "blue", "yellow", "violet", "brown", "orange"];
const nticks = 5;
const tick_width = 3;
const line_width = 0.25;
const circle_width = 0.5;

function simplify_string(string) {
	return string.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "");
}

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

function format_date(date) {
	return `${to_fixed_length(date.getMonth() + 1, 2)}/${date.getDate()} - ${date.getHours()}:${date.getMinutes()}`;
}

function create_graph(parent, data_sets, options = {}) {
	const svg = docsvg(parent, `0 0 ${size} ${size}`, "graph");
	docstyle(svg, `.graph{aspect-ratio: 1/1; border: 1px solid black; background-color: white;}
	.graph line{stroke-linecap: round;}`);
	let set_index = 0;
	if (data_sets == null || Object.keys(data_sets).length < 1) {
		console.info("Data set is empty or only contains 1 entry.");
		return;
	}

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

	if (min_index == max_index || min_value == max_value) {
		console.info("Same min & max values");
		return;
	}

	for (const set_name in data_sets) {
		let data = data_sets[set_name];
		const set_class = simplify_string(set_name).slice(0, 15);
		const color = colors[set_index % colors.length];

		const gset = svgg(svg, `set ${set_class}`);
		docstyle(gset, `g.set.${set_class} line{stroke: ${color};stroke-width: ${line_width};}
		g.set.${set_class} circle{fill: ${color};}
		g.set.${set_class} .container {overflow: visible;}`);
		const glines = svgg(gset, "lines");
		const gpoints = svgg(gset, "points");

		let prev_pos;
		for (const d of data) {
			let x = get_pos(d.date, min_index, max_index);
			let y = get_pos(d.value, min_value, max_value, true);
			const c = svgcontainer(gpoints, x, y, null, null, "container");
			svgcircle(c, 0, 0, circle_width);
			svgtitle(c, `Value: ${d.value}\nDate: ${format_date(d.date)}\nLabel: ${d.label}`);
			if (prev_pos != null) svgline(glines, prev_pos.x, prev_pos.y, x, y);
			prev_pos = {
				x: x,
				y: y
			};
		}
		set_index++;
	}

	const gborders = svgg(svg, "borders");
	docstyle(gborders, `g.borders line{stroke: black;stroke-width: ${line_width};}
	g.ticks text{font-size: 2px}`);
	let ox = (size * padd_perc);
	let oy = size - (size * padd_perc);
	svgline(gborders, ox, oy, ox, (size * padd_perc), "border");
	svgline(gborders, ox, oy, size - (size * padd_perc), oy, "border");

	const gticks = svgg(gborders, "ticks");
	for (let i = 0; i <= nticks; i++) {
		let x_val = new Date(min_index.getTime() + (max_index.getTime() - min_index.getTime()) * i / nticks);
		let y_val = min_value + (max_value - min_value) * i / nticks;
		let x = get_pos(x_val, min_index, max_index);
		let y = get_pos(y_val, min_value, max_value, true);
		const gtickx = svgg(gticks);
		svgline(gtickx, x, oy, x, oy + tick_width, "tick tickx");
		svgtitle(gtickx, `${format_date(x_val)}`);
		svgtext(gtickx, x-2.5, oy + 2*tick_width, `${format_date(x_val).slice(0,5)}`);
		const gticky = svgg(gticks);
		svgline(gticky, ox, y, ox - tick_width, y, "tick ticky");
		svgtitle(gticky, `${y_val}`);
		svgtext(gtickx, ox - tick_width - 4, y+0.5, `${y_val}`);
	}
}