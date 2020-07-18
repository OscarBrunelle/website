function load() {
	load_conversion();
}

function create_input(label, name, parent, update_function) {
	const field_label = document.createElement("label");
	const field_input = document.createElement("input");
	field_label.innerHTML = label;
	field_label.for = name;
	field_input.name = name;

	field_input.addEventListener("change", update_function);
	field_input.addEventListener("keypress", update_function);
	field_input.addEventListener("paste", update_function);
	field_input.addEventListener("input", update_function);

	parent.appendChild(field_label);
	parent.appendChild(field_input);
}

function toggle_parent(event) {
	let button = event.target;
	let button_parent = button.parentElement;
	let children = button_parent.parentElement.children;

	let button_state = button.innerHTML === "+";
	let after_button = false;
	for (let i = 0; i < children.length; i++) {
		const child = children[i];
		if (child === button_parent) {
			after_button = true;
			continue;
		}
		if (after_button) {
			child.style.display = button_state ? "block" : "none";
		}
	}
	if (button_state) {
		button.innerHTML = "-";
		button_parent.querySelector("span").style.display = "none";
	} else {
		button.innerHTML = "+";
		button_parent.querySelector("span").style.display = "inline-block";
	}
}