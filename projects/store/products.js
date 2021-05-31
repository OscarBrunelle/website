"use strict"

const GP = {
	"OTHER": "OTHER",
	"GLACES": "GLACES",
	"YAHOURTS": "YAHOURTS",
	"LAITS": "LAITS",
	"CREME": "CREME",
	"BEURRE": "BEURRE",
	"OEUFS": "OEUFS",
	"FARINE": "FARINE",
	"SUCRE": "SUCRE",
	"TARTINER": "TARTINER",
	"CONFITURES": "CONFITURES",
	"SAUCES": "SAUCES",
	"PATES": "PATES",
	"CHIPS": "CHIPS",
	"HYGIENE": "HYGIENE",
	"FROMAGES": "FROMAGES",
	"LEGUMES": "LEGUMES",
	"FRUITS": "FRUITS",
	"CONSERVES_LEGUMES": "CONSERVES_LEGUMES",
	"ALCOOL": "ALCOOL",
	"EAU": "EAU",
	"CHOCOLAT": "CHOCOLAT",
};

const PRODUCTS = {
	/* SOLID START */
	"SPAGHETTIS": {
		"name-fr": "Spaghettis",
		"unit": "g",
		"price": 777,
		"gp": GP.PATES,
	},
	"BOEUF_HACHE": {
		"name-fr": "Boeuf haché",
		"unit": "g",
		"price": 777,
		"gp": GP.OTHER,
	},
	"LARDONS": {
		"name-fr": "Lardons",
		"unit": "g",
		"price": 777,
		"gp": GP.OTHER,
	},
	"CREME": {
		"name-fr": "Crème",
		"unit": "cL",
		"price": 777,
		"gp": GP.CREME,
	},
	"OEUF": {
		"name-fr": "Oeufs",
		"unit": "",
		"price": 777,
		"gp": GP.OEUFS,
	},
	"GRAIN_MAIS": {
		"name-fr": "Maïs",
		"unit": "g",
		"price": 777,
		"gp": GP.CONSERVES_LEGUMES,
	},
	"CAROTTE": {
		"name-fr": "Carotte",
		"unit": "g",
		"price": 777,
		"gp": GP.LEGUMES,
	},
	"SUCRE_SEMOULE": {
		"name-fr": "Sucre semoule",
		"unit": "g",
		"price": 777,
		"gp": GP.SUCRE,
	},
	"SUCRE_CASSONADE": {
		"name-fr": "Sucre cassonade",
		"unit": "g",
		"price": 777,
		"gp": GP.SUCRE,
	},
	"FARINE": {
		"name-fr": "Farine",
		"unit": "g",
		"price": 777,
		"gp": GP.FARINE,
	},
	"LEVURE_CHIMIQUE": {
		"name-fr": "Levure chimique",
		"unit": "g",
		"price": 777,
		"gp": GP.OTHER,
	},
	"BEURRE_DOUX": {
		"name-fr": "Beurre doux",
		"unit": "g",
		"price": 777,
		"gp": GP.BEURRE,
	},
	"CHOCOLAT_NOIR": {
		"name-fr": "Chocolat noir",
		"unit": "g",
		"price": 777,
		"gp": GP.CHOCOLAT,
	},
	"CHOCOLAT_BLANC": {
		"name-fr": "Chocolat blanc",
		"unit": "g",
		"price": 777,
		"gp": GP.CHOCOLAT,
	},
	/* SOLID END */
	/* LIQUID START */
	"WATER": {
		"name-fr": "Eau",
		"unit": "cL",
		"price": 777,
		"gp": GP.EAU,
	},
	/* ALCOHOLS START */
	"PASTIS": {
		"name-fr": "Pastis",
		"unit": "cL",
		"price": 777,
		"gp": GP.ALCOOL,
	},
	/* ALCOHOLS END */
	/* LIQUID END */
};

const STORES = {
	"LECLERC": {
		"defaults": {
			w: 2,
			h: 10,
			l: 1,
			r: 1
		},
		"dimensions": {
			w: 100,
			h: 100
		},
		"in": {
			x: 100,
			y: 100,
			w: 5,
			h: 1
		},
		"out": {
			x: 0,
			y: 100,
			w: 90,
			h: 1
		},
		"gps": [{
			"gp": GP.LAITS,
			"x": 20,
			"y": 70
		},{
			"gp": GP.OEUFS,
			"x": 22,
			"y": 70
		},{
			"gp": GP.PATES,
			"x": 24,
			"y": 50
		},]
	},
};