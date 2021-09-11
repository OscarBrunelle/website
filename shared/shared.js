const FA_ICONS = "../../icons/svgs/";
const ALPHABET = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

class LanguageSelector {
	constructor(parent_selector, _languages, def_lang_index, _click_func) {
		const ref = this;
		this.languages = _languages;
		this.default_language = this.languages[def_lang_index];
		const cookie = get_cookie("language");
		if (cookie != null && cookie != "") {
			this.language = cookie;
			this.lang_index = this.languages.indexOf(this.language);
		} else {
			this.lang_index = def_lang_index;
			this.language = this.default_language;
		}
		this.click_func = _click_func;

		this.element = $("<button id='language_selector'>" + this.language + "</button>").appendTo(parent_selector);
		this.element.on("click", function () {
			ref.switch_language();
		});
	}

	switch_language() {
		this.lang_index = (this.lang_index + 1) % this.languages.length;
		this.language = this.languages[this.lang_index];
		this.element.text(this.language);
		set_cookie("language", this.language);
		if (this.click_func != null) {
			this.click_func();
		}
	}
}

/**
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 * 
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 * 
 * @see https://stackoverflow.com/questions/118241/calculate-text-width-with-javascript/21015393#21015393
 */
function getTextWidth(text, font = "12px arial") {
	// re-use canvas object for better performance
	var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
	var context = canvas.getContext("2d");
	context.font = font;
	var metrics = context.measureText(text);
	return metrics.width;
}

/**
 * If set, returns the value of the cookie, else null
 * @param {String} cookie_name The key for the cookie
 * @returns String
 */
function get_cookie(cookie_name) {
	const name = cookie_name + "=";
	const decodedCookie = decodeURIComponent(document.cookie);
	const ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

function set_cookie(name, value) {
	document.cookie = name + "=" + value + ";path=/;max-age=31536000;samesite=strict;";
}

/**
 * Removes the "hidden" class from the jQuery element, removing the "display: none" styling from it.
 * @param {JQuery DOM Element} element 
 */
function show(element) {
	element.removeClass("hidden");
}

/**
 * Adds the "hidden" class to the jQuery element, adding the "display: none" styling to it.
 * @param {JQuery DOM Element} element 
 */
function hide(element) {
	element.addClass("hidden");
}

function print_element(element_id, css_file_path = null) {
	const WindowObject = window.open("");
	if (css_file_path != null) {
		WindowObject.document.writeln("<link rel='stylesheet' type='text/css' href='" + css_file_path + "'>");
	}
	WindowObject.document.writeln(document.getElementById(element_id).outerHTML);
	WindowObject.document.close();
	WindowObject.focus();
	setTimeout(function () { //adding a delay to wait for the css to apply
		WindowObject.print();
		WindowObject.close();
	}, 1000);
}

function read_file(element_selector, finished_function, log_progress = false) {
	if (document.querySelector(element_selector).files.length <= 0) {
		alert("Error : No file selected");
		return;
	}

	// first file selected by user
	var file = document.querySelector(element_selector).files[0];

	// perform validation on file type & size if required

	// read the file
	var reader = new FileReader();

	// file reading started
	reader.addEventListener("loadstart", function () {
		if (log_progress) {
			console.log("File reading started");
		}
	});

	// file reading finished successfully
	reader.addEventListener("load", function (e) {
		// contents of file in variable     
		const data = e.target.result;
		finished_function(data);
	});

	// file reading failed
	reader.addEventListener("error", function () {
		alert("Error : Failed to read file");
	});

	// file read progress 
	reader.addEventListener("progress", function (e) {
		if (e.lengthComputable == true && log_progress) {
			var percent_read = Math.floor((e.loaded / e.total) * 100);
			console.log(percent_read + "% read");
		}
	});

	// read as text file
	reader.readAsText(file);
}

function data_to_url(data, type = "octet/stream") {
	const file = new Blob([data], {
		type: type
	});
	return URL.createObjectURL(file);
}

// Function to download data to a file
function download(data, filename, type = "octet/stream") {
	const file = new Blob([data], {
		type: type
	});
	if (window.navigator.msSaveOrOpenBlob) // IE10+
		window.navigator.msSaveOrOpenBlob(file, filename);
	else { // Others
		const a = document.createElement("a"),
			url = URL.createObjectURL(file);
		a.href = url;
		a.download = filename;
		document.body.appendChild(a);
		a.click();
		setTimeout(function () {
			document.body.removeChild(a);
			window.URL.revokeObjectURL(url);
		}, 0);
	}
}

const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "G#", "A", "Bb", "B"];
const A0 = 27.5;
const A4 = 440;

