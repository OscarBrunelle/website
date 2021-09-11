let current_theme;

function toggle_theme(theme = null) {
	let button_present = (document.getElementById("theme-btn") != null);
	if (button_present) document.getElementById("theme-btn").addEventListener("click", toggle_theme);

	if (theme != null && (theme == "light" || theme == "dark")) {
		current_theme = theme;
	} else if (current_theme == null) {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			current_theme = "dark";
		} else {
			current_theme = "light";
		}
	} else {
		current_theme = (current_theme == "light" ? "dark" : "light");
	}
	set_cookie("preferred_theme", current_theme);

	switch (current_theme) {
		case "light":
			if (button_present) document.getElementById("theme-btn").innerHTML = "&#127761;";
			document.body.classList.remove("theme-dark");
			document.body.classList.add("theme-light");
			break;
		case "dark":
			if (button_present) document.getElementById("theme-btn").innerHTML = "&#9728;&#65039;";
			document.body.classList.remove("theme-light");
			document.body.classList.add("theme-dark");
			break;
		default:
			break;
	}
}
document.onload = toggle_theme(get_cookie("preferred_theme"));