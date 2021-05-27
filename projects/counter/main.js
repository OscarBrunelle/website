"use strict"

let count = 0;
let current_multiplier = 1;

function reset_counter() {
	if (confirm("Are you sure you wish to reset the counter ?\nAll data will be lost.")) {
		count = 0;
		current_multiplier = 1;
		update_values();
		update_count();
	}
}

function update_values(multiplier = 1) {
	current_multiplier *= multiplier;
	document.getElementById("button-sub").innerHTML = "-" + current_multiplier;
	document.getElementById("button-add").innerHTML = "+" + current_multiplier;
	set_cookie("multiplier", current_multiplier);
}

function update_count(value = 0) {
	count += value * current_multiplier;
	document.getElementById("counter").innerHTML = count;
	set_cookie("count", count);
}

function load() {
	if (get_cookie("count") != null) {
		count = parseFloat(get_cookie("count"));
	}
	if (get_cookie("multiplier") != null) {
		current_multiplier = parseFloat(get_cookie("multiplier"));
	}
	update_values();
	update_count();
}

document.onload = load();