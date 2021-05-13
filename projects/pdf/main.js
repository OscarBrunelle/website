"use strict"

let obj_counter = 1;
function add_obj(inp, end = true) {
	let str = `\n${obj_counter++} 0 obj << ${inp} >>`;
	str += end ? " endobj" : "";
	return str;
}

function fill_rect(color, coords) {
	return "\n0.7 0.7 1 rg\n0 0 612 792 re f";
}

function add_text() {
	return "\n0 g\nBT /F1 12 Tf 2 780 Td (Hello world) Tj ET\nBT /F1 12 Tf 2 766 Td (Second line) Tj ET";
}

function create_pdf() {
	let pdf = "%PDF-1.7";
	pdf += add_obj("/Type /Catalog /Pages 2 0 R");
	pdf += add_obj("/Type /Pages /Kids [3 0 R] /Count 1 /MediaBox [0 0 612 792]");
	pdf += add_obj("/Type /Page /Resources 4 0 R /Parent 2 0 R /Contents 5 0 R");
	pdf += add_obj("/Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >>");

	pdf += add_obj("/Length 167");
	pdf += "\nstream";
	pdf += fill_rect();
	pdf += add_text();
	pdf += "\nendstream";
	pdf += "\nendobj";

	pdf += "\nxref\n0 6";
	pdf += "\n000000000 65535 f \n000000009 00000 n \n000000058 00000 n \n000000139 00000 n \n000000219 00000 n \n000000311 00000 n \ntrailer << /Size 6 /Root 1 0 R >>\n529";
	
	pdf += "\nstartxref\n%%EOF";

	return pdf;
}

function load() {
	const outp = create_pdf();
	console.log(outp);
	download(outp, "test.pdf");
}

document.onload = load();