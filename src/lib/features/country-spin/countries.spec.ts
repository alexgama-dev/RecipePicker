import { afterEach, describe, expect, it, vi } from 'vitest';
import { countries, findCountry, pickCountry } from './countries';

describe('findCountry', () => {
	it('finds a country by lowercase code', () => {
		expect(findCountry('jp')?.name).toBe('Japan');
	});

	it('returns undefined for an unknown code', () => {
		expect(findCountry('xx')).toBeUndefined();
	});
});

describe('pickCountry', () => {
	afterEach(() => vi.restoreAllMocks());

	it('never picks the excluded country', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0);
		const first = countries[0].code;
		expect(pickCountry(first).code).not.toBe(first);
	});
});
