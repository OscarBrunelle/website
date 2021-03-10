"use strict"

const gameView = document.getElementById("game-view");

/*
ages
stone
medieval: 4000
renaissance: 14000
infantry: 45000
future: 200000

turrets:
slots: 1000 3000 7500

stone:
units:
club man: cost 15 exp ally 10
slingshot man: 25 16 
dino rider 100 65
turrets:
rock slingshot 100
egg automatic 200
primitive catapult 500

medieval:
units:
swordman 50
archer 75
knight 500
turrets:
catapult: 500
fire catapult: 750
oil: 1000

renaissance:
dueler 200
Musketeer 400
Cannoneer 1000 750?
turrets:
small cannon: 1500
large cannon: 3000
explosive cannon: 6000

modern:
melee infantry 1500
infantry 2000
tank 7000
turrets:
machine gun: 7000
rocket launcher: 9000
double machine gun: 14000
*/

class Age {
	constructor(expNeeded, units, turrets, life, power) {
		this.expNeeded = expNeeded;
		this.units = units;
		this.turrets = turrets;
		this.life = life;
		this.power = power;
	}
}

class Unit {
	constructor(cost, killGain, expOwner, expEnemy, damage, rate, range) {
		this.x = 0;
		this.y = 0;

		this.svgRef = document.createElementNS(xmlns, "rect");
		this.svgRef.setAttributeNS(null, "x", this.x);
		this.svgRef.setAttributeNS(null, "y", this.y);
		this.svgRef.setAttributeNS(null, "width", 10);
		this.svgRef.setAttributeNS(null, "height", 10);
		gameView.appendChild(this.svgRef);
	}
	

	draw() {
		this.svgRef.setAttributeNS(null, "x", this.x);
		this.svgRef.setAttributeNS(null, "y", this.y);
	}

	update() {
		this.x++;
		this.y++;
		this.draw();
	}
}

class Turret {
	constructor(cost, damage, rate, range) {

	}
}

class Power {
	constructor() {
	}
}

const ages = [
	new Age(0,
		[
			new Unit(15, 0, 10, 40, 1, 1, 0),
			new Unit(25, 0, 16, 64, 1, 1, 0),
			new Unit(100, 0, 65, 260, 1, 1, 0)
		],
		[
			new Turret(100, 1, 1, 10)
		],
		[
			new Power()
		],
		100
	)
];

class Player {
	constructor() {
		this.money = 100;
		this.exp = 0;
		this.units = [];
		this.turrets = [];
		this.age = ages[0];
		this.life = this.age.life;
		this.power = this.age.power;
	}
}