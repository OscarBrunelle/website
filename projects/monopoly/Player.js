class Player {
	constructor(_num, color) {
		this.number = _num;
		this.reset();

		this.element = $("<div class='player' style='background-color: " + color + ";'></div>").appendTo("#board");
	}

	start_turn() {
		const result = dices.throw();
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
		/*
		this.element.detach();
		this.element.appendTo("#" + BOARD[this.position].uniqueId);
		*/
		const side = Math.floor(this.position / 10);
		switch (side) {
			case 0:
				this.element.css("transform", "");
				this.element.css("right", (52.3 * (this.position % 10 + 1)) + "px");
				break;
			case 1:
				this.element.css("right", "0px");
				this.element.css("transform", "translate(-600px, " + (20 - 52.3 * (this.position % 10 + 1)) + "px) rotate(90deg)");
				break;
			case 2:
				this.element.css("right", "0px");
				this.element.css("transform", "translate(" + (-630 + (52.3 * (this.position % 10 + 1))) + "px, -580px) rotate(180deg)");
				break;
			case 3:
				this.element.css("right", "0px");
				this.element.css("transform", "translate(-20px, " + (20 - 52.3 * (10 - this.position % 10 + 1)) + "px) rotate(-90deg)");
				break;
			default:
				break;
		}
		this.element.css("bottom", "10px");
	}

	reset () {
		this.position = 0;
		this.money = 1500;
		this.isJailed = false;
		this.attempt = 1;
	}
}