const BOARD_CASES = [
	//bottom
	{
		type: 2,
		image: "start"
	}, {
		type: 0,
		group: 0,
		name: "Boulevard de Belleville",
		price: 60,
		rents: [2, 10, 30, 90, 160, 250]
	}, {
		type: 2,
		name: "Caisse de communauté",
		image: "community_bottom",
		action: community
	}, {
		type: 0,
		group: 0,
		name: "Rue Lecourbe",
		price: 60,
		rents: [4, 20, 60, 180, 320, 450]
	}, {
		type: 2,
		name: "Impôts sur le revenu",
		image: "income_tax",
		action: income_tax
	}, {
		type: 1,
		group: 8,
		name: "Gare Montparnasse",
		price: 200,
		image: "train_bottom"
	}, {
		type: 0,
		group: 1,
		name: "Rue Vaugirard",
		price: 100,
		rents: [6, 30, 90, 270, 400, 550]
	}, {
		type: 2,
		name: "Chance",
		image: "chance_bottom",
		action: chance
	}, {
		type: 0,
		group: 1,
		name: "Rue de Courcelles",
		price: 100,
		rents: [6, 30, 90, 270, 400, 550]
	}, {
		type: 0,
		group: 1,
		name: "Avenue de la République",
		price: 120,
		rents: [40, 100, 300, 450, 600]
	},
	//left
	{
		type: 2,
		image: "prison"
	}, {
		type: 0,
		group: 2,
		name: "Boulevard de Belleville",
		price: 140,
		rents: [10, 50, 150, 450, 625, 750]
	}, {
		type: 1,
		group: 9,
		name: "Compagnie de distribution d'éléctricité",
		price: 150,
		image: "electricity"
	}, {
		type: 0,
		group: 2,
		name: "Avenue de Neuilly",
		price: 140,
		rents: [10, 50, 150, 450, 625, 750]
	}, {
		type: 0,
		group: 2,
		name: "Rue de Paradis",
		price: 160,
		rents: [12, 60, 180, 500, 700, 900]
	}, {
		type: 1,
		group: 8,
		name: "Gare de Lyon",
		price: 200,
		image: "train_left"
	}, {
		type: 0,
		group: 3,
		name: "Avenue Mozart",
		price: 180,
		rents: [14, 70, 200, 550, 750, 950]
	}, {
		type: 2,
		name: "Caisse de communauté",
		image: "community_left",
		action: community
	}, {
		type: 0,
		group: 3,
		name: "Boulevard Saint-Michel",
		price: 180,
		rents: [14, 70, 200, 550, 750, 950]
	}, {
		type: 0,
		group: 3,
		name: "Place Pigalle",
		price: 200,
		rents: [16, 80, 220, 600, 800, 1000]
	},
	//top
	{
		type: 2,
		image: "parking",
		action: parking
	}, {
		type: 0,
		group: 4,
		name: "Avenue Matignon",
		price: 220,
		rents: [18, 90, 250, 700, 875, 1050]
	}, {
		type: 2,
		name: "Chance",
		image: "chance_top",
		action: chance
	}, {
		type: 0,
		group: 4,
		name: "Boulevard Malesherbes",
		price: 220,
		rents: [18, 90, 250, 700, 875, 1050]
	}, {
		type: 0,
		group: 4,
		name: "Avenue Henri-Martin",
		price: 240,
		rents: [20, 100, 300, 750, 925, 1100]
	}, {
		type: 1,
		group: 8,
		name: "Gare du Nord",
		price: 200,
		image: "train_top"
	}, {
		type: 0,
		group: 5,
		name: "Faubourd Saint-Honoré",
		price: 260,
		rents: [22, 110, 330, 800, 975, 1150]
	}, {
		type: 0,
		group: 5,
		name: "Place de la bourse",
		price: 260,
		rents: [22, 110, 330, 800, 975, 1150]
	}, {
		type: 1,
		group: 9,
		name: "Compagnie de distribution des eaux",
		price: 150,
		image: "water"
	}, {
		type: 0,
		group: 5,
		name: "Rue la Fayette",
		price: 280,
		rents: [24, 120, 360, 850, 1025, 1200]
	},
	//right
	{
		type: 2,
		image: "police"
	}, {
		type: 0,
		group: 6,
		name: "Avenue de Breteuil",
		price: 300,
		rents: [26, 130, 390, 900, 1100, 1275]
	}, {
		type: 0,
		group: 6,
		name: "Avenue Foch",
		price: 300,
		rents: [26, 130, 390, 900, 1100, 1275]
	}, {
		type: 2,
		name: "Caisse de communauté",
		image: "community_right",
		action: community
	}, {
		type: 0,
		group: 6,
		name: "Boulevard des Capucines",
		price: 320,
		rents: [28, 150, 450, 1000, 1200, 1400]
	}, {
		type: 1,
		group: 8,
		name: "Gare Saint-Lazare",
		price: 200,
		image: "train_right"
	}, {
		type: 2,
		name: "Chance",
		image: "chance_right",
		action: chance
	}, {
		type: 0,
		group: 7,
		name: "Avenue des Champs-Élysées",
		price: 350,
		rents: [35, 175, 500, 1100, 1300, 1500]
	}, {
		type: 2,
		name: "Taxe de luxe",
		image: "luxury_tax",
		action: luxury_tax
	}, {
		type: 0,
		group: 7,
		name: "Rue de la paix",
		price: 400,
		rents: [50, 200, 600, 1400, 1700, 2000]
	}
];