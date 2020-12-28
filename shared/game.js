"use strict";
//TODO fusionner Game et GameCanvas
//TODO use event.code
//TODO put options and instructions into 'content' containers to use grid
const ICONS_PATH = "../../icons/";

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
			switch_view("#gameplay_div");
			play_action();
		});
	}
}

function switch_view(view_selector) {
	$("#game").children().each(function() {
		const element = $(this);
		hide(element);
	});
	show($(view_selector));
	$(view_selector).focus();
}

class InstructionsButton extends MenuButton {
	constructor(parent_selector, text) {
		const instr_action = () => {
			if ($("#instructions").length < 1) {
				const instructions = $("<div id='instructions' class='hidden' tabindex='0'></div>").appendTo(parent_selector);
				instructions.on("keydown", function(e) {
					if (e.code === "Escape") {
						switch_view("#main_menu");
					}
				});

				instructions.append("<h3>Instructions</h3>");
				$("<p>" + text + "</p>").appendTo("#instructions");
				const exit_button = $("<button class='bottom_exit-button menu-button'>Exit</button>").appendTo("#instructions");
				exit_button.on("click", function () {
					switch_view("#main_menu");
				});
			}
			switch_view("#instructions");
		}
		super("Instructions", instr_action);
	}
}

class MenuOption {
	constructor(_name, _icon, default_state = true) {
		this.name = _name;
		this.icon = _icon;
		this.state = default_state;
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
				const menu_options = $("<div id='menu_options' class='hidden' tabindex='0'></div>").appendTo(parent_selector);
				menu_options.on("keydown", function(e) {
					if (e.code === "Escape") {
						switch_view("#main_menu");
					}
				});

				menu_options.append("<h3>Options</h3>");
				menu_options.append("<div id='options-container'></div>");
				for (const menu_option of options_list) {
					const option_element = $("<button class='option-button menu-button'></button>").appendTo("#options-container");
					option_element.append("<img src='" + ICONS_PATH + menu_option.icon + "-" + (menu_option.state ? "on" : "off") + ".png'></img>");
					option_element.append("<span>" + menu_option.name + "</span>");
					option_element.on("click", function () {
						menu_option.state = !menu_option.state;
						option_element.find("img").prop("src", ICONS_PATH + menu_option.icon + "-" + (menu_option.state ? "on" : "off") + ".png");
					});
				}
				const exit_button = $("<button class='bottom_exit-button menu-button'>Exit</button>").appendTo("#options-container");
				exit_button.on("click", function () {
					switch_view("#main_menu");
				});
			}
			switch_view("#menu_options");
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
		const main_menu = $("<div id='main_menu' class='hidden' tabindex='0'></div>").appendTo(parent_selector);
		main_menu.append("<h1 class='main_title'>" + title + "</h1>");
		main_menu.append("<div id='menu_options-container'></div>");
		for (const menu_button of menu_buttons) {
			const button_element = $("<button class='main_menu-button menu-button'>" + menu_button.title + "</button>").appendTo("#menu_options-container");
			button_element.on("click", function () {
				menu_button.action();
			});
		}
		switch_view("#main_menu");
	}
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
		this.element = $("<div class='modal' tabindex='0'></div>").appendTo(parent_selector);
		this.element.on("keydown", function(e) {
			if (e.code === "Escape") {
				ref.hide();
			}
		});

		this.element.append("<div id='" + element_id + "'></div>");
		const x_close = $("<button class='x-close'>x</button>").appendTo("#" + element_id);
		x_close.on("click", function () {
			
		});
		this.text_element = $("<p class='modal_text'>" + text + "</p>").appendTo("#" + element_id);
		const buttons_container = $("<div class='modal_buttons_container'></div>").appendTo("#" + element_id);
		const yes_button = $("<button>Play again</button>").on("click", function () {
			ref.hide();
			if (yes_function != null) {
				yes_function();
			}
		}).appendTo("#" + element_id + " .modal_buttons_container");
		const no_button = $("<button>Close</button>").appendTo("#" + element_id + " .modal_buttons_container");
		no_button.on("click", function () {
			ref.hide();
			if (no_function != null) {
				no_function();
			}
		});
		this.hide();
	}

	show() {
		show(this.element);
	}

	hide() {
		hide(this.element);
	}

	set text(value) {
		this.text_element.html(value);
	}
}

class GameCanvas {
	constructor(parent_selector, _width, _height, bool_add_return_button) {
		this.width = _width;
		this.height = _height;
		this.element = $("<div id='gameplay_div' class='hidden' tabindex='0'></div>").appendTo(parent_selector);
		this.element.on("keydown", function(e) {
			if (e.code === "Escape") {
				stop_game();
				switch_view("#main_menu");
			}
		});
		
		const top_bar = $("<div class='top_bar'></div>").appendTo("#gameplay_div");
		top_bar.append("<button id='open_escape_menu_button-top'><img src='" + ICONS_PATH + "parameter.png'></button>");
		top_bar.append("<div id='top_bar-center'></div>");
		top_bar.append("<button id='exit-top'><img src='" + ICONS_PATH + "exit.png'></button>");

		const content = $("<div class='content'></div>").appendTo("#gameplay_div");

		content.append("<canvas id='game_canvas' width='" + _width + "' height='" + _height + "'></canvas>");
		this.canvas = $("#game_canvas")[0];
		this.context = this.canvas.getContext("2d");

		$("#game_canvas").on("contextmenu", function () {
			return false;
		});

		if (bool_add_return_button) {
			this.add_return_button(stop_game); //TODO: game.stop();
		}
	}

	set width(value) {
		this.cwidth = value;
	}

	get width() {
		return this.cwidth;
	}

	onclick(action) {
		const canvas = this.canvas;
		$("#game_canvas").on("mousedown", function (event) {
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

	clear(x, y, width, height) {
		if (x == null) {
			x = 0;
		}
		if (y == null) {
			y = 0;
		}
		if (width == null) {
			width = this.canvas.width;
		}
		if (height == null) {
			height = this.canvas.height;
		}
		this.context.clearRect(x, y, width, height);
	}

	add_return_button(action) {
		const exit_button = $("<button class='bottom_exit-button menu-button'>Return to main menu</button>").appendTo("#gameplay_div");
		exit_button.on("click", function () {
			action();
			switch_view("#main_menu");
		});
	}

	cursor(cursor_name) {
		let cursor = (cursor_name != null) ? "url('cursors/" + cursor_name + "'), " : "";
		this.canvas.style.cursor = cursor + "auto";
	}
}

class Game {
	constructor(parent_selector, id) {
		$("<div id='" + id + "'></div>").appendTo(parent_selector);
	}

	getParameter(name) {
		return this.parameters[name];
	}

	add_event(event_name, key_actions = {}) {
		$("#game").on(event_name, function (e) {
			for (const key in key_actions) {
				const key_code = key.charCodeAt(0);
				if (e.which === key_code) {
					return key_actions[key]();
				}
			}
			return false;
		});
	}
}