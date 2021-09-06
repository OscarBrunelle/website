const sections = [{
	side: "left",
	title: "Formation",
	sub_sections: [{
		date_year: 2020,
		job_title: "BAC +4 Génie informatique - Alternance",
		employer: "Université d'Ottawa",
		country: "CA"
	}, {
		date_year: 2017,
		job_title: "BAC S",
		employer: "Lycée Marguerite de Valois",
		country: "FR"
	}, {
		date_year: 2017,
		job_title: "Permis B"
	}]
}, {
	side: "left",
	title: "Expériences professionnelles",
	sub_sections: [{
		date_year: 2021,
		date_month: 2,
		duration: 7,
		job_title: "Ingénieur Logiciels",
		employer: "Capgemini",
		country: "FR",
		multiple: [
			{
				date_year: 2021,
				date_month: 2,
				duration: 4,
				job_title: "Développeur PHP Symfony",
				description: "TODO"
			}, {
				date_year: 2021,
				date_month: 5,
				duration: 4,
				job_title: "Ingénieur tests autos QA",
				description: "TODO"
			}
		]
	}, {
		date_year: 2020,
		date_month: 8,
		duration: 4,
		job_title: "Ingénieur Logiciels",
		employer: "Schneider Electric",
		country: "FR",
		description: "Utiliser Node-RED (bibl. Node.js) pour extraire les valeurs de capteurs. Visualiser des données en réalité virtuelle (Augmented Operator Advisor). Visualiser graphiquement des données sur le web (Aveva Insight)."
	}, {
		date_year: 2020,
		date_month: 0,
		duration: 4,
		job_title: "Dév. web (front-end)",
		employer: "Conseil National de Recherches Canada (CNRC)",
		country: "CA",
		description: "Développer des graphiques avec la bibliothèque d3.js. Créer de nouveaux end-points avec Java. Travailler dans une équipe anglophone sur des sujets liés au changement climatique."
	}, {
		date_year: 2019,
		date_month: 4,
		duration: 4,
		job_title: "Dév. web (fullstack)",
		employer: "Datacloud Networks",
		country: "CA",
		description: "Développer un site web pour une université. IPTV : recherche de partenaires, installation d’antennes, rapports. Développer une application Android pour obtenir des données GPS."
	}]
}, {
	side: "left",
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
	side: "right",
	title: "Projets",
	sub_sections: [{
		title: "Web",
		description: "Site personnel - oscarbrunelle.com<br>Création d'outils pour les cours et les tâches répétitives."
	}, {
		title: "Développement de jeux-vidéos",
		description: "Petits projets sur Unity avec utilisation de Blender.<br>Clones de jeux simples sur le web."
	}]
}, {
	side: "right",
	title: "Centres d'intérêts",
	sub_sections: [{
		title: "Langues",
		description: "Espagnol : Niveau scolaire<br>Russe : Bases"
	}, {
		title: "Basket",
		description: "Meneur / Ailier fort (+10 ans)<br>Participation à la vie du club"
	}, {
		title: "Guitare",
		description: "Bases, solfège"
	}]
}];
const cv_data = {
	first_name: "Oscar",
	last_name: "Brunelle",
	position: "Développeur web",
	description: "Formation d'ingénieur information<br>Expérience professionelle dans le développement web.",
	phone: "07 49 47 27 20",
	email: "oscar.brunelle@gmail.com",
	site: "oscarbrunelle.com",
	links: [
		{
			site: "GitHub",
			link: "https://github.com/OscarBrunelle"
		}, {
			site: "LinkedIn",
			link: "https://www.linkedin.com/in/oscar-brunelle"
		}
	],
	sections: sections
};