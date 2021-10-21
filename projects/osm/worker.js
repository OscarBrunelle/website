"use strict"

function inter_perc(value, min, max) {
	return (value - min) / (max - min);
}

addEventListener('message', function(e) {
	let canvas = e.data.canvas;
	let context = canvas.getContext("2d");
	let node = e.data.node;
	let bounds = e.data.bounds;
	context.fillRect(inter_perc(node.lat, bounds.minlat, bounds.maxlat) * 600, inter_perc(node.lon, bounds.minlon, bounds.maxlon) * 600, 1, 1);
}, false);