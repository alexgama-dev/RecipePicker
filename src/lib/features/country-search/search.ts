import { countries, type Country } from '$lib/features/country-spin/countries';

export function searchCountries(query: string): Country[] {
	const q = query.trim().toLowerCase();
	if (!q) return [];
	const matches = countries.filter((c) => c.name.toLowerCase().includes(q));
	const startsWith = (c: Country) => c.name.toLowerCase().startsWith(q);
	return [...matches.filter(startsWith), ...matches.filter((c) => !startsWith(c))];
}
