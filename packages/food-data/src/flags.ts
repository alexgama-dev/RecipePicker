import type { Country } from './countries';

// Regional indicator symbols: a pair of them for an ISO 3166-1 code renders as that country's flag.
export function flagEmoji(code: string) {
	return String.fromCodePoint(...[...code].map((c) => 0x1f1e6 + c.charCodeAt(0) - 65));
}

export function countryLabel(country: Country) {
	return `${flagEmoji(country.code)} ${country.name}`;
}
