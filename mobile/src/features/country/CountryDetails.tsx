import { Link } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text } from 'react-native';
import type { Country } from '@recipe-roulette/food-data';
import { useColors } from '@/theme';

export function CountryDetails({ country }: { country: Country }) {
	const c = useColors();

	return (
		<FlatList
			data={country.dishes}
			keyExtractor={(dish) => dish.slug}
			contentContainerStyle={styles.list}
			renderItem={({ item: dish }) => (
				<Link href={`/dish/${dish.slug}`} asChild>
					<Pressable
						style={StyleSheet.flatten([
							styles.card,
							{ borderColor: c.border, backgroundColor: c.surface }
						])}
					>
						<Text style={[styles.dish, { color: c.text }]}>{dish.name}</Text>
						<Text style={{ color: c.text }}>{dish.description}</Text>
					</Pressable>
				</Link>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	list: { gap: 12, padding: 16 },
	card: { padding: 16, borderWidth: 1, borderRadius: 8 },
	dish: { marginBottom: 4, fontSize: 18, fontWeight: '600' }
});
