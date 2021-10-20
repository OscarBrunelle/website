"use strict"

let template_data_sets = {
	"set1": [{
		date: "2021-09-23T16:20:00",
		value: "13",
		label: "labeltest"
	}, {
		date: "2021-09-23T16:55:30",
		value: "24",
		label: "labeltest2"
	}, {
		date: "2021-09-23T17:04:00",
		value: "15",
		label: "labeltest2"
	}, {
		date: "2021-09-23T16:45:30",
		value: "45",
		label: "labeltest2"
	}, {
		date: "2021-09-23T17:54:00",
		value: "15",
		label: "labeltest2"
	}, {
		date: "2021-09-23T16:15:30",
		value: "28",
		label: "labeltest2"
	}, {
		date: "2021-09-23T17:34:00",
		value: "15",
		label: "labeltest2"
	}],
	"set2": [{
		date: "2021-09-23T16:29:00",
		value: "27",
		label: "2labeltest"
	}, {
		date: "2021-09-23T17:30:00",
		value: "33",
		label: "2labeltest2"
	}]
};

function load() {
	get_csv("naissances.csv", (data) => {
		console.log(data);
		let months_data = [];
		for (let m = 1; m <= 12; m++) {
			months_data.push({
				date: `2000-${to_fixed_length(m, 2)}-01T00:00:00`,
				value: 0
			})
		}
		for (const d of data) {
			if (d["\"DATE_EVENEMENT\""] == null) continue;
			let month = d["\"DATE_EVENEMENT\""].slice(-4,-2);
			month = parseInt(month)-1;
			months_data[month].value++;
		}
		document.querySelector(".graph").remove();
		create_graph(document.getElementById("main"), {"months": months_data});
	});
	create_graph(document.getElementById("main"), template_data_sets, {
		min: 0,
		max: 100
	});
}

document.onload = load();