import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, SectionList, StyleSheet, Text, TextInput, View } from 'react-native';
import { searchCountries, searchDishes } from '@recipe-roulette/food-data';
import { useColors } from '@/theme';

export function Search() {
	const c = useColors();
	const [query, setQuery] = useState('');
	const sections = [
		{
			title: 'Countries',
			data: searchCountries(query).map((country) => ({
				key: country.code,
				href: `/country/${country.code.toLowerCase()}`,
				name: country.name,
				detail: country.continent
			}))
		},
		{
			title: 'Dishes',
			data: searchDishes(query).map(({ dish, country }) => ({
				key: dish.slug,
				href: `/dish/${dish.slug}`,
				name: dish.name,
				detail: country.name
			}))
		}
	].filter((section) => section.data.length);

	return (
		<View style={styles.container}>
			<TextInput
				style={[styles.input, { color: c.text, borderColor: c.border, backgroundColor: c.surface }]}
				accessibilityLabel="Search a country or dish"
				placeholder="Search a country or dish…"
				placeholderTextColor={c.muted}
				autoCorrect={false}
				value={query}
				onChangeText={setQuery}
			/>
			<SectionList
				sections={sections}
				keyboardShouldPersistTaps="handled"
				stickySectionHeadersEnabled={false}
				renderSectionHeader={({ section }) => (
					<Text style={[styles.heading, { color: c.muted }]} role="heading">
						{section.title}
					</Text>
				)}
				renderItem={({ item }) => (
					<Link href={item.href} asChild>
						<Pressable style={StyleSheet.flatten([styles.result, { borderBottomColor: c.border }])}>
							<Text style={[styles.name, { color: c.text }]}>{item.name}</Text>
							<Text style={{ color: c.muted }}>{item.detail}</Text>
						</Pressable>
					</Link>
				)}
				ListEmptyComponent={
					query.trim() ? (
						<Text style={[styles.empty, { color: c.muted }]}>
							Nothing matches &quot;{query.trim()}&quot;
						</Text>
					) : undefined
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, padding: 16 },
	input: {
		marginBottom: 12,
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderWidth: 1,
		borderRadius: 999,
		fontSize: 18
	},
	heading: {
		paddingHorizontal: 12,
		paddingTop: 16,
		paddingBottom: 4,
		fontSize: 13,
		fontWeight: '600',
		textTransform: 'uppercase'
	},
	result: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 12,
		borderBottomWidth: 1
	},
	name: { flex: 1, fontSize: 16, fontWeight: '500' },
	empty: { padding: 12 }
});
