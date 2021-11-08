"use strict"

function empty_inventory(e) {
	let accept = confirm("Voulez-vous vraiment vider votre inventaire ?\nCette action est irréversible.");
	if (accept) {
		expire_cookie("inventory");
		console.info("Inventaire vidé.")
	}
}