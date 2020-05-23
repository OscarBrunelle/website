let board_cases = [
	[false, "start"],
    [true, "brown", "Boulevard de Belleville", 60],
	[false, "community_bottom"],
	[true, "brown", "Rue Lecourbe", 60],
	[false, "income_tax"],
	[false, "train_bottom"],
	[true, "lightblue", "", 100],
	[false, "chance_bottom"],
	[true, "lightblue", "", 100],
	[true, "lightblue", "", 120],
	
	[false, "prison"],
    [true, "pink", "", 140],
	[true, "pink", "", 140],
	[false, "electricity"],
	[true, "pink", "", 160],
	[false, "train_left"],
	[true, "orange", "", 180],
	[true, "orange", "", 180],
	[false, "community_left"],
	[true, "orange", "", 200],
	
	[false, "parking"],
    [true, "red", "", 220],
	[true, "red", "", 220],
	[false, "chance_top"],
	[true, "red", "", 240],
	[false, "train_top"],
	[true, "yellow", "", 260],
	[true, "yellow", "", 260],
	[false, "water"],
	[true, "yellow", "", 280],
	
	[false, "police"],
    [true, "green", "", 300],
	[true, "green", "", 300],
	[false, "community_right"],
	[true, "green", "", 320],
	[false, "train_right"],
	[false, "chance_right"],
	[true, "darkblue", "", 350],
	[false, "luxury_tax"],
	[true, "darkblue", "Rue de la paix", 400]
];

let board_positions = ["board_bottom", "board_left", "board_top", "board_right"];

function create_board () {
    let board = $("<div id='board'></div>").appendTo("#game");
    board.append("<div id='board_bottom' class='case_container'></div>");
    board.append("<div id='board_left' class='case_container'></div>");
    board.append("<div id='board_top' class='case_container'></div>");
	board.append("<div id='board_right' class='case_container'></div>");
	board.append("<div id='board_center'></div>");

	for (let index = 0; index < 4; index++) {
		create_side(board_positions[index], board_cases.slice(index * 10 + 1, (index + 1) * 10));
	}

	create_corner("top", "left", "parc");
	create_corner("bottom", "left", "prison");
	create_corner("bottom", "right", "start");
	create_corner("top", "right", "police");

	let roll_dices_button = $("<button id='roll_dices_button'>Roll Dices</button>").appendTo("#board_center");
	roll_dices_button.on("click", roll_dices);
	
	let player = $("<div id='player' class='player'></div>").appendTo(".community_bottom");
}

function create_side(parent_id, side_cases) {
	for (let i = side_cases.length - 1; i >= 0; i--) {
		const board_case = side_cases[i];
		if (board_case[0]) {
			create_case(parent_id, board_case[1], board_case[2], board_case[3]);
		} else {
			create_special_case(parent_id, board_case[1]);
		}
	}
}

function create_case(parent_id, case_class, case_name, case_price) {
	let board_case = $("<div class='board_case'></div>").appendTo("#" + parent_id);
	board_case.append("<div class='case_color_div " + case_class + "'></div>");
	board_case.append("<span class='case_name'>" + case_name + "</span>");
	board_case.append("<span class='case_price'>M " + case_price + "</span>");
    return board_case;
}

function create_special_case(parent_id, case_class) {
    let board_case = $("<div class='board_case " + case_class + "'></div>").appendTo("#" + parent_id);
    board_case.append("<img src='" + case_class + ".png'></img>");
    return board_case;
}

function create_corner(ref1, ref2, img_src) {
    let board_corner = $("<div class='board_corner' style='" + ref1 + ": 0px; " + ref2 + ": 0px;'></div>").appendTo("#board");
    board_corner.append("<img src='" + img_src + "'></img>");
    return board_corner;
}