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

function drawMap() {
	let map = document.getElementById("map");
	for (let i = 0; i < categories.length; i++) {
		const category = categories[i];
		let rect = document.createElementNS(xmlns, "rect");
		rect.setAttributeNS(null, "id", "category-" + i);
		rect.setAttributeNS(null, "x", category.x * 10);
		rect.setAttributeNS(null, "y", category.y * 10);
		rect.setAttributeNS(null, "width", category.w * 10);
		rect.setAttributeNS(null, "height", category.h * 10);
		map.appendChild(rect);
		let text = document.createElementNS(xmlns, "text");
		text.innerHTML = category.name;
		text.setAttributeNS(null, "x", category.x * 10 + category.w * 10 / 2);
		text.setAttributeNS(null, "y", category.y * 10 + category.h * 10 / 2);
		map.appendChild(text);
	}

	let lines = document.createElementNS(xmlns, "g");
	lines.setAttributeNS(null, "id", "lines");
	map.appendChild(lines);
}

function distance(pointA, pointB) {
	let a = Math.abs(pointA.x - pointB.x);
	let b = Math.abs(pointA.y - pointB.y);
	return Math.sqrt(a * a + b * b);
}

function findBestPath() {
	let currentPos = {
		x: 0,
		y: 0
	};
	let exitPos = {
		x: 10,
		y: 0
	};

	let lines = document.getElementById("lines");
	lines.innerHTML = "";

	if (shoppingList.length <= 0) {
		svgline(lines, currentPos.x * 10, currentPos.y * 10, exitPos.x * 10, exitPos.y * 10);
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
		svgline(lines, currentPos.x * 10, currentPos.y * 10, bestX * 10, bestY * 10);
		currentPos = {
			x: bestX,
			y: bestY
		};
	}

	svgline(lines, currentPos.x * 10, currentPos.y * 10, exitPos.x * 10, exitPos.y * 10);
}

function load() {
	drawMap();
}

document.onload = load();