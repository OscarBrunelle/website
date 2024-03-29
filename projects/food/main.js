"use strict"

const input_meal = document.getElementById("input-meal");
const input_ingredient = document.getElementById("input-ingredient");
const meals_container = document.getElementById("meals-div");
let custom_table;

const filters = [{ //add empty and maybe do it as a select
	"title": "Type",
	"name": "food_type",
	"radio": true,
	"options_array": FOOD_TYPES,
	"default": FOOD_TYPES.MEAL
}];

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
	const f_containers = document.querySelectorAll(".filter-container");
	let act_filters = [];
	for (const f_container of f_containers) {
		let values = [];
		const checked_inputs = f_container.querySelectorAll("input:checked");
		for (const checked_input of checked_inputs) {
			values.push(checked_input.value);
		}
		act_filters.push({
			"name": f_container.id.split("filter-container-")[1],
			"values": values
		});
	}

	for (const meal_ref in values) {
		const meal = values[meal_ref];
		let flag = false;
		/* for (const act_filter of act_filters) {
			if (!flag && act_filter.values.includes((meal[act_filter.name]))) {
				flag = true;
				break;
			}
		} */
		if (!flag) results.push(meal);
	}
	return results;
}

function display_meals(values = FOODS, table = custom_table) {
	for (const meal_ref in values) {
		const link = doca(null, "?meal_ref=" + meal_ref, "Lien");
		values[meal_ref].link = link.outerHTML.toString();
	}

	values = filter_meals(values);

	table.set_values(values).update();
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

	for (const meal_ref in FOODS) {
		const meal = FOODS[meal_ref];
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

	for (const meal_ref in FOODS) {
		const meal = FOODS[meal_ref];
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
	const meal = FOODS[meal_ref];
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
	container.scrollIntoView();
}

function random_meal() {
	const r = random_int(0, Object.keys(FOODS).length - 1);
	const meal = FOODS[Object.keys(FOODS)[r]];
	display_meals([meal]);
}

function parse_csv_line(line, columns) {
	let value = {};
	let i = 0;
	let prev_ci = 0;
	let quoting = false;
	let inner_array = null;
	let array_i = null;
	for (let ci = 0; ci < line.length; ci++) {
		const c = line[ci];
		if (c == ',' || ci == line.length - 1) {
			if (quoting) {
				if (inner_array != null) {
					let array_value = line.substring(array_i, ci);
					inner_array.push(array_value);
					array_i = ci;
				}
			} else {
				if (inner_array != null) {
					value[columns[i++]] = inner_array;
					prev_ci = ci + 1;
					inner_array = null;
					array_i = null;
				} else {
					value[columns[i++]] = line.substring(prev_ci, ci).replace("\r", "");
					prev_ci = ci + 1;
				}
			}
		} else if (c == '"') {
			if (quoting) {
				quoting = false;
			} else {
				quoting = true;
			}
		} else if (c == '[') {
			if (quoting) {
				inner_array = [];
				array_i = ci;
			}
		} else if (c == ']') {
			if (quoting && inner_array == null) {
				console.error("Error parsing: unexpected ']'");
				return;
			}
		}
	}
	return value;
}

function extract_csv(data) {
	if (typeof data != "string") return;
	let columns = [];
	let values = [];
	data.split("\n").forEach(function (line, line_index) {
		if (line_index == 0) {
			line.split(",").forEach(function (col) {
				columns.push(col.replace("\r", ""));
			});
		} else {
			values.push(parse_csv_line(line, columns));
		}
	});
	return values;
}

async function get_csv(target, callback) {
	try {
		const res = await fetch(target, {
			method: "get",
			headers: {
				"content-type": "text/csv;charset=UTF-8",
			}
		});

		if (res.status === 200) {
			const data = await res.text();
			const formatted_data = extract_csv(data);
			callback(formatted_data);
		} else {
			console.log(`Error code ${res.status}`);
		}
	} catch (err) {
		console.log(err);
	}
}

function load() {
	input_meal.addEventListener("input", function (event) {
		search_by_meal(event.target.value);
	});
	input_ingredient.addEventListener("input", function (event) {
		search_by_ingredient(event.target.value);
	});
	for (const filter of filters) {
		const container = docdiv(document.getElementById("filters-div"), "filter-container");
		container.id = "filter-container-" + filter.name;
		doch3(container, filter.title, "filter-title");
		const options_container = docdiv(container, "filter-options");
		let options = [];
		if (filter.options_array != null) {
			for (const option_key in filter.options_array) {
				const option = filter.options_array[option_key];
				options.push({
					"name": filter.name,
					"label": option,
					"value": option_key,
					"checked": (filter.default != null && filter.default == option)
				});
			}
		} else {
			options = filter.options;
		}
		const inputs = docinputs(options_container, options, (filter.radio ? "radio" : "checkbox"));
		for (const inp of inputs) {
			inp.querySelector("input").addEventListener("input", filter_meals);
		}
	}

	custom_table = new CustomTable(document.getElementById("meals-div"), table_columns, table_values);
	display_meals(FOODS);

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