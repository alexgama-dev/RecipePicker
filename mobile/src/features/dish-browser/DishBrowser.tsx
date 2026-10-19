import { Link } from 'expo-router';
import { Pressable, SectionList, StyleSheet, Text } from 'react-native';
import { continents, countries } from '@recipe-roulette/food-data';
import { useColors } from '@/theme';

const sections = continents.map((continent) => ({
	title: continent,
	data: countries
		.filter((c) => c.continent === continent)
		.flatMap((country) => country.dishes.map((dish) => ({ dish, country })))
}));

export function DishBrowser() {
	const c = useColors();

	return (
		<SectionList
			sections={sections}
			keyExtractor={({ dish }) => dish.slug}
			contentContainerStyle={styles.list}
			renderSectionHeader={({ section }) => (
				<Text
					style={[styles.heading, { color: c.text, backgroundColor: c.background }]}
					role="heading"
				>
					{section.title}
				</Text>
			)}
			renderItem={({ item: { dish, country } }) => (
				<Link href={`/dish/${dish.slug}`} asChild>
					<Pressable
						style={StyleSheet.flatten([
							styles.card,
							{ borderColor: c.border, backgroundColor: c.surface }
						])}
					>
						<Text style={[styles.dish, { color: c.text }]}>{dish.name}</Text>
						<Text style={[styles.country, { color: c.teal }]}>{country.name}</Text>
						<Text style={{ color: c.text }}>{dish.description}</Text>
					</Pressable>
				</Link>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	list: { padding: 16 },
	heading: {
		marginTop: 16,
		marginBottom: 8,
		fontSize: 22,
		fontWeight: '700'
	},
	card: {
		marginBottom: 12,
		padding: 16,
		borderWidth: 1,
		borderRadius: 8
	},
	dish: { fontSize: 18, fontWeight: '600' },
	country: { marginBottom: 4 }
});
