import { afterEach, describe, expect, it, vi } from 'vitest';
import { pickRandom, shuffle } from './random';

describe('pickRandom', () => {
	afterEach(() => vi.restoreAllMocks());

	it('picks the first item at the bottom of the range', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0);
		expect(pickRandom(['a', 'b', 'c'])).toBe('a');
	});

	it('picks the last item at the top of the range', () => {
		vi.spyOn(Math, 'random').mockReturnValue(0.99);
		expect(pickRandom(['a', 'b', 'c'])).toBe('c');
	});
});

describe('shuffle', () => {
	it('keeps the same items without changing the input', () => {
		const items = ['a', 'b', 'c', 'd'];
		const shuffled = shuffle(items);
		expect(shuffled.toSorted()).toEqual(items);
		expect(items).toEqual(['a', 'b', 'c', 'd']);
	});
});
