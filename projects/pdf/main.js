"use strict"

let pdf;
let obj_counter = 1;
let objs = [];
let bytes_count = 0;

function add_line(str, prepend_nl = true) {
	if (prepend_nl) {
		pdf += "\n";
	}
	pdf += str;
	bytes_count += str.length + 1;
	return str;
}

function add_obj(inp, end = true) {
	let str = `${obj_counter++} 0 obj << ${inp} >>`;
	str += end ? " endobj" : "";
	objs.push(pdf.length + 1);
	return add_line(str);
}

function fill_rect(coords, color = "0 0 0") {
	add_line(`${color} rg`);
	return add_line(`${coords} re f`);
}

function add_text(text, pos, color = "0 g") {
	add_line(color);
	return add_line("BT /F1 12 Tf " + pos + " Td (" + text + ") Tj ET");
}

class PdfPage {
  constructor(){
    this.fonts = [];
    this.stream = [];
  }
  
  add_font(name = "Helvetica"){
    this.fonts.push(name);
    return this;
  }
  
  fill_rect(coords, color = "0 0 0") {
  	this.stream.push(`${color} rg`);
  	this.stream.push(`${coords} re f`);
  	return this;
  }
  
  add_text(text, pos, color = "0 g") {
  	this.stream.push(color);
  	this.stream.push("BT /F1 12 Tf " + pos + " Td (" + text + ") Tj ET");
  	return this;
  }
}

class Pdf {
  constructor(){
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
  
  create(){
    this.add_line("%PDF-1.7", false);
    this.add_obj("/Type /Catalog /Pages 2 0 R");
    
    let pages_i = [];
    let pages_objs_c;
    for (const page of this.pages) {
      pages_i = this.obj_counter+1+pages_objs_c;
      pages_objs_c+=1+page.fonts.length;
    }
    this.add_obj(`/Type /Pages /Kids [3 0 R] /Count 1 /MediaBox [0 0 612 792]`);
    
    for (const page of this.pages) {
      this.add_obj(`/Type /Page /Resources 4 0 R /Parent 2 0 R /Contents 5 0 R`);
      this.add_obj(`/Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >>`);
      add_obj("/Length 167", false);
      add_line("stream");
      fill_rect("0 0 612 792", "0.7 0.7 1");
      add_text("Hello world", "2 780");
      add_text("Is this working ?", "2 766");
      add_line("endstream");
      add_line("endobj");
    }
    
    const stream_bytes = bytes_count;
    add_line("xref");
    add_line("0 " + (objs.length + 1));
    for (let i = 0; i < objs.length; i++) {
      if (i == 0) {
        add_line("000000000 65535 f ");
      }
      add_line(to_fixed_length(objs[i], 9) + " 00000 n ");
	}

	add_line("trailer << /Size " + (objs.length + 1) + " /Root 1 0 R >>");
	add_line(529);//stream_bytes);
	
	add_line("startxref");
	add_line("%%EOF");
    
    return this;
  }
  
  download(name = "document"){
    download(this.doc, name);
    return this;
  }
}

function create_pdf() {
	pdf = "";
	obj_counter = 1;
	objs = [];
	bytes_count = 0;

	add_line("%PDF-1.7", false);
	add_obj("/Type /Catalog /Pages 2 0 R");
	add_obj("/Type /Pages /Kids [3 0 R] /Count 1 /MediaBox [0 0 612 792]");
	add_obj("/Type /Page /Resources 4 0 R /Parent 2 0 R /Contents 5 0 R");
	add_obj("/Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >>");

	add_obj("/Length 167", false);
	add_line("stream");
	fill_rect("0 0 612 792", "0.7 0.7 1");
	add_text("Hello world", "2 780");
	add_text("Is this working ?", "2 766");
	add_line("endstream");
	add_line("endobj");

	const stream_bytes = bytes_count;
	add_line("xref");
	add_line("0 " + (objs.length + 1));
	for (let i = 0; i < objs.length; i++) {
		if (i == 0) {
			add_line("000000000 65535 f ");
		}
		add_line(to_fixed_length(objs[i], 9) + " 00000 n ");
	}

	add_line("trailer << /Size " + (objs.length + 1) + " /Root 1 0 R >>");
	add_line(529);//stream_bytes);
	
	add_line("startxref");
	add_line("%%EOF");

	return pdf;
}

function dl() {
	download(pdf, "test.pdf");
}

function load() {
	create_pdf();
	console.log(pdf);
	
}

document.onload = load();