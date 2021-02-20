
class Category {
	constructor(x, y, w = 1, h = 1, name = "cat") {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.name = name;
	}
}

let categories = [
	new Category(1, 1, 1, 2, "vegetables"),
	new Category(1, 4, 2, 2, "fruits"),
	new Category(6, 5, 3, 2, "fish")
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