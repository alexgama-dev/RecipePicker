import { afterEach, describe, expect, it, vi } from 'vitest';
import { pickRandom } from './random';

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
