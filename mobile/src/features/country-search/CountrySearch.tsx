import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { searchCountries } from '@recipe-roulette/food-data';
import { useColors } from '@/theme';

export function CountrySearch() {
	const c = useColors();
	const [query, setQuery] = useState('');
	const results = searchCountries(query);

	return (
		<View style={styles.container}>
			<TextInput
				style={[styles.input, { color: c.text, borderColor: c.border, backgroundColor: c.surface }]}
				accessibilityLabel="Search a country"
				placeholder="Search a country…"
				placeholderTextColor={c.muted}
				autoCorrect={false}
				value={query}
				onChangeText={setQuery}
			/>
			<FlatList
				data={results}
				keyExtractor={(country) => country.code}
				keyboardShouldPersistTaps="handled"
				renderItem={({ item: country }) => (
					<Link href={`/country/${country.code.toLowerCase()}`} asChild>
						<Pressable style={StyleSheet.flatten([styles.result, { borderBottomColor: c.border }])}>
							<Text style={[styles.name, { color: c.text }]}>{country.name}</Text>
							<Text style={{ color: c.muted }}>{country.continent}</Text>
						</Pressable>
					</Link>
				)}
				ListEmptyComponent={
					query.trim() ? (
						<Text style={[styles.empty, { color: c.muted }]}>
							No countries match &quot;{query.trim()}&quot;
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
