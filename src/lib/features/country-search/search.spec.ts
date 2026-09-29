import { describe, expect, it } from 'vitest';
import { countries } from '$lib/features/country-spin/countries';
import { searchCountries } from './search';

describe('searchCountries', () => {
	it('returns nothing for an empty query', () => {
		expect(searchCountries('  ')).toEqual([]);
	});

	it('matches case-insensitively', () => {
		const country = countries[0];
		expect(searchCountries(country.name.toUpperCase())).toContain(country);
	});

	it.each(['a', 'an', 'ia'])('ranks names starting with %j before names containing it', (query) => {
		const startsWith = searchCountries(query).map((c) => c.name.toLowerCase().startsWith(query));
		expect(startsWith).toEqual([...startsWith].sort((a, b) => Number(b) - Number(a)));
	});

	it('finds every country whose name contains the query', () => {
		const country = countries[0];
		const query = country.name.slice(1, 3);
		expect(searchCountries(query)).toContain(country);
	});
});
