"use strict"

const form = document.querySelector("main form");
const add_item_input = document.querySelector("input.add_item");

let possible_values = ["test", "valuetest", "valteslue", "yay", "nope", "œuf"];

function send_item(e) {
	e.preventDefault();
	if (suggestions.length == 0) return;
	console.log(suggestions[selected_suggestion]);
	add_item_input.value = "";
	empty_suggestions();
}

function empty_suggestions() {
	suggestions = [];
	select_suggestion = 0;
	document.querySelector(".add_item_suggestions").innerHTML = "";
}

function between(value, min, max) {
	return Math.max(Math.min(value, max), min);
}

function select_suggestion(e) {
	if (e.key == "ArrowDown") {
		e.preventDefault();
		selected_suggestion = between(selected_suggestion + 1, 0, suggestions.length - 1);
	} else if (e.key == "ArrowUp") {
		e.preventDefault();
		selected_suggestion = between(selected_suggestion - 1, 0, suggestions.length - 1);
	}
	for (const suggestion_i in suggestions) {
		if (suggestion_i == selected_suggestion) {
			document.querySelectorAll(".add_item_suggestions li")[suggestion_i].classList.add("selected");
		} else {
			document.querySelectorAll(".add_item_suggestions li")[suggestion_i].classList.remove("selected");
		}
	}
}

function format_search(value) {
	let search = value.toLowerCase();
	search = search.replace("œ", "oe");
	return search;
}

let suggestions = [];
let selected_suggestion = 0;
function update_item_suggestions(e) {
	if (e.key == "Enter") return send_item();
	empty_suggestions();
	let search = format_search(e.target.value);
	let suggestionsContainer = document.querySelector(".add_item_suggestions");
	for (const possible_value of possible_values) {
		if (format_search(possible_value).includes(search)) {
			suggestions.push(possible_value);
			docli(suggestionsContainer, possible_value);
		}
	}
	if (suggestions.length > 0) {
		document.querySelectorAll(".add_item_suggestions li")[0].classList.add("selected");
	}
}

function load() {
	form.addEventListener("submit", send_item);
	add_item_input.addEventListener("keydown", select_suggestion);
	add_item_input.addEventListener("input", update_item_suggestions);
}

document.onload = load();