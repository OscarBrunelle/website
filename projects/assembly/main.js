"use strict"

//if item goes out of canvas, delete

const GRID_FRAMES_X = 16;
const GRID_FRAMES_Y = 16;

const STARTING_MONEY = 50000000;
const STORED_LIMIT = 1000;

var stopped = false;

var grid;
var selected;
var machines = [];
var items = [];

var money = STARTING_MONEY;

var items_stats = {};

function get_image(image_name, show = false, click = false) {
	const img = new Image();
	let no_svg = false;
	img.onerror = function () {
		img.onerror = null;
		no_svg = true;
		img.src = "images/" + image_name + ".png";
	};
	img.src = "images/" + image_name + ".svg";

	if (show) {
		const btn = document.createElement("button");
		btn.appendChild(img);
		if (click) {
			btn.addEventListener("click", function () {
				selected = image_name;
				if (selected === "pointer") {
					grid.cursor();
				} else {
					if (no_svg) {
						grid.cursor("url('images/" + selected + ".png')");
					} else {
						grid.cursor(["url('images/" + selected + ".svg')", "url('images/" + selected + ".png')"]);
					}
				}
			});
		}
		document.getElementById("selectors").appendChild(btn);
	} else {
		img.style.display = "none";
		document.getElementById("selectors").appendChild(img);
	}

	return img;
}

function load() {
	for (const name of specials) {
		const img = get_image(name, true, true);
	}

	for (const name in MACHINES) {
		const img = get_image(name, true, true);
		MACHINES[name].image = img;
	}

	for (const name of raw_ressources) {
		const img = get_image(name);

		items_stats[name] = {
			"cost": raw_ressource.cost,
			"value": raw_ressource.value,
			"image": img
		};
	}
	for (const ts_name of transformed_ressources) {
		for (const ressource_name of raw_ressources) {
			if (ressource_name === "none") {
				continue;
			}
			const name = ts_name + "_" + ressource_name;
			const img = get_image(name);

			items_stats[name] = {
				"value": transformed_ressource_value,
				"image": img
			};
		}
	}
	for (const name in crafts) {
		const item = crafts[name];
		const img = get_image(name);
		items_stats[name] = {
			"value": item.value,
			"image": img
		};
	}

	const grid_cookie = get_cookie("grid");
	//const width = document.getElementById("game").clientWidth;
	//const height = document.getElementById("game").clientHeight;
	let width = document.body.clientWidth - 20;
	let height = document.body.clientHeight - 200;
	let size = Math.min(width, height);
	if (grid_cookie != null) {
		const obj_grid = JSON.parse(grid_cookie);
		grid = new Grid("#game", size, size, obj_grid.number_frames_x, obj_grid.number_frames_y, obj_grid.id);
		grid.scale = obj_grid.scale;
		grid.translate_x = obj_grid.translate_x;
		grid.translate_y = obj_grid.translate_y;
		grid.grid_color = obj_grid.grid_color;
	} else {
		grid = new Grid("#game", size, size, GRID_FRAMES_X, GRID_FRAMES_Y, "grid");
	}
	grid.onclick(click);
	//window.addEventListener("resize", resize);
	const money_cookie = get_cookie("money");
	if (money_cookie != null) {
		money = parseInt(money_cookie);
	}
	update_money();
	const machines_cookie = get_cookie("machines");
	if (machines_cookie != null) {
		const obj_machines = JSON.parse(machines_cookie);
		for (const obj_machine of obj_machines) {
			let className = obj_machine.className;
			if (className != null) {
				let machine = eval("new " + className + "(" + obj_machine.x_index + ", " + obj_machine.y_index + ")");
				machine.className = className;
				machine.production_time = obj_machine.prod_time;
				machine.production_item = obj_machine.prod_item;
				machine.rotation_rad = obj_machine.rotation_rad;
				machines.push(machine);
			}
		}
	}

	update();
}

function resize() {
	let width = document.body.clientWidth - 20;
	let height = document.body.clientHeight - 100;
	let size = Math.min(width, height);
	grid.width = size;
	grid.height = size;
}

