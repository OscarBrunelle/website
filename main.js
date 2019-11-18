class Project {
	constructor(address, title, description = null) {
		this.address = address;
		this.title = title;
		this.description = description == "" ? title : description;
	}
}

let researches = [
	new Project("bst", "Binary Search Tree", "A binary search tree editor."),
	new Project("languageExercises", "Language Exercises", ""),
	new Project("pathFinding", "Path Finding", ""),
	new Project("stateSolver", "State Solver", ""),
	new Project("sudoku", "Sudoku Solver", "")
];

let games = [
	new Project("animation", "Animations", "Some random animations."),
	new Project("bubbleTrouble", "Bubble Trouble", "A copy of the bubble trouble game."),
	new Project("doodleJump", "Doodle Jump", ""),
	new Project("pong", "Pong", ""),
	new Project("snake", "Snake", "")
];

function setup(){
	printProjects(researches, "researchesList");
	printProjects(games, "gamesList");
}

function printProjects(projects, listID){
	for (var i = 0; i < projects.length; i++) {
		let project = projects[i];
		let div = document.createElement("div");
		let link = document.createElement("a");
		let description = document.createElement("p");
		let preview = document.createElement("img");

		div.className = "project";

		link.href = "projects/" + project.address + "/index.html";
		link.innerHTML = project.title;

		description.innerHTML = project.description;

		preview.className = "preview";
		preview.src = "projects/" + project.address + "/preview.png";
		preview.alt = "No preview";

		div.appendChild(link);
		div.appendChild(description);
		div.appendChild(preview);
		document.getElementById(listID).appendChild(div);
	}
}

window.onload = setup();