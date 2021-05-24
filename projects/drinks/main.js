"use strict"

const FIRST_STEP = "FOOD_OR_DRINK";
const STEPS = {
	"FOOD_OR_DRINK": {
		"title": "Que voulez-vous faire ?",
		"unique": true,
		"filter_name": "food_or_drink",
		"choices": [{
			"label": "Repas",
			"value": "food",
			"step": "FOOD_TYPE"
		}, {
			"label": "Boisson",
			"value": "drink",
			"step": "DRINK_TYPE"
		}]
	},
	"FOOD_TYPE": {
		"title": "Type de repas",
		"unique": true,
		"filter_name": "type",
		"choices": [{
			"label": "Entrée",
			"step": "RESULTS"
		}, {
			"label": "Plat",
			"step": "RESULTS"
		}, {
			"label": "Dessert",
			"step": "RESULTS"
		}],
		"prev": "FOOD_OR_DRINK"
	},
	"DRINK_TYPE": {
		"title": "Type de boisson",
		"unique": true,
		"filter_name": "alcoholized",
		"choices": [{
			"label": "Alcoolisée",
			"step": "RESULTS"
		}, {
			"label": "Non-alcoolisée",
			"step": "RESULTS"
		}],
		"prev": "FOOD_OR_DRINK"
	},
}

let results_table;
let filters = [];

function add_filter(name, value) {
	if (results_table == null) {
		results_table = new CustomTable(document.getElementById("results"), [{
			"title": "Nom",
			"name": "name"
		}]);
	}

	filters[name] = value;

	let filtered_results = [];
	for (const filter_name in filters) {
		for (const meal_ref in MEALS) {
			const meal = MEALS[meal_ref];
			filtered_results.push(meal);
		}
	}
	results_table.set_values(filtered_results);
}

function load_step(step_name) {
	if (step_name == "RESULTS") {
		document.getElementById("results").scrollIntoView();
		return;
	}

	const step = STEPS[step_name];

	// set title
	document.getElementById("view-title").innerHTML = step.title;

	// set choices
	if (step.unique) { // != null && step.unique == true) {
		const elch = document.getElementById("view-choices");
		elch.innerHTML = "";
		for (const choice of step.choices) {
			const b = docbutton(elch, choice.label);
			b.addEventListener("click", function () {
				add_filter(step.filter_name, choice.value);
				load_step(choice.step);
			});
		}
	}

	// change prev and next buttons if needed
	if (step.prev != null) {
		var old_element = document.getElementById("prev");
		var new_element = old_element.cloneNode(true);
		old_element.parentNode.replaceChild(new_element, old_element);
		document.getElementById("prev").addEventListener("click", function() {
			load_step(step.prev);
		});
	}/* else {
		document.getElementById("prev").setAttribute("disabled", "");
	}*/
}

function load() {
	load_step(FIRST_STEP);
}

document.onload = load();