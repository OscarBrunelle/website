"use strict"

const values = ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"];
const signs = ["Trèfle", "Coeur", "Pique", "Carreau"];

const cols = [30, 50, 70];
const rows = [25, 50, 65, 80, 100, 120, 135, 150, 175];

class Card {
	constructor(_number, _sign) {
		this.number = _number;
		this.sign = _sign;
	}

	get value() {
		let values = ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"];
		return values.indexOf(this.number);
	}

	draw(parent) {
		let src = "../../shared/cards/card_svgs/";
		switch (this.sign) {
			case "Trèfle":
				src += "clubs";
				break;
			case "Coeur":
				src += "hearts";
				break;
			case "Pique":
				src += "spades";
				break;
			case "Carreau":
				src += "diamonds";
				break;
		}
		src += "-" + (this.value + 1) + ".svg";
		docimg(parent, src, "card");
	}
}

class Deck {
	constructor() {
		this.deck = [];
		this.base_deck = [];
	}

	add_basic_deck(size = 52) {
		let values = [];
		if (size == 52) {
			values = ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"];
		} else if (size == 32) {
			values = ["As", 7, 8, 9, 10, "Valet", "Dame", "Roi"];
		}
		for (let number = 0; number < values.length; number++) {
			for (let sign = 0; sign < signs.length; sign++) {
				this.base_deck.push(new Card(values[number], signs[sign]));
			}
		}
		this.deck = deep_copy(this.base_deck);
	}

	draw() {
		if (this.deck.length == 0) {
			console.error("No more cards in deck !");
			return;
		}
		let random_index = Math.floor(Math.random() * this.deck.length);
		let random_card = this.deck[random_index];

		this.deck.splice(random_index, 1);
		return random_card;
	}

	reset() {
		this.deck = this.base_deck;
	}
}