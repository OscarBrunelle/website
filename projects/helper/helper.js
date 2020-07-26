function load() {
	load_conversion();
}

function create_input(label, name, parent, update_function) {
	const container = document.createElement("div");
	const field_label = document.createElement("label");
	const field_input = document.createElement("input");

	container.className = "input-container";
	field_label.innerHTML = label;
	field_label.for = name;
	field_input.name = name;

	field_input.addEventListener("change", update_function);
	field_input.addEventListener("keypress", update_function);
	field_input.addEventListener("paste", update_function);
	field_input.addEventListener("input", update_function);

	container.appendChild(field_label);
	container.appendChild(field_input);
	parent.appendChild(container);
}

function toggle_parent(event) {
	let button = event.target;
	let content = button.parentElement.parentElement.querySelector(".window-content");
	let button_state = button.innerHTML === "+";

	if (button_state) {
		button.innerHTML = "-";
		button.parentElement.style["margin-bottom"] = "5px";
		button.parentElement.style["border-bottom"] = "1px solid black";
		content.style.display = "block";
		//content.style.height = "fit-content";
	} else {
		button.innerHTML = "+";
		button.parentElement.style["margin-bottom"] = 0;
		button.parentElement.style["border-bottom"] = "none";
		content.style.display = "none";
		//content.style.height = "0";
	}
}