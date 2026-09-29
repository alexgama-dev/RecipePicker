import { goto } from '$app/navigation';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { page, userEvent } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import { countries } from '$lib/features/country-spin/countries';
import CountrySearch from './CountrySearch.svelte';

vi.mock('$app/navigation', () => ({ goto: vi.fn() }));

const input = () => page.getByRole('combobox', { name: 'Search a country' });
const country = countries[0];

describe('CountrySearch', () => {
	beforeEach(() => {
		vi.mocked(goto).mockClear();
		render(CountrySearch);
	});

	it('suggests countries matching what you type', async () => {
		await input().fill(country.name);
		await expect.element(page.getByRole('option', { name: country.name })).toBeVisible();
	});

	it('goes to the country page when you click a suggestion', async () => {
		await input().fill(country.name);
		await page.getByRole('option', { name: country.name }).click();
		expect(goto).toHaveBeenCalledWith(`/country/${country.code.toLowerCase()}`);
	});

	it('goes to the highlighted country when you press Enter', async () => {
		await input().fill(country.name);
		await userEvent.keyboard('{Enter}');
		expect(goto).toHaveBeenCalledWith(`/country/${country.code.toLowerCase()}`);
	});

	it('says so when nothing matches', async () => {
		await input().fill('zzzz');
		await expect.element(page.getByText('No countries match "zzzz"')).toBeVisible();
	});
});
