import { render, screen } from '@testing-library/react-native';
import { findDish, recipes } from '@recipe-roulette/food-data';
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
