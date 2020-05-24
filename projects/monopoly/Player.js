class Player {
	constructor(_num, color) {
		this.number = _num;
		this.reset();

		this.element = $("<div class='player' style='background-color: " + color + ";'></div>");
	}

	start_turn() {
		const result = dices.throw();
		console.log(result);
		if (result.double) {
			this.free();
		}
		if (!this.isJailed) {
			this.move(result.amount);
		} else {
			this.attempt++;
			if (this.attempt > 3) {
				this.pay(50);
				this.free();
				this.move(result.amount);
			}
		}
	}

	move(number){
		this.position = (this.position + number) % BOARD_SIZE;
		this.draw();
		BOARD[this.position].action(this);
	}

	moveTo(position){
		this.position = position;
		this.draw();
	}

	free() {
		this.isJailed = false;
		this.attempt = 1;
	}

	pay(amount) {
		this.money -= amount;
		console.log(this.money);
	}

	draw() {
		this.element.detach();
		this.element.appendTo("#" + BOARD[this.position].uniqueId);
	}

	reset () {
		this.position = 0;
		this.money = 1500;
		this.isJailed = false;
		this.attempt = 1;
	}
}