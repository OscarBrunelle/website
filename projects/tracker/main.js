"use strict"

const form = document.querySelector("main form");
const add_item_input = document.querySelector("input.add_item");

let possible_values = [];

function get_item_quantity(item_name) {
	let current_inventory = get_cookie("inventory_history");
	if (current_inventory != null && current_inventory != "") current_inventory = JSON.parse(current_inventory);
	if (current_inventory == null) current_inventory = {};
	if (current_inventory[item_name] == null || current_inventory[item_name].length < 1) return 0;
	const l = current_inventory[item_name].length;
	return current_inventory[item_name][l - 1]["quantity"];
}

function send_item(e) {
	e.preventDefault();
	if (suggestions.length == 0) return;
	const suggestion_data = suggestions[selected_suggestion];
	const suggestion_name = suggestion_data["name"];
	add_item_input.value = "";
	add_suggestions_for("");

	let current_inventory = get_cookie("inventory_history");
	if (current_inventory != null && current_inventory != "") {
		current_inventory = JSON.parse(current_inventory);
	} else {
		current_inventory = {};
	}
	if (current_inventory[suggestion_name] == null) current_inventory[suggestion_name] = [];
	current_inventory[suggestion_name].push({
		"date": document.getElementById("consumed_date").value,
		"moment": document.getElementById("consumed_moment").value,
		"quantity": document.getElementById("item_quantity").value,
		"data": suggestion_data
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

function select_suggestion(e = null) {
	if (e == null) {} else if (e.key == "ArrowDown") {
		e.preventDefault();
		selected_suggestion = between(selected_suggestion + 1, 0, suggestions.length - 1);
	} else if (e.key == "ArrowUp") {
		e.preventDefault();
		selected_suggestion = between(selected_suggestion - 1, 0, suggestions.length - 1);
	} else if (e.key == "Backspace") {
		return update_item_suggestions(e);
	}
	for (const suggestion_i in suggestions) {
		if (suggestion_i == selected_suggestion) {
			document.querySelectorAll(".add_item_suggestions li")[suggestion_i].classList.add("selected");
			document.getElementById("item_unit").innerText = suggestions[suggestion_i]["unit"];

			const current_item_q = get_item_quantity(suggestions[suggestion_i]["name"]);
			document.getElementById("item_quantity_current").innerText = `${current_item_q} ${suggestions[suggestion_i]["unit"]}`;
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
	for (const possible_value_data of possible_values) {
		let possible_value = possible_value_data["name"];
		if (format_search(possible_value).includes(search_term)) {
			suggestions.push(possible_value_data);
			let li = docli(suggestionsContainer, possible_value);
			li.addEventListener("click", function (e) {
				add_item_input.value = li.innerText;
				const search = format_search(add_item_input.value);
				add_suggestions_for(search);
			});
		}
	}
	if (suggestions.length > 0) {
		select_suggestion();
	}
}

function update_item_suggestions(e = null) {
	if (e != null && e.key == "Enter") return send_item();
	let search = format_search(add_item_input.value);
	add_suggestions_for(search);
}

function get_possible_values() {
	possible_values = [];
	get_csv("real_products.csv", (data) => {
		for (const line of data) {
			possible_values.push(line);
		}

		add_suggestions_for("");
		select_suggestion();
	});
}

function load() {
	get_possible_values();
	document.getElementById("consumed_date").valueAsDate = new Date();
	form.addEventListener("submit", send_item);
	add_item_input.addEventListener("keydown", select_suggestion);
	add_item_input.addEventListener("input", update_item_suggestions);
}

document.onload = load();