import { describe, expect, it } from 'vitest';
import {
	continents,
	countries,
	findCountry,
	findDish,
	pickCountries,
	pickDishes
} from './countries';

describe('countries data', () => {
	it.each(continents)('%s has enough countries for a hand of 3', (continent) => {
		expect(
			countries.filter((country) => country.continent === continent).length
		).toBeGreaterThanOrEqual(3);
	});

	it('gives every dish a unique slug', () => {
		const slugs = countries.flatMap((country) => country.dishes.map((dish) => dish.slug));
		expect(new Set(slugs).size).toBe(slugs.length);
	});
});

describe('findDish', () => {
	it('finds a dish and its country by slug', () => {
		const country = countries[0];
		const dish = country.dishes[0];
		expect(findDish(dish.slug)).toEqual({ dish, country });
	});

	it('returns undefined for an unknown slug', () => {
		expect(findDish('nope')).toBeUndefined();
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

describe('pickDishes', () => {
	it('picks 3 different dishes', () => {
		const slugs = pickDishes(3).map(({ dish }) => dish.slug);
		expect(new Set(slugs).size).toBe(3);
	});
});
