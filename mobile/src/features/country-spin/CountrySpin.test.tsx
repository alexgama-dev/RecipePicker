import { render, screen, userEvent } from '@testing-library/react-native';
import { countries, countryLabel } from '@recipe-roulette/food-data';
import { CountrySpin } from './CountrySpin';

it('shows three countries from the picked continent', async () => {
	await render(<CountrySpin />);
	await userEvent.press(screen.getByRole('button', { name: 'Spin Random' }));

	const heading = screen.getByRole('heading', { name: /^Pick a country from / });
	const continent = countries.find((c) => heading.props.children.includes(c.continent))?.continent;
	const shown = countries.filter(
		(c) => c.continent === continent && screen.queryByText(countryLabel(c))
	);
	expect(shown).toHaveLength(3);
	expect(screen.getByRole('button', { name: 'Spin again' })).toBeOnTheScreen();
});
