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

let players = [];
let current_player;
let number_players = 1;

$(document).ready(function() {
    create_board();

	for (let i = 0; i < number_players; i++) {
		players.push(new Player(i, PLAYER_COLORS[i]));
		players[i].draw();
	}

	//select player who start at random
	current_player = Math.floor(Math.random() * players.length);
});

function throw_dices() {
	players[current_player].start_turn();
	current_player = (current_player + 1) % players.length;
}