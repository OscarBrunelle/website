"use strict"

function load_conversion() {
	document.querySelector("main div").style.display = "none";
	document.querySelector("#conversion").style.display = "block";
	decimal_to_binary();
	binary_to_decimal();
	decimal_to_binary_power();
}

function decimal_to_binary() {
	function calcultate_result(val) {
		let result = 0;
		let multiplicator = 1;
		while (val !== 0) {
			result += (val % 2) * multiplicator;
			val = Math.floor(val / 2);
			multiplicator *= 10;
		}
		return result;
	}
	create_input(calcultate_result, true, "Decimal to binary", "dec_to_bin");
}

function binary_to_decimal() {
	function calcultate_result(val) {
		if (val === 0 || val === 1) {
			return val;
		}
		let result = 0;
		let multiplicator = 0;
		while (val !== 0) {
			let remainder = val % 10;
			if (remainder !== 0 && remainder !== 1) {
				console.info("Number is not binary");
				return "Invalid";
			}
			result += remainder * Math.pow(2, multiplicator);
			val = (val - remainder) / 10;
			multiplicator++;
		}
		return result;
	}
	create_input(calcultate_result, true, "Binary to decimal", "bin_to_dec");
}

function decimal_to_binary_power() {
	function calcultate_result(val) {
		return Math.log2(val);
	}
	create_input(calcultate_result, true, "log2(n)", "log2");
}

function create_input(calcultate_result, number_input, label, name = label) {
	let previous_log;
	function update_function(event) {
		let val = event.target.value;
		let result;
		if (val == null || val === "") {
			result = "Invalid";
		} else {
			if (number_input && !Number.isNaN(parseFloat(val))) {
				val = parseFloat(val);
			}
			result = calcultate_result(val);
		}
		document.querySelector("#" + event.target.name + " .result").innerHTML = result;
		if (result !== "Invalid") {
			let log = ("<br>" + label + " '" + val  + "' is : " + result);
			if (previous_log !== log) {
				previous_log = log;
				document.querySelector("#logs").innerHTML += log;
			}
		}
	}
	const field_label = document.createElement("label");
	const field_input = document.createElement("input");
	const result_span = document.createElement("span");
	const container = document.createElement("div");

	field_label.innerHTML = label;
	field_label.for = name;
	field_input.name = name;
	result_span.className = "result";
	container.id = name;
	field_input.addEventListener("change", update_function);
	field_input.addEventListener("keypress", update_function);
	field_input.addEventListener("paste", update_function);
	field_input.addEventListener("input", update_function);

	container.appendChild(field_label);
	container.appendChild(field_input);
	container.appendChild(result_span);
	document.querySelector("#conversion").appendChild(container);
}