function click(x, y) {
	const pos_index = grid.get_index_of_pos(x, y);
	let pointed_element = get_element_at_index(pos_index.x, pos_index.y);
	if (selected === "pointer") {
		if (pointed_element != null) {
			pointed_element.click();
		}
	} else if (selected === "rotate") {
		if (pointed_element != null) {
			pointed_element.rotation_rad = (pointed_element.rotation_rad + 90 * (Math.PI / 180)) % (360 * (Math.PI / 180));
			pointed_element.redraw();
		}
	} else if (selected === "delete") {
		if (pointed_element != null) {
			pointed_element.sell();
			machines.splice(machines.indexOf(pointed_element), 1);
		}
	} else if (pointed_element == null) {
		if (Object.keys(MACHINES).indexOf(selected) < 0) {
			return;
		}
		let className = MACHINES[selected].className;
		let machine = eval("new " + className + "(" + pos_index.x + ", " + pos_index.y + ")");
		machine.className = className;
		if (money >= machine.cost) {
			money -= machine.cost;
			update_money();
			machines.push(machine);
			machine.draw();
		}
	}
	set_cookie("machines", JSON.stringify(machines));
}

function get_element_at_index(x_index, y_index) {
	for (const machine of machines) {
		if (machine.x_index === x_index && machine.y_index === y_index) {
			return machine;
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
	const money_rules = ["", "K", "M", "B"];

	let formatted_money = money;
	let index = 0;
	while (formatted_money >= Math.pow(10, 3)) {
		formatted_money = formatted_money / 1000;
		index++;
	}
	const text = "Money: $ " + formatted_money.toFixed(4 - Math.ceil(Math.log10(formatted_money + 1))) + " " + money_rules[index];
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

	if (!lastTime) {
		lastTime = currentTime;
	}
	const elapsedSinceLastLoop = (currentTime - lastTime);
	lastTime = currentTime;

	update_money();

	set_cookie("grid", JSON.stringify(grid));
	grid.clear();

	for (const machine of machines) {
		machine.update(elapsedSinceLastLoop);
	}
	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		if (item.is_centered()) {
			const machine = get_element_at_pos(item.x, item.y);
			if (machine != null && machine != item.last_machine) {
				items[i] = machine.transformItem(item);
				if (items[i] != null) {
					items[i].last_machine = machine;
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

class Assembler extends Drawable {
	constructor(grid_x, grid_y, image, _cost) {
		const obj_desc = {
			grid_x: grid_x,
			grid_y: grid_y,
			image: image
		};
		super(grid, obj_desc);
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
		const direction = Math.floor(this.rotation_rad / (90 * (Math.PI / 180)));
		let item = new Item(this.x_index, this.y_index, direction, item_name);
		item.last_machine = this;
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

	draw() {
		super.draw();
		if (this.production_item != null && this.production_item !== "none" && transformed_ressources.indexOf(this.production_item) < 0) {
			const image = items_stats[this.production_item].image;
			const fw = this.game_canvas.frame_width;
			const fh = this.game_canvas.frame_height;
			const x = this.x_index * fw + fw / 6;
			const y = this.y_index * fh + fh / 6;
			grid.drawImage(image, x, y, fw / 3, fh / 3);
		}
	}
}

class Starter extends Producer {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, MACHINES["starter"].image, MACHINES["starter"].cost);
		this.production_item = "none";
	}

	produce() {
		if (this.production_item != null && this.production_item !== "none") {
			let item = this.produce_item(this.production_item);
			money -= item.cost;
		}
	}

	click() {
		const modal = show_modal(this.x, this.y);
		/*const ressource_items = raw_ressources;
		ressource_items.unshift("none");*/
		for (const ressource_name of raw_ressources) {
			const ressource_div = document.createElement("div");
			ressource_div.className = "item_selector";
			const ressource_img = items_stats[ressource_name].image;
			ressource_div.appendChild(ressource_img);
			modal.appendChild(ressource_div);

			ressource_div.addEventListener("click", event => {
				modal.style.display = "none";
				this.production_item = ressource_name;
			});
		}
	}
}

class Seller extends Assembler {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, MACHINES["seller"].image, MACHINES["seller"].cost);
	}

	transformItem(item) {
		money += item.value;
		return null;
	}
}

class Roller extends Assembler {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, MACHINES["roller"].image, MACHINES["roller"].cost);
	}

	transformItem(item) {
		item.direction = Math.floor(this.rotation_rad / (90 * (Math.PI / 180)));
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

	click() {
		return;
	}
}

class Furnace extends Transformer {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, MACHINES["furnace"].image, MACHINES["furnace"].cost, "liquid");
	}
}

