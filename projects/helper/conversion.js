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
			let log = ("<br>" + label + " '" + val + "' is : " + result);
			if (previous_log !== log) {
				previous_log = log;
				document.querySelector("#logs").innerHTML += log;
			}
		}
	}
	const field_label = document.createElement("label");
	const field_input = document.createElement("input");
	const result_span = document.createElement("div");
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
	document.querySelector("#converters").appendChild(container);
}

function mtu() {
	const mtu_container = document.getElementById("mtu-div");
	const table = document.querySelector("#mtu-div table");
	const columns = ["flag", "offset", "data", "total"];

	function add_columns() {
		const th_row = document.createElement("tr");
		for (const col of columns) {
			let th = document.createElement("th");
			th.innerHTML = col;
			th_row.appendChild(th);
		}
		table.appendChild(th_row);
	}

	let data_val, mtu_val;
	document.querySelectorAll("#mtu-inputs input").forEach(field_input => {
		function update_function(event) {
			let val = event.target.value;
			let result;
			if (val == null || val === "" || Number.isNaN(parseFloat(val))) {
				val = null;
			} else {
				val = parseFloat(val);
			}
			switch (event.target.name) {
				case "data":
					data_val = val;
					break;
				case "mtu":
					mtu_val = val;
					break;
				default:
					return false;
					break;
			}
			if (data_val != null && mtu_val != null) {
				fill_table();
			}
		}
		field_input.addEventListener("change", update_function);
		field_input.addEventListener("keypress", update_function);
		field_input.addEventListener("paste", update_function);
		field_input.addEventListener("input", update_function);
	});

	function fill_table() {
		if (mtu_val < 8) {
			return;
		}

		table.innerHTML = "";
		add_columns();

		let data = data_val;
		let mtu = mtu_val;
		let options = 20;
		let td_offset = 0;
		while (data > 0) {
			let td_flag, td_data, td_total;
			if (mtu > data + options) {
				td_flag = 0;
				td_data = data;
				td_total = td_data + options;
				data -= data;
			} else {
				td_flag = 1;
				td_data = (mtu - options) - (mtu - options) % 8;
				td_total = td_data + options;
				data -= td_data;
			}
			let tr = document.createElement("tr");
			for (const i in columns) {
				let col = columns[i];
				let td = document.createElement("td");
				switch (col) {
					case "flag":
						td.innerHTML = td_flag;
						break;
					case "offset":
						td.innerHTML = td_offset;
						break;
					case "data":
						td.innerHTML = td_data;
						break;
					case "total":
						td.innerHTML = td_total;
						break;
					default:
						break;
				}
				tr.appendChild(td);
			}
			table.appendChild(tr);
			td_offset += td_data / 8;
		}
	}
}