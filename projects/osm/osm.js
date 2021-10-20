"use strict"

const block_size = 1000;
const max_loops = 1000;

function read_file(e) {
	const buffer = new Uint8Array(e.target.result);
	const data_length = e.target.result.byteLength;
	let byte_index = 0;
	let while_count = 0;
	while (byte_index < data_length && while_count++ < max_loops) {
		let snippet = new TextDecoder('utf-8').decode(buffer.slice(byte_index, Math.min(data_length, byte_index + block_size)));
		console.log(snippet.substring(0, Math.min(snippet.length, 50)));
		byte_index = Math.min(data_length, byte_index + block_size);
	}
}