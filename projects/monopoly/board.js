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
		const board_case = this;
		this.element.on("mouseover", function () {
			board_case.show();
		});
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

	get card() {
		const c = $("<div class='property_card' board_index='" + this.board_index + "'></div>");
		c.append("<span class='case_name'>" + this.name + "</span>");

		return c;
	}

	show() {
		$("#card").empty().removeClass("type-0 mortgaged");
		$("#card").html(this.card.html());
		if (this.card.hasClass("type-0")) {
			$("#card").addClass("type-0");
		}
		if (this.card.hasClass("mortgaged")) {
			$("#card").addClass("mortgaged");
		}

		const owner = this.owner != null ? this.owner.name : "/";
		$("#infos-owner .value_text").text(owner);
		const rent = this.rent != null ? ("€ " + this.rent) : "/";
		$("#infos-rent .value_text").text(rent);
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
		if (this.owner == null) {} else if (this.owner === player) {} else if (!this.isMortgaged) {
			player.pay(this.rent, this.owner);
		}
	}

	toggleMortgage() {
		if (this.isMortgaged) {
			if (this.owner.money < this.mortgage) {
				return;
			}
			this.owner.pay(this.mortgage);
		} else {
			this.owner.get(this.mortgage);
		}
		this.isMortgaged = !this.isMortgaged;
		this.show();
	}

	get card() {
		const c = super.card;
		if (this.isMortgaged) {
			c.addClass("mortgaged");
		}
		c.append("<div class='mortgage_value'>Valeur hypothéquaire:<p>€ " + this.mortgage + "</p></div>");

		return c;
	}

	reset() {
		super.reset();
		this.owner = null;
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
		if (this.owner == null || this.isMortgaged) {
			rent = 0;
		} else if (this.houses === 0) {
			rent = this.rents[this.houses];
			if (this.owner.hasMonopole(this.group)) {
				rent *= 2;
			}
		} else {
			rent = this.rents[this.houses];
		}
		return rent;
	}

	addHouse() {
		if (this.houses < MAX_HOUSES && this.owner.money > this.house_price) {
			this.owner.pay(this.house_price);
			this.houses++;
		}
	}

	get card() {
		const c = super.card;
		c.addClass("type-0");
		c.append("<div class='case_color_div' style='background-color: " + GROUP_COLORS[this.group] + ";'></div>");
		const rents_container = $("<div class='content'></div>").appendTo(c);
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

		return c;
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
		if (this.owner == null || this.isMortgaged) {
			return 0;
		}

		let rent = 0;
		if (this.group === 8) {
			let owned = 0;
			for (const b_case of BOARD) {
				if (b_case.group === this.group && b_case.owner === this.owner) {
					owned++;
				}
			}
			switch (owned) {
				case 1:
					rent = 25;
					break;
				case 2:
					rent = 50;
					break;
				case 3:
					rent = 100;
					break;
				case 4:
					rent = 200;
					break;
				default:
					break;
			}
		} else if (this.group === 9) {
			let multiplier = 4;
			if (this.owner.hasMonopole(this.group)) {
				multiplier = 10;
			}
			rent = multiplier * dices_result.amount;
		}
		return rent;
	}

	get card() {
		const c = super.card;
		c.append("<img src='" + IMAGES_PATH + this.image + ".png'></img>");

		return c;
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

	get card() {
		if (this.name == null) {
			return $("");
		}

		const c = super.card;
		c.append("<img src='" + IMAGES_PATH + this.image + ".png'></img>");
		if (this.price != null) {
			c.append("<span class='case_price'>M " + this.price + "</span>");
		}

		return c;
	}
}

let BOARD = [];

