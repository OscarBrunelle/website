const IMAGES_PATH = "images/";
const GROUP_COLORS = ["brown", "lightblue", "pink", "orange", "red", "yellow", "green", "darkblue"];
const MAX_HOUSES = 5
const HOUSE_PRICES = [50, 50, 100, 100, 150, 150, 200, 200];

let id = 10;

/*
TODO:
- traduction?
- tourner à 45deg les images des coins
- refaire les png propres
- ajouter les actions des cartes speciales
*/

class BoardCase {
	constructor(_type, _name) {
		this.type = _type;
		this.name = _name;
		this.reset();

		this.uniqueId = "case-" + (id++);
		this.element = $("<div id='" + this.uniqueId + "' class='board_case type-" + _type + "'></div>");
		this.element.append("<span class='case_name'>" + this.name + "</span>");
	}

	appendTo(parent_id) {
		this.element.prependTo("#" + parent_id);
	}

	move(player) {
		this.element.append(player.element);
	}

	remove(player) {
		this.element.find(".player-" + player.number).remove();
	}

	action(player) {
		this.show();
	}

	show() {
		$("#card").empty().removeClass("type-0");
		$("#card").append("<span class='case_name'>" + this.name + "</span>");
	}

	reset() {}
}

class BuyableCase extends BoardCase {
	constructor(type, _name, _group, _price) {
		super(type, _name);
		this.group = _group;
		this.price = _price;
		this.mortgage = this.price / 2;
		
		this.element.append("<span class='case_price'>M " + this.price + "</span>");
	}

	action(player) {
		super.action(player);
		if (this.proprietary == null) {
			player.pay(this.price);
			this.proprietary = player;
			this.element.css("outline", "2px solid " + player.color);
			this.element.css("outline-offset", "-3px");
			//ask to buy
		} else if (this.proprietary === player) {
			if (this.type === 0 && player.hasMonopole(this.group) && this.houses < MAX_HOUSES) {
				//ask for more houses
			}
		} else if (!this.isMortgaged) {
			//pay to proprietary
			player.pay(this.rent, this.proprietary);
		}
	}

	toggleMortgage() {
		if (this.isMortgaged) {
			if (this.proprietary.money < this.mortgage) {
				return;
			}
			this.proprietary.pay(this.mortgage);
		} else {
			this.proprietary.get(this.mortgage);
		}
		this.isMortgaged = !this.isMortgaged;
	}

	show() {
		super.show();
		$("#card").append("<div class='mortgage_value'>Valeur hypothéquaire:<p>€ " + this.mortgage + "</p></div>");
	}

	reset() {
		super.reset();
		this.proprietary = null;
		this.isMortgaged = false;
	}
}

class ColoredCase extends BuyableCase {
	constructor(_name, _group, _price, _rents) {
		super(0, _name, _group, _price);
		this.rents = _rents;

		this.house_price = HOUSE_PRICES[this.group];

		this.element.append("<div class='case_color_div' style='background-color: " + GROUP_COLORS[this.group] + ";'></div>");
	}

	get rent() {
		let rent;
		if (this.isMortgaged) {
			rent = 0;
		} else if (this.houses === 0) {
			rent = this.rents[this.houses];
			if (this.proprietary.hasMonopole(this.group)) {
				rent *= 2;
			}
		} else {
			rent = this.rents[this.houses];
		}
		return rent;
	}

	show() {
		super.show();
		$("#card").addClass("type-0");
		$("#card").append("<div class='case_color_div' style='background-color: " + GROUP_COLORS[this.group] + ";'></div>");
		const rents_container = $("<div class='content'></div>").appendTo("#card");
		for (const house_num in this.rents) {
			let house_text;
			switch (parseInt(house_num)) {
				case 0:
					house_text = "Terrain nu";
					break;
				case 1:
					house_text = "Avec 1 Maison";
					break;
				case 5:
					house_text = "Avec HÔTEL";
					break;
				default:
					house_text = "Avec " + house_num + " Maisons";
					break;
			}
			const rent_text = this.rents[house_num];
			rents_container.append("<div class='rent'><p>" + house_text + "</p><p>" + rent_text + "</p></div>");
		}
	}

