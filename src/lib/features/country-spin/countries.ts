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

export const continentDesigns: Record<Continent, { colour: string; code: string }> = {
	Africa: { colour: '#d9480f', code: 'AF' },
	Asia: { colour: '#c2255c', code: 'AS' },
	Europe: { colour: '#1971c2', code: 'EU' },
	'North America': { colour: '#2f9e44', code: 'NA' },
	'South America': { colour: '#f08c00', code: 'SA' },
	Oceania: { colour: '#0c8599', code: 'OC' }
};

export type Dish = {
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
		continent: 'North America',
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
		continent: 'Europe',
		dishes: [
			{ name: 'Carbonara', description: 'Pasta with egg, pecorino, guanciale and black pepper.' },
			{ name: 'Risotto alla Milanese', description: 'Creamy saffron risotto from Milan.' },
			{ name: 'Osso Buco', description: 'Braised veal shanks cooked with white wine and broth.' }
		]
	},
	{
		code: 'IN',
		name: 'India',
		continent: 'Asia',
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
		continent: 'Asia',
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
		continent: 'Europe',
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
		continent: 'Africa',
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
		continent: 'South America',
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
		continent: 'Asia',
		dishes: [
			{ name: 'Bibimbap', description: 'Rice bowl with vegetables, beef, egg and gochujang.' },
			{ name: 'Kimchi Jjigae', description: 'Spicy stew made with aged kimchi, pork and tofu.' },
			{ name: 'Tteokbokki', description: 'Chewy rice cakes in a sweet and spicy red chile sauce.' }
		]
	},
	{
		code: 'GR',
		name: 'Greece',
		continent: 'Europe',
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
	},
	{
		code: 'ET',
		name: 'Ethiopia',
		continent: 'Africa',
		dishes: [
			{
				name: 'Doro Wat',
				description: 'Spicy chicken stew with berbere and hard-boiled eggs, eaten with injera.'
			},
			{
				name: 'Kitfo',
				description: 'Minced raw beef seasoned with mitmita chili and spiced butter.'
			},
			{
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
			{ name: 'Jollof Rice', description: 'Rice cooked in a smoky tomato and pepper sauce.' },
			{ name: 'Suya', description: 'Grilled beef skewers coated in a spicy peanut rub.' },
			{
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
				name: 'Smoked Brisket',
				description: 'Texas-style beef brisket, slow-smoked until tender.'
			},
			{ name: 'Clam Chowder', description: 'Creamy New England soup with clams and potatoes.' },
			{
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
				name: 'Jerk Chicken',
				description: 'Chicken marinated in scotch bonnet and allspice, then grilled.'
			},
			{
				name: 'Ackee and Saltfish',
				description: 'Ackee fruit sautéed with salt cod, onions and peppers.'
			},
			{
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
				name: 'Feijoada',
				description: 'Black bean and pork stew served with rice, greens and farofa.'
			},
			{ name: 'Pão de Queijo', description: 'Chewy cheese bread rolls made with cassava flour.' },
			{ name: 'Moqueca', description: 'Fish stew with coconut milk, peppers and palm oil.' }
		]
	},
	{
		code: 'AR',
		name: 'Argentina',
		continent: 'South America',
		dishes: [
			{
				name: 'Asado',
				description: 'Cuts of beef and sausage grilled slowly over wood or charcoal.'
			},
			{ name: 'Empanadas', description: 'Baked or fried pastries, often filled with spiced beef.' },
			{ name: 'Locro', description: 'Hearty stew of corn, squash, beans and meat.' }
		]
	},
	{
		code: 'AU',
		name: 'Australia',
		continent: 'Oceania',
		dishes: [
			{ name: 'Meat Pie', description: 'Hand-sized pie filled with minced meat and gravy.' },
			{ name: 'Barramundi', description: 'Mild white fish, usually grilled or pan-fried.' },
			{ name: 'Lamington', description: 'Sponge cake dipped in chocolate and rolled in coconut.' }
		]
	},
	{
		code: 'NZ',
		name: 'New Zealand',
		continent: 'Oceania',
		dishes: [
			{ name: 'Hāngī', description: 'Māori feast of meat and vegetables cooked in an earth oven.' },
			{
				name: 'Pavlova',
				description: 'Meringue with a crisp shell and soft centre, topped with cream and fruit.'
			},
			{ name: 'Whitebait Fritters', description: 'Tiny whitebait fish bound in egg and fried.' }
		]
	},
	{
		code: 'FJ',
		name: 'Fiji',
		continent: 'Oceania',
		dishes: [
			{
				name: 'Kokoda',
				description: 'Raw fish marinated in citrus and finished with coconut cream.'
			},
			{
				name: 'Lovo',
				description: 'Meat, fish and root vegetables cooked in an underground oven.'
			},
			{ name: 'Rourou', description: 'Taro leaves simmered in coconut milk.' }
		]
	}
];

export function findCountry(code: string): Country | undefined {
	return countries.find((country) => country.code === code.toUpperCase());
}

export function pickContinent(): Continent {
	return pickRandom(continents);
}

export function pickCountries(continent: Continent, count: number): Country[] {
	return shuffle(countries.filter((country) => country.continent === continent)).slice(0, count);
}
