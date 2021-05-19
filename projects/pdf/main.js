"use strict"

class PdfPage {
	constructor() {
		this.size = 0;
		this.fonts = [];
		this.stream = [];
	}

	add_font(name = "Helvetica", size = 12) {
		this.fonts.push({
			name: name,
			size: size
		});
		return this;
	}

	fill_rect(coords, color = "0 0 0") {
		this.stream.push(`${color} rg`);
		this.size += `${color} rg`.length - 1;
		this.stream.push(`${coords} re f`);
		this.size += `${coords} re f`.length - 1;
		return this;
	}

	add_text(text = "", pos = {
		x: 0,
		y: 0,
		max_width: null
	}, font_index = 0, color = "0 g") {
		this.stream.push(color);
		this.size += color.length - 1;

		const font = this.fonts[font_index];
		const font_size = font.size;
		let x = pos.x;
		let y = pos.y;
		let last_slice_i = 0;
		let new_line_i;
		for (let ci = 0; ci < text.length; ci++) {
			let sub_line = text.substring(last_slice_i, ci + 1);
			if (text[ci] == "\n") new_line_i = ci;
			if ((new_line_i == ci) || (pos.max_width != null && getTextWidth(((new_line_i != null && new_line_i < ci) ? "" : "    ") + sub_line) > (pos.max_width)) || (ci == text.length - 1)) {
				if (last_slice_i > 0) {
					if (new_line_i != null && new_line_i < ci) {
						y -= (font_size + 4);
						new_line_i = null;
					} else {
						y -= font_size;
						sub_line = "\t    " + sub_line; //TODO: add tab character if possible (think about including it in width calculations)
					}
				}
				if (ci < text.length - 1) last_slice_i = ci + 1;
				const str = `BT /F${font} ${font_size} Tf ${x} ${y} Td (${sub_line}) Tj ET`;
				this.stream.push(str);
				this.size += str.length - 1;
			}
		}
		return this;
	}
}

class Pdf {
	constructor() {
		this.bytes_count = 0;
		this.objs = [];
		this.obj_counter = 1;
		this.pages = [];
		this.doc = "";
	}

	add_line(str, prepend_nl = true) {
		if (prepend_nl) {
			this.doc += "\n";
		}
		this.doc += str;
		this.bytes_count += str.length + 1;
		return this;
	}

	add_obj(inp, end = true) {
		let str = `${this.obj_counter++} 0 obj << ${inp} >>`;
		str += end ? " endobj" : "";
		this.objs.push(this.doc.length + 1);
		this.add_line(str);
		return this;
	}

	create() {
		this.add_line("%PDF-1.7", false);
		// this.add_line("%éééé");
		this.add_obj("/Type /Catalog /Pages 2 0 R");

		let pages_i = [];
		let pages_objs_c;
		for (const page of this.pages) {
			pages_i = this.obj_counter + 1 + pages_objs_c;
			pages_objs_c += 1 + page.fonts.length;
		}
		this.add_obj(`/Type /Pages /Kids [3 0 R] /Count 1 /MediaBox [0 0 592 842]`);

		for (const page of this.pages) {
			this.add_obj(`/Type /Page /Resources ${this.obj_counter + 1} 0 R /Parent 2 0 R /Contents ${this.obj_counter + 2} 0 R`);

			for (let i = 0; i < page.fonts.length; i++) {
				const font = page.fonts[i];
				this.add_obj(`/Font << /F${i + 1} << /Type /Font /Subtype /Type1 /BaseFont /${font.name} >> >>`);
			}
			this.add_obj("/Length 0", false); //TODO: change this line `/Length ${page.size}`, false);
			this.add_line("stream");
			for (const stream_line of page.stream) {
				this.add_line(stream_line);
			}
			this.add_line("endstream");
			this.add_line("endobj");
		}

		const stream_bytes = this.bytes_count;
		this.add_line("xref");
		this.add_line("0 " + (this.objs.length + 1));
		for (let i = 0; i < this.objs.length; i++) {
			if (i == 0) {
				this.add_line("000000000 65535 f ");
			}
			this.add_line(to_fixed_length(this.objs[i], 9) + " 00000 n ");
		}

		this.add_line("trailer << /Size " + (this.objs.length + 1) + " /Root 1 0 R >>");
		this.add_line(stream_bytes);

		this.add_line("startxref");
		this.add_line("%%EOF");

		return this;
	}
}

function load() {
	const p = new PdfPage();
	p.add_font();
	p.fill_rect("0 0 592 842", "0.7 0.7 1");
	p.add_text("Hello worldé\nIs this very very long line splitting please ?", {
		x: 2,
		y: 772,
		max_width: 100
	});
	const pd = new Pdf();
	pd.pages.push(p);
	pd.create();
	document.getElementById("pdf-display").setAttribute("src", data_to_url(pd.doc, "application/pdf"));
}

document.onload = load();