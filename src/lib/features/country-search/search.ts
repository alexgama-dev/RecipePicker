import { countries, type Country } from '@recipe-roulette/food-data';

export function searchCountries(query: string): Country[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const matches = countries.filter((c) => c.name.toLowerCase().includes(q));
	const startsWith = (c: Country) => c.name.toLowerCase().startsWith(q);
	return [...matches.filter(startsWith), ...matches.filter((c) => !startsWith(c))];
}
