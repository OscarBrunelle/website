let resultingGif;
let otherData;

function uintToString(uintArray) {
	let encodedString = String.fromCharCode.apply(null, uintArray);
	// let decodedString = decodeURIComponent(escape(encodedString));
	return encodedString;
}

function getFileData() {
	let file = "";
	let data = resultingGif;
	let hexcodeArray = [];

	for (let i = 0; i < data.length; i += 2) {
		let hex = data[i] + data[i + 1];
		let dec = hex_to_dec(hex);
		let hexcode = +("0x" + hex);
		hexcodeArray.push(hexcode);
		let str = String.fromCharCode(hexcode);
		console.log(hexcode, str, str.charCodeAt(0));
		file += str;
	}

	otherData = uintToString(hexcodeArray);

	// let uint8array = new TextEncoder("utf-8").encode("Plain Text");
	// let string = new TextDecoder().decode(uint8array);

	return file;
}

function updateColorPickers() {
	let numberColors = parseInt(document.getElementById("number_colors-select").value);
	let colorPickersContainer = document.getElementById("color_pickers");
	colorPickersContainer.innerHTML = "";
	let paintingColors = document.getElementById("painting_color-select");
	paintingColors.innerHTML = "";

	while (colors.length > numberColors) {
		colors.pop();
	}

	let paintingColor = document.createElement("option");
	paintingColor.id = "painting_color-eraser";
	paintingColor.className = "painting_color";
	paintingColor.value = "eraser";
	paintingColor.innerHTML = "Gomme";
	paintingColors.appendChild(paintingColor);

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

		let paintingColor = document.createElement("option");
		paintingColor.id = "painting_color-" + i;
		paintingColor.className = "painting_color";
		paintingColor.value = colors[i];
		if (i == 0) paintingColor.selected = true;
		paintingColor.innerHTML = colors[i];
		paintingColors.appendChild(paintingColor);
	}

	resultingGif = compileGIF();

	getFileData();
	document.getElementById("output-code").innerHTML = resultingGif;
}

function updatePaintingColor() {
	paintingColor = document.getElementById("painting_color-select").value;
}

function updateBrushSize() {
	brushSize = document.getElementById("brush_size").value;
}

function updateCanvasDimensions(width, height) {
	canvas.width = width;
	canvas.height = height;
}

function updateDimensions() {
	let w = document.getElementById("width").value;
	let h = document.getElementById("height").value;
	rawW = w;
	rawH = h;
	console.log(w + " x " + h);
	updateCanvasDimensions(w, h);
}

var saveData = (function () {
	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	return function (data, fileName) {
		var json = JSON.stringify(data),
			blob = new Blob([data], {
				type: "octet/stream"
			}),
			url = window.URL.createObjectURL(blob);
		document.getElementById("output-image").src = url;
		a.href = url;
		a.download = fileName;
		a.click();
		// window.URL.revokeObjectURL(url);
	};
}());

function saveGIF() {
	if (resultingGif == null) {
		return;
	}

	// var blob = new Blob([resultingGif], {type: "application/octet-stream"});
	// console.log(URL.createObjectURL(blob));

	//byte file back to hex array
	// data = file.split("").map(ch => ("0"+ch.charCodeAt(0).toString(16).toUpperCase()).slice(-2))

	saveData(getFileData(), "test.gif");
}

function copyToClipboard() {
	let text = document.getElementById("output-code").innerHTML;
	navigator.clipboard.writeText(text);
}

function load() {
	document.getElementById("number_colors-select").addEventListener("change", updateColorPickers);
	updateColorPickers();
	createCanvas();
	document.getElementById("painting_color-select").addEventListener("change", updatePaintingColor);
	updatePaintingColor();
	document.getElementById("brush_size").addEventListener("change", updateBrushSize);
	updateBrushSize();
	document.getElementById("width").addEventListener("change", updateDimensions);
	document.getElementById("height").addEventListener("change", updateDimensions);
	updateDimensions();
}

document.onload = load();