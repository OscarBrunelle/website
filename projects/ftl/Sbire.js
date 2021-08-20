"use strict"

class Sbire {
	constructor(name = "sbire", max_hp = 100) {
		this.create_dom();
		this.set_name(name);
		this.max_hp = max_hp;
		this.set_hp(max_hp);
		this.x = 0;
		this.y = 0;
		this.default_assigned_room = null;
		this.assigned_room = null;

		this.current_room = new Room();
	}

	create_dom() {
		this.dom_container = docdiv(null, "sbire");
		this.doc_name = docspan(this.dom_container);
		const life_bar_container = docdiv(this.dom_container, "life_bar_container");
		this.doc_life_bar = docdiv(life_bar_container);
	}

	set_name(name) {
		this.name = name;
		this.doc_name.innerHTML = this.name;
	}

	set_hp(n) {
		this.hp = Math.max(Math.min(n, this.max_hp), 0);
		this.doc_life_bar.style.width = (this.hp / this.max_hp) * 100 + "%";
		if (this.hp <= 0) {
			this.death();
		}
	}

	heal(n) {
		this.set_hp(this.hp + n);
	}

	take_damage(n) {
		this.set_hp(this.hp - n);
	}

	take_oxygen_damage() {
		this.take_damage(0.2);
	}

	death() { }

	update() {
		this.current_room.update();
		if (this.current_room.room_type == "medbay") {
			this.heal(0.1);
		}
		if (this.current_room.oxygen_level == 0) {
			this.take_oxygen_damage();
		}
	}
}