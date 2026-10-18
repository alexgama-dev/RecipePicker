import { render, screen, userEvent } from '@testing-library/react-native';
import { countries } from '@recipe-roulette/food-data';
import { CountrySearch } from './CountrySearch';

const input = () => screen.getByLabelText('Search a country');
const country = countries[0];

it('shows countries matching what you type', async () => {
	await render(<CountrySearch />);
	await userEvent.type(input(), country.name);
	expect(screen.getByText(country.name)).toBeOnTheScreen();
});

it('says so when nothing matches', async () => {
	await render(<CountrySearch />);
	await userEvent.type(input(), 'zzzz');
	expect(screen.getByText('No countries match "zzzz"')).toBeOnTheScreen();
});
