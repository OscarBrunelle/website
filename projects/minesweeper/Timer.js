class Timer {
	constructor(DOMObject, startingTime = 0, format = 0) {
		this.time = startingTime;
		this.DOM = DOMObject;
	}

	addTime(milliseconds) {
		this.time += milliseconds;
		this.updateDisplay();
	}

	updateDisplay() {
		this.DOM.innerHTML = "Time: " + (this.time / 1000);
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
	}
}