import { describe, expect, it } from 'vitest';
import { countryLabel, flagEmoji } from './flags';

describe('flagEmoji', () => {
	it('turns a country code into its flag', () => {
		expect(flagEmoji('JP')).toBe('🇯🇵');
		expect(flagEmoji('MX')).toBe('🇲🇽');
	});
});

describe('countryLabel', () => {
	it('puts the flag before the name', () => {
		expect(countryLabel({ code: 'JP', name: 'Japan', continent: 'Asia', dishes: [] })).toBe(
			'🇯🇵 Japan'
		);
	});
});
