export type Dish = {
	name: string;
	description: string;
};

export type Country = {
	code: string; // ISO 3166-1 alpha-2, e.g. "JP"
	name: string;
	dishes: Dish[];
};

export const countries: Country[] = [
	{
		code: 'JP',
		name: 'Japan',
		dishes: [
			{
				name: 'Ramen',
				description: 'Wheat noodles in a rich broth, topped with pork, egg and scallions.'
			},
			{
				name: 'Okonomiyaki',
				description: 'Savory cabbage pancake cooked on a griddle and brushed with a tangy sauce.'
			},
			{
				name: 'Tonkatsu',
				description: 'Breaded, deep-fried pork cutlet served with shredded cabbage.'
			}
		]
	},
	{
		code: 'MX',
		name: 'Mexico',
		dishes: [
			{
				name: 'Tacos al Pastor',
				description: 'Spit-roasted marinated pork on corn tortillas with pineapple.'
			},
			{
				name: 'Mole Poblano',
				description: 'Dark, complex sauce of chiles and chocolate, usually over chicken.'
			},
			{
				name: 'Chilaquiles',
				description: 'Fried tortilla pieces simmered in salsa, topped with cheese and cream.'
			}
		]
	},
	{
		code: 'IT',
		name: 'Italy',
		dishes: [
			{ name: 'Carbonara', description: 'Pasta with egg, pecorino, guanciale and black pepper.' },
			{ name: 'Risotto alla Milanese', description: 'Creamy saffron risotto from Milan.' },
			{ name: 'Osso Buco', description: 'Braised veal shanks cooked with white wine and broth.' }
		]
	},
	{
		code: 'IN',
		name: 'India',
		dishes: [
			{ name: 'Butter Chicken', description: 'Tandoori chicken in a mild, creamy tomato sauce.' },
			{
				name: 'Masala Dosa',
				description: 'Crispy fermented rice crêpe filled with spiced potatoes.'
			},
			{ name: 'Chole Bhature', description: 'Spicy chickpea curry served with fluffy fried bread.' }
		]
	},
	{
		code: 'TH',
		name: 'Thailand',
		dishes: [
			{
				name: 'Pad Thai',
				description: 'Stir-fried rice noodles with tamarind, egg, peanuts and bean sprouts.'
			},
			{
				name: 'Tom Yum',
				description: 'Hot and sour soup with lemongrass, lime leaves and shrimp.'
			},
			{
				name: 'Green Curry',
				description: 'Coconut curry made with green chiles, Thai basil and eggplant.'
			}
		]
	},
	{
		code: 'FR',
		name: 'France',
		dishes: [
			{
				name: 'Coq au Vin',
				description: 'Chicken braised in red wine with mushrooms and lardons.'
			},
			{
				name: 'Ratatouille',
				description: 'Stewed Provençal vegetables: eggplant, zucchini, peppers and tomato.'
			},
			{
				name: 'Croque Monsieur',
				description: 'Grilled ham and cheese sandwich topped with béchamel.'
			}
		]
	},
	{
		code: 'MA',
		name: 'Morocco',
		dishes: [
			{
				name: 'Tagine',
				description: 'Slow-cooked stew of meat, vegetables and spices, named after its clay pot.'
			},
			{ name: 'Couscous', description: 'Steamed semolina served with vegetables and meat.' },
			{
				name: 'Harira',
				description: 'Tomato, lentil and chickpea soup, traditional during Ramadan.'
			}
		]
	},
	{
		code: 'PE',
		name: 'Peru',
		dishes: [
			{
				name: 'Ceviche',
				description: 'Raw fish cured in lime juice with chile, onion and cilantro.'
			},
			{
				name: 'Lomo Saltado',
				description: 'Beef stir-fried with onions and tomatoes, served with fries and rice.'
			},
			{ name: 'Ají de Gallina', description: 'Shredded chicken in a creamy yellow chile sauce.' }
		]
	},
	{
		code: 'KR',
		name: 'South Korea',
		dishes: [
			{ name: 'Bibimbap', description: 'Rice bowl with vegetables, beef, egg and gochujang.' },
			{ name: 'Kimchi Jjigae', description: 'Spicy stew made with aged kimchi, pork and tofu.' },
			{ name: 'Tteokbokki', description: 'Chewy rice cakes in a sweet and spicy red chile sauce.' }
		]
	},
	{
		code: 'GR',
		name: 'Greece',
		dishes: [
			{
				name: 'Moussaka',
				description: 'Layers of eggplant and spiced meat, baked under béchamel.'
			},
			{
				name: 'Souvlaki',
				description: 'Grilled meat skewers, often served in pita with tzatziki.'
			},
			{ name: 'Spanakopita', description: 'Spinach and feta pie wrapped in flaky phyllo.' }
		]
	}
];
