class Chart {
	constructor(selector) {
		this.canvas = document.querySelector(selector);
		if (this.canvas == null) {
			console.error("Element with selector '" + selector + "' does not exist.");
		}
		this.context = this.canvas.getContext("2d");
		this.font_size = 16;
		this.context.font = this.font_size + "px Arial";

		this.set_color_theme();
		this.resize();
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
			this.set_color_theme(e.matches ? "dark" : "light");
			this.update();
		});
		window.addEventListener("resize", e => {
			this.resize();
			this.update();
		});
		this.padding = {
			"left": 30,
			"bottom": 25,
			"right": 10,
			"top": 25,
		};
	}

	draw_grid(min, max) {
		const rounding = Math.pow(10, ((max - min) + "").replace(".", "").length - 1);
		min = Math.floor(min / rounding) * rounding;
		max = Math.ceil(max / rounding) * rounding;

		const grid_line_size = 1;
		this.context.lineWidth = grid_line_size;
		this.context.strokeStyle = this.COLORS["grid"];
		this.ref_height = (this.canvas.height - this.padding.bottom - this.padding.top) / (max - min);

		for (let i = min; i <= max; i += 1) {
			const y = this.canvas.height - this.ref_height * i - this.padding.bottom;
			this.context.textAlign = "right";
			this.context.textBaseline = "bottom";
			this.context.font = this.font_size + "px Arial";
			this.context.fillText(i, this.padding.left, y + this.font_size / 2);
			this.context.beginPath();
			this.context.setLineDash([1, 10]);
			this.context.moveTo(this.padding.left + 5, y);
			this.context.lineTo(this.canvas.width - this.padding.right, y);
			this.context.stroke();
		}
	}

	bar_chart(data) {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
		this.data = data;
		this.context.fillStyle = this.COLORS["bar"];
		const min_value = data[data.length - 1][0];
		const max_value = data[0][0];
		const number_values = data.length;
		this.draw_grid(0/*min_value*/, max_value); //bar chart start at 0
		const bar_space = 5;
		const left_space = 10;
		const bar_width = (this.canvas.width - this.padding.left - this.padding.right - left_space - bar_space * (number_values - 1)) / (number_values);

		for (let i = 0; i < data.length; i++) {
			const d = data[i];
			const bar_height = d[0] * this.ref_height;
			const x = this.padding.left + left_space + i * bar_width + i * bar_space;
			const y = this.canvas.height - this.padding.bottom;
			this.context.fillRect(x, y, bar_width, -bar_height);

			this.context.save();
			this.context.fillStyle = this.COLORS["bar-name"];
			this.context.textAlign = "center";
			this.context.textBaseline = "bottom";
			this.context.font = this.font_size + "px Arial";
			this.context.translate(x + bar_width / 2, y - bar_height / 2);
			this.context.rotate(-Math.PI / 2);
			this.context.fillText(d[1], 0, this.font_size / 2);
			this.context.restore();
		}
	}

	update() {
		this.bar_chart(this.data);
	}

	set_color_theme(theme) {
		const dark_color_theme = {
			"background": "black",
			"border": "white",
			"grid": "white",
			"bar": "white",
			"bar-name": "black"
		};
		const light_color_theme = {
			"background": "white",
			"border": "black",
			"grid": "black",
			"bar": "black",
			"bar-name": "white"
		};

		if ((theme === "dark") || (theme == null && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
			this.COLORS = dark_color_theme;
		} else {
			this.COLORS = light_color_theme;
		}

		this.canvas.style.background = this.COLORS.background;
		this.canvas.style.border = this.COLORS.border;
	}

	resize(width, height) {
		if (width == null) {
			width = this.canvas.parentNode.clientWidth;
		}
		if (height == null) {
			height = this.canvas.parentNode.clientHeight;
		}
		this.canvas.setAttribute("width", width + "px");
		this.canvas.setAttribute("height", height + "px");
	}
}