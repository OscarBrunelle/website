let deck = new Deck();

let players = [];
let dealer;

function again() {

}

function pick() {
	players[0].pick();

	if (players[0].score >= 21) {
		stay();
	}
}

function stay() {
	const pick_button = document.getElementById("pick");
	pick_button.setAttribute("disabled", true);

	ai_pick();

	getWinner();
}

let ai_score = 0;

function ai_pick() {
	while (dealer.score < 17) {
		dealer.pick();
	}
}

function getWinner() {
	if (players[0].score <= 21 && (dealer.score > 21 || players[0].score > dealer.score)) {
		dealer.set_result("Player wins! :)");
	} else {
		dealer.set_result("AI wins! :(");
	}
}

function reset() {
	deck.reset();
	players[0].reset();
	dealer.reset();

	const pick_button = document.getElementById("pick");
	pick_button.removeAttribute("disabled");
}

class Person {
	constructor(parent, person_name) {
		this.name = person_name;

		this.docspot = docdiv(parent, "spot");
		this.docscore = docspan(this.docspot, "", "score");
		this.doccards = docdiv(this.docspot, "cards");
		this.docname = docspan(this.docspot, this.name, "name");
	}

	set_score(value) {
		this.score = value;
		this.docscore.innerHTML = this.score;
	}

	pick() {
		const card = deck.select_card();
		card.draw(this.doccards);

		this.set_score(this.score + card.value + 1);
	}

	reset() {
		this.set_score(0);
		this.doccards.innerHTML = "";
	}
}

class Player extends Person {
	constructor(person_name = ("Player " + (players.length + 1))) {
		super(document.getElementById("game_area-players"), person_name);

		this.docamount = docspan(this.docspot, "", "amount");

		this.reset();
	}

	set_amount(value) {
		this.docamount.innerHTML = value;
	}

	reset() {
		super.reset();
		this.set_amount(0);
	}
}

class Dealer extends Person {
	constructor(person_name = "Dealer") {
		super(document.getElementById("game_area-dealer"), person_name);

		this.docresult = docspan(this.docspot, "", "result");

		this.reset();
	}

	set_result(value) {
		this.docresult.innerHTML = value;
	}

	reset() {
		super.reset();

		this.set_result("");
	}
}

function load() {
	for (let i = 0; i < 1; i++) {
		players.push(new Player());
	}
	dealer = new Dealer();
}

document.onload = load();