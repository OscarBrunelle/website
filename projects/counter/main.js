"use strict"

let count = 0;

function update_count(value = 0) {
	count += value;
	document.getElementById("counter").innerHTML = count;
}

function load() {
	update_count();
}

document.onload = load();