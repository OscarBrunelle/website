"use strict"

let w = 600;
let h = 600;
let canvas = new Canvas("#main", w, h, "map");

function create_map_visuals() {
	for (const node of nodes) {
		canvas.rect((inter_perc(node.lon, bounds.minlon, bounds.maxlon) * h), w - inter_perc(node.lat, bounds.minlat, bounds.maxlat) * w, 1, 1);
	}
}

function add_data_points(data_points) {
	for (const d of data_points) {
		// canvas.rect(inter_perc(d.lat, bounds.minlat, bounds.maxlat) * w, inter_perc(d.lon, bounds.minlon, bounds.maxlon) * h, 1, 1);
		canvas.rect((inter_perc(d.lon, bounds.minlon, bounds.maxlon) * h), w - inter_perc(d.lat, bounds.minlat, bounds.maxlat) * w, 1, 1);
	}
}