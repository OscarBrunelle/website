const STARTING_MONEY = 1500;
const START_GAIN = 200;

class Player {
	constructor(_num, _color, _name = ("Player " + _num)) {
		this.number = _num;
		this.color = _color;
		this.name = _name;
		this.reset();

		this.element = $("<div class='player player-" + this.number + "' style='background-color: " + this.color + ";'></div>").appendTo("#board");
	}

	start_turn() {

	}

	throw_dices() {
		const result = dices.throw();
		for (let i = 0; i < result.indiv_results.length; i++) {
			const src = "images/dice-" + result.indiv_results[i] + ".png";
			$("#dice-" + i).attr("src", src);
		}
		dices_result = result;

		if (result.double) {
			this.free();
		}
		if (!this.isJailed) {
			this.move(result.amount, result.double);
		} else {
			this.attempt++;
			if (this.attempt > 3) {
				this.pay(50);
				this.free();
				this.move(result.amount, result.double);
			} else {
				toggle_dices(false);
			}
		}
	}

	move(number, double) {
		const player = this;
		let i = 0;
		let interval = setInterval(function(){
			if (i >= number) {
				clearInterval(interval);
				BOARD[player.position].action(player);
				update_action_buttons();
				if (!double) {
					toggle_dices(false);
				}
			} else {
				BOARD[player.position].remove(player);
				player.position = (player.position + 1) % BOARD_SIZE;
				BOARD[player.position].move(player);
				if (player.position === 0) {
					player.get(START_GAIN);
				}
				i++;
			}
		}, 100);
	}

	moveTo(pos, end_turn = true) {
		BOARD[this.position].remove(this);
		this.position = pos;
		BOARD[this.position].move(this);
		if (end_turn) {
			toggle_dices(false);
		} else {
			BOARD[this.position].action(this);
		}
	}

	free() {
		this.isJailed = false;
		this.attempt = 1;
	}

	get(amount) {
		this.money += amount;
		this.updateMoney();
	}

	pay(amount, recipient) {
		if (this.money < amount) {
			this.pay(this.money, recipient);
			this.lose();
			return;
		}
		this.money -= amount;
		this.updateMoney();
		if (recipient != null) {
			recipient.get(amount);
		}
	}

	hasMonopole(group) {
		for (const b_case of BOARD) {
			if (b_case.group === group && b_case.owner !== this) {
				return false;
			}
		}
		return true;
	}

	updateMoney() {
		$("#player_money-" + this.number).text("Player " + this.number + ": " + this.money);
	}

	lose(){
		BOARD[this.position].remove(this);
	}

	reset() {
		this.position = 0;
		this.money = STARTING_MONEY;
		this.isJailed = false;
		this.attempt = 1;
	}
}