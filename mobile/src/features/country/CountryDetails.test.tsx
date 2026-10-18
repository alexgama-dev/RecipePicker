import { render, screen } from '@testing-library/react-native';
import { countries } from '@recipe-roulette/food-data';
import { CountryDetails } from './CountryDetails';

const country = countries[0];

it("lists the country's dishes", async () => {
	await render(<CountryDetails country={country} />);
	for (const dish of country.dishes) {
		expect(screen.getByText(dish.name)).toBeOnTheScreen();
	}
});
