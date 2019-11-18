class Project {
	constructor(address, title, description = null) {
		this.address = address;
		this.title = title;
		this.description = description;
	}
}

let researches = [
	new Project("bst", "Binary Search Tree", "A binary search tree editor."),
	new Project("pathFinding", "Path Finding", ""),
	new Project("stateSolver", "State Solver", ""),
	new Project("sudoku", "Sudoku Solver", "")
];

let games = [
	new Project("animation", "Animations"),
	new Project("bubbleTrouble", "Bubble Trouble"),
	new Project("doodleJump", "Doodle Jump"),
	new Project("minesweeper", "Minesweeper"),
	new Project("pong", "Pong"),
	new Project("snake", "Snake")
];

function setup(){
	printProjects(researches, "researchesList");
	printProjects(games, "gamesList");
}

function printProjects(projects, listID){
	for (var i = 0; i < projects.length; i++) {
		let project = projects[i];

		let div = document.createElement("div");
		div.className = "project";

		let link = document.createElement("a");
		link.href = "projects/" + project.address + "/index.html";
		link.innerHTML = project.title;
		div.appendChild(link);

		if (project.description !== null) {
			let description = document.createElement("p");
			description.innerHTML = project.description;
			div.appendChild(description);
		}
		
		let preview = document.createElement("img");
		preview.className = "preview";
		preview.src = "projects/" + project.address + "/preview.png";
		preview.alt = "No preview";
		div.appendChild(preview);

		document.getElementById(listID).appendChild(div);
	}
}

window.onload = setup();