function get_note_frequency(note) {
	if (note == null) {
		console.log("Error: note can't be null");
		return;
	}

	if (Number.isInteger(note)) { //note equal to number of half steps difference from A4
		return (A4 * (2 ** (note / 12)));
	} else {
		const num = parseInt(note.substring(note.length - 1));
		const note_index = NOTES.indexOf(note.substring(0, note.length - 1));
		const a_difference = note_index - NOTES.indexOf("A");
		return (A0 * 2 ** ((a_difference / 12) + num));
	}
}

function play_frequency(frequency, duration, callback = null) {
	const context = new AudioContext();
	const oscillator = context.createOscillator();
	const gain = context.createGain();

	oscillator.type = "sine"; //options: sine square triangle sawtooth
	oscillator.frequency.value = frequency; // value in hertz

	gain.gain.setValueAtTime(0.01, context.currentTime);
	gain.gain.exponentialRampToValueAtTime(1, context.currentTime + 0.01);
	gain.gain.setValueAtTime(1, context.currentTime + duration - 0.01);
	gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + duration);

	oscillator.connect(gain);
	gain.connect(context.destination);

	if (callback != null) {
		oscillator.onended = function () {
			callback();
		};
	}
	oscillator.start(0);
	oscillator.stop(context.currentTime + duration);
}

function getMousePos(element, event) {
	var rect = element.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
		parentWidth: rect.width,
		parentHeight: rect.height
	};
}

function get_distance(pointA, pointB) {
	let a = Math.abs(pointA.x - pointB.x);
	let b = Math.abs(pointA.y - pointB.y);
	return Math.sqrt(a * a + b * b);
}

function get_middle(pointA, pointB) {
	let a = Math.abs((pointA.x - pointB.x) / 2);
	let b = Math.abs((pointA.y - pointB.y) / 2);
	return {
		x: a,
		y: b
	};
}

/**
 * Returns the center point of a given rectangle.
 * @param {Array} rect {x: x, y: y, w: width, h: height}
 * @returns 
 */
function rect_center(rect, round = false) {
	let x = rect.x + rect.w / 2;
	let y = rect.y + rect.h / 2;
	if (round) {
		x = parseInt(x);
		y = parseInt(y);
	}
	return {
		x: x,
		y: y
	}
}

function cons(n, min, max) {
	return (n >= min && n <= max);
}

/**
 * min and max both included
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
function random_int(min = 0, max = 1) {
	return Math.floor(Math.random() * (max + 1 - min) + min);
}

function floor(number, rounding = 1) {
	return Math.floor(number / rounding) * rounding;
}

function round_to_nearest(number, rounding) {
	if (rounding == null) {
		console.error("rounding is null");
		return number;
	}
	return (number === rounding || floor(number, rounding) % 1 === rounding) ? floor(number, rounding) : floor(number + rounding, rounding);
}

/**
 * Min and max both included
 * @param {Number} value 
 * @param {Number} min 
 * @param {Number} max 
 */
function check_n(value, min, max) {
	return (value >= min && value <= max);
}

/**
 * Returns the hexadecimal equivalent of a decimal number.
 * Use >>> to convert to unsigned representation.
 * @param {Number} number the decimal number
 */
function dec_to_hex(number) {
	return number.toString(16);
}

/**
 * Returns the binary equivalent of a decimal number.
 * Use >>> to convert to unsigned representation.
 * @param {Number} number the decimal number
 */
function dec_to_bin(number) {
	return number.toString(2);
}

/**
 * Returns the decimal equivalent of a hexadecimal number.
 * @param {String} string the hexadecimal number
 */
function hex_to_dec(string) {
	return parseInt(string, 16);
}

/**
 * Returns the decimal equivalent of a binary number.
 * Does not work for floats yet.
 * @param {String} string the binary number
 */
function bin_to_dec(string) {
	string = string.toString();
	let dec = 0;
	for (let i = string.length - 1; i >= 0; i--) {
		let bin = parseInt(string[i]);
		dec += bin * Math.pow(2, string.length - 1 - i);
	}
	return dec;
}

