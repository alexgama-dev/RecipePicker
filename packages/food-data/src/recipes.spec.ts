import { describe, expect, it } from 'vitest';
import { findDish } from './countries';
import { findRecipe, recipes } from './recipes';

describe('recipes data', () => {
	it('only has recipes for real dishes', () => {
		for (const slug of Object.keys(recipes)) {
			expect(findDish(slug), slug).toBeDefined();
		}
	});

	it('gives every recipe ingredients and steps', () => {
		for (const [slug, recipe] of Object.entries(recipes)) {
			expect(recipe.ingredients.length, slug).toBeGreaterThan(0);
			expect(recipe.steps.length, slug).toBeGreaterThan(0);
		}
	});
});

describe('findRecipe', () => {
	it('returns undefined for an unknown slug', () => {
		expect(findRecipe('nope')).toBeUndefined();
	});
});
