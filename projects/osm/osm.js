"use strict"

let bounds = {};
let nodes = [];
let number_workers = 8;
let workers = [];

let chunk_size = 100000;
const chunks_to_process = 1000;

function read_file(e) {
	const buffer = new Uint8Array(e.target.result);
	const data_length = e.target.result.byteLength;
	chunk_size = Math.min(chunk_size, data_length / number_workers);

	console.time("workers");
	let chunk_index = 0;
	for (const worker of workers) {
		worker.onmessage = function (e) {
			let perc = parseInt(chunk_index * chunk_size / data_length * 100);
			document.getElementById("progress-perc").innerText = perc + " %";
			document.getElementById("progress").style.width = perc + "%";
			nodes = nodes.concat(e.data);
			if (chunk_index < data_length / chunk_size && chunk_index < chunks_to_process) {
				let start_chunk = chunk_size * (chunk_index++);
				worker.postMessage([buffer.slice(start_chunk, start_chunk + chunk_size), bounds]);
			} else {
				console.timeLog("workers", nodes);
			}
		};
		if (chunk_index < data_length / chunk_size && chunk_index < chunks_to_process) {
			let start_chunk = chunk_size * (chunk_index++);
			worker.postMessage([buffer.slice(start_chunk, start_chunk + chunk_size), bounds]);
		}
	}
}

function inter_perc(value, min, max) {
	return (value - min) / (max - min);
}

function load_file(e) {
	for (let i = 0; i < number_workers; i++) {
		workers.push(new Worker('worker.js'));
	}
	console.info("Processing OSM file...");
	read_file(e);
	console.info("OSM file processing successfull.");

	console.info("Creating map visuals...");
	create_map_visuals();
	console.info("Map visuals successfully created.");
}