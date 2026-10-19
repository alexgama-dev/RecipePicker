import { describe, expect, it } from 'vitest';
import { countries } from './countries';
import { searchCountries, searchDishes } from './search';

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

describe('searchDishes', () => {
	const country = countries[0];
	const dish = country.dishes[0];

	it('returns nothing for an empty query', () => {
		expect(searchDishes('  ')).toEqual([]);
	});

	it("matches case-insensitively and includes the dish's country", () => {
		expect(searchDishes(dish.name.toUpperCase())).toContainEqual({ dish, country });
	});

	it.each(['a', 'an', 'ra'])('ranks names starting with %j before names containing it', (query) => {
		const startsWith = searchDishes(query).map(({ dish }) =>
			dish.name.toLowerCase().startsWith(query)
		);
		expect(startsWith).toEqual([...startsWith].sort((a, b) => Number(b) - Number(a)));
	});
});
