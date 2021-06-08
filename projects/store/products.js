"use strict"

const GP = {
	"ALCOOL": "ALCOOL",
	"BEURRE": "BEURRE",
	"BISCOTTES": "BISCOTTES",
	"CEREALES": "CEREALES",
	"CHARCUTERIE": "CHARCUTERIE",
	"CHIPS": "CHIPS",
	"CHOCOLAT_POUDRE": "CHOCOLAT_POUDRE",
	"CHOCOLAT_TABLETTE": "CHOCOLAT_TABLETTE",
	"CONFISERIE": "CONFISERIE",
	"CONFITURES": "CONFITURES",
	"CONSERVES_LEGUMES": "CONSERVES_LEGUMES",
	"CREME": "CREME",
	"EAU": "EAU",
	"FARINE": "FARINE",
	"FROMAGES": "FROMAGES",
	"FRUITS": "FRUITS",
	"GATEAUX_SUCRES": "GATEAUX_SUCRES",
	"GLACES": "GLACES",
	"HYGIENE": "HYGIENE",
	"JAMBON": "JAMBON",
	"LAITS": "LAITS",
	"LARDONS": "LARDONS",
	"LEGUMES": "LEGUMES",
	"OEUFS": "OEUFS",
	"OTHER": "OTHER",
	"PAIN_MIE": "PAIN_MIE",
	"PATES": "PATES",
	"PATES_TARTES": "PATES_TARTES",
	"RIZ": "RIZ",
	"SAUCES": "SAUCES",
	"SAUCISSONS": "SAUCISSONS",
	"SUCRE": "SUCRE",
	"TARTINER": "TARTINER",
	"VIENNOISERIE": "VIENNOISERIE",
	"YAOURTS": "YAOURTS",
};

const PRODUCTS = {
	/* SOLID START */
	"SPAGHETTIS": {
		"name-fr": "Spaghettis",
		"unit": "g",
		"price": 777,
		"gp": GP.PATES_SECHES,
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
		"gp": GP.CHOCOLAT_TABLETTE,
	},
	"CHOCOLAT_BLANC": {
		"name-fr": "Chocolat blanc",
		"unit": "g",
		"price": 777,
		"gp": GP.CHOCOLAT_TABLETTE,
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

const lw = 50;
const lh = 70;
const lt = 10;
const lm = 40;

const cw = 100;
const ch = 100;
const ct = 10;
const cm = 40;
const STORES = {
	"LECLERC": {
		"defaults": {
			w: 1,
			h: 20,
			l: 0,
			r: 0
		},
		"dimensions": {
			w: lw,
			h: lh
		},
		"in": {
			x: lw - 5,
			y: lh - 1,
			w: 5,
			h: 1
		},
		"out": {
			x: 0,
			y: lh - 1,
			w: lw - 10,
			h: 1
		},
		"gps": [{
			"gp": GP.CHARCUTERIE,
			"x": 14,
			"y": lt,
			"w": 2,
			"h": 20,
			"l": 1,
			"r": 1,
		}, {
			"gp": GP.FROMAGES,
			"x": 20,
			"y": lt,
			"w": 2,
			"h": 20,
			"l": 1,
			"r": 1,
		}, {
			"gp": GP.SAUCES,
			"x": 23,
			"y": lt,
			"w": 2,
			"h": 20,
			"l": 1,
			"r": 1,
		}, {
			"gp": GP.PATES,
			"x": 26,
			"y": lt,
			"h": 20,
			"l": 1,
		}, {
			"gp": GP.RIZ,
			"x": 27,
			"y": lt,
			"h": 20,
			"r": 1,
		}, {
			"gp": GP.CHIPS,
			"x": 29,
			"y": lt,
			"w": 2,
			"h": 20,
			"l": 1,
			"r": 1,
		}, /* MID */ {
			"gp": GP.YAOURTS,
			"x": 20,
			"y": lm,
			"h": 20,
			"l": 1,
		}, {
			"gp": GP.CREME,
			"x": 21,
			"y": lm,
			"h": 5,
			"r": 1,
		}, {
			"gp": GP.BEURRE,
			"x": 21,
			"y": lm + 5,
			"h": 5,
			"r": 1,
		}, {
			"gp": GP.LAITS,
			"x": 21,
			"y": lm + 10,
			"h": 10,
			"r": 1,
		}, {
			"gp": GP.OEUFS,
			"x": 23,
			"y": lm,
			"l": 1,
		}, {
			"gp": GP.SUCRE,
			"x": 24,
			"y": lm,
			"h": 10,
			"r": 1,
		}, {
			"gp": GP.FARINE,
			"x": 24,
			"y": lm + 10,
			"h": 10,
			"r": 1,
		}, {
			"gp": GP.CONFISERIE,
			"x": 26,
			"y": lm,
			"l": 1,
		}, {
			"gp": GP.CHOCOLAT_TABLETTE,
			"x": 27,
			"y": lm,
			"h": 10,
			"r": 1,
		}, {
			"gp": GP.TARTINER,
			"x": 27,
			"y": lm + 10,
			"h": 10,
			"r": 1,
		}]
	},
	"CARREFOUR": {
		"defaults": {
			w: 1,
			h: 20,
			l: 0,
			r: 0
		},
		"dimensions": {
			w: cw,
			h: ch
		},
		"in": {
			x: cw - 5,
			y: ch - 1,
			w: 5,
			h: 1
		},
		"out": {
			x: 0,
			y: ch - 1,
			w: cw - 10,
			h: 1
		},
		"gps": [{
			"gp": GP.JAMBON,
			"x": 90,
			"y": 75,
			"h": 5,
			"r": 1,
		}, {
			"gp": GP.LARDONS,
			"x": 90,
			"y": 80,
			"h": 5,
			"r": 1,
		}, {
			"gp": GP.CREME,
			"x": 86,
			"y": 75,
			"l": 1,
		}, {
			"gp": GP.FROMAGES,
			"x": 87,
			"y": 75,
			"r": 1,
		}, {
			"gp": GP.LAITS,
			"x": 50,
			"y": 75
		}, {
			"gp": GP.OEUFS,
			"x": 50,
			"y": 70
		}, {
			"gp": GP.PATES_SECHES,
			"x": 24,
			"y": 70
		}, {
			"gp": GP.CONSERVES_LEGUMES,
			"x": 24,
			"y": 70
		}, {
			"gp": GP.CEREALES,
			"x": 24,
			"y": 70
		}, {
			"gp": GP.ALCOOL,
			"x": 24,
			"y": 30,
			"w": 2,
			"l": 1,
			"r": 1
		}]
	},
};