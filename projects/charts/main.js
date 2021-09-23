"use strict"

let template_data = {
	"set1": [
		{
			date: "2021-09-23T16:29:00",
			value: "test",
			label: "labeltest"
		}, {
			date: "2021-09-23T16:30:00",
			value: "test2",
			label: "labeltest2"
		}
	], "set2": [
		{
			date: "2021-09-23T16:29:00",
			value: "2test",
			label: "2labeltest"
		}, {
			date: "2021-09-23T17:30:00",
			value: "2test2",
			label: "2labeltest2"
		}
	]
};

function load() {
	create_graph(template_data);
}

document.onload = load();