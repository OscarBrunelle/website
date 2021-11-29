"use strict"

function load_graph() {
	let data = [];
	const inventory = get_inventory();
	console.log(inventory);
	create_graph(document.querySelector("main"), {"months": [{
		date: "2021-09-23T16:20:00",
		value: "13",
		label: "labeltest"
	}, {
		date: "2021-09-23T16:55:30",
		value: "24",
		label: "labeltest2"
	}]});
}