function create_board() {
	$("<div id='player_properties-0' class='player_properties'></div>").appendTo("#game");
	$("<div id='player_properties-1' class='player_properties'></div>").appendTo("#game");
	const board = $("<div id='board'></div>").appendTo("#game");
	$("<div id='player_properties-2' class='player_properties'></div>").appendTo("#game");
	$("<div id='player_properties-3' class='player_properties'></div>").appendTo("#game");

	board.append("<div id='side-bottom' class='case_container'></div>");
	board.append("<div id='side-left' class='case_container'></div>");
	board.append("<div id='side-top' class='case_container'></div>");
	board.append("<div id='side-right' class='case_container'></div>");

	for (let board_index in BOARD_CASES) {
		board_index = parseInt(board_index);
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
		board_case.board_index = board_index;
		BOARD.push(board_case);
	}

	board.append("<div id='side-center'></div>");
	$("<div id='center-top'></div>").appendTo("#side-center");
	$("<div id='center-middle'></div>").appendTo("#side-center");
	$("<div id='center-bottom'></div>").appendTo("#side-center");

	const action_buttons = $("<div id='action_buttons'></div>").appendTo("#center-top");
	const buy_button = $("<button id='buy_button' disabled></button>").appendTo("#action_buttons");
	buy_button.append("<span class='action_text'>Acheter</span>");
	buy_button.append("<span class='price'></span>");
	buy_button.on("click", buy);
	const house_button = $("<button id='house_button' disabled></button>").appendTo("#action_buttons");
	house_button.append("<span class='action_text'>Acheter une maison</span>");
	house_button.append("<span class='price'></span>");
	house_button.on("click", house);
	const mortgage_button = $("<button id='mortgage_button' disabled></button>").appendTo("#action_buttons");
	mortgage_button.append("<span class='action_text'>Hypothéquer</span>");
	mortgage_button.append("<span class='price'></span>");
	mortgage_button.on("click", mortgage);

	const card = $("<div id='card' class='property_card'></div>").appendTo("#center-top");

	const infos = $("<div id='infos'></div>").appendTo("#center-top");
	infos.append("<div id='infos-owner'>Owner: <span class='value_text'></span></div>");
	infos.append("<div id='infos-rent'>Rent: <span class='value_text'></span></div>");

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

function buy() {
	const player = players[current_player];
	const board_case = BOARD[player.position];

	const disabled = (board_case.type === 2) || (board_case.owner != null || board_case.price > player.money);
	if (!disabled) {
		player.pay(board_case.price);
		player.add_to_properties(board_case);
		update_action_buttons();
	} else {
		console.log("Can't buy.");
	}
}

function house() {
	const player = players[current_player];
	const board_case = BOARD[player.position];

	const disabled = (board_case.type !== 0) || (!player.hasMonopole(board_case.group) || board_case.houses >= MAX_HOUSES || player.money < board_case.house_price || !board_case.isMortgaged);
	if (!disabled) {
		board_case.addHouse();
		update_action_buttons();
	} else {
		console.log("Can't add more houses.");
	}
}

function mortgage() {
	const player = players[current_player];
	const board_case = BOARD[player.position];

	const disabled = (board_case.type === 2) || (board_case.owner !== player);
	if (!disabled) {
		board_case.toggleMortgage();
		update_action_buttons();
	} else {
		console.log("Can't mortgage.");
	}
}

function update_action_buttons(disable) {
	update_buy_button(disable);
	update_house_button();
	update_mortgage_button();
}

function update_buy_button(disable) {
	const player = players[current_player];
	const board_case = BOARD[player.position];

	const disabled = disable || (board_case.type === 2) || (board_case.owner != null || board_case.price > player.money);
	if (board_case.type === 0 || board_case.type === 1) {
		$("#buy_button").find(".price").text("Price: €" + board_case.price);
	} else {
		$("#buy_button").find(".price").text("Price: /");
	}
	$("#buy_button").prop("disabled", disabled);
}

function update_house_button(disable) {
	const player = players[current_player];
	const board_case = BOARD[player.position];

	const disabled = disable || (board_case.type !== 0) || (!player.hasMonopole(board_case.group) || board_case.houses >= MAX_HOUSES || player.money < board_case.house_price || !board_case.isMortgaged);
	if (board_case.owner === player) {
		$("#house_button").find(".price").text("Cost: €" + board_case.house_price);
	} else {
		$("#house_button").find(".price").text("");
	}
	$("#house_button").prop("disabled", disabled);
}

function update_mortgage_button(disable) {
	const player = players[current_player];
	const board_case = BOARD[player.position];

	const disabled = disable || (board_case.type === 2) || (board_case.owner !== player);
	const text = (disabled || !board_case.isMortgaged) ? "Hypothéquer" : "Deshypothéquer";
	$("#mortgage_button").find(".action_text").text(text);
	if (board_case.owner === player) {
		if (board_case.isMortgaged) {
			$("#mortgage_button").find(".price").text("Cost: €" + board_case.mortgage);
		} else {
			$("#mortgage_button").find(".price").text("Get: €" + board_case.mortgage);
		}
	} else {
		$("#mortgage_button").find(".price").text("");
	}
	$("#mortgage_button").prop("disabled", disabled);
}