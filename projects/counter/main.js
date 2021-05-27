"use strict"

let count = 0;

function update_count(value = 0) {
	count += value;
	document.getElementById("counter").innerHTML = count;
	set_cookie("count", count);
}

function load() {
	if (get_cookie("count") != null) {
		count = parseInt(get_cookie("count"));
	}
	update_count();
}

document.onload = load();