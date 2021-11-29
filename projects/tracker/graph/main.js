"use strict"

function get_data_hours(moment) {
	switch (moment) {
		case "other":
			return 0;
		case "morning":
			return 8;
		case "midday":
			return 12;
		case "evening":
			return 20;
		default:
			return 0;
	}
}
/*
TODO: pouvoir enlever un point spécifique
Potentiel: pouvoir ajouter un point en cliquant sur le graph ??
pouvoir DL son inventaire (en csv ou json ?)
pouvoir charger son inventaire
deuxieme cookie de backup au cas où le type efface sans le vouloir ? gérer le cas où il efface sans rien, que ca ecrase pas le backup
forcer des valeurs positives sur la quantité
ajouter une date d'ajout au point de données, pour pouvoir ensuite trier des data points ayant la meme date et le meme moment (evite a l'utilisateur d'avoir a specifier le moment de la journée)

graphique:
ajuster les valeurs max et min selon +- % des valeurs extremes
gérer des echelles de y independantes en fonction des sets (et pouvoir ne pas mettre d'axe dans ce cas)
gérer des échelles pour chaque unit (L, Kg, g) + virer les units en kg, trop chiants
pouvoir activer / desactiver des courbes
pouvoir set le date range du graph, voir rendre ca interactif
pareil pour l'axe y du coup, genre pour les levures qui pesent que qq g
n'avoir que des lignes perpendiculaires sur le graph, sinon ca fait aucun sens, donc rajouter des data points lorsque nécessaire
*/
function get_data_from_inventory() {
	let current_date = new Date();
	let data = [];
	const inventory = get_inventory();
	for (const item_key in inventory) {
		let data_points = [];
		let last_date, last_value;
		for (const data_point of inventory[item_key]) {
			let ddate = new Date(data_point.date);
			ddate.setHours(get_data_hours(data_point.moment));
			data_points.push({
				"date": ddate,
				"value": data_point.quantity
			});
			if (last_date == null || ddate > last_date) {
				last_date = ddate;
				last_value = data_point.quantity;
			}
		}
		if (last_value != null) {
			data_points.push({
				"date": current_date, // adding additional data_point to current date
				"value": last_value // last quantity of item
			});
		}
		data[item_key] = data_points;
	}
	return data;
}

function load_graph() {
	let data = get_data_from_inventory();
	console.log(data);
	create_graph(document.querySelector("main"), data, {
		"min": -0.5,
		"max": 2
	});
}