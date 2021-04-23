"use strict"

const table = document.getElementById("table");

function create_table(data) {
	table.innerHTML = "";

	const headers = doctr(table);
	docth(headers, "Titre");
	docth(headers, "Prix");
	docth(headers, "Postal");
	docth(headers, "Lien");

	for (const line of data) {
		const tr = doctr(table);
		doctd(tr, line.title);
		doctd(tr, line.price);
		doctd(tr, line.postal);
		const td_link = doctd(tr);
		doca(td_link, line.link, "Lien");
	}
}

function load() {

}

document.onload = load();