let offers = [];

function update_cookies() {
	
}

function main() {
	let forms = document.querySelectorAll("#forms form");
	for (const form of forms) {
		form.addEventListener("submit", function(e) {
			e.preventDefault();
			let fd = new FormData(e.target);
			console.log(fd.entries().next());
			e.timeStamp;
			return false;
		});
	}

	// add employers' list to offer select
	// same with persons on contact form
	// draw graph of historic of contacts
	// add different tabs to check tables of employers, persons...

	let cookie_offers = get_cookie("offers");
	if (cookie_offers == null) {
		cookie_offers = [];
		set_cookie("offers", JSON.stringify(cookie_offers));
	}
}

document.onload = main();