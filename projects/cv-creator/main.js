"use strict"

const cv = document.getElementById("cv");
const side_top = document.getElementById("top");
const side_bottom = document.getElementById("bottom");

const sections = [{
	title: "Formation",
	sub_sections: [{
		title: "2020 : BAC +4 Génie informatique",
		sub_title: "Université d'Ottawa / Ottawa - Canada",
		description: "Formation en alternance"
	}, {
		title: "2017 : BAC S",
		sub_title: "Lycée Marguerite de Valois / Angoulême",
		description: "Option physique / Section européenne"
	}, {
		title: "Permis B"
	}]
}, {
	title: "Expériences professionnelles",
	sub_sections: [{
		title: "2020/09 - 2020/12 : Ingénieur Logiciels",
		sub_title: "Schneider Electric / Angoulême - France",
		description: "Utiliser Node-RED (bibl. Node.js) pour extraire les valeurs de capteurs. Visualiser des données en réalité virtuelle (Augmented Operator Advisor). Visualiser graphiquement des données sur le web (Aveva Insight)."
	}, {
		title: "2020/01 - 2020/04 : Dév. web (front-end)",
		sub_title: "Conseil National de Recherches Canada (CNRC) / Ottawa - Canada",
		description: "Développer des graphiques avec la bibliothèque d3.js. Créer de nouveaux end-points avec Java. Travailler dans une équipe anglophone sur des sujets liés au changement climatique."
	}, {
		title: "2019/05 - 2019/08 : Dév. web (fullstack)",
		sub_title: "Datacloud Networks / Hearst - Canada",
		description: "Développer un site web pour une université. IPTV : recherche de partenaires, installation d’antennes, rapports. Développer une application Android pour obtenir des données GPS."
	}]
}, {
	title: "Compétences",
	sub_sections: [{
		title: "Web",
		description: ""
	}, {
		title: "Software",
		description: ""
	}, {
		title: "Hardware",
		description: ""
	}]
}, {
	title: "Projets",
	sub_sections: [{
		title: "Web",
		description: "Site personnel - oscarbrunelle.com Création d'outils pour les cours et les tâches répétitives."
	}, {
		title: "Développement de jeux-vidéos",
		description: "Petits projets sur Unity avec utilisation de Blender. Clones de jeux simples sur le web."
	}]
}, {
	title: "Centres d'intérêts",
	sub_sections: [{
		title: "Langues",
		description: "Espagnol : Niveau scolaire Russe : Bases"
	}, {
		title: "Basket",
		description: "Meneur / Ailier fort (+10 ans) Participation à la vie du club"
	}, {
		title: "Guitare",
		description: "Bases, solfège"
	}]
}];
const cv_data = {
	first_name: "Oscar",
	last_name: "Brunelle",
	position: "Développeur web",
	description: "blablabla",
	sections: sections
};

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
	doch1(side_top, `${cv_data.first_name} ${cv_data.last_name.toUpperCase()}`, "name");
	docspan(side_top, cv_data.position, "position");
	docp(side_top, cv_data.description, "description");

	for (const section of sections) {
		const sect = docsection(side_bottom);
		doch2(sect, section.title.toUpperCase(), "section-title");

		const ss_titles = docdiv(sect, "ss-titles");
		const ss_subtitles = docdiv(sect, "ss-subtitles");
		const ss_descriptions = docdiv(sect, "ss-descriptions");
		for (const sub_section of section.sub_sections) {
			doch3(ss_titles, sub_section.title, "title");
			doch4(ss_subtitles, sub_section.sub_title, "subtitle");
			docp(ss_descriptions, sub_section.description);
		}
	}
}

document.onload = load();