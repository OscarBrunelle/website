"use strict"

function get_data_hours(moment) {
	switch (moment) {
		case "other":
			return 0;
		case "morning":
			return 8;
		case "midday":
			return 12;
		case "evening":
			return 20;
		default:
			return 0;
	}
}

function get_data_from_inventory() {
	let current_date = new Date();
	let data = [];
	const inventory = get_inventory();
	for (const item_key in inventory) {
		let data_points = [];
		let last_date, last_value;
		for (const data_point of inventory[item_key]) {
			let ddate = new Date(data_point.date);
			ddate.setHours(get_data_hours(data_point.moment));
			data_points.push({
				"date": ddate,
				"value": data_point.quantity
			});
			if (last_date == null || ddate > last_date) {
				last_date = ddate;
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