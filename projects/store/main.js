let shoppingList = [];

document.getElementById("search-input").addEventListener("input", searchItem);
document.getElementById("search-input").addEventListener("focus", searchItem);
document.getElementById("search-input").addEventListener("keypress", function (e) {
	if (e.key == "Enter") {
		addItem();
	}
});

let bestSuggestion = null;

function searchItem(e) {
	let search = e.target.value;
	let suggestionsContainer = document.getElementById("search_suggestions");
	suggestionsContainer.innerHTML = "";
	bestSuggestion = null;

	for (const item of items) {
		if (item.name.includes(search) && !shoppingList.includes(item)) {
			if (bestSuggestion == null) {
				bestSuggestion = item;
			}
			let suggestion = document.createElement("span");
			suggestion.innerHTML = item.name;
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
		console.log(shoppingList);

		let shoppingItem = document.createElement("div");
		let itemName = document.createElement("span");
		itemName.innerHTML = addedItem.name;
		shoppingItem.appendChild(itemName);
		let itemDel = document.createElement("button");
		itemDel.innerHTML = "del";
		itemDel.addEventListener("click", function () {
			if (shoppingList.indexOf(addedItem) >= 0) {
				shoppingList.splice(shoppingList.indexOf(addedItem), 1);
				shoppingItem.remove();
				findBestPath();
			}
		});
		shoppingItem.appendChild(itemDel);
		document.getElementById("shopping_list").appendChild(shoppingItem);

		document.getElementById("search-input").value = "";
		let suggestionsContainer = document.getElementById("search_suggestions");
		suggestionsContainer.innerHTML = "";

		findBestPath();
	}
}

function drawMap(store_key = "LECLERC") {
	const store = STORES[store_key];
	let map = document.getElementById("map");
	map.setAttributeNS(null, "viewBox", `0 0 ${store.dimensions.w} ${store.dimensions.h}`);

	const shelfs = svgg(map, "shelfs");
	const defs = store.defaults;
	for (const category of store.gps) {
		if (category.w == null && defs.w != null) {
			category.w = defs.w;
		}
		if (category.h == null && defs.h != null) {
			category.h = defs.h;
		}
		if (category.l == null && defs.l != null) {
			category.l = defs.w;
		}
		if (category.r == null && defs.r != null) {
			category.r = defs.r;
		}
		category.name = category.gp;
		svgrect(shelfs, category.x, category.y, category.w, category.h);
		svgtext(shelfs, category.x + category.w / 2, category.y + category.h / 2, category.name);
	}

	svgg(map, "lines");
}

function distance(pointA, pointB) {
	let a = Math.abs(pointA.x - pointB.x);
	let b = Math.abs(pointA.y - pointB.y);
	return Math.sqrt(a * a + b * b);
}

function findMinInArray(items, func, args = null) {
	let min_v = Number.MAX_VALUE,
		min_i = -1;
	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const v = func.call(this, item, min_v, ...args);
		if (v < min_v) {
			min_v = v;
			min_i = i;
		}
	}
	return min_i;
}

function findBestPathToCall() {

}

function findBestPathTo(item, current_min, pos) {
	if (0 > current_min) {
		return current_min + 1;
	}
}

function findItemsPath() {
	const store = STORES.LECLERC;
	let currentPos = store.in;
	let exitPos = store.out;

	const remainings = shoppingList;
	while (remainings.length > 0) {
		const nearest_i = findMinInArray(remainings, findBestPathTo, currentPos);

	}

	findBestPathTo(currentPos, exitPos);
}

function findBestPathold() {
	const store = STORES.LECLERC;
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
	drawMap();
}

document.onload = load();