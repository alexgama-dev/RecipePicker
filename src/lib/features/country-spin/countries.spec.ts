import { describe, expect, it } from 'vitest';
import { continents, countries, findCountry, pickCountries } from './countries';

describe('countries data', () => {
	it.each(continents)('%s has enough countries for a hand of 3', (continent) => {
		expect(
			countries.filter((country) => country.continent === continent).length
		).toBeGreaterThanOrEqual(3);
	});
});

describe('findCountry', () => {
	it('finds a country by lowercase code', () => {
		expect(findCountry('jp')?.name).toBe('Japan');
	});

	it('returns undefined for an unknown code', () => {
		expect(findCountry('xx')).toBeUndefined();
	});
});

describe('pickCountries', () => {
	it.each(continents)('picks 3 different countries from %s', (continent) => {
		const picked = pickCountries(continent, 3);
		expect(new Set(picked.map((country) => country.code)).size).toBe(3);
		expect(picked.every((country) => country.continent === continent)).toBe(true);
	});
});
