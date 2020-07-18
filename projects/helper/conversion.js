"use strict"

function load_conversion() {
	/*
	document.querySelector("main div").style.display = "none";
	document.querySelector("#conversion").style.display = "grid";
	*/
	decimal_to_binary();
	binary_to_decimal();
	decimal_to_binary_power();
	mtu();
}

function decimal_to_binary() {
	function calcultate_result(values) {
		let val = values["dec_to_bin"];
		let result = 0;
		let multiplicator = 1;
		while (val !== 0) {
			result += (val % 2) * multiplicator;
			val = Math.floor(val / 2);
			multiplicator *= 10;
		}
		return result;
	}
	add_calculator(calcultate_result, true, ["Decimal to binary"], ["dec_to_bin"]);
}

function binary_to_decimal() {
	function calcultate_result(values) {
		let val = values["bin_to_dec"];
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
	add_calculator(calcultate_result, true, ["Binary to decimal"], ["bin_to_dec"]);
}

function decimal_to_binary_power() {
	function calcultate_result(values) {
		return Math.log2(values["log2"]);
	}
	add_calculator(calcultate_result, true, ["log2(n)"], ["log2"]);
}

function add_calculator(calcultate_result, number_input, labels, names = labels) {
	let previous_log;

	function update_function(event) {
		let values = {};
		let parent = event.target.parentElement;
		parent.querySelectorAll("input").forEach(child => {
			let val = child.value;
			if (val != null && val !== "") {
				if (number_input && !Number.isNaN(parseFloat(val))) {
					values[child.name] = parseFloat(val);
				} else {
					values[child.name] = val;
				}
			}
		});
		let result;
		if (Object.keys(values).length > 0) {
			result = calcultate_result(values);
		} else {
			result = "Invalid";
		}
		parent.querySelector(".result").innerHTML = result;
		if (result !== "Invalid") {
			let log = ("<br>Result is : " + result);
			if (previous_log !== log) {
				previous_log = log;
				let logs_span = parent.parentElement.parentElement.querySelector(".logs > span");
				let logs = logs_span.parentElement;
				const is_scrolled_to_bottom = logs.scrollHeight - logs.clientHeight <= logs.scrollTop + 1;
				logs_span.innerHTML += log;
				if (is_scrolled_to_bottom) {
					logs.scrollTop = logs.scrollHeight - logs.clientHeight;
				}
			}
		}
	}

	const container = document.createElement("div");

	for (const i in labels) {
		let label = labels[i];
		let name = names[i];
		create_input(label, name, container, update_function);
	}

	const result_span = document.createElement("div");
	result_span.className = "result";
	container.appendChild(result_span);

	document.querySelector("#converters").appendChild(container);
}