import type { ReactElement } from 'react';
import { SectionList, StyleSheet, Text } from 'react-native';
import { continents, countries } from '@recipe-roulette/food-data';
import { DishCard } from '@/features/dish/DishCard';
import { useColors } from '@/theme';

const sections = continents.map((continent) => ({
	title: continent,
	data: countries
		.filter((c) => c.continent === continent)
		.flatMap((country) => country.dishes.map((dish) => ({ dish, country })))
}));

export function DishBrowser({ header }: { header?: ReactElement }) {
	const c = useColors();

	return (
		<SectionList
			sections={sections}
			keyExtractor={({ dish }) => dish.slug}
			contentContainerStyle={styles.list}
			ListHeaderComponent={header}
			renderSectionHeader={({ section }) => (
				<Text
					style={[styles.heading, { color: c.text, backgroundColor: c.background }]}
					role="heading"
				>
					{section.title}
				</Text>
			)}
			renderItem={({ item }) => <DishCard {...item} />}
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
	}
});
