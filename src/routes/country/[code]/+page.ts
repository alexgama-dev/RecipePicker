import { error } from '@sveltejs/kit';
import { findCountry } from '$lib/features/country-spin/countries';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const country = findCountry(params.code);
	if (!country) error(404, 'Country not found');
	return { country };
};
