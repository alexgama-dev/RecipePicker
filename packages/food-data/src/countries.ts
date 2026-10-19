import { pickRandom, shuffle } from './random';

export const continents = [
	'Africa',
	'Asia',
	'Europe',
	'North America',
	'South America',
	'Oceania'
] as const;

export type Continent = (typeof continents)[number];

export type Dish = {
	slug: string; // e.g. "ramen", unique across all countries
	name: string;
	description: string;
};

export type Country = {
	code: string; // ISO 3166-1 alpha-2, e.g. "JP"
	name: string;
	continent: Continent;
	dishes: Dish[];
};

export const countries: Country[] = [
	{
		code: 'JP',
		name: 'Japan',
		continent: 'Asia',
		dishes: [
			{
				slug: 'ramen',
				name: 'Ramen',
				description: 'Wheat noodles in a rich broth, topped with pork, egg and scallions.'
			},
			{
				slug: 'okonomiyaki',
				name: 'Okonomiyaki',
				description: 'Savory cabbage pancake cooked on a griddle and brushed with a tangy sauce.'
			},
			{
				slug: 'tonkatsu',
				name: 'Tonkatsu',
				description: 'Breaded, deep-fried pork cutlet served with shredded cabbage.'
			}
		]
	},
	{
		code: 'MX',
		name: 'Mexico',
		continent: 'North America',
		dishes: [
			{
				slug: 'tacos-al-pastor',
				name: 'Tacos al Pastor',
				description: 'Spit-roasted marinated pork on corn tortillas with pineapple.'
			},
			{
				slug: 'mole-poblano',
				name: 'Mole Poblano',
				description: 'Dark, complex sauce of chiles and chocolate, usually over chicken.'
			},
			{
				slug: 'chilaquiles',
				name: 'Chilaquiles',
				description: 'Fried tortilla pieces simmered in salsa, topped with cheese and cream.'
			}
		]
	},
	{
		code: 'IT',
		name: 'Italy',
		continent: 'Europe',
		dishes: [
			{
				slug: 'carbonara',
				name: 'Carbonara',
				description: 'Pasta with egg, pecorino, guanciale and black pepper.'
			},
			{
				slug: 'risotto-alla-milanese',
				name: 'Risotto alla Milanese',
				description: 'Creamy saffron risotto from Milan.'
			},
			{
				slug: 'osso-buco',
				name: 'Osso Buco',
				description: 'Braised veal shanks cooked with white wine and broth.'
			}
		]
	},
	{
		code: 'IN',
		name: 'India',
		continent: 'Asia',
		dishes: [
			{
				slug: 'butter-chicken',
				name: 'Butter Chicken',
				description: 'Tandoori chicken in a mild, creamy tomato sauce.'
			},
			{
				slug: 'masala-dosa',
				name: 'Masala Dosa',
				description: 'Crispy fermented rice crêpe filled with spiced potatoes.'
			},
			{
				slug: 'chole-bhature',
				name: 'Chole Bhature',
				description: 'Spicy chickpea curry served with fluffy fried bread.'
			}
		]
	},
	{
		code: 'TH',
		name: 'Thailand',
		continent: 'Asia',
		dishes: [
			{
				slug: 'pad-thai',
				name: 'Pad Thai',
				description: 'Stir-fried rice noodles with tamarind, egg, peanuts and bean sprouts.'
			},
			{
				slug: 'tom-yum',
				name: 'Tom Yum',
				description: 'Hot and sour soup with lemongrass, lime leaves and shrimp.'
			},
			{
				slug: 'green-curry',
				name: 'Green Curry',
				description: 'Coconut curry made with green chiles, Thai basil and eggplant.'
			}
		]
	},
	{
		code: 'FR',
		name: 'France',
		continent: 'Europe',
		dishes: [
			{
				slug: 'coq-au-vin',
				name: 'Coq au Vin',
				description: 'Chicken braised in red wine with mushrooms and lardons.'
			},
			{
				slug: 'ratatouille',
				name: 'Ratatouille',
				description: 'Stewed Provençal vegetables: eggplant, zucchini, peppers and tomato.'
			},
			{
				slug: 'croque-monsieur',
				name: 'Croque Monsieur',
				description: 'Grilled ham and cheese sandwich topped with béchamel.'
			}
		]
	},
	{
		code: 'MA',
		name: 'Morocco',
		continent: 'Africa',
		dishes: [
			{
				slug: 'tagine',
				name: 'Tagine',
				description: 'Slow-cooked stew of meat, vegetables and spices, named after its clay pot.'
			},
			{
				slug: 'couscous',
				name: 'Couscous',
				description: 'Steamed semolina served with vegetables and meat.'
			},
			{
				slug: 'harira',
				name: 'Harira',
				description: 'Tomato, lentil and chickpea soup, traditional during Ramadan.'
			}
		]
	},
	{
		code: 'PE',
		name: 'Peru',
		continent: 'South America',
		dishes: [
			{
				slug: 'ceviche',
				name: 'Ceviche',
				description: 'Raw fish cured in lime juice with chile, onion and cilantro.'
			},
			{
				slug: 'lomo-saltado',
				name: 'Lomo Saltado',
				description: 'Beef stir-fried with onions and tomatoes, served with fries and rice.'
			},
			{
				slug: 'aji-de-gallina',
				name: 'Ají de Gallina',
				description: 'Shredded chicken in a creamy yellow chile sauce.'
			}
		]
	},
	{
		code: 'KR',
		name: 'South Korea',
		continent: 'Asia',
		dishes: [
			{
				slug: 'bibimbap',
				name: 'Bibimbap',
				description: 'Rice bowl with vegetables, beef, egg and gochujang.'
			},
			{
				slug: 'kimchi-jjigae',
				name: 'Kimchi Jjigae',
				description: 'Spicy stew made with aged kimchi, pork and tofu.'
			},
			{
				slug: 'tteokbokki',
				name: 'Tteokbokki',
				description: 'Chewy rice cakes in a sweet and spicy red chile sauce.'
			}
		]
	},
	{
		code: 'GR',
		name: 'Greece',
		continent: 'Europe',
		dishes: [
			{
				slug: 'moussaka',
				name: 'Moussaka',
				description: 'Layers of eggplant and spiced meat, baked under béchamel.'
			},
			{
				slug: 'souvlaki',
				name: 'Souvlaki',
				description: 'Grilled meat skewers, often served in pita with tzatziki.'
			},
			{
				slug: 'spanakopita',
				name: 'Spanakopita',
				description: 'Spinach and feta pie wrapped in flaky phyllo.'
			}
		]
	},
	{
		code: 'ET',
		name: 'Ethiopia',
		continent: 'Africa',
		dishes: [
			{
				slug: 'doro-wat',
				name: 'Doro Wat',
				description: 'Spicy chicken stew with berbere and hard-boiled eggs, eaten with injera.'
			},
			{
				slug: 'kitfo',
				name: 'Kitfo',
				description: 'Minced raw beef seasoned with mitmita chili and spiced butter.'
			},
			{
				slug: 'shiro',
				name: 'Shiro',
				description: 'Smooth, spiced stew made from ground chickpeas or broad beans.'
			}
		]
	},
	{
		code: 'NG',
		name: 'Nigeria',
		continent: 'Africa',
		dishes: [
			{
				slug: 'jollof-rice',
				name: 'Jollof Rice',
				description: 'Rice cooked in a smoky tomato and pepper sauce.'
			},
			{
				slug: 'suya',
				name: 'Suya',
				description: 'Grilled beef skewers coated in a spicy peanut rub.'
			},
			{
				slug: 'egusi-soup',
				name: 'Egusi Soup',
				description: 'Soup thickened with ground melon seeds, with leafy greens and meat.'
			}
		]
	},
	{
		code: 'US',
		name: 'United States',
		continent: 'North America',
		dishes: [
			{
				slug: 'smoked-brisket',
				name: 'Smoked Brisket',
				description: 'Texas-style beef brisket, slow-smoked until tender.'
			},
			{
				slug: 'clam-chowder',
				name: 'Clam Chowder',
				description: 'Creamy New England soup with clams and potatoes.'
			},
			{
				slug: 'gumbo',
				name: 'Gumbo',
				description: 'Louisiana stew built on a dark roux, with sausage, seafood and okra.'
			}
		]
	},
	{
		code: 'JM',
		name: 'Jamaica',
		continent: 'North America',
		dishes: [
			{
				slug: 'jerk-chicken',
				name: 'Jerk Chicken',
				description: 'Chicken marinated in scotch bonnet and allspice, then grilled.'
			},
			{
				slug: 'ackee-and-saltfish',
				name: 'Ackee and Saltfish',
				description: 'Ackee fruit sautéed with salt cod, onions and peppers.'
			},
			{
				slug: 'curry-goat',
				name: 'Curry Goat',
				description: 'Goat slow-cooked in a spiced curry, served with rice and peas.'
			}
		]
	},
	{
		code: 'BR',
		name: 'Brazil',
		continent: 'South America',
		dishes: [
			{
				slug: 'feijoada',
				name: 'Feijoada',
				description: 'Black bean and pork stew served with rice, greens and farofa.'
			},
			{
				slug: 'pao-de-queijo',
				name: 'Pão de Queijo',
				description: 'Chewy cheese bread rolls made with cassava flour.'
			},
			{
				slug: 'moqueca',
				name: 'Moqueca',
				description: 'Fish stew with coconut milk, peppers and palm oil.'
			}
		]
	},
	{
		code: 'AR',
		name: 'Argentina',
		continent: 'South America',
		dishes: [
			{
				slug: 'asado',
				name: 'Asado',
				description: 'Cuts of beef and sausage grilled slowly over wood or charcoal.'
			},
			{
				slug: 'empanadas',
				name: 'Empanadas',
				description: 'Baked or fried pastries, often filled with spiced beef.'
			},
			{ slug: 'locro', name: 'Locro', description: 'Hearty stew of corn, squash, beans and meat.' }
		]
	},
	{
		code: 'AU',
		name: 'Australia',
		continent: 'Oceania',
		dishes: [
			{
				slug: 'meat-pie',
				name: 'Meat Pie',
				description: 'Hand-sized pie filled with minced meat and gravy.'
			},
			{
				slug: 'barramundi',
				name: 'Barramundi',
				description: 'Mild white fish, usually grilled or pan-fried.'
			},
			{
				slug: 'lamington',
				name: 'Lamington',
				description: 'Sponge cake dipped in chocolate and rolled in coconut.'
			}
		]
	},
	{
		code: 'NZ',
		name: 'New Zealand',
		continent: 'Oceania',
		dishes: [
			{
				slug: 'hangi',
				name: 'Hāngī',
				description: 'Māori feast of meat and vegetables cooked in an earth oven.'
			},
			{
				slug: 'pavlova',
				name: 'Pavlova',
				description: 'Meringue with a crisp shell and soft centre, topped with cream and fruit.'
			},
			{
				slug: 'whitebait-fritters',
				name: 'Whitebait Fritters',
				description: 'Tiny whitebait fish bound in egg and fried.'
			}
		]
	},
	{
		code: 'FJ',
		name: 'Fiji',
		continent: 'Oceania',
		dishes: [
			{
				slug: 'kokoda',
				name: 'Kokoda',
				description: 'Raw fish marinated in citrus and finished with coconut cream.'
			},
			{
				slug: 'lovo',
				name: 'Lovo',
				description: 'Meat, fish and root vegetables cooked in an underground oven.'
			},
			{ slug: 'rourou', name: 'Rourou', description: 'Taro leaves simmered in coconut milk.' }
		]
	}
];

export const dishes = countries.flatMap((country) =>
	country.dishes.map((dish) => ({ dish, country }))
);

export function findCountry(code: string): Country | undefined {
	return countries.find((country) => country.code === code.toUpperCase());
}

export function findDish(slug: string): { dish: Dish; country: Country } | undefined {
	for (const country of countries) {
		const dish = country.dishes.find((d) => d.slug === slug);
		if (dish) return { dish, country };
	}
}

export function pickContinent(): Continent {
	return pickRandom(continents);
}

export function pickCountries(continent: Continent, count: number): Country[] {
	return shuffle(countries.filter((country) => country.continent === continent)).slice(0, count);
}

export function pickDishes(count: number): { dish: Dish; country: Country }[] {
	return shuffle(dishes).slice(0, count);
}
