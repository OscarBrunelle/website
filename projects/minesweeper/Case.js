let icons = [];
let loadingIcons;

class Case {
	constructor(){
		this.isMined = false;
		this.isFlagged = false;
		this.isUncovered = false;
		this.neighbooringMines = 0;
		this.icon = icons[12];
	}

	toggleFlag(){
		this.isFlagged = !this.isFlagged;
		this.icon = this.isFlagged ? icons[9] : icons[12];
		return this.isFlagged;
	}

	uncover(clicked = false){
		if ((this.isFlagged && !clicked) || (!this.flagged && !this.isUncovered)) {
			this.isUncovered = true;
			if (this.isMined) {
				if (clicked) {
					this.icon = icons[11];
					return true;
				} else {
					this.icon = icons[10];
				}
			} else {
				this.icon = icons[this.neighbooringMines];
			}
		}
		return false;
	}
}

function loadIcons(){
	let iconNames = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "flag", "mine", "mineSelected", "unopened_square"];
	loadingIcons = iconNames.length;

	for (var i = 0; i < iconNames.length; i++) {
		let name = "minesweeper_" + iconNames[i] + ".png";
		let icon = new Image();
		icon.src = "icons/" + name;
		icons.push(icon);
		icon.onload = finishLoadingIcon;
	}
}

function finishLoadingIcon(icon){
	loadingIcons--;
	if (loadingIcons <= 0) {
		reset();
	}
}