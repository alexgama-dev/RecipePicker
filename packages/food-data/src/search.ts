import { countries, type Country, type Dish } from './countries';

function rankByName<T>(items: T[], name: (item: T) => string, query: string): T[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const matches = items.filter((item) => name(item).toLowerCase().includes(q));
	const startsWith = (item: T) => name(item).toLowerCase().startsWith(q);
	return [...matches.filter(startsWith), ...matches.filter((item) => !startsWith(item))];
}

export function searchCountries(query: string): Country[] {
	return rankByName(countries, (c) => c.name, query);
}

const dishes = countries.flatMap((country) => country.dishes.map((dish) => ({ dish, country })));

export function searchDishes(query: string): { dish: Dish; country: Country }[] {
	return rankByName(dishes, ({ dish }) => dish.name, query);
}
