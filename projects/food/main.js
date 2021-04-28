"use strict"

const input_meal = document.getElementById("input-meal");
const input_ingredient = document.getElementById("input-ingredient");
const meals_container = document.getElementById("meals-div");
const meals_table = document.getElementById("meals-table");
const filters = document.querySelectorAll(".filter");

function change_url_parameter(parameter) {
	const url = document.URL.split("index.html")[0] + "index.html";
	window.history.pushState("", document.title, url + parameter);
}

function change_title(value) {
	document.title = value;
}

function get_url_parameters(url = document.URL) {
	let url_parameters = url.split("index.html?");
	if (url_parameters.length == 1) {
		return url_parameters[0];
	}
	url_parameters = url_parameters[1].split("&");

	let parameters = {};
	for (const url_parameter of url_parameters) {
		const p = url_parameter.split("=");
		parameters[p[0]] = p[1];
	}

	return parameters;
}

function filter_meals(values) {
	let results = [];
	for (const meal_ref in values) {
		const meal = values[meal_ref];
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
	for (const meal_ref in values) {
		const link = doca(null, "?meal_ref=" + meal_ref, "Lien");
		values[meal_ref].link = link.outerHTML.toString();
	}

	values = filter_meals(values);
	// add time, price
	fill_table(meals_table, [{
		"title": "Nom",
		"value": "name"
	}, {
		"title": "Type",
		"value": "type"
	}, {
		"title": "Recette",
		"value": "link"
	}], values);
}

function format_search(value) {
	if (value == null || value == "") {
		return value;
	}
	return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function search_by_meal(search) {
	change_url_parameter(`?search=${search}&search_type=meal`);
	let results = [];
	const words = search.split(" ");
	for (const word_index in words) {
		const word = words[word_index];
		words[word_index] = format_search(word);
	}

	for (const meal_ref in MEALS) {
		const meal = MEALS[meal_ref];
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

function search_by_ingredient(search) {
	change_url_parameter(`${document.URL}?search=${search}&search_type=ingredient`);
	let results = [];
	const words = search.split(" ");
	for (const word_index in words) {
		const word = words[word_index];
		words[word_index] = format_search(word);
	}

	for (const meal_ref in MEALS) {
		const meal = MEALS[meal_ref];
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

function show_recipe(meal_ref) {
	const meal = MEALS[meal_ref];
	change_url_parameter("?meal_ref=" + meal_ref);
	change_title(meal.name);

	const container = docdiv(document.getElementById("main"));
	docspan(container, "Voilà la recette pour " + meal.name);
	const list = docol(container);
	for (const step of meal.steps) {
		docli(list, step);
	}
}

function random_meal() {
	const r = random_int(0, Object.keys(MEALS).length - 1);
	const meal = MEALS[Object.keys(MEALS)[r]];
	display_meals([meal]);
}

function load() {
	input_meal.addEventListener("input", function (event) {
		search_by_meal(event.target.value);
	});
	input_ingredient.addEventListener("input", function (event) {
		search_by_ingredient(event.target.value);
	});
	for (const filter of filters) {
		filter.addEventListener("input", filter_meals);
	}

	display_meals(MEALS);

	const parameters = get_url_parameters();
	if (parameters.search != null && parameters.search_type != null) {
		if (parameters.search_type == "meal") {
			search_by_meal(parameters.search);
		} else if (parameters.search_type == "ingredient") {
			search_by_meal(parameters.search);
		}
	} else if (parameters.meal_ref != null) {
		show_recipe(parameters.meal_ref);
	}
}

document.onload = load();