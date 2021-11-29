"use strict"

function get_data_from_inventory() {
	let cdate = new Date();
	let cdate_string = `${cdate.getFullYear()}-${cdate.getMonth()+1}-${cdate.getDate()}`;

	let data = [];
	const inventory = get_inventory();
	for (const item_key in inventory) {
		let data_points = [];
		for (const data_point of inventory[item_key]) {
			data_points.push({
				"date": data_point.date,
				"value": data_point.quantity
			});
		}
		data_points.push({
			"date": cdate_string, // adding data_point to current date
			"value": inventory[item_key][inventory[item_key].length-1].quantity // last quantity of item
		});
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