"use strict"

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

const ages = [
	new Age(0,
		[
			new Unit(15, 0, 20, 0, 1, 1, 0)
		]
	)
];

class Age {
	constructor(exp, units, turrets) {
		this.exp = exp;
		this.units = units;
		this.turrets = turrets;
	}
}

class Unit {
	constructor(cost, killGain, expOwner, expEnemy, damage, speed, range) {

	}
}

class CaveMan extends Unit {
	constructor() {
		super(15, 0, 20, 0, 1, 1, 0);
	}
}