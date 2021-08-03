"use strict"

let players = [];
let pturn = 0;
let pioche = new Deck();
let pioche_dom = document.getElementById("pioche");

class Player {
	constructor(index) {
		this.cards = [];
		this.cards_dom = docdiv(document.getElementById("players"));
		this.cards_dom.id = "player-" + index;
	}

	draw() {
		if (pioche.deck.length == 0) return;
		this.cards.push(pioche.draw());
		this.update();
	}

	play(cs) {
		for (const c of cs) {
			for (let i = 0; i < this.cards.length; i++) {
				const card = this.cards[i];
				if (card == c) {
					this.cards.splice(i--, 1);
				}
			}
		}
		this.update();
		return true;
	}

	check_own_groups() {
		let values = ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"];
		for (const v of values) {
			let candidates = [];
			for (const card of this.cards) {
				if (values[card.value] == v) {
					let flag = false;
					for (const candidate of candidates) {
						if (card.sign == candidate.sign) {
							flag = true;
							break;
						}
					}
					if (flag == false) candidates.push(card);
				}
			}
			if (candidates.length > 2) {
				return this.play(candidates);
			}
		}
	}

	check_own_suites() {
	}

	check_table_groups() {
	}

	check_table_suites() {
	}

	start_turn() {
		if (this.check_own_groups()) {
			return;
		} else if (this.check_own_suites()) {
			return;
		} else if (this.check_table_groups()) {
			return;
		} else if (this.check_table_suites()) {
			return;
		} else {
			this.draw();
		}
	}

	update() {
		this.cards_dom.innerHTML = this.cards.length;
		pioche_dom.innerHTML = pioche.deck.length;
	}

	reset() {
		this.cards = [];
	}
}

function reset() {
	pioche.reset();
	for (const player of players) {
		player.reset();
	}
	for (let i = 0; i < 11; i++) {
		for (const player of players) {
			player.draw();
		}
	}
}

function load() {
	pioche.add_basic_deck();
	pioche.add_basic_deck();
	for (let i = 0; i < 4; i++) {
		players.push(new Player(i));
	}
	reset();
}

function next_turn() {
	players[pturn].start_turn();
	pturn = (pturn + 1) % players.length;
}

document.onload = load();