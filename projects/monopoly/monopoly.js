/*
TODO:
- créer et gérer les joueurs
- utiliser le moteur de jeu game
	 - ajouter instructions
*/

const SIDE_SIZE = 10;
const BOARD_SIZE = 4 * SIDE_SIZE;
const PLAYER_COLORS = ["blue", "red", "green", "purple"];
const dices = new Dices(2);

let dices_result;

let players = [];
let current_player;
let number_players = 2;
let has_played = false;

$(document).ready(function() {
    create_board();

	for (let i = 0; i < number_players; i++) {
		players.push(new Player(i, PLAYER_COLORS[i]));
		players[i].moveTo(0, false);
		players[i].updateMoney();
	}

	//select player who start at random
	current_player = Math.floor(Math.random() * players.length);
	has_played = false;
});

function throw_dices() {
	if (has_played && !dices_result.double) {
		return;
	}
	players[current_player].throw_dices();
	has_played = true;
}

function end_player_turn() {
	current_player = (current_player + 1) % players.length;
	has_played = false;
}