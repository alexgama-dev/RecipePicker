import { Link } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { searchCountries } from '@recipe-roulette/food-data';
import { colors } from '@/theme';

export function CountrySearch() {
	const [query, setQuery] = useState('');
	const results = searchCountries(query);

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				accessibilityLabel="Search a country"
				placeholder="Search a country…"
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
						<Pressable style={styles.result}>
							<Text style={styles.name}>{country.name}</Text>
							<Text style={styles.continent}>{country.continent}</Text>
						</Pressable>
					</Link>
				)}
				ListEmptyComponent={
					query.trim() ? (
						<Text style={styles.empty}>No countries match &quot;{query.trim()}&quot;</Text>
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
		borderColor: colors.border,
		borderRadius: 999,
		fontSize: 18
	},
	result: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 12,
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: colors.border
	},
	name: { flex: 1, fontSize: 16, fontWeight: '500' },
	continent: { color: colors.muted },
	empty: { padding: 12, color: colors.muted }
});