	reset() {
		super.reset();
		this.houses = 0;
	}
}

//TODO: move name as first argument
class GroupCase extends BuyableCase {
	constructor(_name, _group, _price, _image) {
		super(1, _name, _group, _price);
		this.image = _image;

		this.element.append("<img src='" + IMAGES_PATH + this.image + ".png'></img>");
	}

	get rent() {
		if (this.isMortgaged) {
			return 0;
		}

		let rent = 0;
		if (this.group === 8) {
			let owned = 0;
			for (const b_case of BOARD) {
				if (b_case.group === this.group && b_case.proprietary === this.proprietary) {
					owned++;
				}
			}
			switch (owned) {
				case 1:
					rent = 25;
					break;
				case 1:
					rent = 50;
					break;
				case 1:
					rent = 100;
					break;
				case 1:
					rent = 200;
					break;
				default:
					break;
			}
		} else if (this.group === 9) {
			let multiplier = 4;
			if (this.proprietary.hasMonopole(this.group)) {
				multiplier = 10;
			}
			rent = multiplier * dices_result.amount;
		}
		return rent;
	}

	show() {
		super.show();
		$("#card").append("<img src='" + IMAGES_PATH + this.image + ".png'></img>");
	}
}

class SpecialCase extends BoardCase {
	constructor(_name, _image, _action, _price = null) {
		super(2, _name);
		this.image = _image;
		this.specific_action = _action;
		this.price = _price;

		this.element.append("<img src='" + IMAGES_PATH + this.image + ".png'></img>");
		if (this.price != null) {
			this.element.append("<span class='case_price'>M " + this.price + "</span>");
		}
	}

	action(player) {
		super.action(player);
		if (this.specific_action != null) {
			this.specific_action(player);
		}
	}

	show() {
		if (this.name == null) {
			return;
		}

		super.show();
		$("#card").append("<img src='" + IMAGES_PATH + this.image + ".png'></img>");
		if (this.price != null) {
			$("#card").append("<span class='case_price'>M " + this.price + "</span>");
		}
	}
}

let BOARD = [];

function create_board() {
	const board = $("<div id='board'></div>").appendTo("#game");
	board.append("<div id='side-bottom' class='case_container'></div>");
	board.append("<div id='side-left' class='case_container'></div>");
	board.append("<div id='side-top' class='case_container'></div>");
	board.append("<div id='side-right' class='case_container'></div>");

	for (const board_index in BOARD_CASES) {
		const infos = BOARD_CASES[board_index];
		let board_case;
		if (infos.type === 0) {
			board_case = new ColoredCase(infos.name, infos.group, infos.price, infos.rents);
		} else if (infos.type === 1) {
			board_case = new GroupCase(infos.name, infos.group, infos.price, infos.image);
		} else if (infos.type === 2) {
			board_case = new SpecialCase(infos.name, infos.image, infos.action, infos.price);
		}

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
		BOARD.push(board_case);
	}

	board.append("<div id='side-center'></div>");
	$("<div id='center-top'></div>").appendTo("#side-center");
	$("<div id='center-middle'></div>").appendTo("#side-center");
	$("<div id='center-bottom'></div>").appendTo("#side-center");

	const card = $("<div id='card'></div>").appendTo("#center-top");

	//TODO: throw or row dices?
	const dices_div = $("<div id='dices_div'></div>").appendTo("#center-middle");
	dices_div.append("<img id='dice-0' class='dice_result'></img>");
	const roll_dices_button = $("<button id='roll_dices_button'>Roll Dices</button>").appendTo("#dices_div");
	roll_dices_button.on("click", throw_dices);
	dices_div.append("<img id='dice-1' class='dice_result'></img>");

	const players_stats = $("<div id='players_stats'></div>").appendTo("#center-bottom");
	for (let i = 0; i < number_players; i++) {
		players_stats.append("<span id='player_money-" + i + "'></span>");
	}
}

function community(player) {}

function income_tax(player) {
	player.pay(200);
}

function chance(player) {}

function parking(player) {}

function police(player) {
	player.moveTo(10);
	player.isJailed = true;
}

function luxury_tax(player) {
	player.pay(100);
}