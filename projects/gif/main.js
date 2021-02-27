

function updateColorPickers() {
	let numberColors = parseInt(document.getElementById("number_colors-select").value);
	let colorPickersContainer = document.getElementById("color_pickers");
	colorPickersContainer.innerHTML = "";

	while (colors.length > numberColors) {
		colors.pop();
	}

	for (let i = 0; i < numberColors; i++) {
		if (i > colors.length - 1) {
			colors.push("FFFFFF");
		}

		let colorPicker = document.createElement("input");
		colorPicker.id = "color_picker-" + i;
		colorPicker.className = "color_picker";
		colorPicker.value = colors[i];
		colorPicker.addEventListener("change", updateColorPickers);
		colorPickersContainer.appendChild(colorPicker);
	}
	
	compileGIF();
}

function load() {
	document.getElementById("number_colors-select").addEventListener("change", updateColorPickers);
	updateColorPickers();
}

document.onload = load();