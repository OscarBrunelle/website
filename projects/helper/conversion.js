"use strict"

function load_conversion() {
	/*
	document.querySelector("main div").style.display = "none";
	document.querySelector("#conversion").style.display = "grid";
	*/
	decimal_to_binary();
	binary_to_decimal();
	decimal_to_binary_power();
	cache_address();
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

function cache_address() {
	function calcultate_result(values, last_updated) {
		if (values["cache_size"] != null && values["number_blocks"] != null) {
			document.querySelector("input[name='cache_size']").disabled = false;
			document.querySelector("input[name='number_blocks']").disabled = false;
			document.querySelector("input[name='block_size']").disabled = true;
			document.querySelector("input[name='block_size']").value = values["cache_size"] / values["number_blocks"];
		} else if (values["number_blocks"] != null && values["block_size"] != null) {
			document.querySelector("input[name='cache_size']").disabled = true;
			document.querySelector("input[name='cache_size']").value = values["number_blocks"] * values["block_size"];
			document.querySelector("input[name='number_blocks']").disabled = false;
			document.querySelector("input[name='block_size']").disabled = false;
		} else if (values["block_size"] != null && values["cache_size"] != null) {
			document.querySelector("input[name='cache_size']").disabled = false;
			document.querySelector("input[name='number_blocks']").disabled = true;
			document.querySelector("input[name='number_blocks']").value = values["cache_size"] / values["block_size"];
			document.querySelector("input[name='block_size']").disabled = false;
		} else {
			document.querySelector("input[name='cache_size']").disabled = false;
			document.querySelector("input[name='number_blocks']").disabled = false;
			document.querySelector("input[name='block_size']").disabled = false;
		}
		return null;
	}
	add_calculator(calcultate_result, true, ["Cache size", "Number of blocks", "Block size"], ["cache_size", "number_blocks", "block_size"]);
}

function add_calculator(calcultate_result, number_input, labels, names = labels) {
	let previous_log;

	function update_function(event) {
		let values = {};
		let parent = event.target.parentElement.parentElement;
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
			result = calcultate_result(values, event.target.name);
		} else {
			result = "Invalid";
		}
		parent.querySelector(".result").innerHTML = result;
		if (result != null && result !== "Invalid") {
			let log = ("<br>Result is : " + result);
			if (previous_log !== log) {
				previous_log = log;
				let logs_container = parent.parentElement.parentElement.querySelector(".logs");
				let logs = logs_container.querySelector(".window-content");
				const is_scrolled_to_bottom = logs_container.scrollHeight - logs_container.clientHeight <= logs_container.scrollTop + 1;
				logs.innerHTML += log;
				if (is_scrolled_to_bottom) {
					logs_container.scrollTop = logs_container.scrollHeight - logs_container.clientHeight;
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