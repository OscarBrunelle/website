"use strict"

const form = document.querySelector("main form");
const add_item_input = document.querySelector("input.add_item");

let possible_values = [];

function send_item(e) {
	e.preventDefault();
	if (suggestions.length == 0) return;
	const suggestion = suggestions[selected_suggestion];
	add_item_input.value = "";
	add_suggestions_for("");

	let current_inventory = get_cookie("inventory_history");
	if (current_inventory != null && current_inventory != "") current_inventory = JSON.parse(current_inventory);
	if (!Array.isArray(current_inventory)) current_inventory = [];
	if (current_inventory[suggestion] == null) current_inventory[suggestion] = [];
	current_inventory[suggestion].push({
		"date": document.getElementById("consumed_date").value,
		"moment": document.getElementById("consumed_moment").value,
		"quantity": document.getElementById("item_quantity").value
	});
	set_cookie("inventory_history", JSON.stringify(current_inventory));
	console.table(current_inventory);
}

function empty_suggestions() {
	suggestions = [];
	selected_suggestion = 0;
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
	search = search.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace("œ", "oe").replace("-", " ");
	return search;
}

let suggestions = [];
let selected_suggestion = 0;

function add_suggestions_for(search_term) {
	empty_suggestions();
	let suggestionsContainer = document.querySelector(".add_item_suggestions");
	for (const possible_value of possible_values) {
		if (format_search(possible_value).includes(search_term)) {
			suggestions.push(possible_value);
			let li = docli(suggestionsContainer, possible_value);
			li.addEventListener("click", function(e) {
				add_item_input.value = li.innerText;
				add_suggestions_for(add_item_input.value);
			});
		}
	}
	if (suggestions.length > 0) {
		document.querySelectorAll(".add_item_suggestions li")[0].classList.add("selected");
	}
}

function update_item_suggestions(e) {
	if (e.key == "Enter") return send_item();
	let search = format_search(e.target.value);
	add_suggestions_for(search);
}

function get_possible_values() {
	possible_values = [];
	get_csv("real_products.csv", (data) => {
		console.log(data);
		for (const line of data) {
			possible_values.push(line.name);
		}
	});
	add_suggestions_for("");
}

function load() {
	get_possible_values();
	document.getElementById("consumed_date").valueAsDate = new Date();
	form.addEventListener("submit", send_item);
	add_item_input.addEventListener("keydown", select_suggestion);
	add_item_input.addEventListener("input", update_item_suggestions);
}

document.onload = load();