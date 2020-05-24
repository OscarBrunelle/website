const IMAGES_PATH = "images/";
const GROUP_COLORS = ["brown", "lightblue", "pink", "orange", "red", "yellow", "green", "darkblue"];

let id = 10;

/*
TODO:
- finir d'écrire les noms des cases
- traduction?
- tourner à 45deg les images des coins
- refaire les png propres
- ajouter les actions des cartes speciales
*/

class BoardCase {
	constructor(_type) {
		this.type = _type;
		this.reset();

		this.uniqueId = "case-" + (id++);
		this.element = $("<div id='" + this.uniqueId + "' class='board_case'></div>");
	}

	appendTo(parent_id) {
		this.element.prependTo("#" + parent_id);
	}

	action(player) {}

	reset() {}
}

class BuyableCase extends BoardCase {
	constructor(type, _group, _price) {
		super(type);
		this.group = _group;
		this.price = _price;
	}

	action(player) {
		if (this.proprietary == null) {
			//ask to buy
		} else if (this.proprietary === player.number) {
			if (this.type === 0 && this.houses < MAX_HOUSES) {
				//ask for more houses
			}
		} else if (!this.isMortgaged) {
			//pay to proprietary
		}
	}

	reset() {
		super.reset();
		this.proprietary = null;
		this.isMortgaged = false;
	}
}

class ColoredCase extends BuyableCase {
	constructor(_group, _price, _title) {
		super(0, _group, _price);
		this.title = _title;

		this.element.append("<div class='case_color_div' style='background-color: " + GROUP_COLORS[this.group] + ";'></div>");
		this.element.append("<span class='case_name'>" + this.title + "</span>");
		this.element.append("<span class='case_price'>M " + this.price + "</span>");
	}

	reset() {
		super.reset();
		this.houses = 0;
	}
}

class GroupCase extends BuyableCase {
	constructor(_group, _price, _image) {
		super(1, _group, _price);

		this.element.append("<img src='" + IMAGES_PATH + _image + ".png'></img>");
		this.element.append("<span class='case_price'>M " + this.price + "</span>");
	}
}

class SpecialCase extends BoardCase {
	constructor(_image, _action, _price = null) {
		super(2);
		if (_action != null) {
			this.action = _action;
		}
		this.price = _price;

		this.element.append("<img src='" + IMAGES_PATH + _image + ".png'></img>");
		if (this.price != null) {
			this.element.append("<span class='case_price'>M " + this.price + "</span>");
		}
	}
}

const BOARD = [
	new SpecialCase("start"),
	new ColoredCase(0, 60, "Boulevard de Belleville"),
	new SpecialCase("community_bottom", community),
	new ColoredCase(0, 60, "Rue Lecourbe"),
	new SpecialCase("income_tax", income_tax, 200),
	new GroupCase(8, 200, "train_bottom"),
	new ColoredCase(1, 100, "TODO"),
	new SpecialCase("chance_bottom", chance),
	new ColoredCase(1, 100, "TODO"),
	new ColoredCase(1, 120, "TODO"),

	new SpecialCase("prison"),
	new ColoredCase(2, 140, "TODO"),
	new ColoredCase(2, 140, "TODO"),
	new GroupCase(9, 150, "electricity"),
	new ColoredCase(2, 160, "TODO"),
	new GroupCase(8, 200, "train_left"),
	new ColoredCase(3, 180, "TODO"),
	new ColoredCase(3, 180, "TODO"),
	new SpecialCase("community_left", community),
	new ColoredCase(3, 200, "TODO"),

	new SpecialCase("parking", parking),
	new ColoredCase(4, 220, "TODO"),
	new ColoredCase(4, 220, "TODO"),
	new SpecialCase("chance_top", chance),
	new ColoredCase(4, 240, "TODO"),
	new GroupCase(8, 200, "train_top"),
	new ColoredCase(5, 260, "TODO"),
	new ColoredCase(5, 260, "TODO"),
	new GroupCase(9, 150, "water"),
	new ColoredCase(5, 280, "TODO"),

	new SpecialCase("police", police),
	new ColoredCase(6, 300, "TODO"),
	new ColoredCase(6, 300, "TODO"),
	new SpecialCase("community_right", community),
	new ColoredCase(6, 320, "TODO"),
	new GroupCase(8, 200, "train_right"),
	new SpecialCase("chance_right", chance),
	new ColoredCase(7, 350, "Avenue des Champs-Élysées"),
	new SpecialCase("luxury_tax", luxury_tax, 100),
	new ColoredCase(7, 400, "Rue de la paix"),
];

function create_board() {
	let board = $("<div id='board'></div>").appendTo("#game");
	board.append("<div id='side-bottom' class='case_container'></div>");
	board.append("<div id='side-left' class='case_container'></div>");
	board.append("<div id='side-top' class='case_container'></div>");
	board.append("<div id='side-right' class='case_container'></div>");
	board.append("<div id='side-center'></div>");

	for (const board_index in BOARD) {
		const board_case = BOARD[board_index];

		let parent_id = "side-";
		let side;
		switch (Math.floor(board_index / 10)) {
			case 0:
				side = "bottom";
				break;
			case 1:
				side = "left";
				break;
			case 2:
				side = "top";
				break;
			case 3:
				side = "right";
				break;
			default:
				console.error("Error while creating the board, too many elements.")
				break;
		}
		parent_id += side;

		board_case.appendTo(parent_id);
	}

	//TODO: throw or row dices?
	let roll_dices_button = $("<button id='roll_dices_button'>Roll Dices</button>").appendTo("#side-center");
	roll_dices_button.on("click", throw_dices);
}

function community(player) {}

function income_tax(player) {}

function chance(player) {}

function parking(player) {}

function police(player) {
	player.moveTo(10);
	player.isJailed = true;
}

function luxury_tax(player) {}