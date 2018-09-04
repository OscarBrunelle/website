var turn = 0;
var permanent_AP = 3;
var AP = 3;
var startingDeck = ["strike", "strike", "strike", "strike", "strike", "defend", "defend", "defend", "defend", "defend", "strength"];
var elementsDeck = [];
var drawPile = [];
var deck = [];
var discardPile = [];
var deckElement = document.getElementById("deck");
var selectedCard = null;
var energy = 3;

function settings(){
	settingsOverlay = document.getElementById("settingsOverlay");
	if (settingsOverlay.style.display == "none") {
		settingsOverlay.style.display = "flex";
	} else {
		settingsOverlay.style.display = "none";
	}
}

function creature(HP = 10, strength = 0, attack = 5, block = 0, poison = 0){
	this.HP = HP;
	this.strength = strength;
	this.attack = attack;
	this.block = block;
	this.poison = poison;
}

function createElementsDeck(){
	var cardToAdd;
	for (var i = startingDeck.length - 1; i >= 0; i--) {
		cardToAdd = createCard(startingDeck[i]);
		elementsDeck.push(cardToAdd);
	}
	drawPile = elementsDeck.slice();
}

function shuffle(){
	drawPile = discardPile.slice();
  var currentIndex = drawPile.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = drawPile[currentIndex];
    drawPile[currentIndex] = drawPile[randomIndex];
    drawPile[randomIndex] = temporaryValue;
  }
	discardPile = [];
}

function createCard(type){
	var newCard = document.createElement("div");
	var cardTitle = document.createElement("h1");
	var cardImage = document.createElement("img");
	var cardText = document.createElement("p");
	var cardAttack = 0;
	var cardBlock = 0;
	var cardStrength = 0;

	switch (type){
		case "strike":
			cardAttack = 6 + player.strength;
    		cardText.innerHTML = "Deal " + cardAttack + " damage.";
    		cardTitle.innerHTML = "Strike";
    		cardImage.setAttribute("src", "strike.png");
    		cardImage.setAttribute("alt", "Strike");
			break;
		case "defend":
			cardBlock = 5;
    		cardText.innerHTML = "Gain " + (cardBlock/* + player.dexterity*/) + " block.";
    		cardTitle.innerHTML = "Defend";
    		cardImage.setAttribute("src", "defend.png");
    		cardImage.setAttribute("alt", "Defend");
			break;
		case "strength":
			cardStrength = 2;
    		cardText.innerHTML = "Gain " + cardStrength + " strength.";
    		cardTitle.innerHTML = "Strength";
    		cardImage.setAttribute("src", "strength.png");
    		cardImage.setAttribute("alt", "Strength");
    		break;
	}

    newCard.setAttribute("onclick", "selectCard(event)");
    newCard.setAttribute("type", type);
    newCard.setAttribute("attack", cardAttack);
    newCard.setAttribute("block", cardBlock);
    newCard.setAttribute("strength", cardStrength);
    newCard.setAttribute("clicked", false);
    
    newCard.appendChild(cardTitle);
    newCard.appendChild(cardImage);
    newCard.appendChild(cardText);

    return newCard;
}

function draw(){
	if (drawPile.length <= 0) {
		shuffle();
	}
	var drewCard = drawPile[drawPile.length-1];
	/*deck.push(drewCard);*/
	deckElement.appendChild(drewCard);
	drawPile.pop();
}

function showDiscardPile(){
	alert("Discard pile:");
}

function selectCard(event){
	selectedCard = event.target;
	if (selectedCard.clicked) {
		selectedCard.clicked = false;
		selectedCard.style.background = "brown";
		selectedCard = null;
	} else {
		selectedCard.clicked = true;
		selectedCard.style.background = "red";
	}
}

function play(){
	if (selectedCard != null) {
		/*var newHP = monster.HP-selectedCard.attack;
		monster.setHP(newHP);*/
		player.strength+=selectedCard.getAttribute("strength");
		player.block+=selectedCard.getAttribute("block");
		monster.HP-=selectedCard.getAttribute("attack");
		if (monster.HP <= 0) {alert("Monster died! Victory :)")}
		else {turn++}
			if (player.HP <= 0) {alert("You died! Defeat :(")}
			else {turn++}
	discardPile.push(selectedCard);
	/*var deckChilds = deckElement.childNodes;
	for (var i = deckChilds.length - 1; i >= 0; i--) {
		if (deckChilds[i] == selectedCard) {
			deckElement.
		}
	}*/
	deckElement.removeChild(selectedCard);
	update();
	}
}

function beginTurn(){
	/*player.block = 0;*/
}

function endTurn(){
	
	/*if (turn%2 == 0) {
		var victory = attack(player, monster);
		if (victory) {
			endGame();
		} else {
			player.attack = 0;
			PA = permanent_PA;
		}
	turn++;*/
}

function startGame(){
	createElementsDeck();
	discardPile = elementsDeck.slice();
	shuffle();
	var numberCardsDrew = 0;
	while(numberCardsDrew <5) {draw(); numberCardsDrew++;}
}

function updateCards(){
	var newCard, type;
	for (var i = deck.length - 1; i >= 0; i--) {
		newCard = deck[i];
		type = newCard.getAttribute("type");
while (newCard.firstChild) {
    newCard.removeChild(newCard.firstChild);
}
/*
	var newCard = document.createElement("div");
	var cardTitle = document.createElement("h1");
	var cardImage = document.createElement("img");
	var cardText = document.createElement("p");
	var cardAttack = 0;
	var cardBlock = 0;
	var cardStrength = 0;

	switch (type){
		case "strike":
			cardAttack = 6 + player.strength;
    		cardText.innerHTML = "Deal " + cardAttack + " damage.";
    		cardTitle.innerHTML = "Strike";
    		cardImage.setAttribute("src", "strike.png");
    		cardImage.setAttribute("alt", "Strike");
			break;
		case "defend":
			cardBlock = 5;
    		cardText.innerHTML = "Gain " + (cardBlock/* + player.dexterity*//*) + " block.";
    		cardTitle.innerHTML = "Defend";
    		cardImage.setAttribute("src", "defend.png");
    		cardImage.setAttribute("alt", "Defend");
			break;
		case "strength":
			cardStrength = 2;
    		cardText.innerHTML = "Gain " + cardStrength + " strength.";
    		cardTitle.innerHTML = "Strength";
    		cardImage.setAttribute("src", "strength.png");
    		cardImage.setAttribute("alt", "Strength");
    		break;
	}

    newCard.setAttribute("onclick", "selectCard(event)");
    newCard.setAttribute("attack", cardAttack);
    newCard.setAttribute("block", cardBlock);
    newCard.setAttribute("strength", cardStrength);
    newCard.setAttribute("clicked", false);
    newCard.setAttribute("updated", true);
    
    newCard.appendChild(cardTitle);
    newCard.appendChild(cardImage);
    newCard.appendChild(cardText);*/
	}
}

function update(){
	updateCards();
	document.getElementById("energyText").innerHTML = "Energy: " + energy;
	document.getElementById("playerHealth").innerHTML = "Player Health: " + player.HP;
	document.getElementById("monsterHealth").innerHTML = "Monster Health: " + monster.HP;
}

var player = new creature(50);
var monster = new creature(25);

/*
window.onload = alert("This is a beta version");
*/
window.onload = startGame();