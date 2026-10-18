import type { Continent } from '@recipe-roulette/food-data';

export const continentDesigns: Record<Continent, { colour: string; code: string }> = {
	Africa: { colour: '#d9480f', code: 'AF' },
	Asia: { colour: '#c2255c', code: 'AS' },
	Europe: { colour: '#1971c2', code: 'EU' },
	'North America': { colour: '#2f9e44', code: 'NA' },
	'South America': { colour: '#f08c00', code: 'SA' },
	Oceania: { colour: '#0c8599', code: 'OC' }
};
