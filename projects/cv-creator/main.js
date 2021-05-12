"use strict"

const cv = document.getElementById("cv");
const side_top = document.getElementById("top");
const side_bottom = document.getElementById("bottom");

const sections = [
	{
		title: "Expériences professionnelles",
		sub_sections: [
			{
				title: "2020/09 - 2020/12 : Ingénieur Logiciels",
				sub_title: "Schneider Electric / Angoulême - France",
				description: "Utiliser Node-RED (bibl. Node.js) pour extraire les valeurs de capteurs.\nVisualiser des données en réalité virtuelle(Augmented Operator Advisor).\nVisualiser graphiquement des données sur le web (Aveva Insight)"
			}
		]
	},
];
const cv_data = {
	first_name: "Oscar",
	last_name: "Brunelle",
	position: "Développeur web",
	description: "blablabla",
	sections: sections
};

function load() {
	doch1(side_top, `${cv_data.first_name} ${cv_data.last_name.toUpperCase()}`, "name");
	docspan(side_top, cv_data.position, "position");
	docp(side_top, cv_data.description, "description");

	for (const section of sections) {
		const sect = docsection(side_bottom);
		doch1(sect, section.title.toUpperCase());
		for (const sub_section of section.sub_sections) {
			const ss = docdiv(sect);

			const titles = docdiv(ss);
			doch1(titles, sub_section.title, "title");
			doch1(titles, sub_section.sub_title, "sub_title");

			docp(ss, sub_section.description);
		}
	}
}

document.onload = load();