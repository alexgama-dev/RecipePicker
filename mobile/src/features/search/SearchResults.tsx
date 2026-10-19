import { Link } from 'expo-router';
import { Pressable, SectionList, StyleSheet, Text } from 'react-native';
import { countryLabel, searchCountries, searchDishes } from '@recipe-roulette/food-data';
import { useColors } from '@/theme';

export function SearchResults({ query }: { query: string }) {
	const c = useColors();
	const sections = [
		{
			title: 'Countries',
			data: searchCountries(query).map((country) => ({
				key: country.code,
				href: `/country/${country.code.toLowerCase()}`,
				name: countryLabel(country),
				detail: country.continent
			}))
		},
		{
			title: 'Dishes',
			data: searchDishes(query).map(({ dish, country }) => ({
				key: dish.slug,
				href: `/dish/${dish.slug}`,
				name: dish.name,
				detail: countryLabel(country)
			}))
		}
	].filter((section) => section.data.length);

	return (
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
				<Text style={[styles.empty, { color: c.muted }]}>
					Nothing matches &quot;{query.trim()}&quot;
				</Text>
			}
		/>
	);
}

const styles = StyleSheet.create({
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
