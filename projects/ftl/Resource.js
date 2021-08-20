"use strict"

class Resource {
	constructor(selector) {
		this.selector = selector;
		this.quantity = 10;
	}

	set quantity(n) {
		this.quantity_r = n;
		document.querySelector(`#${this.selector} .amount`).innerHTML = this.quantity_r;
	}
}