"use strict"

const cv = document.getElementById("cv");
const side_top = document.getElementById("top");
const side_bottom = document.getElementById("bottom");
const side_left = document.getElementById("left");
const side_right = document.getElementById("right");

let page;

function yes(el) {
	page.add_text(el.innerHTML, `${el.offsetLeft} ${842 - el.offsetTop}`);
}

function renderel(el) {
	if (el.children.length > 0) {
		for (const ch of el.children) {
			renderel(ch);
		}
		return;
	}
	yes(el);
}

function renderpdf() {
	page = new PdfPage();
	page.add_font();

	for (const el of document.getElementById("cv").children) {
		renderel(el);
	}

	const pdf_file = new Pdf();
	pdf_file.pages.push(page);
	pdf_file.create();
	console.log(pdf_file.doc);
	document.getElementById("pdf-display").setAttribute("src", data_to_url(pdf_file.doc, "application/pdf"));

	document.getElementById("cv").remove();
}

function load() {
	build_top(cv_data);
	for (const section of sections) {
		const sect = docsection(section.side == "left" ? side_left : side_right);
		doch2(sect, section.title, "section-title");

		for (const sub_section of section.sub_sections) {
			const sub_section_container = docdiv(sect, "sub_section");
			add_job_title(sub_section, sub_section_container);
			if (sub_section.description != null) {
				docp(sub_section_container, sub_section.description, "description");
			} else if (sub_section.multiple != null) {
				for (const exp of sub_section.multiple) {
					const exp_container = docdiv(sub_section_container, "multiple");
					add_job_title(exp, exp_container);
					docp(exp_container, exp.description, "description");
				}
			}
		}
	}
}

document.onload = load();