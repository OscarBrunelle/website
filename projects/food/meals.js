const FOOD_TYPES = { //TODO: add english translations
	"MEAL": "Repas",
	"DRINK": "Cocktail",
};

const MEAL_TYPES = { //TODO: translate keys
	"ENTREE": "Entrée",
	"PLAT": "Plat",
	"DESSERT": "Dessert",
};

const DRINKS_TYPES = {
	"ALCOHOLIC": "Alcoolisée",
	"NON_ALCOHOLIC": "Sans alcool",
};

const MEAL_GROUPS = {
	"LASAGNES": "Lasagnes",
	"GRATIN": "Gratin",
};

let FOODS = {
	/* MEALS START */
	"PATES_CARBOS": {
		"name": "Pâtes carbonara",
		"ingredients": [{
			"ingredient-name": PRODUCTS.SPAGHETTIS,
			"quantity": 777
		}, {
			"ingredient-name": PRODUCTS.LARDONS,
			"quantity": 777
		}, {
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777,
			"optional": true
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT,
		"preparation_time": 10,
		"waiting_time": 0
	},
	"OMELETTE_CHAMPIGNONS": {
		"name": "Omelette aux champignons",
		"ingredients": [{
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"QUICHE_SAUMON_EPINARD": {
		"name": "Quiche saumon / épinard",
		"ingredients": [{
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"NUGGETS_FRITES": {
		"name": "Nuggets frites",
		"ingredients": [{
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"RISOTTO_POIREAU": {
		"name": "Risotto au poireau",
		"ingredients": [{
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"BRUCHETTAS": {
		"name": "Bruchettas",
		"ingredients": [{
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"FAJITAS": {
		"name": "Fajitas",
		"ingredients": [{
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"CURRY_CHOU_FLEUR": {
		"name": "Curry de chou-fleur aux pois-chiches et pommes de terre",
		"ingredients": [{
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"CREPES_SARASIN": {
		"name": "Crêpes salées au sarasin",
		"ingredients": [{
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"COOKIES": {
		"name": "Cookies",
		"ingredients": [{
			"ingredient-name": PRODUCTS.SUCRE_CASSONADE,
			"quantity": 60
		}, {
			"ingredient-name": PRODUCTS.SUCRE_SEMOULE,
			"quantity": 60
		}, {
			"ingredient-name": PRODUCTS.FARINE,
			"quantity": 300
		}, {
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 1
		}, {
			"ingredient-name": PRODUCTS.BEURRE_DOUX,
			"quantity": 175
		}, {
			"ingredient-name": PRODUCTS.LEVURE_CHIMIQUE,
			"quantity": 0.5
		}, {
			"ingredient-name": PRODUCTS.CHOCOLAT_NOIR,
			"quantity": 100
		}, {
			"ingredient-name": PRODUCTS.CHOCOLAT_BLANC,
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
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.DESSERT
	},
	"POP_CORN": {
		"name": "Pop-corn",
		"ingredients": [{
			"ingredient-name": PRODUCTS.OEUF,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.DESSERT
	},
	"CAROTTES_RAPEES": {
		"name": "Carottes rapées",
		"ingredients": [{
			"ingredient-name": PRODUCTS.CAROTTE,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.DESSERT
	},
	"LASAGNES": {
		"name": "Lasagnes",
		"ingredients": [{
			"ingredient-name": PRODUCTS.BOEUF_HACHE,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"LASAGNES_VEGE": {
		"name": "Lasagnes végétariennes",
		"ingredients": [{
			"ingredient-name": PRODUCTS.COURGETTE,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	"GRATIN": {
		"name": "Gratin de pommes de terre",
		"ingredients": [{
			"ingredient-name": PRODUCTS.POMME_TERRE,
			"quantity": 777
		}],
		"steps": [],
		"food_type": FOOD_TYPES.MEAL,
		"meal_type": MEAL_TYPES.PLAT
	},
	/* MEALS END */
	/* DRINKS START */
	"PASTIS": {
		"name": "Pastis",
		"ingredients": [{
			"ingredient-name": PRODUCTS.PASTIS,
			"quantity": 777
		}, {
			"ingredient-name": PRODUCTS.WATER,
			"quantity": 777
		}],
		"steps": [
			"Verser le pastis.",
			"Verser l'eau.",
			"Ajouter des glaçons si nécessaire."
		],
		"food_type": FOOD_TYPES.DRINK,
		"drink_type": DRINKS_TYPES.ALCOHOLIC
	},
	"MOJITO": {
		"name": "Mojito",
		"ingredients": [{
			"ingredient-name": PRODUCTS.PASTIS,
			"quantity": 777
		}, {
			"ingredient-name": PRODUCTS.WATER,
			"quantity": 777
		}],
		"steps": [
			"https://www.750g.com/mojito-r99211.htm"
		],
		"food_type": FOOD_TYPES.DRINK,
		"drink_type": DRINKS_TYPES.ALCOHOLIC
	},
	/* DRINKS END */
};

/*
risotto riz / lentilles corail avec courgettes et ratatouille
chou fleur
quiche poireaux
gros poisson en papillotte bbq
*/