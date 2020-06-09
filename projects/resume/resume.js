const LANG_SELECTOR = new LanguageSelector("#top_nav", ["fr", "en"], 0, update_resume);
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
		"fr": "Expérience professionelle",
		"en": "Work experience"
	},
	"projects": {
		"fr": "Projets",
		"en": "Projects"
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
const SIDE_CONTAINER = ["personal", "contact", "education", "languages"];

let resume_data;
//C:\Users\oscar\Desktop\#Oscar\Programmation\website\projects\resume
$(document).ready(function () {
	const cookie = get_cookie("default_infos");
	if (cookie != null && cookie != "") {
		resume_data = JSON.parse(cookie);
	}
	update_resume();
});

function printResume() {
	print_element("resume", "resume.css");
}

function get_data(d) {
	resume_data = JSON.parse(d);
	set_cookie("default_infos", JSON.stringify(resume_data));
	update_resume();
}

function update_resume() {
	$("#resume").empty();
	$("#resume").append("<div id='resume-content'></div>");
	$("#resume").append("<div id='resume-side'><img id='resume-profile_pic' src='profile_pic.png'></div>");

	language = LANG_SELECTOR.language;
	iterate_data(resume_data, language, $("#resume-content"));
}

function iterate_data(data, lang, parent, deep_level = -1) {
	deep_level++;
	for (const key in data) {
		if (LANG_SELECTOR.languages.indexOf(key) >= 0) {
			return -1;
		} else if (data.hasOwnProperty(key)) {
			let content = data[key];
			if (content[lang] != null && DISPLAY_NONE.indexOf(key) < 0) {
				if (key === "phone") {
					const container = $("<div class='icon_container'></div>").appendTo(parent);
					container.append("<img src='" + FA_ICONS + "solid/phone.svg' />");
					container.append("<p class='resume-" + key + "'>" + content[lang] + "</p>");
				} else if (key === "email") {
					const container = $("<div class='icon_container'></div>").appendTo(parent);
					container.append("<img src='" + FA_ICONS + "solid/envelope.svg' />");
					container.append("<p class='resume-" + key + "'>" + content[lang] + "</p>");
				} else {
					$("<p class='resume-" + key + "'>" + content[lang] + "</p>").appendTo(parent);
				}
			} else {
				const container_parent = (SIDE_CONTAINER.indexOf(key) < 0) ? parent : $("#resume-side");
				const container = $("<div class='resume-level-" + deep_level + " resume-container-" + key + "'></div>").appendTo(container_parent);
				if (CONTAINER_TITLE.hasOwnProperty(key)) {
					container.append("<h3 class='resume-container_title'>" + CONTAINER_TITLE[key][language] + "</h3>");
				}
				iterate_data(content, lang, container, deep_level);
			}
		}
	}
}

$("#file-selector").on("change", function () {
	text = read_file("#file-selector", get_data);
});