/**
 * Returns the hexadecimal equivalent of a binary number.
 * Does not work for floats yet.
 * @param {String} string the binary number
 */
function bin_to_hex(string) {
	string = string.toString();
	let dec = "";
	for (let i = string.length - 1; i >= 0; i -= 4) {
		dec = dec_to_hex(bin_to_dec(string.substring(Math.max(0, i - 3), i + 1))) + dec;
	}
	return parseInt(dec);
}

function to_fixed_length(number, length) {
	let string = (("0".repeat(length)) + number).toString();
	return string.substring(string.length - length, string.length);
}

// get_distance ?

function get_middle(x0, y0, x1, y1) {
	const deltaX = (x1 - x0),
		deltaY = (y1 - y0);
	return {
		x: x1 - deltaX / 2,
		y: y1 - deltaY / 2,
		angle: Math.atan2(deltaY, deltaX)
	};
}

function addDocElement(parent, element, className = null, prependEl = false) {
	if (className != null) {
		element.setAttribute("class", className);
	}
	if (parent != null) {
		if (prependEl) {
			parent.prepend(element);
		} else {
			parent.appendChild(element);
		}
	}
	return element;
}

function docdiv(parent = null, className = null) {
	const element = document.createElement("div");
	return addDocElement(parent, element, className);
}

function docsection(parent = null, className = null) {
	const element = document.createElement("section");
	return addDocElement(parent, element, className);
}

function doch1(parent = null, text = "", className = null) {
	const element = document.createElement("h1");
	element.innerHTML = text;
	return addDocElement(parent, element, className);
}

function doch2(parent = null, text = "", className = null) {
	const element = document.createElement("h2");
	element.innerHTML = text;
	return addDocElement(parent, element, className);
}

function doch3(parent = null, text = "", className = null) {
	const element = document.createElement("h3");
	element.innerHTML = text;
	return addDocElement(parent, element, className);
}

function doch4(parent = null, text = "", className = null) {
	const element = document.createElement("h4");
	element.innerHTML = text;
	return addDocElement(parent, element, className);
}

function doch5(parent = null, text = "", className = null) {
	const element = document.createElement("h5");
	element.innerHTML = text;
	return addDocElement(parent, element, className);
}

function doch6(parent = null, text = "", className = null) {
	const element = document.createElement("h6");
	element.innerHTML = text;
	return addDocElement(parent, element, className);
}

function docspan(parent = null, text = "", className = null) {
	const element = document.createElement("span");
	element.innerHTML = text;
	return addDocElement(parent, element, className);
}

function docp(parent = null, text = "", className = null) {
	const element = document.createElement("p");
	element.innerHTML = text;
	return addDocElement(parent, element, className);
}

function doctime(parent = null, datetime = "", className = null) {
	const element = document.createElement("time");
	element.datetime = datetime;
	return addDocElement(parent, element, className);
}

function docimg(parent = null, src = null, className = null) {
	const element = document.createElement("img");
	element.setAttribute("src", src);
	return addDocElement(parent, element, className);
}

function docaudio(parent = null, src = null, className = null) {
	const element = document.createElement("audio");
	element.setAttribute("src", src);
	return addDocElement(parent, element, className);
}

function doca(parent = null, href = null, innerHTML = "", className = null) {
	const element = document.createElement("a");
	element.innerHTML = innerHTML;
	element.setAttribute("href", href);
	return addDocElement(parent, element, className);
}

function docbutton(parent = null, innerHTML = "", className = null) {
	const element = document.createElement("button");
	element.innerHTML = innerHTML;
	return addDocElement(parent, element, className);
}

function docobject(parent = null, data = null, className = null) {
	const element = document.createElement("object");
	element.setAttribute("data", data);
	return addDocElement(parent, element, className);
}

function docsvg(parent = null, viewBox = "0 0 100 100", className = null) {
	const element = document.createElement("svg");
	element.setAttribute("viewBox", viewBox);
	return addDocElement(parent, element, className);
}

function docol(parent = null, className = null) {
	const element = document.createElement("ol");
	return addDocElement(parent, element, className);
}

function docul(parent = null, className = null) {
	const element = document.createElement("ul");
	return addDocElement(parent, element, className);
}

