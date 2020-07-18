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