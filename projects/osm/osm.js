"use strict"

let bounds = {
	minlat: "41.3",
	minlon: "8",
	maxlat: "43.3",
	maxlon: "10"
};
/*
OSM file bounds:
bounds = {
	minlat: "41.31103",
	minlon: "8.317882",
	maxlat: "43.16589",
	maxlon: "9.751243"
};
*/
/*
Golfe de lava bounds:
bounds = {
	minlat: "41.95",
	minlon: "8.65",
	maxlat: "42",
	maxlon: "8.7"
};
*/
let nodes = [];
let ways = [];
let number_workers = 4;
let workers = [];

let chunk_size = 1000000;
const chunks_to_process = 10000;

function end_computing() {
	for (const worker of workers) {
		worker.terminate();
	}
	workers = [];
	console.info("OSM file processing successfull.");

	console.info("Creating map visuals...");
	create_map_visuals();
	console.info("Map visuals successfully created.");
}

function read_file(e) {
	const buffer = new Uint8Array(e.target.result);
	const data_length = e.target.result.byteLength;
	chunk_size = Math.min(chunk_size, data_length / number_workers);

	console.time("workers");
	let chunk_index = 0;
	let workers_active = 0;
	for (const worker of workers) {
		worker.onmessage = function (e) {
			workers_active--;

			let data_bounds = e.data[0];
			let data_nodes = e.data[1];
			let data_ways = e.data[2];
			// if (data_bounds != {}) bounds = data.bounds;
			nodes = nodes.concat(data_nodes);
			ways = ways.concat(data_ways);

			// add_data_points(data_nodes); // for real-time drawing
			let perc = parseInt(chunk_index * chunk_size / data_length * 100);
			document.getElementById("progress-perc").innerText = perc + " %";
			document.getElementById("progress").style.width = perc + "%";
			if (chunk_index < data_length / chunk_size && chunk_index < chunks_to_process) {
				workers_active++;
				let start_chunk = chunk_size * (chunk_index++);
				worker.postMessage([buffer.slice(start_chunk, start_chunk + chunk_size), bounds]);
			} else if (workers_active == 0) {
				console.timeLog("workers", nodes);
				end_computing();
			}
		};
		if (chunk_index < data_length / chunk_size && chunk_index < chunks_to_process) {
			workers_active++;
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
}