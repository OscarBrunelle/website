let shoppingList = [];

document.getElementById("search-input").addEventListener("input", searchItem);
document.getElementById("search-input").addEventListener("focus", searchItem);
document.getElementById("search-input").addEventListener("keypress", addItem);

let bestSuggestion = null;
function searchItem(e) {
	let search = e.target.value;
	let suggestionsContainer = document.getElementById("search_suggestions");
	suggestionsContainer.innerHTML = "";
	bestSuggestion = null;
	if (search == "") {
		return;
	}

	for (const item of items) {
			if (item.name.includes(search) && !shoppingList.includes(item)) {
				if (bestSuggestion == null) {
					bestSuggestion = item;
				}
				let suggestion = document.createElement("span");
				suggestion.innerHTML = item.name;
				suggestionsContainer.appendChild(suggestion);
			}
	}
}

function addItem(e) {
	let addedItem = bestSuggestion;
	if (e.key == "Enter" && document.getElementById("search-input").value != "" && addedItem != null && !shoppingList.includes(addedItem)) {
		shoppingList.push(addedItem);
		console.log(shoppingList);

		let shoppingItem = document.createElement("div");
		let itemName = document.createElement("span");
		itemName.innerHTML = addedItem.name;
		shoppingItem.appendChild(itemName);
		let itemDel = document.createElement("button");
		itemDel.innerHTML = "del";
		itemDel.addEventListener("click", function() {
			if (shoppingList.indexOf(addedItem) >= 0) {
				shoppingList.splice(shoppingList.indexOf(addedItem), 1);
				shoppingItem.remove();
			}
		});
		shoppingItem.appendChild(itemDel);
		document.getElementById("shopping_list").appendChild(shoppingItem);
		
		document.getElementById("search-input").value = "";
		let suggestionsContainer = document.getElementById("search_suggestions");
		suggestionsContainer.innerHTML = "";
	}
}