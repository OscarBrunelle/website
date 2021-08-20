"use strict"

const player = new Player();

function toggle() {
	if (frame_ref == null) {
		update();
	} else {
		stop();
	}
}

let frame_ref;
function update() {
	player.update();
	frame_ref = requestAnimationFrame(update);
}

function stop() {
	cancelAnimationFrame(frame_ref);
	frame_ref = null;
}

function load() {
	player.add_sbire(new Sbire("sbire 1"));
	player.add_sbire(new Sbire("sbire 2"));
	player.render();
}

document.onload = load();