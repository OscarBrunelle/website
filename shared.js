function get_cookie(cookie_name) {
	const name = cookie_name + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(";");
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function set_cookie(name, value) {
	document.cookie = name + "=" + value + ";";
}