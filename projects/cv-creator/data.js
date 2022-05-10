const sections = [{
	side: "left",
	title: "Expériences professionnelles",
	sub_sections: [{
		date_year: 2021,
		date_month: 2,
		duration: -1,
		job_title: "Ingénieur logiciels",
		employer: "Capgemini",
		multiple: [
			{
				date_year: 2021,
				date_month: 5,
				duration: -1,
				job_title: "Ingénieur tests autos QA",
				description: `Développement et maintenance de tests autos avec <b>RobotFramework</b>.
				<br>Développement de scripts Python.`
			}, {
				date_year: 2021,
				date_month: 2,
				duration: 4,
				job_title: "Développeur PHP Symfony",
				description: "Développement du site 'LesBonsClics' sous <b>Symfony PHP</b>."
			}
		]
	}, {
		date_year: 2020,
		date_month: 8,
		duration: 4,
		job_title: "Développeur systèmes embarqués temps réel",
		employer: "Schneider Electric",
		description: `Écriture et réalisation d'une démo interactive des produits Schneider.
		<br>Communication tablette/IPC/dashboard et interface avec <b>Node-RED</b>.
		<br>Visualisation instantanée des données des capteurs avec Aveva Insight.`
	}, {
		date_year: 2020,
		date_month: 0,
		duration: 4,
		job_title: "Dév. web (front-end)",
		employer: "Conseil National de Recherches Canada (CNRC)",
		country: "Canada",
		description: `Dashboards de suivis de consommation pour des clients gouvernementaux.
		<br>Création de graphiques avec <b>d3.js</b>.
		<br>Ajout d'end-points pour le back-end avec <b>Java</b>.`
	}, {
		date_year: 2019,
		date_month: 4,
		duration: 4,
		job_title: "Dév. web (fullstack)",
		employer: "Datacloud Networks",
		country: "Canada",
		description: `Développement from scratch du site interne de l'université locale sous <b>PHP</b>.
		<br>IPTV : recherche de partenaires, installation d’antennes, études de marché.
		<br>Développement d'une POC d'application <b>Android</b> avec utilisation du GPS.`
	}]
}, {
	side: "left",
	title: "Formation",
	sub_sections: [{
		date_year: 2020,
		job_title: "BAC +4 Génie informatique - Alternance",
		employer: "Université d'Ottawa",
		country: "Canada"
	// }, {
	// 	date_year: 2017,
	// 	job_title: "Permis B"
	}]
}, {
	side: "left",
	title: "Compétences",
	sub_sections: [{
		job_title: "Web",
		description: `Frameworks / Langages: <b>js</b>, <b>Java</b>, <b>PHP</b> (pure), <b>Symfony</b>, Node
		<br>Base de données: <b>MySQL</b>, SQLite, Firebase`
	}, {
		job_title: "Software",
		description: `Scripting avec <b>Python</b>
		<br>Développement logiciel cpp avec la librairie <b>Qt (C++)</b>
		<br>Gestion de version: <b>Git</b>, Subversion SVN (TortoiseSVN)
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
		job_title: "Map Open Source",
		description: `Projet de visualisation de données OpenStreetMap et navigation avec Python.
		<br>Contributions au projet OSM.`
	}, {
		job_title: "Web",
		description: `Site personnel - <a href='https://oscarbrunelle.com'>oscarbrunelle.com</a>
		<br><br>Étude et visualisation intéractive d'algorithmes: <a href='https://oscarbrunelle.com/projects/astar'>A*</a> et <a href='https://oscarbrunelle.com/projects/dijkstra'>Dijkstra</a>.
		<br><br>Écriture de ce CV en HTML/CSS/js.
		<br><br>Apprentissage des formats SVG et GIF, étude des QR codes.
		<br><br>Open-source: Contribution au projet Mozilla!`
	}, {
		job_title: "Développement de jeux-vidéos",
		description: `Petits projets sur Unity et en Javascript de jeux basiques.
		<br><br>Bases de design sur Blender.
		<br><br>Intérêt pour le Game Dev et la 3D.`
	}]
}, {
	side: "right",
	title: "Centres d'intérêts",
	sub_sections: [{
		job_title: "Langues",
		description: `<b>Anglais : C2</b>, travail au Canada
		<br>Espagnol : B1
		<br>Russe : Lecture et écriture`
	}, {
		job_title: "Basket",
		description: `Meneur / Ailier fort (+10 ans)
		<br>Participation à la vie du club.`
	}, {
		job_title: "Guitare",
		description: `Bases, solfège`
	}]
}];
const cv_data = {
	first_name: "Oscar",
	last_name: "Brunelle",
	position: "Développeur C++ / Qt",
	description: "Ingénieur informatique.<br>3 ans d'expérience dans l'informatique et le développement web.",
	phone: "07 49 47 27 20",
	email: "oscar.brunelle@gmail.com",
	links: [
		{
			site: "GitHub",
			link: "https://github.com/OscarBrunelle"
		}, {
			site: "LinkedIn",
			link: "https://www.linkedin.com/in/oscar-brunelle"
		}, {
			site: "Site web",
			link: "https://oscarbrunelle.com"
		}
	],
	sections: sections
};