import { Link } from 'expo-router';
import { Pressable, SectionList, StyleSheet, Text } from 'react-native';
import { continents, countries } from '@recipe-roulette/food-data';
import { colors } from '@/theme';

const sections = continents.map((continent) => ({
	title: continent,
	data: countries
		.filter((c) => c.continent === continent)
		.flatMap((country) => country.dishes.map((dish) => ({ dish, country })))
}));

export function DishBrowser() {
	return (
		<SectionList
			sections={sections}
			keyExtractor={({ dish, country }) => `${country.code}-${dish.name}`}
			contentContainerStyle={styles.list}
			renderSectionHeader={({ section }) => (
				<Text style={styles.heading} role="heading">
					{section.title}
				</Text>
			)}
			renderItem={({ item: { dish, country } }) => (
				<Link href={`/country/${country.code.toLowerCase()}`} asChild>
					<Pressable style={styles.card}>
						<Text style={styles.dish}>{dish.name}</Text>
						<Text style={styles.country}>{country.name}</Text>
						<Text>{dish.description}</Text>
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
		fontWeight: '700',
		backgroundColor: '#fff'
	},
	card: {
		marginBottom: 12,
		padding: 16,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: 8
	},
	dish: { fontSize: 18, fontWeight: '600' },
	country: { marginBottom: 4, color: colors.teal }
});
