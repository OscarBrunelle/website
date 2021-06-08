"use strict"

let map = document.getElementById("map");
let shoppingList = [];

document.getElementById("search-input").addEventListener("input", searchItem);
document.getElementById("search-input").addEventListener("focus", searchItem);
document.getElementById("search-input").addEventListener("focusout", function (e) {
	let suggestionsContainer = document.getElementById("search_suggestions");
	suggestionsContainer.style.visibility = "none";
});
document.getElementById("search-input").addEventListener("keypress", function (e) {
	if (e.key == "Enter") {
		addItem();
	}
});

const store_name = "LECLERC";

let bestSuggestion = null;

function searchItem(e) {
	let search = e.target.value.toLowerCase();
	let suggestionsContainer = document.getElementById("search_suggestions");
	suggestionsContainer.innerHTML = "";
	bestSuggestion = null;

	for (const item_key in PRODUCTS) {
		const item = PRODUCTS[item_key];
		if (item["name-fr"].toLowerCase().includes(search) && !shoppingList.includes(item)) {
			if (bestSuggestion == null) {
				bestSuggestion = item;
			}
			let suggestion = document.createElement("span");
			suggestion.innerHTML = item["name-fr"];
			suggestion.addEventListener("click", function (e) {
				addItem(item);
			});
			suggestionsContainer.appendChild(suggestion);
		}
	}
}

function addItem(addedItem = bestSuggestion) {
	if (addedItem != null && !shoppingList.includes(addedItem)) {
		shoppingList.push(addedItem);

		let shoppingItem = docli(document.getElementById("shopping_list"), addedItem["name-fr"]);
		let itemDel = docbutton(shoppingItem, "del");
		itemDel.addEventListener("click", function () {
			if (shoppingList.indexOf(addedItem) >= 0) {
				shoppingList.splice(shoppingList.indexOf(addedItem), 1);
				shoppingItem.remove();
				find_and_show_best_path();
			}
		});

		document.getElementById("search-input").value = "";
		let suggestionsContainer = document.getElementById("search_suggestions");
		suggestionsContainer.innerHTML = "";
	}
}

function drawMap(store_key = store_name) {
	const store = STORES[store_key];

	const shelfs = svgg(map, "shelfs");
	const defs = store.defaults;
	for (const shelf of store.gps) {
		if (shelf.w == null && defs.w != null) {
			shelf.w = defs.w;
		}
		if (shelf.h == null && defs.h != null) {
			shelf.h = defs.h;
		}
		if (shelf.l == null && defs.l != null) {
			shelf.l = defs.l;
		}
		if (shelf.r == null && defs.r != null) {
			shelf.r = defs.r;
		}
		shelf.name = shelf.gp;
		const g = svgg(shelfs);
		svgrect(g, shelf.x, shelf.y, shelf.w, shelf.h, "shelf");
		svgtext(g, shelf.x + shelf.w / 2, shelf.y + shelf.h / 2, shelf.name, "shelf-name");
		svgrect(g, shelf.x - shelf.l, shelf.y, shelf.l, shelf.h, "shelf-border");
		svgrect(g, shelf.x + shelf.w, shelf.y, shelf.r, shelf.h, "shelf-border");
	}

	svgg(map, "lines");
}

function find_store_best_path() {
	const store = STORES[store_name];

	const start = rect_center(store.in, true);
	const end = rect_center(store.out, true);

	const defs = store.defaults;
	let targets = [];
	let obstacles = [];
	for (const item of shoppingList) {
		for (const shelf of store.gps) {
			if (shelf.gp != item.gp) continue;
			const def_letters = ["w", "h", "l", "r", "t", "b"];
			for (const letter of def_letters) {
				if (shelf[letter] == null && defs[letter] != null) {
					shelf[letter] = defs[letter];
				}
			}
			for (let l = shelf.l; l > 0; l--) {
				for (let h = 0; h < shelf.h; h++) {
					obstacles.push({
						x: shelf.x - l,
						y: shelf.y + h
					});
				}
			}
			for (let r = shelf.r; r > 0; r--) {
				for (let h = 0; h < shelf.h; h++) {
					obstacles.push({
						x: shelf.x + r,
						y: shelf.y + h
					});
				}
			}
			const target = rect_center(shelf, true);
			targets.push(target);
		}
	}

	const grid = create_grid(store.dimensions.w, store.dimensions.h, start, targets, obstacles);

	return find_best_path(grid, start, targets, end);
}

const path_rects = svgg(map, "path_rects");

function show_store_best_path(path) {
	path_rects.innerHTML = "";
	if (path.length <= 0) return;
	for (const path_part of path) {
		let prev = path_part[0];
		for (const point of path_part) {
			svgline(path_rects, prev.x + 0.5, prev.y + 0.5, point.x + 0.5, point.y + 0.5, "path");
			prev = deep_copy(point);
		}
		svgrect(path_rects, prev.x, prev.y, 1, 1, "target target-path");
	}

	const store = STORES[store_name];
	const start = rect_center(store.in, true);
	const end = rect_center(store.out, true);
	svgrect(path_rects, start.x, start.y, 1, 1, "target target-start");
	svgrect(path_rects, end.x, end.y, 1, 1, "target target-end");
}

function find_and_show_best_path() {
	const path = find_store_best_path();
	show_store_best_path(path);
}

function findBestPathold() {
	const store = STORES[store_name];
	let currentPos = store.in;
	let exitPos = store.out;

	let lines = map.querySelector(".lines");
	lines.innerHTML = "";

	if (shoppingList.length <= 0) {
		svgline(lines, currentPos.x, currentPos.y, exitPos.x, exitPos.y);
		alert("Shopping list is empty");
		return null;
	}

	let doneItems = [];
	for (let iteration = 0; iteration < shoppingList.length; iteration++) {
		let bestX, bestY, bestDistance, bestItem;
		for (const item of shoppingList) {
			if (doneItems.includes(item)) {
				continue;
			}
			const catX = item.category.x;
			const catY = item.category.y;
			for (let i = 0; i < item.category.w; i++) {
				for (let j = 0; j < item.category.h; j++) {
					let testPos = {
						x: catX + i,
						y: catY + j
					};
					if (bestDistance == null || distance(currentPos, testPos) < bestDistance) {
						bestX = testPos.x;
						bestY = testPos.y;
						bestDistance = distance(currentPos, testPos);
						bestItem = item;
					}
				}
			}
		}
		doneItems.push(bestItem);
		svgline(lines, currentPos.x, currentPos.y, bestX, bestY);
		currentPos = {
			x: bestX,
			y: bestY
		};
	}

	svgline(lines, currentPos.x, currentPos.y, exitPos.x, exitPos.y);
}

function load() {
	const store = STORES[store_name];
	map.setAttributeNS(null, "viewBox", `0 0 ${store.dimensions.w} ${store.dimensions.h}`);

	drawMap();
}

document.onload = load();