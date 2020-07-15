const specials = ["pointer", "rotate", "delete"];

const MACHINES = {
	"starter": {
		"name": "Starter",
		"className": "Starter",
		"cost": 1000
	},
	"seller": {
		"name": "Seller",
		"className": "Seller",
		"cost": 5000
	},
	"roller": {
		"name": "Roller",
		"className": "Roller",
		"cost": 300
	},
	"cutter": {
		"name": "Cutter",
		"className": "Cutter",
		"cost": 10
	},
	"wire_drawer": {
		"name": "Wire Drawer",
		"className": "WireDrawer",
		"cost": 10
	},
	"crafter": {
		"name": "Crafter",
		"className": "Crafter",
		"cost": 2000
	}
};

const raw_ressources = ["none", "aluminium", "copper", "gold", "iron", "diamond"];
const raw_ressource = {
	"cost": 5,
	"value": 80
};

const transformed_ressources = ["gear", "wire"];
const transformed_ressource_value = 100;

const crafts = {
	"circuit": {
		"recipe": {
			"wire_copper": 2,
			"gold": 1
		},
		"unlock_cost": 0,
		"value": 300
	},
	"engine": {
		"recipe": {
			"gear_iron": 2,
			"gear_gold": 1
		},
		"unlock_cost": 10,
		"value": 360
	},
	"battery": {
		"recipe": {
			"circuit": 1,
			"aluminium": 1,
			"aluminium_liquid": 1
		},
		"unlock_cost": 10,
		"value": 1050
	},
	"processor": {
		"recipe": {
			"circuit": 2,
			"aluminium": 2
		},
		"unlock_cost": 10,
		"value": 1320
	},
	"power_supply": {
		"recipe": {
			"circuit": 1,
			"wire_copper": 3,
			"wire_iron": 3
		},
		"unlock_cost": 10,
		"value": 1920
	},
	"tablet": {
		"recipe": {
			"processor": 1,
			"battery": 1,
			"aluminium": 4
		},
		"unlock_cost": 10,
		"value": 7600
	},
	"server_rack": {
		"recipe": {
			"plate_aluminium": 20,
			"aluminium": 10
		},
		"unlock_cost": 10,
		"value": 10600
	},
	"computer": {
		"recipe": {
			"processor": 1,
			"aluminium": 6,
			"power_supply": 1
		},
		"unlock_cost": 10,
		"value": 11000
	},
	"generator": {
		"recipe": {
			"engine": 4,
			"plate_gold": 5,
			"plate_copper": 5
		},
		"unlock_cost": 10,
		"value": 11820
	},
	"advanced_engine": {
		"recipe": {
			"engine": 50,
			"circuit": 50
		},
		"unlock_cost": 10,
		"value": 70000
	},
	"super_computer": {
		"recipe": {
			"computer": 30,
			"server_rack": 10
		},
		"unlock_cost": 10,
		"value": 550000
	},
	"electric_engine": {
		"recipe": {
			"advanced_engine": 10,
			"battery": 40
		},
		"unlock_cost": 10,
		"value": 900000
	},
	"ai_processor": {
		"recipe": {
			"super_computer": 4,
			"circuit": 40
		},
		"unlock_cost": 10,
		"value": 2500000
	}
};