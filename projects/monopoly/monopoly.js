let players = [{pos: 0}];
let current_player_index = 0;

$(document).ready(function() {
    create_board();
});

function roll_dices () {
	let dices_value = get_dices_value();
	players[current_player_index].pos += dices_value;
	if (players[current_player_index].pos > board_cases.length) {
		players[current_player_index].pos -= board_cases.length;
	}
	$("#player").appendTo("." + board_cases[players[current_player_index].pos][1]);
}

function get_dices_value () {
	let result1 = Math.floor(Math.random() * 6 + 1);
	let result2 = Math.floor(Math.random() * 6 + 1);
	return result1 + result2;
}