const LANG_SELECTOR = new LanguageSelector(null, ["fr", "en"], 0, update_resume);
var language = LANG_SELECTOR.language;

const DISPLAY_NONE = [
	"address_street",
	"address_postal",
	"address_city",
	"address_country"
];
const CONTAINER_TITLE = {
	"profile": {
		"fr": "Profil",
		"en": "Profile"
	},
	"work_experience": {
		"fr": "Expériences professionelles",
		"en": "Work experiences"
	},
	"projects": {
		"fr": "Projets",
		"en": "Projects"
	},
	"technologies": {
		"fr": "Technologies",
		"en": "Technologies"
	},
	"contact": {
		"fr": "Contact",
		"en": "Contact"
	},
	"education": {
		"fr": "Formation",
		"en": "Education"
	},
	"languages": {
		"fr": "Langues",
		"en": "Languages"
	}
};
const SIDE_CONTAINER = ["personal", "contact", "education", "projects", "languages"];
const text_with_icons = {
	"email": "solid/envelope",
	"phone": "solid/phone",
	"website": "solid/globe",
	"linkedin": "brands/linkedin"
};

let resume_data;
//C:\Users\oscar\Desktop\#Oscar\Programmation\website\projects\resume
$(document).ready(function () {
	/*
	const cookie = get_cookie("default_infos");
	if (cookie != null && cookie != "") {
		resume_data = JSON.parse(cookie);
	} else {
		resume_data = template_infos;
	}
	resume_data = template_infos;
	/**/
	update_resume();
});

function printResume() {
	if (getComputedStyle(document.getElementById("resume-fr"), null).display === "block") {
		print_element("resume-fr", "main.css");
	} else if (getComputedStyle(document.getElementById("resume-en"), null).display === "block") {
		print_element("resume-en", "main.css");
	} else if (getComputedStyle(document.getElementById("resume-canadian-fr"), null).display === "block") {
		print_element("resume-canadian-fr", "main.css");
	} else if (getComputedStyle(document.getElementById("resume-canadian-en"), null).display === "block") {
		print_element("resume-canadian-en", "main.css");
	}
}

function get_data(d) {
	resume_data = JSON.parse(d);
	set_cookie("default_infos", JSON.stringify(resume_data));
	update_resume();
}

function update_format() {
	let lang = LANG_SELECTOR.language;
	if (lang === "fr") {
		if (document.getElementById("format-selector").innerHTML === "Format français") {
			document.getElementById("format-selector").innerHTML = "Format canadien";
		} else {
			document.getElementById("format-selector").innerHTML = "Format français";
		}
	} else if (language === "en") {
		if (document.getElementById("format-selector").innerHTML === "French format") {
			document.getElementById("format-selector").innerHTML = "Canadian format";
		} else {
			document.getElementById("format-selector").innerHTML = "French format";
		}
	}

	update_resume(false);
}

function update_resume(updating_language = true) {
	/*
	$("#resume").empty();
	$("#resume").append("<div id='resume-content'></div>");
	$("#resume").append("<div id='resume-side'><img id='resume-profile_pic' src='profile_pic_squared.png'></div>");
	*/

	language = LANG_SELECTOR.language;
	if (updating_language) {
		if (language === "fr") {
			document.getElementById("format-selector").innerHTML = "Format canadien";
		} else if (language === "en") {
			document.getElementById("format-selector").innerHTML = "Canadian format";
		}
	}
	if (language === "fr") {
		if (document.getElementById("format-selector").innerHTML === "Format français") {
			document.getElementById("resume-fr").style.display = "none";
			document.getElementById("resume-canadian-fr").style.display = "block";
		} else {
			document.getElementById("resume-fr").style.display = "block";
			document.getElementById("resume-canadian-fr").style.display = "none";
		}
		document.getElementById("resume-en").style.display = "none";
		document.getElementById("resume-canadian-en").style.display = "none";
		document.getElementById("print_resume").innerHTML = "Imprimer";
	} else if (language === "en") {
		if (document.getElementById("format-selector").innerHTML === "French format") {
			document.getElementById("resume-en").style.display = "none";
			document.getElementById("resume-canadian-en").style.display = "block";
		} else {
			document.getElementById("resume-en").style.display = "block";
			document.getElementById("resume-canadian-en").style.display = "none";
		}
		document.getElementById("resume-fr").style.display = "none";
		document.getElementById("resume-canadian-fr").style.display = "none";
		document.getElementById("print_resume").innerHTML = "Print";
	}
	//iterate_data(resume_data, language, $("#resume-content"));
}

function iterate_data(data, lang, parent, deep_level = -1) {
	deep_level++;
	for (const key in data) {
		if (LANG_SELECTOR.languages.indexOf(key) >= 0) {
			return -1;
		} else if (data.hasOwnProperty(key)) {
			let content = data[key];
			if (DISPLAY_NONE.indexOf(key) >= 0) {} else if (content[lang] != null || content[LANG_SELECTOR.default_language] != null) {
				const text = content[lang] != null ? content[lang] : content[LANG_SELECTOR.default_language];
				if (text_with_icons.hasOwnProperty(key)) {
					const container = $("<div class='icon_container'></div>").appendTo(parent);
					container.append("<img src='" + FA_ICONS + text_with_icons[key] + ".svg' />");
					container.append("<p class='resume-" + key + "'>" + text + "</p>");
				} else {
					$("<p class='resume-" + key + "'>" + text + "</p>").appendTo(parent);
				}
			} else if (key === "list") {
				const ul_element = $("<ul></ul>").appendTo(parent);
				for (const li of content) {
					const li_element = $("<li></li>").appendTo(ul_element);
					for (const k in li) {
						const li_content = li[k];
						if (li_content[lang] != null || li_content[LANG_SELECTOR.default_language] != null) {
							const text = li_content[lang] != null ? li_content[lang] : li_content[LANG_SELECTOR.default_language];
							$("<p>" + text + "</p>").appendTo(li_element);
						}
					}
				}
			} else {
				const container_parent = (SIDE_CONTAINER.indexOf(key) < 0) ? parent : $("#resume-side");
				const container = $("<div class='resume-level-" + deep_level + " resume-container-" + key + "'></div>").appendTo(container_parent);
				if (CONTAINER_TITLE.hasOwnProperty(key)) {
					container.append("<h3 class='resume-container_title'>" + CONTAINER_TITLE[key][lang] + "</h3>");
				}
				iterate_data(content, lang, container, deep_level);
			}
		}
	}
}

$("#file-selector").on("change", function () {
	text = read_file("#file-selector", get_data);
});