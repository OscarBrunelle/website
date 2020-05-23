/*
TODO: add different formats to display time in minutes for ex, or auto to determine if in minutes or seconds
*/

class Timer {
	/**
	 * By defaults, creates a timer that updates every second, and displays that time in a given element.
	 * @param {String} _element_selector the jQuery selector of the DOM element displaying the timer.
	 * @param {Number} start_time opt - def: 0. Used to offset the starting time of the timer to 'start_time'.
	 * @param {Number} _accuracy opt - def: 1000. The time interval at which the timer updates, in milliseconds.
	 * @param {Number} _format opt - def: 0. TODO: have differents formats in which the timer can be displayed.
	 */
	constructor(_element_selector, start_time = 0, _accuracy = 1000, _format = 0) {
		this.element_selector = _element_selector;
		this.time = start_time;
		this.ACCURACY = _accuracy;
		this.format = _format;
	}

	addTime(milliseconds) {
		this.time += milliseconds;
		this.updateDisplay();
	}

	getTime() {
		return this.time / 1000 + "s";
	}

	updateDisplay() {
		$(this.element_selector).text("Time: " + (this.time / 1000));
	}

	reset() {
		this.time = 0;
		this.updateDisplay();
		this.stop();

		let ref = this;
		this.interval = setInterval(function () {
			ref.addTime(ref.ACCURACY)
		}, ref.ACCURACY);
	}

	stop() {
		clearInterval(this.interval);
		return this.time;
	}
}