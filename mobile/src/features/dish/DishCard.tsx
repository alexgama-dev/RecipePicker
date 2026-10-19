import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';
import type { Country, Dish } from '@recipe-roulette/food-data';
import { useColors } from '@/theme';

type Props = { dish: Dish; country: Country; compact?: boolean };

export function DishCard({ dish, country, compact }: Props) {
	const c = useColors();

	return (
		<Link href={`/dish/${dish.slug}`} asChild>
			<Pressable
				style={StyleSheet.flatten([
					styles.card,
					compact && styles.compact,
					{ borderColor: c.border, backgroundColor: c.surface }
				])}
			>
				<Text style={[styles.dish, { color: c.text }]}>{dish.name}</Text>
				<Text style={[styles.country, { color: c.teal }]}>{country.name}</Text>
				{!compact && <Text style={{ color: c.text }}>{dish.description}</Text>}
			</Pressable>
		</Link>
	);
}

const styles = StyleSheet.create({
	card: {
		marginBottom: 12,
		padding: 16,
		borderWidth: 1,
		borderRadius: 8
	},
	compact: { width: 160, marginRight: 12 },
	dish: { fontSize: 18, fontWeight: '600' },
	country: { marginBottom: 4 }
});
