"use strict"

const MAX_OXYGEN_LEVEL = 100;
class Room {
	constructor(room_orientation = 0, system_linked = null) {
		this.oxygen_level = MAX_OXYGEN_LEVEL;
		this.room_type = "medbay";
	}

	set_oxygen(n, is_diff = false) {
		if (is_diff == true) n += this.oxygen_level;
		this.oxygen_level = Math.max(Math.min(n, MAX_OXYGEN_LEVEL), 0);
	}

	update() {
		this.set_oxygen(-1, true);
	}
}