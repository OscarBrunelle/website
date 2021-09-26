"use strict"

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

function docstyle(parent = null, innerHTML = null) {
	const element = document.createElement("style");
	element.innerHTML = innerHTML;
	return addDocElement(parent, element);
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

function doclabelinput(parent = null, label = "", id = null, name = null, type = "string", placeholder = null, default_value = null, container_div = false) {
	if (container_div) parent = docdiv(parent);
	const l = document.createElement("label");
	l.innerHTML = label;
	l.setAttribute("for", id);
	addDocElement(parent, l);

	const input = document.createElement("input");
	input.id = id;
	input.setAttribute("name", name);
	input.setAttribute("type", type);
	input.setAttribute("value", default_value);
	input.setAttribute("placeholder", placeholder);
	return addDocElement(parent, input);
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

let select_index = 0;

function docselect(parent = null, label = "", options = [], id = `select-${select_index++}`) {
	const l = document.createElement("label");
	l.innerHTML = label;
	l.setAttribute("for", id);
	addDocElement(parent, l);

	const sel = document.createElement("select");
	sel.setAttribute("id", id);

	for (const op of options) {
		const oe = document.createElement("option");
		oe.setAttribute("value", op.value);
		oe.innerHTML = op.text;
		addDocElement(sel, oe);
	}

	return addDocElement(parent, sel);
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