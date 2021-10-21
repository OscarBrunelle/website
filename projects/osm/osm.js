"use strict"

const block_size = 1000;
const max_loops = 10;

let nodes = [];

function add_data_element(xml_thing, data) {
	switch (xml_thing) {
		case "bounds":
			break;
		case "node":
			add_node(data);
			break;
		case "tag":
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

function extract_tag(line) {
	let n = line.split("k=\"", 2)[1].split("\" ")[0].split("\"/>")[0];
	let v = line.split("v=\"", 2)[1].split("\" ")[0].split("\"/>")[0];
	return {
		"name": n,
		"value": v
	};
}

function add_node(data_string) {
	let data = {};
	let attributes = ["id", "lat", "lon"];
	let tags = ["amenity", "name"];

	let lines = data_string.split("\n");
	for (let line_index in lines) {
		const line = lines[line_index];
		if (lines.length > 2 && line_index >= lines.length - 2) {
			continue;
		} else if (line_index == 0) {
			let line_attributes = extract_attributes(line);
			for (const line_tag of line_attributes) {
				if (attributes.includes(line_tag.name)) {
					data[line_tag.name] = line_tag.value;
				}
			}
		} else {
			let tag = extract_tag(line);
			if (tags.includes(tag.name)) data[tag.name] = tag.value;
		}
	}

	return data;
}

function read_file(e) {
	console.info("Processing OSM file...");

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
			case "tag":
				let end_symbol_i = snippet.indexOf(">");
				if (end_symbol_i == -1) console.error("Could not find closing bracket");
				if (snippet.substring(end_symbol_i - 1, end_symbol_i) != "/") {
					end_symbol_i = snippet.indexOf(`</${xml_thing}>`) + `</${xml_thing}>`.length;
				}
				let string = snippet.substring(start_symbol_i, end_symbol_i + 1);
				byte_index += (new TextEncoder().encode(snippet.substring(0, end_symbol_i + 1))).length;
				add_data_element(xml_thing, string);
				break;
			default:
				console.error(`Error: does not know xml symbol: '${xml_thing}'.`);
				break;
		}
	}

	console.info("OSM file processing successfull.");
}