function docli(parent = null, text = "", className = null) {
	const element = document.createElement("li");
	element.innerHTML = text;
	return addDocElement(parent, element, className);
}

function doclabel(parent = null, text = "", attr_for = null, className = null) {
	const element = document.createElement("label");
	element.innerHTML = text;
	element.setAttribute("for", attr_for);
	return addDocElement(parent, element, className);
}

function docinput(parent = null, id = null, name = null, type = "checkbox", default_value = null, checked = false, className = null) {
	const element = document.createElement("input");
	element.id = id;
	element.setAttribute("name", name);
	element.setAttribute("type", type);
	element.setAttribute("value", default_value);
	if (checked) element.setAttribute("checked", checked);
	return addDocElement(parent, element, className);
}

let inputs_id_index = 0;

function docinputs(parent = null, options = [], type = "checkbox", className = null) {
	let elements = [];
	let i = 0;
	for (const option of options) {
		const attr_for = `input-${inputs_id_index}-${i++}`;
		const option_container = docdiv(parent, className);
		elements.push(option_container);
		doclabel(option_container, option.label, attr_for);
		docinput(option_container, attr_for, option.name, type, option.value, option.checked);
	}
	inputs_id_index++;
	return elements;
}

function doctable(parent = null, className = null) {
	const element = document.createElement("table");
	return addDocElement(parent, element, className);
}

function doctr(parent = null, className = null) {
	const element = document.createElement("tr");
	return addDocElement(parent, element, className);
}

function docth(parent = null, value = "", className = null) {
	const element = document.createElement("th");
	element.innerHTML = value;
	return addDocElement(parent, element, className);
}

function doctd(parent = null, value = "", className = null) {
	const element = document.createElement("td");
	element.innerHTML = value;
	return addDocElement(parent, element, className);
}

function fill_table(element, columns = [], values = [], empty = true) {
	if (empty) {
		element.innerHTML = "";
	}

	const tr_headers = doctr(element);
	for (const col of columns) {
		docth(tr_headers, col.title);
	}

	for (const val of values) {
		const tr = doctr(element);
		for (const col of columns) {
			let text = "";
			if (val[col.name] != null) {
				text = val[col.name];
			}
			doctd(tr, text);
		}
	}
}

let current_theme;

function toggle_theme(theme = null) {
	let button_present = (document.getElementById("theme-btn") != null);
	if (button_present) document.getElementById("theme-btn").addEventListener("click", toggle_theme);

	if (theme != null && (theme == "light" || theme == "dark")) {
		current_theme = theme;
	} else if (current_theme == null) {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			current_theme = "dark";
		} else {
			current_theme = "light";
		}
	} else {
		current_theme = (current_theme == "light" ? "dark" : "light");
	}
	set_cookie("preferred_theme", current_theme);

	switch (current_theme) {
		case "light":
			if (button_present) document.getElementById("theme-btn").innerHTML = "&#127761;";
			document.body.classList.remove("theme-dark");
			document.body.classList.add("theme-light");
			break;
		case "dark":
			if (button_present) document.getElementById("theme-btn").innerHTML = "&#9728;&#65039;";
			document.body.classList.remove("theme-light");
			document.body.classList.add("theme-dark");
			break;
		default:
			break;
	}
}
document.onload = toggle_theme(get_cookie("preferred_theme"));

/* START OF SVG */
const xmlns = "http://www.w3.org/2000/svg";

function svgcontainer(parent, x, y, width, height, className = null) {
	const element = document.createElementNS(xmlns, "svg");
	if (className != null) {
		element.setAttributeNS(null, "class", className);
	}
	element.setAttributeNS(null, "x", x);
	element.setAttributeNS(null, "y", y);
	element.setAttributeNS(null, "width", width);
	element.setAttributeNS(null, "height", height);
	parent.appendChild(element);
	return element;
}

function addSVGElement(parent, element, className = null, prependEl = false) {
	if (className != null) {
		element.setAttributeNS(null, "class", className);
	}
	if (prependEl) {
		parent.prepend(element);
	} else {
		parent.appendChild(element);
	}
	return element;
}

function svgg(parent, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "g");
	return addSVGElement(parent, element, className, prependEl);
}

function svgtext(parent, x, y, text, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "text");
	element.setAttributeNS(null, "x", x);
	element.setAttributeNS(null, "y", y);
	element.innerHTML = text;
	return addSVGElement(parent, element, className, prependEl);
}

