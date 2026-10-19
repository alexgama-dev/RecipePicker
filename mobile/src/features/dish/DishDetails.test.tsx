import { Linking } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { findDish, recipeSearchUrl, recipes } from '@recipe-roulette/food-data';
import { DishDetails } from './DishDetails';

const [slug, recipe] = Object.entries(recipes)[0];
const { dish, country } = findDish(slug)!;

it('shows the ingredients and steps', async () => {
	await render(<DishDetails dish={dish} country={country} recipe={recipe} />);
	expect(screen.getByRole('heading', { name: 'Ingredients' })).toBeOnTheScreen();
	expect(screen.getByText(recipe.ingredients[0], { exact: false })).toBeOnTheScreen();
	expect(screen.getByRole('heading', { name: 'Steps' })).toBeOnTheScreen();
	expect(screen.getByText(recipe.steps[0])).toBeOnTheScreen();
});

it('says the recipe is coming soon when there is none', async () => {
	await render(<DishDetails dish={dish} country={country} recipe={undefined} />);
	expect(screen.getByText(dish.description)).toBeOnTheScreen();
	expect(screen.getByText('Recipe coming soon')).toBeOnTheScreen();
	expect(screen.queryByRole('heading', { name: 'Ingredients' })).not.toBeOnTheScreen();
});

it('badges an AI-drafted, untested recipe', async () => {
	await render(
		<DishDetails
			dish={dish}
			country={country}
			recipe={{ ...recipe, aiDrafted: true, tested: false }}
		/>
	);
	expect(screen.getByText('AI-drafted')).toBeOnTheScreen();
	expect(screen.getByText('Untested')).toBeOnTheScreen();
});

it('shows no badges for a tested recipe written by a person', async () => {
	await render(
		<DishDetails
			dish={dish}
			country={country}
			recipe={{ ...recipe, aiDrafted: false, tested: true }}
		/>
	);
	expect(screen.queryByText('AI-drafted')).not.toBeOnTheScreen();
	expect(screen.queryByText('Untested')).not.toBeOnTheScreen();
});

it('opens a recipe search for the dish', async () => {
	const openURL = jest.spyOn(Linking, 'openURL').mockResolvedValue();
	await render(<DishDetails dish={dish} country={country} recipe={undefined} />);
	fireEvent.press(screen.getByRole('link', { name: 'Find recipes online' }));
	expect(openURL).toHaveBeenCalledWith(recipeSearchUrl(dish));
});
