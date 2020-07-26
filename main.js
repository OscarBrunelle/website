const type_parent = {
	"research": "researches",
	"game": "games"
};
const list_title = {
	"researches": "Research",
	"games": "Games"
};
/*
let language = "en";

$(document).ready(function() {
	for (const project of PROJECTS) {
		const parent_id = type_parent[project.type];
		if ($("#" + parent_id).length < 1) {
			const projects_list = $("<div id='" + parent_id + "' class='projects_list'></div>").appendTo("#projects");
			projects_list.append("<h1 class='projects_list-title'>" + list_title[parent_id])
		}
		const container = $("<a class='project' href='projects/" + project.link + "/index.html'></a>").appendTo("#" + parent_id);
		container.append("<h2 class='project-title'>" + project["title"][language] + "</h2>");
		container.append("<p class='project-description'>" + project["description"][language] + "</p>");
	}
});
*/

function load_home() {
	document.getElementById("lang-button").addEventListener("click", update_language);
	update_language();
}

function update_language() {
	let lang_cookie = get_cookie("lang");
	let language_button = document.getElementById("lang-button");

	function set_language(lang){
		language_button.active = lang === "en";
		language_button.innerHTML = lang === "en" ? "fr" : "en";
		set_cookie("lang", lang);
		$("main *[lang='" + lang + "']").show();
		$("main *[lang='" + (lang === "en" ? "fr" : "en") + "']").hide();
	}

	if (lang_cookie == null) {
		if (language_button.innerHTML === "fr") {
			set_language("fr");
		} else {
			set_language("en");
		}
	} else if (lang_cookie === "fr") {
		set_language("fr");
	} else {
		set_language("en");
	}
}

document.onload = load_home();