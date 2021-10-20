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