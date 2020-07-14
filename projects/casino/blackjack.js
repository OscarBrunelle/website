class Card {
	constructor(_number, _sign) {
		this.number = _number;
		this.sign = _sign;
	}

	get value() {
		let values = ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"];
		return values.indexOf(this.number);
	}
}

class Deck {
	constructor() {
		this.deck = [];
		this.base_deck = [];
		this.create_deck();
		this.reset();
	}

	create_deck() {
		let values = ["As", 2, 3, 4, 5, 6, 7, 8, 9, 10, "Valet", "Dame", "Roi"];
		let signs = ["Trèfle", "Coeur", "Pique", "Carreau"];

		for (let number = 0; number < values.length; number++) {
			for(let sign = 0; sign < signs.length; sign++) {
				this.base_deck.push(new Card(values[number], signs[sign]));
			}
		}
	}

	select_card() {
		let random_index = Math.floor(Math.random() * this.deck.length);
		let random_card = this.deck[random_index];
		
		this.deck.splice(random_index, 1);
		
		return random_card;
	}

	reset() {
		this.deck = this.base_deck;
	}
}

class Spot {
	constructor(_num, _parent_elem_sel, _id) {
		this.num = _num;
		this.parent_elem_sel = _parent_elem_sel;
		this.id = _id;

		this.reset();
		this.display();
	}

	display() {
		let parent = document.querySelector(this.parent_elem_sel);

		let container = document.createElement("div");
		container.className = "spot";
		parent.appendChild(container);

		let element = document.createElement("p");
		element.id = this.id;
		element.innerHTML = this.total;
		container.appendChild(element);
	}

	reset() {
		this.total = 0;
	}
}

let deck = new Deck();
let spots = [];

function start(){
	spots.push(new Spot(-1, "#board", "dealer_spot"));
	for (let i = 0; i < 5; i++) {
		spots.push(new Spot(i, "#board"));
	}
}

function pick_card(){
	const card = deck.select_card();

	let card_element = document.getElementById("cards_picked");
	card_element.innerHTML = card_element.innerHTML + "<br/>" + card.number + " de " + card.sign;
	
	const total_element = document.getElementById("total");
	let total = parseInt(total_element.innerHTML) + card.value + 1;
	total_element.innerHTML = total;
	
	if (total > 21){
		stop();
	}
}

function stop() {
	const pick_button = document.getElementById("pick");
	pick_button.setAttribute("disabled", true);
	
	let card_element = document.getElementById("cards_picked");
	card_element.innerHTML = card_element.innerHTML + "<br/>-----";
	
	ai_pick();
	
	getWinner();
}

function ai_pick(){
	let total = 0;
	while(total<17){
		const card = deck.select_card();
		const total_element = document.getElementById("ai_total");
	total = parseInt(total_element.innerHTML) + values.indexOf(card.number) + 1;
	total_element.innerHTML = total;

	let card_element = document.getElementById("cards_picked");
	card_element.innerHTML = card_element.innerHTML + "<br/>" + card.number + " de " + card.sign;
	}
}

function getWinner() {
	const total1_el = document.getElementById("total");
	const total1 = parseInt(total1_el.innerHTML);
	
	const total2_el = document.getElementById("ai_total");
	const total2 = parseInt(total2_el.innerHTML);
	
	let card_element = document.getElementById("cards_picked");
	if (total1 <= 21 && (total2 > 21 || total1 > total2)){
	card_element.innerHTML = card_element.innerHTML + "<br/>->Player wins!";
	} else {
	card_element.innerHTML = card_element.innerHTML + "<br/>->AI wins :(";
	}
}

function reset(){
	document.getElementById("cards_picked").innerHTML = "";
	document.getElementById("total").innerHTML = "0";    document.getElementById("ai_total").innerHTML = "0";
	
	const pick_button = document.getElementById("pick");
	pick_button.removeAttribute("disabled");
}

document.onload = start();