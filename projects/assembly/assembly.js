"use strict"

//if item goes out of canvas, delete

const GRID_WIDTH = 500, GRID_HEIGHT = 500;
const GRID_FRAMES_X = 16, GRID_FRAMES_Y = 16;

const STARTING_MONEY = 50000;
const STORED_LIMIT = 1000;

var stopped = false;

var grid;
var selected;
var elements = [];
var items = [];

var money = STARTING_MONEY;

var items_stats = {};

function load() {
	const money_cookie = get_cookie("money");
	if (money_cookie != "") {
		money = parseInt(money_cookie);
	}
	update_money();
	grid = new Grid("main", GRID_WIDTH, GRID_HEIGHT, GRID_FRAMES_X, GRID_FRAMES_Y, "grid");
	grid.onclick(action);

	for (const special of specials) {
		const thing_img = new Image();
		thing_img.src = "images/" + special + ".png";
		const thing_btn = document.createElement("button");
		thing_btn.appendChild(thing_img);
		thing_btn.addEventListener("click", function () {
			selected = special;
			grid.cursor("images/" + (selected === "pointer" ? "???" : selected) + ".png");
		});
		document.getElementById("thing-selectors").appendChild(thing_btn);
	}

	for (const ressource_name of raw_ressources) {
		/*
		let svg_xml_colored = svg_xml.replace(/#3080d0/g, "#e05030");
		item_img.src = "data:image/svg+xml;charset=utf-8," + svg_xml_colored;
		*/
		/*
		var parser = new DOMParser();
		var doc = parser.parseFromString("images/" + ressource_name + ".png", "image/svg+xml");
		const item_img = document.createElement("object");
		item_img.className = ressource_name;
		item_img.type = "image/svg+xml";
		item_img.data = "images/" + ressource_name + ".png";
		$("main #" + ressource_name).contents().find("g").css({
			fill: "blue"
		});
		*/
		const item_img = new Image();
		item_img.src = "images/" + ressource_name + ".png";
		item_img.style.display = "none";
		document.getElementById("thing-selectors").appendChild(item_img);

		items_stats[ressource_name] = {
			"cost": raw_ressource.cost,
			"value": raw_ressource.value,
			"image": item_img
		};
	}
	for (const ts_name of transformed_ressources) {
		for (const ressource_name of raw_ressources) {
			const item_name = ts_name + "_" + ressource_name;
			const item_img = new Image();
			item_img.src = "images/" + item_name + ".png";
			item_img.style.display = "none";
			document.getElementById("thing-selectors").appendChild(item_img);

			items_stats[item_name] = {
				"value": transformed_ressource_value,
				"image": item_img
			};
		}
	}
	for (const item_name in crafts) {
		const item = crafts[item_name];

		const item_img = new Image();
		item_img.src = "images/" + item_name + ".png";
		item_img.style.display = "none";
		document.getElementById("thing-selectors").appendChild(item_img);

		items_stats[item_name] = {
			"value": item.value,
			"image": item_img
		};
	}

	for (const thing in things) {
		const thing_img = new Image();
		thing_img.src = "images/" + thing + ".png";
		const thing_btn = document.createElement("button");
		thing_btn.appendChild(thing_img);
		thing_btn.addEventListener("click", function () {
			selected = thing;
			grid.cursor("images/" + selected + ".png");
		});
		document.getElementById("thing-selectors").appendChild(thing_btn);

		things[thing].image = thing_img;
	}

	update();
}

function action(x, y) {
	const pos_index = grid.get_index_of_pos(x, y);
	let pointed_element = get_element_at_index(pos_index.x, pos_index.y);
	if (selected === "pointer") {
		if (pointed_element != null) {
			pointed_element.click();
		}
	} else if (selected === "rotate") {
		if (pointed_element != null) {
			pointed_element.angle_rad = (pointed_element.angle_rad + 90 * (Math.PI / 180)) % (360 * (Math.PI / 180));
			pointed_element.redraw();
		}
	} else if (selected === "delete") {
		if (pointed_element != null) {
			pointed_element.sell();
			elements.splice(elements.indexOf(pointed_element), 1);
		}
	} else if (pointed_element == null) {
		if (Object.keys(things).indexOf(selected) < 0) {
			return;
		}
		let className = things[selected].className;
		let thing = eval("new " + className + "(" + pos_index.x + ", " + pos_index.y + ")");
		if (money >= thing.cost) {
			money -= thing.cost;
			update_money();
			elements.push(thing);
			thing.draw();
		}
	}
}

function get_element_at_index(x_index, y_index) {
	for (const element of elements) {
		if (element.x_index === x_index && element.y_index === y_index) {
			return element;
		}
	}
	return null;
}

