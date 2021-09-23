"use strict"

let template_data_sets = {
	"set1": [
		{
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
		}
	], "set2": [
		{
			date: "2021-09-23T16:29:00",
			value: "27",
			label: "2labeltest"
		}, {
			date: "2021-09-23T17:30:00",
			value: "33",
			label: "2labeltest2"
		}
	]
};

function load() {
	create_graph(document.getElementById("main"), template_data_sets, {min: 0, max: 100});
}

document.onload = load();