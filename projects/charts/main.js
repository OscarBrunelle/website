"use strict"

let template_data = {
	"set1": [
		{
			date: "2021-09-23T16:29:00",
			value: "13",
			label: "labeltest"
		}, {
			date: "2021-09-23T16:29:30",
			value: "17",
			label: "labeltest2"
		}, {
			date: "2021-09-23T16:30:00",
			value: "15",
			label: "labeltest2"
		}
	], "set2": [
		{
			date: "2021-09-23T16:29:00",
			value: "13",
			label: "2labeltest"
		}, {
			date: "2021-09-23T17:30:00",
			value: "16",
			label: "2labeltest2"
		}
	]
};

function load() {
	create_graph(template_data);
}

document.onload = load();