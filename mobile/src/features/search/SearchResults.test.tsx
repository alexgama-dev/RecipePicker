import { render, screen, userEvent } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import { countries } from '@recipe-roulette/food-data';
import { SearchResults } from './SearchResults';

const country = countries[0];
const dish = country.dishes[0];

it('shows countries matching the query', async () => {
	await render(<SearchResults query={country.name} />);
	expect(screen.getByRole('heading', { name: 'Countries' })).toBeOnTheScreen();
	expect(screen.getByText(country.name)).toBeOnTheScreen();
});

it('shows dishes matching the query', async () => {
	await render(<SearchResults query={dish.name} />);
	expect(screen.getByRole('heading', { name: 'Dishes' })).toBeOnTheScreen();
	expect(screen.getByText(dish.name)).toBeOnTheScreen();
});

it("opens a dish's screen", async () => {
	const router = await renderRouter({
		index: () => <SearchResults query={dish.name} />,
		'dish/[slug]': () => null
	});
	await userEvent.press(screen.getByText(dish.name));
	expect(router.getPathname()).toBe(`/dish/${dish.slug}`);
});

it('says so when nothing matches', async () => {
	await render(<SearchResults query="zzzz" />);
	expect(screen.getByText('Nothing matches "zzzz"')).toBeOnTheScreen();
});
