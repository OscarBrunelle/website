"use strict"

class Player {
	constructor() {
		this.ship = new Ship();
		this.scrap_r = 0;
		this.fuel_r = new Resource("fuel");
		this.missiles_r = new Resource("missiles");
		this.drone_parts_r = new Resource("drone_parts");
		this.sbires = [];
	}

	add_sbire(sbire) {
		this.sbires.push(sbire);
		document.getElementById("sbires").appendChild(sbire.dom_container);
	}

	set scrap(n) {
		this.scrap_r = n;
		document.getElementById("scrap").innerHTML = this.scrap_r;
	}

	set fuel(n) {
		console.log("fuel");
		this.fuel_r.quantity = n;
	}

	render() {

	}

	update() {
		this.ship.update();
		for (const sbire of this.sbires) {
			sbire.update();
		}
	}
}