function svgline(parent, x1, y1, x2, y2, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "line");
	element.setAttributeNS(null, "x1", x1);
	element.setAttributeNS(null, "y1", y1);
	element.setAttributeNS(null, "x2", x2);
	element.setAttributeNS(null, "y2", y2);
	return addSVGElement(parent, element, className, prependEl);
}

function svgpath(parent, d, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "path");
	element.setAttributeNS(null, "d", d);
	return addSVGElement(parent, element, className, prependEl);
}

function svgrect(parent, x, y, width = 1, height = 1, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "rect");
	element.setAttributeNS(null, "x", x);
	element.setAttributeNS(null, "y", y);
	element.setAttributeNS(null, "width", width);
	element.setAttributeNS(null, "height", height);
	return addSVGElement(parent, element, className, prependEl);
}

function svgcircle(parent, x, y, radius, className = null, prependEl = false) {
	let element = document.createElementNS(xmlns, "circle");
	element.setAttributeNS(null, "cx", x);
	element.setAttributeNS(null, "cy", y);
	element.setAttributeNS(null, "r", radius);
	return addSVGElement(parent, element, className, prependEl);
}

// angles in radians
function svgarc(parent, x, y, r, startAngle, endAngle, invert = false, className = "", prependEl = false) {
	if (Math.abs(endAngle - startAngle) == 2 * Math.PI) {
		return svgcircle(parent, x, y, r, className);
	}
	const x0 = x + Math.cos(startAngle) * r,
		y0 = y - Math.sin(startAngle) * r,
		x1 = x + Math.cos(endAngle) * r,
		y1 = y - Math.sin(endAngle) * r;

	let d = "M " + x0 + "," + y0;
	d += " A" + r + "," + r; // radius x and y
	d += " 0"; // x-axis-rotation
	let largeArcFlag;
	if (endAngle > startAngle) {
		largeArcFlag = (endAngle - startAngle < Math.PI ? "0" : "1");
	} else {
		largeArcFlag = (startAngle - endAngle > Math.PI ? "0" : "1");
	}
	d += " " + largeArcFlag; // large-arc-flag -> determine which direction the arc is going
	d += " " + (invert ? "1" : "0"); // sweep-flag -> which circle to use
	d += " " + x1 + "," + y1;

	let element = document.createElementNS(xmlns, "path");
	element.setAttributeNS(null, "d", d);
	return addSVGElement(parent, element, className, prependEl);
}

class BasicSVG {
	constructor(parent = null, width = 400, height = 400) {
		this.width = width;
		this.height = height;

		let svgroot = document.createElementNS(xmlns, "svg");
		svgroot.setAttributeNS(null, "viewBox", "0 0 " + this.width + " " + this.height);
		if (parent != null) {
			parent.appendChild(svgroot);
		}
		this.svgroot = svgroot;
	}
}

function create2DArray(nI, nJ, defaultValue = null) {
	let array = [];
	for (let i = 0; i < nI; i++) {
		let innerArr = [];
		for (let j = 0; j < nJ; j++) {
			let value;
			if (typeof (defaultValue) === "function") {
				value = defaultValue(i, j);
			} else {
				value = defaultValue;
			}
			innerArr.push(value);
		}
		array.push(innerArr);
	}
	return array;
}