class Cutter extends Transformer {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, MACHINES["cutter"].image, MACHINES["cutter"].cost, "gear");
	}
}

class WireDrawer extends Transformer {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, MACHINES["wire_drawer"].image, MACHINES["wire_drawer"].cost, "wire");
	}
}

class Crafter extends Producer {
	constructor(_x_index, _y_index) {
		super(_x_index, _y_index, MACHINES["crafter"].image, MACHINES["crafter"].cost);
		this.production_item = "none";
		this.stored_ingredients = {};
	}

	set production_item(value) {
		super.production_item = value;
		if (value != null && value !== "none") {
			this.ingredients = crafts[this.production_item].recipe;
		} else {
			this.ingredients = {};
		}
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
		if (this.production_item != null && this.production_item !== "none" && this.ingredients != null) {
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
		const modal = show_modal(this.x, this.y);
		const craft_items = crafts;
		craft_items["none"] = {};
		for (const craft_name in craft_items) {
			const craft_div = document.createElement("div");
			craft_div.className = "item_selector";
			const craft_img = items_stats[craft_name].image;
			craft_div.appendChild(craft_img);
			modal.appendChild(craft_div);

			craft_div.addEventListener("click", event => {
				modal.style.display = "none";
				this.production_item = craft_name;
			});
		}
	}
}

class Item extends Drawable {
	constructor(_x_index, _y_index, direction, name) {
		const pos = grid.get_border_pos_of_index(_x_index, _y_index, direction);
		const image = items_stats[name].image;
		/*
		switch (direction) {
			case 0:
				_y_index++;
				break;
			case 3:
				_x_index++;
				break;
		}
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
		*/
		const obj_desc = {
			x: pos.x,
			y: pos.y,
			image: image
		};
		super(grid, obj_desc);
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
		let prev_x = this.prev_x % this.game_canvas.frame_width;
		let prev_y = this.prev_y % this.game_canvas.frame_height;
		let x = this.x % this.game_canvas.frame_width;
		let y = this.y % this.game_canvas.frame_height;
		let center_x = this.game_canvas.frame_width / 2;
		let center_y = this.game_canvas.frame_height / 2;
		const x_centered = ((prev_x <= center_x && x >= center_x && this.prev_x <= this.x) || (prev_x >= center_x && x <= center_x && this.prev_x >= this.x));
		const y_centered = ((prev_y <= center_y && y >= center_y && this.prev_y <= this.y) || (prev_y >= center_y && y <= center_y && this.prev_y >= this.y));
		return (x_centered && y_centered);
	}

	center() {
		const pos = this.game_canvas.get_nearest_frame(this.x, this.y);
		this.x = pos.x + this.game_canvas.frame_width / 2;
		this.y = pos.y + this.game_canvas.frame_height / 2;
	}

	update() {
		this.prev_x = this.x;
		this.prev_y = this.y;
		this.x += this.direction_x * (this.game_canvas.frame_width / 30);
		this.y += this.direction_y * (this.game_canvas.frame_height / 30);
		this.draw();
	}
}

function show_modal(x, y) {
	const modal = document.querySelector("#game .modal");
	modal.innerHTML = "";
	modal.style.display = "block";
	modal.style.left = x + "px";
	modal.style.top = y + "px";
	return modal;
}

document.onload = load();