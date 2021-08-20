"use strict"

class Ship {
	constructor(max_hp = 30, energy_available = 12, weapons_capacity = 4) {
		this.max_hp = max_hp;
		this.set_hp(max_hp);
		this.rooms = [];
	}

	set_hp(n, is_diff = false) {
		if (is_diff == true) n += this.hp;
		this.hp = Math.max(Math.min(n, this.max_hp), 0);
		document.querySelector(`#hull_bar .amount`).innerHTML = this.hp;

		let color = "green";
		if (this.hp <= 10) {
			color = "red";
		} else if (this.hp <= 20) {
			color = "orange";
		}
		const squares = document.querySelector(`#hull_bar .squares`);
		squares.innerHTML = "";
		for (let i = 0; i < parseInt(this.hp); i++) {
			const square = docdiv(squares, `square ${color}`);
			squares.appendChild(square);
		}
	}

	update() {
		for (const room of this.rooms) {
			room.update();
		}
		this.set_hp(-0.01, true)
	}
}