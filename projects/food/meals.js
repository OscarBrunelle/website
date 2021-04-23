const MEAL_TYPES = {
	"PLAT": "plat",
	"DESSERT": "dessert"
};

const MEALS = [{
	"name": "Pâtes carbos",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.spaghettis,
		"quantity": 100
	}, {
		"ingredient-name": INGREDIENTS.lardon,
		"quantity": 100
	}, {
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 1,
		"optional": true
	}],
	"type": MEAL_TYPES.PLAT,
	"preparation_time": 10,
	"waiting_time": 0
}, {
	"name": "Omelette aux champignons",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 2
	}],
	"type": MEAL_TYPES.PLAT
}, {
	"name": "Quiche saumon / épinard",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 2
	}],
	"type": MEAL_TYPES.PLAT
}, {
	"name": "Nuggets frites",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 2
	}],
	"type": MEAL_TYPES.PLAT
}, {
	"name": "Risotto au poireau",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 2
	}],
	"type": MEAL_TYPES.PLAT
}, {
	"name": "Bruchettas",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 2
	}],
	"type": MEAL_TYPES.PLAT
}, {
	"name": "Fajitas",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 2
	}],
	"type": MEAL_TYPES.PLAT
}, {
	"name": "Curry de chou-fleur aux pois-chiches et pommes de terre",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 2
	}],
	"type": MEAL_TYPES.PLAT
}, {
	"name": "Crêpes salées au sarasin",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 2
	}],
	"type": MEAL_TYPES.PLAT
}, {
	"name": "Cookies",
	"ingredients": [{
		"ingredient-name": INGREDIENTS.oeuf,
		"quantity": 2
	}],
	"type": MEAL_TYPES.DESSERT
}];