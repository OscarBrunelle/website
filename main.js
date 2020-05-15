const type_parent = {
	"research": "researches",
	"game": "games"
};
const list_title = {
	"researches": "Tools and research projects",
	"games": "Games"
};

$(document).ready(function() {
	for (const project of PROJECTS) {
		const parent_id = type_parent[project.type];
		if ($("#" + parent_id).length < 1) {
			const projects_list = $("<div id='" + parent_id + "' class='projects_list'></div>").appendTo("#projects");
			projects_list.append("<h1 class='projects_list-title'>" + list_title[parent_id])
		}
		const container = $("<a class='project' href='projects/" + project.link + "/index.html'></a>").appendTo("#" + parent_id);
		container.append("<h2 class='project-title'>" + project.title + "</h2>");
		container.append("<p class='project-description'>" + project.description + "</p>");
	}
});