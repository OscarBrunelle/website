
class Category {
	constructor(x, y, w = 1, h = 1) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
	}
}

let categories = [
	new Category(1, 1, 1, 2),
	new Category(1, 4, 2, 2),
	new Category(6, 6, 3, 2)
];

class Item {
	constructor(name, categoryIndex) {
		this.name = name;
		this.category = categories[categoryIndex];
	}
}

let items = [
	new Item("salad", 0),
	new Item("tomato", 0),
	new Item("banana", 1),
	new Item("fish", 2)
]