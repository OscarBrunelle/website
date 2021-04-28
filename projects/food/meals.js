const MEAL_TYPES = {
	"PLAT": "plat",
	"DESSERT": "dessert"
};

const MEALS = {
	"PATES_CARBOS": {
		"name": "Pâtes carbos",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.SPAGHETTIS,
			"quantity": 777
		}, {
			"ingredient-name": INGREDIENTS.LARDONS,
			"quantity": 777
		}, {
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777,
			"optional": true
		}],
		"type": MEAL_TYPES.PLAT,
		"preparation_time": 10,
		"waiting_time": 0
	},
	"OMELETTE_CHAMPIGNONS": {
		"name": "Omelette aux champignons",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777
		}],
		"type": MEAL_TYPES.PLAT
	},
	"QUICHE_SAUMON_EPINARD": {
		"name": "Quiche saumon / épinard",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777
		}],
		"type": MEAL_TYPES.PLAT
	},
	"NUGGETS_FRITES": {
		"name": "Nuggets frites",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777
		}],
		"type": MEAL_TYPES.PLAT
	},
	"RISOTTO_POIREAU": {
		"name": "Risotto au poireau",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777
		}],
		"type": MEAL_TYPES.PLAT
	},
	"BRUCHETTAS": {
		"name": "Bruchettas",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777
		}],
		"type": MEAL_TYPES.PLAT
	},
	"FAJITAS": {
		"name": "Fajitas",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777
		}],
		"type": MEAL_TYPES.PLAT
	},
	"CURRY_CHOU_FLEUR": {
		"name": "Curry de chou-fleur aux pois-chiches et pommes de terre",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777
		}],
		"type": MEAL_TYPES.PLAT
	},
	"CREPES_SARASIN": {
		"name": "Crêpes salées au sarasin",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777
		}],
		"type": MEAL_TYPES.PLAT
	},
	"COOKIES": {
		"name": "Cookies",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.SUCRE_CASSONADE,
			"quantity": 60
		}, {
			"ingredient-name": INGREDIENTS.SUCRE_SEMOULE,
			"quantity": 60
		}, {
			"ingredient-name": INGREDIENTS.FARINE,
			"quantity": 300
		}, {
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 1
		}, {
			"ingredient-name": INGREDIENTS.BEURRE_DOUX,
			"quantity": 175
		}, {
			"ingredient-name": INGREDIENTS.LEVURE_CHIMIQUE,
			"quantity": 0.5
		}, {
			"ingredient-name": INGREDIENTS.CHOCOLAT_NOIR,
			"quantity": 100
		}, {
			"ingredient-name": INGREDIENTS.CHOCOLAT_BLANC,
			"quantity": 100
		}],
		"steps": [
			"Préchauffer le four à 175°C.",
			"Dans un saladier, verser les deux sucres, ajouter ensuite le beurre pommade. Bien mélanger à la spatule, le mélange doit un peu épaissir et blanchir.",
			"Ajouter l’œuf un peu battu, bien mélanger pour avoir une belle crème. Ajouter la levure et la farine en plusieurs fois, mélanger d'abord à la spatule puis avec les mains une fois que toute la farine est mise.",
			"Mettre les pistoles de chocolat au lait et noir, continuer à la main. Il faut bien amalgamer la pâte. Si besoin rajouter une CS rase de farine si la pâte est un peu collante.",
			"Former un boudin de la taille d'une baguette (à peu près). Parsemer le plan de travail d'un peu de farine pour éviter que cela ne colle trop à la feuille et aux doigts.",
			"Couper ensuite des tranches d’environ 2cm d’épaisseur et leur redonner légèrement une forme ronde sans les aplatir. Attention ils s'étalent à la cuisson, alors espacez-les sur votre plaque.",
			"Cuire 12 min. Ne vous affolez pas s'ils sont encore un peu mous à la fin de cuisson, ils vont durcir en refroidissant. Faites les glisser sur une grille pour les laisser refroidir doucement."
		],
		"type": MEAL_TYPES.DESSERT
	},
	"POP_CORN": {
		"name": "Pop-corn",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.OEUF,
			"quantity": 777
		}],
		"type": MEAL_TYPES.DESSERT
	},
	"CAROTTES_RAPEES": {
		"name": "Carottes rapées",
		"ingredients": [{
			"ingredient-name": INGREDIENTS.CAROTTE,
			"quantity": 777
		}],
		"type": MEAL_TYPES.DESSERT
	}
};