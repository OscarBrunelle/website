let players = [];
let current_player_index = 0;
let number_players = 1;

$(document).ready(function() {
    create_board();

	for (let i = 0; i < number_players; i++) {
		players.push(new Player(i))
	}
});

//move in Player class
function roll_dices () {
	let dices_value = get_dices_value();
	const player = players[current_player_index]
	player.pos += dices_value;
	if (player.pos > board_cases.length) {
		player.pos %= board_cases.length;
	}
	const player_element = $("#player").detach();
	player.move();
}

function get_dices_value () {
	let result1 = Math.floor(Math.random() * 6 + 1);
	let result2 = Math.floor(Math.random() * 6 + 1);
	return result1 + result2;
}

class Player {
	constructor(_num) {
		
	}
}