function get_element_at_pos(x, y) {
	const index = grid.get_index_of_pos(x, y);
	return get_element_at_index(index.x, index.y);
}

function toggle_updating() {
	stopped = !stopped;

	if (!stopped) {
		update();
	}
	
	document.getElementById("toggle_updating-btn").innerHTML = (stopped ? "START" : "STOP");
}

function update_money() {
	const text = money + " $";
	document.querySelector("#money").innerHTML = text;
	set_cookie("money", money);
}

let lastTime;
function update(currentTime) {
	if (stopped) {
		lastTime = null;
		return;
	} else if (currentTime == null) {
		return requestAnimationFrame(update);
	}

	if(!lastTime){lastTime=currentTime;}
	let elapsedSinceLastLoop=(currentTime-lastTime);
	lastTime=currentTime;

	update_money();

	grid.clear();

	for (const element of elements) {
		element.update(elapsedSinceLastLoop);
	}
	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		if (item.is_centered()) {
			const element = get_element_at_pos(item.x, item.y);
			if (element != null && element != item.last_interaction) {
				items[i] = element.transformItem(item);
				if (items[i] != null) {
					items[i].last_interaction = element;
					items[i].center();
				}
			}
		}
		if (items[i] == null || items[i].x < 0 || items[i].x > grid.width || items[i].y < 0 || items[i].y > grid.height) {
			items.splice(i--, 1);
		} else {
			items[i].update();
		}
	}
	requestAnimationFrame(update);
}

class Assembler extends GridDrawable {
	constructor(_x_index, _y_index, _image, _cost) {
		super(grid, _image, _x_index, _y_index);
		this.cost = _cost;
	}

	transformItem(item) {
		return item;
	}

	sell() {
		money += this.cost * 0.9;
		update_money();
	}

	update() {
		this.draw();
	}
}

class Producer extends Assembler {
	constructor(_x_index, _y_index, image, cost) {
		super(_x_index, _y_index, image, cost);

		this.production_time = 1000;
	}

	produce_item(item_name) {
		const direction = Math.floor(this.angle_rad / (90 * (Math.PI / 180)));
		let item = new Item(this.x_index, this.y_index, direction, item_name);
		item.draw();
		items.push(item);
		return item;
	}

	set production_item(value) {
		this.prod_item = value;
	}

	get production_item() {
		return this.prod_item;
	}

	set production_time(value) {
		this.prod_time = value;
		if (this.remaining_time == null || this.remaining_time > this.production_time) {
			this.remaining_time = this.production_time;
		}
	}

	get production_time() {
		return this.prod_time;
	}

	update(time_amount) {
		super.update();
		if (this.remaining_time > 0) {
			this.remaining_time = Math.max(this.remaining_time - time_amount, 0);
		}
		if (this.remaining_time <= 0) {
			if (this.production_item != null && this.production_time != null) {
				this.produce();
				this.remaining_time = this.production_time;
			}
		}
	}
}

class Starter extends Producer {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, things["starter"].image, things["starter"].cost);
		this.production_item = raw_ressources[0];
	}

	produce() {
		let item = this.produce_item(this.production_item);
		money -= item.cost;
	}

	click() {
		let index = raw_ressources.indexOf(this.production_item);
		index = (++index) % raw_ressources.length;
		this.production_item = raw_ressources[index];
	}

	draw() {
		super.draw();
		if (this.production_item != null) {
			const x = this.x_index * grid.frame_width + 2;
			const y = this.y_index * grid.frame_height + 2;
			grid.drawImage(items_stats[this.production_item].image, x, y, 10, 10);
		}
	}
}

class Seller extends Assembler {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, things["seller"].image, things["seller"].cost);
	}

	transformItem(item) {
		money += item.value;
		return null;
	}
}

class Roller extends Assembler {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, things["roller"].image, things["roller"].cost);
	}

	transformItem(item){
		item.direction = Math.floor(this.angle_rad / (90 * (Math.PI / 180)));
		return item;
	}
}

class Transformer extends Producer {
	constructor(_x_index, _y_index, image, cost, prod_item) {
		super(_x_index, _y_index, image, cost);
		this.stored_ingredients = [];
		this.accepted_items = raw_ressources;
		this.production_item = prod_item;
	}

	transformItem(item) {
		if (this.accepted_items.indexOf(item.name) < 0) {
			return item;
		}
		if (this.stored_ingredients.length < STORED_LIMIT) {
			this.stored_ingredients.push(item.name)
		}
		return null;
	}

	produce() {
		if (this.stored_ingredients.length > 0) {
			let ingredient_name = this.stored_ingredients.pop();
			let item_name = this.production_item + "_" + ingredient_name;
			this.produce_item(item_name);
		}
	}
}

