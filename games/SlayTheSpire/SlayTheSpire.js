var turn = 0;

function entity(HP = 10, strength = 0, attack = 5, block = 0){
	this.HP = HP;
	this.strength = strength;
	this.attack = attack;
	this.block = block;
	function setHP(HPValue){
		this.HP = HPValue;
	}
}

function draw(){
	var deck = document.getElementById("deck");
	var newCard = document.createElement("img");
    newCard.setAttribute("onclick", "attack()");
    newCard.setAttribute("src", "card.png");
    newCard.setAttribute("alt", "Card");
    deck.appendChild(newCard);
}

function showDiscardPile(){
	alert("Discard pile:");
}

function attack(){
	if (turn%2 == 0) {
		attackValue = player.attack - monster.block;
		monster.HP = (monster.HP - attackValue);
		if (monster.HP <= 0) {alert("Monster died! Victory :)")}
		else {turn++}
	} else {
		attackValue = monster.attack - player.block;
		player.HP = (player.HP - attackValue);
		if (player.HP <= 0) {alert("You died! Defeat :(")}
		else {turn++}
	}
	update();
}

function beginTurn(){
	/*player.block = 0;*/
}

function endTurn(){
	if (turn%2 == 0) {
		/*if (attack(player, monster) == true) {
			endGame();
		} else {
			player.attack = 0;
			player.*/

	turn++;
}

function update(){
	document.getElementById("playerHealth").innerHTML = "Player Health: " + player.HP;
	document.getElementById("monsterHealth").innerHTML = "Monster Health: " + monster.HP;
}

var player = new entity(50);
var monster = new entity(25);



/*
window.onload(alert("This is a beta version"));
*/