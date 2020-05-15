"use strict";

class MenuButton {
	constructor(_title, _action) {
		this.title = _title;
		this.action = _action;
	}

	/**
	 * @param {String} value
	 */
	set title(value) {
		this.btitle = value;
	}

	get title() {
		return this.btitle;
	}

	/**
	 * @param {Function} value
	 */
	set action(value) {
		this.baction = value;
	}

	get action() {
		return this.baction;
	}
}

class PlayButton extends MenuButton {
	constructor(parent_selector, play_action) {
		super("Play", function () {
			show_gameCanvas(parent_selector);
			play_action();
		});
	}
}

function show_gameCanvas(parent_selector) {
	$(parent_selector).children().hide();
	$("#gameplay_div").show();
}

class InstructionsButton extends MenuButton {
	constructor(parent_selector, text) {
		const instr_action = () => {
			if ($("#instructions").length < 1) {
				const instructions = $("<div id='instructions'></div>").appendTo(parent_selector);
				instructions.append("<h3>Instructions</h3>");
				$("<p>" + text + "</p>").appendTo("#instructions");
				const exit_button = $("<button class='bottom_exit-button menu-button'>Exit</button>").appendTo("#instructions");
				exit_button.on("click", function () {
					show_mainMenu("#instructions");
				});
			}
			$("#instructions").show();
		}
		super("Instructions", instr_action);
	}
}

class MenuOption {
	constructor(_name, _icon) {
		this.name = _name;
		this.icon = _icon;
	}

	set name(value) {
		this.oname = value;
	}

	get name() {
		return this.oname;
	}

	set icon(value) {
		this.oicon = value;
	}

	get icon() {
		return this.oicon;
	}
}

class OptionsButton extends MenuButton {
	constructor(parent_selector, options_list) {
		const opt_action = () => {
			if ($("#menu_options").length < 1) {
				const menu_options = $("<div id='menu_options'></div>").appendTo(parent_selector);
				menu_options.append("<h3>Options</h3>");
				menu_options.append("<div id='options-container'></div>");
				for (const menu_option of options_list) {
					const option_element = $("<button class='option-button menu-button'>" + menu_option.name + "</button>").appendTo("#options-container");
				}
				const exit_button = $("<button class='bottom_exit-button menu-button'>Exit</button>").appendTo("#options-container");
				exit_button.on("click", function () {
					show_mainMenu("#menu_options");
				});
			}
			$("#menu_options").show();
		}
		super("Options", opt_action);
	}
}

class ExitButton extends MenuButton {
	constructor() {
		const exit_action = () => {
			const link = document.createElement("a");
			link.href = "../../index.html";
			link.click();
		}
		super("Exit", exit_action);
	}
}

class GameMenu {
	constructor(parent_selector, title, menu_buttons) {
		const main_menu = $("<div id='main_menu'></div>").appendTo(parent_selector);
		main_menu.append("<h1 class='main_title'>" + title + "</h1>");
		main_menu.append("<div id='menu_options-container'></div>");
		for (const menu_button of menu_buttons) {
			const button_element = $("<button class='main_menu-button menu-button'>" + menu_button.title + "</button>").appendTo("#menu_options-container");
			button_element.on("click", function () {
				$(parent_selector).children().hide();
				menu_button.action();
			});
		}
		show_mainMenu();
	}
}

function show_mainMenu(parent_selector) {
	$(parent_selector).hide();
	$("#main_menu").show();
}

/**
 * Creates a modal window, appearing on top of any other element.
 */
class Modal {
	/**
	 * Constructor for Popup class
	 * @param {String} text The text in the popup
	 * @param {Function} yes_function The function to be executed when the user clicks "YES"
	 * @param {Function} no_function The function to be executed when the user clicks "NO"
	 */
	constructor(parent_selector, element_id, text, yes_function, no_function) {
		const ref = this;
		this.element = $("<div class='modal'></div>").appendTo(parent_selector);
		this.element.append("<div id='" + element_id + "'></div>");
		const x_close = $("<button class='x-close'>x</button>").appendTo("#" + element_id);
		x_close.on("click", function () {
			ref.element.hide();
		});
		this.text_element = $("<p class='modal_text'>" + text + "</p>").appendTo("#" + element_id);
		const buttons_container = $("<div class='modal_buttons_container'></div>").appendTo("#" + element_id);
		const yes_button = $("<button>Play again</button>").on("click", function () {
			ref.element.hide();
			yes_function();
		}).appendTo("#" + element_id + " .modal_buttons_container");
		const no_button = $("<button>Close</button>").appendTo("#" + element_id + " .modal_buttons_container");
		no_button.on("click", function () {
			ref.element.hide();
			no_function();
		});
		this.hide();
	}

	show() {
		this.element.show();
	}

	hide() {
		this.element.hide();
	}

	set text(value) {
		this.text_element.html(value);
	}
}

class GameCanvas {
	constructor(parent_selector, _width, _height) {
		this.width = _width;
		this.height = _height;
		this.element = $("<div id='gameplay_div'></div>").appendTo(parent_selector);

		const canvas = document.createElement("canvas");
		canvas.id = "canvas";
		canvas.width = _width;
		canvas.height = _height;
		document.getElementById("gameplay_div").appendChild(canvas);
		this.canvas = canvas;
		this.context = this.canvas.getContext("2d");
	}

	set width(value) {
		this.cwidth = value;
	}

	get width() {
		return this.cwidth;
	}

	onclick(action) {
		const canvas = this.canvas;
		canvas.addEventListener("mousedown", function (event) {
			const rect = canvas.getBoundingClientRect();
			const x = event.clientX - rect.left;
			const y = event.clientY - rect.top;
			action(x, y, event.button);
		});
	}

	resize(_width, _height) {
		this.width = _width;
		this.height = _height;
		this.canvas.width = _width;
		this.canvas.height = _height;
		this.clear();
	}

	clear() {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	add_return_button(action) {
		const exit_button = $("<button class='bottom_exit-button menu-button'>Return to main menu</button>").appendTo("#gameplay_div");
		exit_button.on("click", function () {
			action();
			show_mainMenu("#gameplay_div");
		});
	}
}

class Game {
	constructor(parent_selector, id) {
		$("<div id='" + id + "'></div>").appendTo(parent_selector);
	}

	getParameter(name) {
		return this.parameters[name];
	}
}