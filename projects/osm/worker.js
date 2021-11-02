"use strict"

// Constants (used in process_buffer function)
const block_size = 500;
const max_loops = 1000;

// Returned variables
let bounds = {};
let nodes = [];
let ways = [];

// The attributes we're looking for in the xml file
let attributes = ["id", "lat", "lon"];
let tags = ["amenity", "name", "building"];

// Entry point of the worker
addEventListener("message", function (e) {
	reset_worker();

	bounds = e.data[1];
	process_data(e.data[0]);

	this.postMessage([nodes, ways]);
}, false);

/**
 * Empties the return values.
 */
function reset_worker() {
	bounds = {};
	nodes = [];
	ways = [];
}

function get_attr(line, key) {
	return line.split(`${key}="`, 2)[1].split(`" `)[0].split(`">`)[0];
}

function process_data(buffer) {
	const txt = new TextDecoder('utf-8').decode(buffer);
	let node;
	for (let line of txt.split("\n")) {
		line = line.trim();
		if (line[0] != "<" || line[line.length -1] != ">") {
			continue;
		}
		const xml_tag = line.split(" ", 1)[0].split("<")[1];
		switch (xml_tag) {
			case "node":
				node = {
					"id": get_attr(line, "id"),
					"lat": get_attr(line, "lat"),
					"lon": get_attr(line, "lon")
				};
				if (line.slice(-2) == "/>") nodes.push(node);
				break;
			case "tag":
				if (node == null) continue;
				node[get_attr(line, "k")] = get_attr(line, "v");
				break;
			case "/node>":
				if (node != null) nodes.push(node);
				break;
			default:
				break;
		}
	}
}