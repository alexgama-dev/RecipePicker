import { render, screen, userEvent } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import { countries, popularDishes } from '@recipe-roulette/food-data';
import { Home } from './Home';

const input = () => screen.getByLabelText('Search a country or dish');
const country = countries[0];

it('shows every popular dish', async () => {
	await render(<Home />);
	for (const { dish } of popularDishes()) {
		expect(screen.getAllByText(dish.name).length).toBeGreaterThan(0);
	}
});

it('swaps the sections for results while searching', async () => {
	await render(<Home />);
	await userEvent.type(input(), country.name);
	expect(screen.getByText(country.name)).toBeOnTheScreen();
	expect(screen.queryByRole('heading', { name: 'Popular' })).toBeNull();

	await userEvent.clear(input());
	expect(screen.getByRole('heading', { name: 'Popular' })).toBeOnTheScreen();
});

it("opens a popular dish's screen", async () => {
	const { dish } = popularDishes()[0];
	const router = await renderRouter({ index: Home, 'dish/[slug]': () => null });
	await userEvent.press(screen.getAllByText(dish.name)[0]);
	expect(router.getPathname()).toBe(`/dish/${dish.slug}`);
});
