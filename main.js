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

let language;
function update_language() {
	let lang_cookie = get_cookie("lang");
	let language_button = document.getElementById("lang-button");

	function set_language(lang){
		language = lang;
		language_button.active = lang === "en";
		language_button.innerHTML = lang === "en" ? "FR" : "EN";
		set_cookie("lang", lang);
		$("body *[lang='" + lang + "']").show();
		$("body *[lang='" + (lang === "en" ? "fr" : "en") + "']").hide();
	}

	if (language == null) {
		if (lang_cookie == null) {
			set_language("en");
		} else {
			set_language(lang_cookie);
		}
	} else if (language === "fr" || language_button.innerHTML === "EN") {
		set_language("en");
	} else {
		set_language("fr");
	}
}

document.onload = load_home();