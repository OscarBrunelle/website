"use strict"

const input_meal = document.getElementById("input-meal");
const input_ingredient = document.getElementById("input-ingredient");
const meals_container = document.getElementById("meals-div");
const filters = document.querySelectorAll(".filter");
let custom_table;

// TODO: add time, price
const table_columns = [{
	"title": "Nom",
	"name": "name"
}, {
	"title": "Type",
	"name": "type"
}, {
	"title": "Recette",
	"name": "link"
}];
let table_values = [];

let sorting_column = "name";

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

class CustomTable {
	constructor(parent, columns = [], values = []) {
		this.table_element = doctable(parent, "shared-table");

		this.set_columns(columns, false);
		this.set_values(values, false);

		this.update();
	}

	check_sorting_column() {
		if (this.sorting_column != null) {
			for (const col of this.columns) {
				if (col.name == this.sorting_column.name && col.name == this.sorting_column.name) {
					return true;
				}
			}
		}
		return false;
	}

	set_sorting_column(column, update = true) {
		if (this.sorting_column == column) {
			this.sorting_way = !this.sorting_way;
		} else {
			this.sorting_way = true;
			this.sorting_column = column;
		}
		this.sort_table(this.sorting_column, update);
		return this;
	}

	set_columns(columns, update = true) {
		this.columns = columns;
		if (!this.check_sorting_column()) {
			this.set_sorting_column(this.columns[0]);
		}

		if (update) {
			this.update();
		}
		return this;
	}

	set_values(values, update = true) {
		this.values = values;
		this.sorted_values = values;
		this.sort_table(this.sorting_column, update);

		if (update) {
			this.update();
		}
		return this;
	}

	sort_table(column = this.sorting_column, update = true) {
		const column_name = column.name;

		const ref = this;
		function compare(a, b) {
			if (a[column_name] < b[column_name]) {
				return (ref.sorting_way ? -1 : 1);
			} else if (a[column_name] > b[column_name]) {
				return (ref.sorting_way ? 1 : -1);
			}
			return 0;
		}

		if (this.sorted_values != null) {
			this.sorted_values = this.sorted_values.sort(compare);
		}

		if (update) {
			this.update();
		}
		return this;
	}

	update() {
		fill_table(this.table_element, this.columns, this.sorted_values);
		const headers = this.table_element.querySelectorAll("th");
		for (let i = 0; i < headers.length; i++) {
			const th = headers[i];
			const ref = this;
			if (this.columns[i] == this.sorting_column) {
				$(th).addClass("sorter");
			} else {
				$(th).removeClass("sorter");
			}
			th.addEventListener("click", function (event) {
				ref.set_sorting_column(ref.columns[i]);
			});
		}
		return this;
	}
}

function display_meals(values) {
	for (const meal_ref in values) {
		const link = doca(null, "?meal_ref=" + meal_ref, "Lien");
		values[meal_ref].link = link.outerHTML.toString();
	}

	values = filter_meals(values);

	custom_table.set_values(values).update();
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

	const container = docdiv(document.getElementById("main"), "recipe-container");
	docspan(container, "Voilà la recette pour " + meal.name, "recipe-title");

	const ingredients_div = docdiv(container, "recipe-ingredients");
	docspan(ingredients_div, "Ingrédients");
	const ingredients_list = docul(ingredients_div);
	for (const ingredient of meal.ingredients) {
		docli(ingredients_list, `${ingredient["ingredient-name"]["name-fr"]} : ${ingredient.quantity} ${ingredient["ingredient-name"].unit}`);
	}

	const steps_div = docdiv(container, "recipe-steps");
	docspan(steps_div, "Étapes");
	const steps_list = docol(steps_div);
	for (const step of meal.steps) {
		docli(steps_list, step);
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

	custom_table = new CustomTable(document.getElementById("meals-div"), table_columns, table_values);
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