class Cutter extends Transformer {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, things["cutter"].image, things["cutter"].cost, "gear");
	}
}

class WireDrawer extends Transformer {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, things["wire_drawer"].image, things["wire_drawer"].cost, "wire");
	}
}

class Crafter extends Producer {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, things["crafter"].image, things["crafter"].cost);
		this.production_item = Object.keys(crafts)[0];
		this.stored_ingredients = {};
	}

	set production_item(value) {
		super.production_item = value;
		this.ingredients = crafts[this.production_item].recipe;
	}
	get production_item() {
		return super.production_item;
	}

	transformItem(item) {
		let count = (this.stored_ingredients[item.name] == null) ? 0 : this.stored_ingredients[item.name];
		this.stored_ingredients[item.name] = count + 1;
		return null;
	}

	produce() {
		if (this.can_produce()) {
			for (const ingredient in this.ingredients) {
				this.stored_ingredients[ingredient] -= this.ingredients[ingredient];
			}
			this.produce_item(this.production_item);
		}
	}

	can_produce() {
		if (this.ingredients != null) {
			for (const ingredient in this.ingredients) {
				const needed = this.ingredients[ingredient];
				const in_stock = this.stored_ingredients[ingredient];
				if (in_stock == null || needed > in_stock) {
					return false;
				}
			}
			return true;
		}
		return false;
	}

	click() {
		let crafts_keys = Object.keys(crafts);
		let index = crafts_keys.indexOf(this.production_item);
		index = (++index) % crafts_keys.length;
		this.production_item = crafts_keys[index];
	}

	draw() {
		super.draw();
		if (this.production_item != null) {
			const x = this.x_index * grid.frame_width + 2;
			const y = this.y_index * grid.frame_height + 2;
			grid.drawImage(items_stats[this.production_item].image, x, y, grid.frame_width / 3, grid.frame_height / 3);
		}
	}
}

class Item extends Drawable {
	constructor(_x_index, _y_index, direction, name) {
		switch (direction) {
			case 0:
				_y_index++;
				break;
			case 3:
				_x_index++;
				break;
		}
		const pos = grid.get_pos_of_index(_x_index, _y_index);
		const image = items_stats[name].image;
		switch (direction) {
			case 0:
				pos.x += (grid.frame_width - image.width) / 2;
				break;
			case 1:
				pos.x -= image.width;
				pos.y += (grid.frame_height - image.height) / 2;
				break;
			case 2:
				pos.x += (grid.frame_width - image.width) / 2;
				pos.y -= image.height;
				break;
			case 3:
				pos.y += (grid.frame_height - image.height) / 2;
				break;
		}
		super(grid, image, pos.x, pos.y);
		this.width = grid.frame_width / 2;
		this.height = grid.frame_height / 2;
		this.direction = direction;
		this.name = name;
		this.cost = items_stats[this.name].cost;
		this.value = items_stats[this.name].value;
	}

	set direction(value) {
		switch (value) {
			case 0:
				this.direction_x = 0;
				this.direction_y = 1;
				break;
			case 1:
				this.direction_x = -1;
				this.direction_y = 0;
				break;
			case 2:
				this.direction_x = 0;
				this.direction_y = -1;
				break;
			case 3:
				this.direction_x = 1;
				this.direction_y = 0;
				break;
			default:
				console.log("Unknown direction " + value);
				this.direction_x = 0;
				this.direction_y = 0;
				break;
		}
	}

	is_centered() {
		if (this.prev_x == null || this.prev_y == null) {
			return false;
		}
		let prev_x = this.prev_x % grid.frame_width;
		let prev_y = this.prev_y % grid.frame_height;
		let x = this.x % grid.frame_width;
		let y = this.y % grid.frame_height;
		let center_x = (grid.frame_width - this.image.width) / 2;
		let center_y = (grid.frame_height - this.image.height) / 2;
		const x_centered = ((prev_x <= center_x && x >= center_x && this.prev_x <= this.x) || (prev_x >= center_x && x <= center_x && this.prev_x >= this.x));
		const y_centered = ((prev_y <= center_y && y >= center_y && this.prev_y <= this.y) || (prev_y >= center_y && y <= center_y && this.prev_y >= this.y));
		return (x_centered && y_centered);
	}

	center() {
		const pos = grid.get_nearest_frame(this.x, this.y);
		this.x = pos.x + (grid.frame_width - this.image.width) / 2;
		this.y = pos.y + (grid.frame_height - this.image.height) / 2;
	}

	update() {
		this.prev_x = this.x;
		this.prev_y = this.y;
		this.x += this.direction_x * (grid.frame_width / 30);
		this.y += this.direction_y * (grid.frame_height / 30);
		this.draw();
	}
}

document.onload = load();