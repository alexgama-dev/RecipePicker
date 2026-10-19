import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { findDish, findRecipe } from '@recipe-roulette/food-data';
import { DishDetails } from '@/features/dish/DishDetails';
import { useColors } from '@/theme';

export default function DishScreen() {
	const { slug } = useLocalSearchParams<{ slug: string }>();
	const found = findDish(slug);
	const c = useColors();
	if (!found) return <Text style={{ color: c.text }}>Dish not found</Text>;
	return (
		<>
			<Stack.Screen options={{ title: found.dish.name }} />
			<DishDetails dish={found.dish} country={found.country} recipe={findRecipe(slug)} />
		</>
	);
}
