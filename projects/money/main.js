let offers = [];

function update_redundancy_precision_options() {
	let select_label = document.querySelector("label[for=redundancy-precision]");
	let select_options = document.querySelector("select[name=redundancy-precision]");
	select_options.innerHTML = "";

	switch (document.querySelector("select[name=redundancy]").value) {
		case "day":
			for (let i = 0; i < 24; i++) {
				select_label.innerHTML = "Heure";
				docoption(select_options, i, i);
			}
			break;
		case "week":
			for (let i = 0; i < 7; i++) {
				select_label.innerHTML = "Jour";
				docoption(select_options, i, WEEKDAYS[i]);
			}
			break;
		case "month":
			for (let i = 1; i < 31; i++) {
				select_label.innerHTML = "Date";
				docoption(select_options, i, i);
			}
			break;
		case "year":
			for (let i = 0; i < 12; i++) {
				select_label.innerHTML = "Mois";
				docoption(select_options, i, MONTHS[i]);
			}
			break;
		default:
			break;
	}
}

function main() {
	let input_from = document.querySelector("input[name=from]");
	let input_to = document.querySelector("input[name=to]");
	let input_date = document.querySelector("input[name=date]");

	input_from.valueAsDate = new Date();
	input_to.valueAsDate = new Date(input_from.valueAsDate.setFullYear(input_from.valueAsDate.getFullYear() + 10));
	input_date.valueAsDate = new Date();

	document.querySelector("select[name=redundancy]").addEventListener("change", update_redundancy_precision_options);
	update_redundancy_precision_options();
}

document.onload = main();