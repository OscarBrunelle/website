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
				description: "Développement du site 'LesBonsClics' sous <b>Symfony PHP</b>."
			}, {
				date_year: 2021,
				date_month: 5,
				duration: 4,
				job_title: "Ingénieur tests autos QA",
				description: "Développement et maintenance de tests autos avec <b>RobotFramework</b>."
			}
		]
	}, {
		date_year: 2020,
		date_month: 8,
		duration: 4,
		job_title: "Ingénieur Logiciels",
		employer: "Schneider Electric",
		country: "FR",
		description: `Écriture et réalisation d'une démo interactive des produits Schneider.
		<br>Communication tablette/IPC/dashboard et interface graphique avec <b>Node-RED</b>.
		<br>Visualisation instantanée des données des capteurs avec (Aveva Insight).`
	}, {
		date_year: 2020,
		date_month: 0,
		duration: 4,
		job_title: "Dév. web (front-end)",
		employer: "Conseil National de Recherches Canada (CNRC)",
		country: "CA",
		description: `Dashboards de suivis de consommation pour des clients gouvernementaux.
		<br>Création de graphiques avec <b>d3.js</b>.
		<br>Ajout d'end-points pour le back-end avec <b>Java</b>.`
	}, {
		date_year: 2019,
		date_month: 4,
		duration: 4,
		job_title: "Dév. web (fullstack)",
		employer: "Datacloud Networks",
		country: "CA",
		description: `Développement from scratch du site web interne de l'université locale sous <b>PHP</b>.
		<br>IPTV : recherche de partenaires, installation d’antennes, études de marché.
		<br>Développement d'une POC d'application <b>Android</b> avec utilisation des données GPS.`
	}]
}, {
	side: "left",
	title: "Compétences",
	sub_sections: [{
		job_title: "Web",
		description: `Frameworks / Langages: js, Java, PHP (pure), Symfony
		<br>Base de données: MySQL, SQLite, Firebase`
	}, {
		job_title: "Software",
		description: `Programmation: scripting avec Python
		<br>Gestion de version: Git, Subversion SVN (TortoiseSVN)
		<br>Intégration continue: Espresso, circleCI
		<br>Statistiques et traitements audio avec Matlab et R`
	}, {
		job_title: "Hardware",
		description: `Programmation bas-niveau: VHDL / Assembly / C pour cartes Altera
		<br>Arduino: utilisation basique de la carte Arduino Uno
		<br>Autres: soudure et impression 3D`
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
	description: "Formation d'ingénieur informatique.<br>Expérience professionelle dans le développement web.",
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