"use strict"

const FIRST_STEP = "FOOD_OR_DRINK";
const STEPS = {
	"FOOD_OR_DRINK": {
		"title": "Que voulez-vous faire ?",
		"unique": true,
		"filter_name": "cooking",
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
		"choices": [{
			"label": "Entrée",
			"step": "RESULTS"
		}, {
			"label": "Plat",
			"step": "RESULTS"
		}, {
			"label": "Dessert",
			"step": "RESULTS"
		}]
	},
	"DRINK_TYPE": {
		"title": "Type de boisson",
		"unique": true,
		"choices": [{
			"label": "Alcoolisée",
			"step": "RESULTS"
		}, {
			"label": "Non-alcoolisée",
			"step": "RESULTS"
		}]
	},
}

let results_table;
const filters = [];

function add_filter(name, value) {
	if (results_table == null) {
		results_table = new CustomTable(document.getElementById("results"), [{
			"title": "Nom",
			"name": "name"
		}]);
	}
}

function load_step(step_name) {
	if (step_name == "RESULTS") {
		document.getElementById("results").scrollIntoView();
		return;
	}

	const step = STEPS[step_name];
	document.getElementById("view-title").innerHTML = step.title;
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
}

function load() {
	load_step(FIRST_STEP);
}

document.onload = load();