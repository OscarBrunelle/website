let raw_items = [
	//légumes
	{
		"name": "salade",
		"category": 0
	}, {
		"name": "tomate",
		"category": 0
	}, {
		"name": "champignon",
		"category": 0
	}, {
		"name": "concombre",
		"category": 0
	}, {
		"name": "champignon",
		"category": 0
	}, //fruits
	{
		"name": "banane",
		"category": 1
	}, {
		"name": "pamplemousse",
		"category": 1
	}, {
		"name": "kiwi",
		"category": 1
	}, {
		"name": "orange",
		"category": 1
	}, {
		"name": "citron",
		"category": 1
	}, {
		"name": "ananas",
		"category": 1
	}, {
		"name": "pomme",
		"category": 1
	}, {
		"name": "poire",
		"category": 1
	}, //charcuterie
	{
		"name": "jambon",
		"category": 2
	}, {
		"name": "saucisson",
		"category": 2
	}, //produits laitiers
	{
		"name": "crème fraiche",
		"category": 3
	}, {
		"name": "parmesan",
		"category": 3
	}, {
		"name": "gruyère",
		"category": 3
	}, //santé
	{
		"name": "dentifrice",
		"category": 4
	}, {
		"name": "gel douche",
		"category": 4
	}, {
		"name": "shampooing",
		"category": 4
	}, //produits surgelés
	{
		"name": "poisson surgelé",
		"category": 5
	}, {
		"name": "viande surgelée",
		"category": 5
	}, {
		"name": "steack haché surgelé",
		"category": 5
	}, //céréales
	{
		"name": "céréales",
		"category": 6
	}, {
		"name": "gâteaux sucrés",
		"category": 6
	}, {
		"name": "pâte à tartiner",
		"category": 6
	}, {
		"name": "nutella",
		"category": 6
	}, //conserves
	{
		"name": "conserve de légumes",
		"category": 7
	}, {
		"name": "conserve de maïs",
		"category": 7
	}, {
		"name": "conserve de haricots",
		"category": 7
	}, {
		"name": "petits pois carottes",
		"category": 7
	}, {
		"name": "chataignes",
		"category": 7
	}, //alcool
	{
		"name": "vin",
		"category": 8
	}, {
		"name": "bière",
		"category": 8
	}, {
		"name": "rhum",
		"category": 8
	}, {
		"name": "champagne",
		"category": 8
	}, {
		"name": "rosé",
		"category": 8
	}, //boissons
	{
		"name": "eau plate",
		"category": 9
	}, {
		"name": "eau pétillante",
		"category": 9
	}, {
		"name": "sodas",
		"category": 9
	}, {
		"name": "coca",
		"category": 9
	}, //viande
	{
		"name": "lapin",
		"category": 10
	}, {
		"name": "découpe de volaille",
		"category": 10
	}, {
		"name": "poulet",
		"category": 10
	}, {
		"name": "lapin",
		"category": 10
	}, //asiatique
	{
		"name": "sushis",
		"category": 11
	}
];

let raw_categories = [
	["légumes", 8, 8, 2, 6],
	["fruits", 8, 8, 2, 6],
	["charcuterie", 1, 1, 2, 6],
	["produits laitiers", 3, 1, 2, 6],
	["santé", 10, 1, 2, 6],
	["produits surgelés", 1, 1, 5, 6],
	["céréales", 12, 1, 2, 6],
	["conserves", 14, 1, 2, 6],
	["alcool", 10, 8, 2, 6],
	["boissons", 16, 1, 1, 15],
	["viande", 15, 15, 8, 1],
	["asiatique", 10, 8, 2, 1]
];//carrefour

let items = [];
let categories = [];

class Category {
	constructor(name = "cat", x, y, w = 1, h = 1) {
		this.name = name;
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

class Item {
	constructor(name, categoryIndex) {
		this.name = name;
		this.category = categories[categoryIndex];
	}
}

for (const cat of raw_categories) {
	categories.push(new Category(cat[0], cat[1], cat[2], cat[3], cat[4]));
}

for (const item of raw_items) {
	items.push(new Item(item.name, item.category));
}