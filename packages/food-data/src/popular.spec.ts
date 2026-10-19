import { describe, expect, it } from 'vitest';
import { popularDishes } from './popular';

describe('popularDishes', () => {
	it('resolves every hand-picked slug to a dish', () => {
		for (const item of popularDishes()) expect(item?.dish).toBeDefined();
	});
});
