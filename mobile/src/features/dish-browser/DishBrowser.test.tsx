import { render, screen } from '@testing-library/react-native';
import { continents, countries } from '@recipe-roulette/food-data';
import { DishBrowser } from './DishBrowser';

// The list only renders its first items, so look at the first continent.
const continent = continents[0];
const country = countries.find((c) => c.continent === continent)!;
const dish = country.dishes[0];

it('lists dishes under their continent', async () => {
	await render(<DishBrowser />);
	expect(screen.getByRole('heading', { name: continent })).toBeOnTheScreen();
	expect(screen.getByText(dish.name)).toBeOnTheScreen();
});
