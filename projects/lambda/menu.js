function setup() {
	showDiv("mainMenuDiv");
}

function launchGame() {
	showDiv("gameDiv");
}

function instructions() {
	
}

function options() {
	showDiv("optionsDiv");
}

function showDiv(name) {
	let mainDivs = document.getElementsByClassName("mainDiv");
	for (let i = 0; i < mainDivs.length; i++) {
		mainDivs[i].style.display = "none";
	}
	document.getElementById(name).style.display = "block";
}

window.onload = setup();