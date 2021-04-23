"use strict"

const input_meal = document.getElementById("input-meal");
const input_ingredient = document.getElementById("input-ingredient");
const meals_container = document.getElementById("meals-div");
const meals_table = document.getElementById("meals-table");
const filters = document.querySelectorAll(".filter");

function filter_meals(values) {
	let results = [];
	for (const meal of values) {
		for (const filter of filters) {
			const filter_name = filter.name;
			const filter_value = filter.value;
			if (!(meal[filter_name] == filter_value)) {
				break;
			}
		}
		results.push(meal);
	}
	return results;
}

function display_meals(values) {
	values = filter_meals(values);

	fill_table(meals_table, [{
		"title": "Nom",
		"value": "name"
	},{
		"title": "Type",
		"value": "type"
	}], values);
}

function format_search(value) {
	if (value == null || value == "") {
		return value;
	}
	return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function search_by_meal(event) {
	const search = event.target.value;
	let results = [];
	const words = search.split(" ");
	for (const word_index in words) {
		const word = words[word_index];
		words[word_index] = format_search(word);
	}

	for (const meal of MEALS) {
		let possible = true;
		for (const word of words) {
			if (!format_search(meal.name).includes(word)) {
				possible = false;
				break;
			}
		}
		if (possible) {
			results.push(meal);
		}
	}

	display_meals(results);
}

function search_by_ingredient(event) {
	const search = event.target.value;
	let results = [];
	const words = search.split(" ");
	for (const word_index in words) {
		const word = words[word_index];
		words[word_index] = format_search(word);
	}

	for (const meal of MEALS) {
		let possible = true;
		for (const word of words) {
			let included = false;
			for (let ingredient of meal.ingredients) {
				ingredient = format_search(ingredient["ingredient-name"]["name-fr"]);
				if (ingredient.includes(word)) {
					included = true;
					break;
				}
			}
			if (!included) {
				possible = false;
			}
		}
		if (possible) {
			results.push(meal);
		}
	}

	display_meals(results);
}

function random_meal() {
	const r = random_int(0, MEALS.length);
	const meal = MEALS[r];
	display_meals([meal]);
}

function load() {
	input_meal.addEventListener("input", search_by_meal);
	input_ingredient.addEventListener("input", search_by_ingredient);
	for (const filter of filters) {
		filter.addEventListener("input", filter_meals);
	}

	display_meals(MEALS);
}

document.onload = load();