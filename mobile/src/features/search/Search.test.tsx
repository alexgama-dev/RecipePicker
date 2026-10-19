import { render, screen, userEvent } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';
import { countries } from '@recipe-roulette/food-data';
import { Search } from './Search';

const input = () => screen.getByLabelText('Search a country or dish');
const country = countries[0];
const dish = country.dishes[0];

it('shows countries matching what you type', async () => {
	await render(<Search />);
	await userEvent.type(input(), country.name);
	expect(screen.getByRole('heading', { name: 'Countries' })).toBeOnTheScreen();
	expect(screen.getByText(country.name)).toBeOnTheScreen();
});

it('shows dishes matching what you type', async () => {
	await render(<Search />);
	await userEvent.type(input(), dish.name);
	expect(screen.getByRole('heading', { name: 'Dishes' })).toBeOnTheScreen();
	expect(screen.getByText(dish.name)).toBeOnTheScreen();
});

it("opens a dish's screen", async () => {
	const router = await renderRouter({ index: Search, 'dish/[slug]': () => null });
	await userEvent.type(input(), dish.name);
	await userEvent.press(screen.getByText(dish.name));
	expect(router.getPathname()).toBe(`/dish/${dish.slug}`);
});

it('says so when nothing matches', async () => {
	await render(<Search />);
	await userEvent.type(input(), 'zzzz');
	expect(screen.getByText('Nothing matches "zzzz"')).toBeOnTheScreen();
});
