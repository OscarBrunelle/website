class Timer {
	constructor(selector, startingTime = 0, format = 0) {
		this.time = startingTime;
		this.selector = selector;
	}

	addTime(milliseconds) {
		this.time += milliseconds;
		this.updateDisplay();
	}

	getTime() {
		return this.time / 1000 + "s";
	}

	updateDisplay() {
		$(this.selector).text("Time: " + (this.time / 1000));
	}

	reset() {
		this.time = 0;
		this.updateDisplay();
		this.stop();
		let ref = this;
		this.interval = setInterval(function(){ref.addTime(1000)}, 1000);
	}

	stop(){
		clearInterval(this.interval);
		return this.time;
	}
}