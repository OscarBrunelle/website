const FA_ICONS = "../../icons/svgs/";

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
	document.cookie = name + "=" + value + ";";
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

// Function to download data to a file
function download(data, filename, type) {
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

function play_frequency(frequency, duration, callback) {
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

	oscillator.onended = callback;
	oscillator.start(0);
	oscillator.stop(context.currentTime + duration);
}

function getMousePos(canvas, evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
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


/* START OF SVG */
const xmlns = "http://www.w3.org/2000/svg";
function svgline(parent, x1, y1, x2, y2, className = null) {
	let line = document.createElementNS(xmlns, "line");
	if (className != null) {
		line.setAttributeNS(null, "class", className);
	}
	line.setAttributeNS(null, "x1", x1);
	line.setAttributeNS(null, "y1", y1);
	line.setAttributeNS(null, "x2", x2);
	line.setAttributeNS(null, "y2", y2);
	parent.appendChild(line);
}

class BasicSVG {
	constructor(parent = null, width = 400, height = 400) {
		this.width = width;
		this.height = height;

		let svgroot = document.createElementNS(xmlns, "svg");
		svgroot.setAttributeNS(null, "width", this.width);
		svgroot.setAttributeNS(null, "height", this.height);
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
			if (typeof(defaultValue) === "function") {
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

	let squareSize = (basicSVG.width - 1) / array.length;

	let gridLinesX = document.createElementNS(xmlns, "g");
	gridLinesX.setAttributeNS(null, "class", "gridLines-x");
	basicSVG.svgroot.appendChild(gridLinesX);
	for (let x = 0; x < array.length + 1; x++) {
		let posX = round_to_nearest(x * squareSize, 0.5);
		svgline(gridLinesX, posX, 0, posX, svg.height, "gridLine-x");
	}

	let gridLinesY = document.createElementNS(xmlns, "g");
	gridLinesY.setAttributeNS(null, "class", "gridLines-y");
	basicSVG.svgroot.appendChild(gridLinesY);
	for (let y = 0; y < array[0].length + 1; y++) {
		let posY = round_to_nearest(y * squareSize, 0.5);
		svgline(gridLinesY, 0, posY, svg.width, posY, "gridLine-y");
	}


	let dataG = document.createElementNS(xmlns, "g");
	dataG.setAttributeNS(null, "class", "data-g");
	basicSVG.svgroot.appendChild(dataG);
	for (let x = 0; x < array.length; x++) {
		for (let y = 0; y < array[0].length; y++) {
			let dataElement = elementFunction(array[x][y], x, y, squareSize);
			if (dataElement != null) {
				let posX = round_to_nearest(x * squareSize, 0.5);
				let posY = round_to_nearest(y * squareSize, 0.5);
				dataElement.setAttributeNS(null, "x", posX);
				dataElement.setAttributeNS(null, "y", posY);
				dataElement.setAttributeNS(null, "width", squareSize);
				dataElement.setAttributeNS(null, "height", squareSize);
				dataG.appendChild(dataElement);
			}
		}
	}
}
/* END OF SVG */