"use strict"

const block_size = 1000;
const max_loops = 10;

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
			case "tag":
				let end_symbol_i = snippet.indexOf(">");
				if (end_symbol_i == -1) console.error("Could not find closing bracket");
				if (snippet.substring(end_symbol_i - 1, end_symbol_i) != "/") {
					end_symbol_i = snippet.indexOf(`</${xml_thing}>`) + `</${xml_thing}>`.length;
				}
				let string = snippet.substring(start_symbol_i, end_symbol_i + 1);
				console.log(string);
				byte_index += (new TextEncoder().encode(snippet.substring(0, end_symbol_i + 1))).length;
				break;
			default:
				console.error(`Error: does not know xml symbol: '${xml_thing}'.`);
				break;
		}
	}
}