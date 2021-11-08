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

function set_cookie(name, value, path = "/") {
	document.cookie = `${name}=${value};path=${path};Max-Age=31536000;samesite=strict`;
}

function expire_cookie(name, path = "/") {
	document.cookie = `${name}=;path=${path};expires=0`;
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

function getMousePos(element, event) {
	var rect = element.getBoundingClientRect();
	return {
		x: event.clientX - rect.left,
		y: event.clientY - rect.top,
		parentWidth: rect.width,
		parentHeight: rect.height
	};
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