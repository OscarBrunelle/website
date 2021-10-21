"use strict"

const block_size = 1000;
const max_loops = 20000;

let number_workers = 2;
let worker_index = 0;
let workers = [];
let bounds = {};
let nodes = [];

function add_data_element(xml_thing, data) {
	switch (xml_thing) {
		case "bounds":
			let attributes = extract_attributes(data);
			for (const att of attributes) {
				bounds[att.name] = att.value;
			}
			break;
		case "node":
			add_node(data);
			break;
	}
}

function extract_attributes(line) {
	let attributes = [];

	for (const attribute of line.trim().split(" ").slice(1)) {
		let n = attribute.split("=")[0];
		if (n.includes("\"")) n = n.split("\"", 2)[1].split("\"", 1)[0];
		let v = attribute.split("=")[1];
		if (v.includes("\"")) v = v.split("\"", 2)[1].split("\"", 1)[0];
		attributes.push({
			"name": n,
			"value": v
		});
	}

	return attributes;
}

function extract_tags(line) {
	let n = line.split("k=\"", 2)[1].split("\" ")[0].split("\"/>")[0];
	let v = line.split("v=\"", 2)[1].split("\" ")[0].split("\"/>")[0];
	return {
		"name": n,
		"value": v
	};
}

function add_node(data_string) {
	let node = {};
	let attributes = ["id", "lat", "lon"];
	let tags = ["amenity", "name"];

	let lines = data_string.trim().split("\n");
	for (let line_index in lines) {
		const line = lines[line_index];
		if (lines.length > 2 && line_index >= lines.length - 2) {
			continue;
		} else if (line_index == 0) {
			let line_attributes = extract_attributes(line);
			for (const line_tag of line_attributes) {
				if (attributes.includes(line_tag.name)) {
					node[line_tag.name] = line_tag.value;
				}
			}
		} else {
			let tag = extract_tags(line);
			if (tags.includes(tag.name)) node[tag.name] = tag.value;
		}
	}

	nodes.push(node);
	// workers[worker_index].postMessage({
	// 	"canvas": canvas.canvas,
	// 	"node": node,
	// 	"bounds": bounds
	// });
	worker_index = (worker_index + 1) % number_workers;

	return node;
}

function read_file(e) {
	const buffer = new Uint8Array(e.target.result);
	const data_length = e.target.result.byteLength;
	let byte_index = 0;
	let while_count = 0;
	while (byte_index < data_length && while_count++ < max_loops) {
		let snippet = new TextDecoder('utf-8').decode(buffer.slice(byte_index, Math.min(data_length, byte_index + block_size)));
		let start_symbol_i = snippet.indexOf("<");
		const xml_thing = snippet.substring(start_symbol_i + 1, start_symbol_i + 10).split(" ")[0];
		switch (xml_thing) {
			case "?xml":
				byte_index = 39;
				break;
			case "osm":
				byte_index = 86;
				break;
			case "bounds":
			case "node":
				let end_symbol_i = snippet.slice(start_symbol_i).indexOf(">") + snippet.slice(0, start_symbol_i).length;
				if (end_symbol_i == -1) console.error("Could not find closing bracket");
				if (snippet.substring(end_symbol_i - 1, end_symbol_i) != "/") {
					end_symbol_i = snippet.indexOf(`</${xml_thing}>`) + `</${xml_thing}>`.length - 1;
				}
				let string = snippet.substring(start_symbol_i, end_symbol_i + 1);
				byte_index += (new TextEncoder().encode(snippet.substring(0, end_symbol_i + 1))).length;
				add_data_element(xml_thing, string.trim());
				break;
			case "/node>":
			case "/node>\n":
			case "tag":
				byte_index += 5;
				break;
			default:
				console.error(`Error: does not know xml symbol: '${xml_thing}'.`);
				break;
		}
	}
}

function inter_perc(value, min, max) {
	return (value - min) / (max - min);
}

function load_file(e) {
	for (let i = 0; i < number_workers; i++) {
		// workers.push(new Worker('worker.js'));
	}
	console.info("Processing OSM file...");
	read_file(e);
	console.info("OSM file processing successfull.");

	console.info("Creating map visuals...");
	create_map_visuals();
	console.info("Map visuals successfully created.");
}