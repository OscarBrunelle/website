"use strict"

const inputs_parent = document.querySelector(".inputs");
let sex, year, month, department_code, place_code, order;

const sexes = [{
	text: "Homme",
	value: 1
}, {
	text: "Femme",
	value: 2
}];
const months = [{
	text: "Janvier",
	value: 1
}, {
	text: "Février",
	value: 2
}, {
	text: "Mars",
	value: 3
}, {
	text: "Avril",
	value: 4
}, {
	text: "Mai",
	value: 5
}, {
	text: "Juin",
	value: 6
}, {
	text: "Juillet",
	value: 7
}, {
	text: "Août",
	value: 8
}, {
	text: "Septembre",
	value: 9
}, {
	text: "Octobre",
	value: 10
}, {
	text: "Novembre",
	value: 11
}, {
	text: "Décembre",
	value: 12
}];

function create_inputs() {
	const parent_sex = docdiv(inputs_parent);
	const input_sex = docselect(parent_sex, "Sexe", sexes, "select-sex");
	sex = input_sex.value;
	input_sex.addEventListener("input", () => {
		sex = input_sex.value;
		update_number();
	});

	const input_year = doclabelinput(inputs_parent, "Année de naissance", "input-year", "year", "number", 2000, 2000, true);
	input_year.setAttribute("maxlength", 4);
	year = to_fixed_length(input_year.value, 2);
	input_year.addEventListener("input", () => {
		year = to_fixed_length(input_year.value, 2);
		update_number();
	});

	const parent_month = docdiv(inputs_parent);
	const input_month = docselect(parent_month, "Mois de naissance", months, "select-month");
	month = to_fixed_length(input_month.value, 2);
	input_month.addEventListener("input", () => {
		month = to_fixed_length(input_month.value, 2);
		update_number();
	});

	const input_postal = doclabelinput(inputs_parent, "Code postal - Ville de naissance", "input-postal", "postal", "text", "02450", "02450", true);
	input_postal.setAttribute("minlength", 5);
	input_postal.setAttribute("maxlength", 5);
	department_code = to_fixed_length(input_postal.value.slice(0, -3), 2);
	place_code = to_fixed_length(input_postal.value.slice(-3), 3);
	input_postal.addEventListener("input", () => {
		if (input_postal.value.length == 5) {
			department_code = to_fixed_length(input_postal.value.slice(0, -3), 2);
			place_code = to_fixed_length(input_postal.value.slice(-3), 3);
			update_number();
		}
	});

	const input_order = doclabelinput(inputs_parent, "Numéro de naissance", "input-order", "order", "number", 123, 123, true);
	input_order.setAttribute("maxlength", 4);
	order = to_fixed_length(input_order.value, 3);
	input_order.addEventListener("input", () => {
		order = to_fixed_length(input_order.value, 3);
		update_number();
	});
}

function update_number() {
	let n = parseInt(`${sex}${year}${month}${department_code}${place_code}${order}`);
	let control = 97 - (n % 97);
	let number = `${sex} ${year} ${month} ${department_code} ${place_code} ${order} ${control}`;
	document.querySelector(".result").innerHTML = number;
}

function load() {
	create_inputs();
	update_number();
}

document.onload = load();