function SVG2DArray(basicSVG, array, elementFunction) {
	if (elementFunction == null) {
		elementFunction = function (d, i, j) {
			let textElement = document.createElementNS(null, "text");
			textElement.innerHTML = d;
			return textElement;
		};
	}

	let squareSize = round_to_nearest((basicSVG.width - 1) / array.length, 0.5);
	let gridWidth = squareSize * array.length;
	let gridHeight = squareSize * array[0].length;

	let gridLinesX = document.createElementNS(xmlns, "g");
	gridLinesX.setAttributeNS(null, "class", "gridLines-x");
	basicSVG.svgroot.appendChild(gridLinesX);
	for (let x = 0; x < array.length + 1; x++) {
		let posY = round_to_nearest(x * squareSize, 0.5);
		svgline(gridLinesX, 0, posY, gridWidth, posY, "gridLine-x");
	}

	let gridLinesY = document.createElementNS(xmlns, "g");
	gridLinesY.setAttributeNS(null, "class", "gridLines-y");
	basicSVG.svgroot.appendChild(gridLinesY);
	for (let y = 0; y < array[0].length + 1; y++) {
		let posX = round_to_nearest(y * squareSize, 0.5);
		svgline(gridLinesY, posX, 0, posX, gridHeight, "gridLine-y");
	}


	// squareSize += 1;
	let dataG = document.createElementNS(xmlns, "g");
	dataG.setAttributeNS(null, "class", "data-g");
	basicSVG.svgroot.appendChild(dataG);
	for (let x = 0; x < array.length; x++) {
		for (let y = 0; y < array[0].length; y++) {
			let dataElement = elementFunction(array[x][y], x, y, squareSize);
			if (dataElement != null) {
				let posX = round_to_nearest(x * squareSize, 0.5); // - 0.5;
				let posY = round_to_nearest(y * squareSize, 0.5); // - 0.5;
				dataElement.setAttributeNS(null, "transform", "translate(" + posX + "," + posY + ")");
				// dataElement.setAttributeNS(null, "x", posX);
				// dataElement.setAttributeNS(null, "y", posY);
				// dataElement.setAttributeNS(null, "width", squareSize);
				// dataElement.setAttributeNS(null, "height", squareSize);
				dataG.appendChild(dataElement);
			}
		}
	}
}
/* END OF SVG */

class CustomTable {
	/**
	 * 
	 * @param {*} parent 
	 * @param {*} columns {"title": "Titre de la colonne", "name": "Nom du champ pour les valeurs"}
	 * @param {*} values 
	 */
	constructor(parent, columns = [], values = []) {
		this.table_element = doctable(parent, "shared-table");

		this.set_columns(columns, false);
		this.set_values(values, false);

		this.update();
	}

	check_sorting_column() {
		if (this.sorting_column != null) {
			for (const col of this.columns) {
				if (col.name == this.sorting_column.name && col.name == this.sorting_column.name) {
					return true;
				}
			}
		}
		return false;
	}

	set_sorting_column(column, update = true) {
		if (this.sorting_column == column) {
			this.sorting_way = !this.sorting_way;
		} else {
			this.sorting_way = true;
			this.sorting_column = column;
		}
		this.sort_table(this.sorting_column, update);
		return this;
	}

	set_columns(columns, update = true) {
		this.columns = columns;
		if (!this.check_sorting_column()) {
			this.set_sorting_column(this.columns[0]);
		}

		if (update) {
			this.update();
		}
		return this;
	}

	set_values(values, update = true) {
		this.values = values;
		this.sorted_values = values;
		this.sort_table(this.sorting_column, update);

		if (update) {
			this.update();
		}
		return this;
	}

	sort_table(column = this.sorting_column, update = true) {
		const column_name = column.name;

		const ref = this;

		function compare(a, b) {
			if (a[column_name] < b[column_name]) {
				return (ref.sorting_way ? -1 : 1);
			} else if (a[column_name] > b[column_name]) {
				return (ref.sorting_way ? 1 : -1);
			}
			return 0;
		}

		if (this.sorted_values != null) {
			this.sorted_values = this.sorted_values.sort(compare);
		}

		if (update) {
			this.update();
		}
		return this;
	}

	update() {
		fill_table(this.table_element, this.columns, this.sorted_values);
		const headers = this.table_element.querySelectorAll("th");
		for (let i = 0; i < headers.length; i++) {
			const th = headers[i];
			const ref = this;
			if (this.columns[i] == this.sorting_column) {
				th.classList.add("sorter");
			} else {
				th.classList.remove("sorter");
			}
			th.addEventListener("click", function (event) {
				ref.set_sorting_column(ref.columns[i]);
			});
		}
		return this;
	}
}

function find_min_in_array(items, func, args = []) {
	let min_i = -1,
		min_v = Number.MAX_VALUE,
		min_r = null;

	for (let i = 0; i < items.length; i++) {
		const item = items[i];
		const r = func.call(this, item, min_v, ...args);
		if (r.v < min_v) {
			min_i = i;
			min_v = r.v;
			min_r = r;
		}
	}

	return {
		i: min_i,
		v: min_v,
		r: min_r
	};
}

function deep_copy(obj) {
	return JSON.parse(JSON.stringify(obj));
}