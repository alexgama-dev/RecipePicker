import { goto } from '$app/navigation';
import { describe, expect, it, vi } from 'vitest';
import { page } from 'vitest/browser';
import { render } from 'vitest-browser-svelte';
import CountrySpin from './CountrySpin.svelte';
import { countries } from './countries';

vi.mock('$app/navigation', () => ({ goto: vi.fn() }));

const envelope = () => page.getByRole('button', { name: /^Open envelope from / });

async function spin() {
	render(CountrySpin);
	await page.getByRole('button', { name: 'Spin Random' }).click();
	const label = envelope().element().getAttribute('aria-label')!;
	return label.replace('Open envelope from ', '');
}

describe('CountrySpin', () => {
	it('swaps the Spin Random button for an envelope from a continent', async () => {
		await spin();
		await expect.element(page.getByRole('button', { name: 'Spin Random' })).not.toBeInTheDocument();
		await expect.element(envelope()).toBeVisible();
	});

	it('opening the envelope deals 3 postcards from that continent', async () => {
		const continent = await spin();
		await envelope().click();
		await expect.element(page.getByRole('listitem').first()).toBeVisible();
		const names = page
			.getByRole('listitem')
			.elements()
			.map((item) => item.querySelector('.name')!.textContent);
		expect(names).toHaveLength(3);
		expect(
			names.every((name) => countries.find((c) => c.name === name)?.continent === continent)
		).toBe(true);
	});

	it('choosing a postcard goes to the country page', async () => {
		await spin();
		await envelope().click();
		const postcard = page.getByRole('listitem').first();
		await expect.element(postcard).toBeVisible();
		const code = postcard.element().querySelector('.stamp')!.textContent!;
		await postcard.getByRole('button').click();
		expect(goto).toHaveBeenCalledWith(`/country/${code.toLowerCase()}`);
	});

	it('tells the page when a spin starts', async () => {
		const onspin = vi.fn();
		render(CountrySpin, { onspin });
		await page.getByRole('button', { name: 'Spin Random' }).click();
		expect(onspin).toHaveBeenCalledOnce();
	});
});
