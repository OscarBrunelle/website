function selectEntity(id) {
	selectedEntityID = id;
	gameCanvas.style.cursor = "url(images/" + selectionBar[selectedEntityID].name + "cursor.png), auto";
}

function clickCanvas(evt) {
	if (typeof selectedEntityID !== "undefined" && selectedEntityID != null) {
		place(evt);
	} else {
		collideMouse(evt, suns);
	}
}

function place(evt) {
	let positions = getIndexedPositions(gameCanvas, evt);

	if (entitiesCharacteristics[selectedEntityID].cost > 0 && money < entitiesCharacteristics[selectedEntityID].cost) {
		console.log("Not enough money");
	} else if (positions.x >= 1 && positions.y >= 0 && positions.x <= 9 && positions.y <= 4) {
		positions.x *= 64;
		positions.y *= 64;
		if (selectedEntityID > 300) {
			zombies.push(new Zombie(selectedEntityID, positions.x, positions.y));
		} else {
			let plant = new Plant(selectedEntityID, positions.x, positions.y);
			money -= plant.cost;
			updateMoney();
			plants.push(plant);
		}
	}

	selectedEntityID = null;
	gameCanvas.style.cursor = "auto";
}

function getIndexedPositions(canvas, evt) {
	let coords = getMousePos(canvas, evt);
	coords.x = Math.floor(coords.x / 64);
	coords.y = Math.floor(coords.y / 64);
	return coords;
}