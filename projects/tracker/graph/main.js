"use strict"

function get_data_from_inventory() {
	let current_date = new Date();
	let data = [];
	const inventory = get_inventory();
	for (const item_key in inventory) {
		let data_points = [];
		let last_date, last_value;
		for (const data_point of inventory[item_key]) {
			data_points.push({
				"date": data_point.date,
				"value": data_point.quantity
			});
			if (last_date == null || data_point.date > last_date) {
				last_date = data_point.date;
				last_value = data_point.quantity;
			}
		}
		if (last_value != null) {
			data_points.push({
				"date": current_date, // adding additional data_point to current date
				"value": last_value // last quantity of item
			});
		}
		data[item_key] = data_points;
	}
	return data;
}

function load_graph() {
	let data = get_data_from_inventory();
	console.log(data);
	create_graph(document.querySelector("main"), data, {
		"min": -0.5,
		"max": 2
	});
}