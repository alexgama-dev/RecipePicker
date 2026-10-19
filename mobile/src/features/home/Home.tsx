import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { pickDishes, popularDishes } from '@recipe-roulette/food-data';
import { DishCard } from '@/features/dish/DishCard';
import { DishBrowser } from '@/features/dish-browser/DishBrowser';
import { SearchResults } from '@/features/search/SearchResults';
import { useColors } from '@/theme';

export function Home() {
	const c = useColors();
	const [query, setQuery] = useState('');
	const [picks] = useState(() => pickDishes(3));

	return (
		<View style={styles.container}>
			{/* Kept outside the lists so the input, and the keyboard, survive switching to results. */}
			<TextInput
				style={[styles.input, { color: c.text, borderColor: c.border, backgroundColor: c.surface }]}
				accessibilityLabel="Search a country or dish"
				placeholder="Search a country or dish…"
				placeholderTextColor={c.muted}
				autoCorrect={false}
				value={query}
				onChangeText={setQuery}
			/>
			{query.trim() ? (
				<SearchResults query={query} />
			) : (
				<DishBrowser
					header={
						<>
							<Text role="heading" style={[styles.heading, { color: c.text }]}>
								Popular
							</Text>
							<FlatList
								horizontal
								data={popularDishes()}
								keyExtractor={({ dish }) => dish.slug}
								renderItem={({ item }) => <DishCard {...item} compact />}
							/>
							<Text role="heading" style={[styles.heading, { color: c.text }]}>
								Try something new
							</Text>
							{picks.map((item) => (
								<DishCard key={item.dish.slug} {...item} />
							))}
						</>
					}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	input: {
		marginHorizontal: 16,
		marginTop: 16,
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderWidth: 1,
		borderRadius: 999,
		fontSize: 18
	},
	heading: {
		marginTop: 16,
		marginBottom: 8,
		fontSize: 22,
		fontWeight: '700'
	}
});
