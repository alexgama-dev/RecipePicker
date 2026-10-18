import { FlatList, StyleSheet, Text, View } from 'react-native';
import type { Country } from '@recipe-roulette/food-data';
import { colors } from '@/theme';

export function CountryDetails({ country }: { country: Country }) {
	return (
		<FlatList
			data={country.dishes}
			keyExtractor={(dish) => dish.name}
			contentContainerStyle={styles.list}
			renderItem={({ item: dish }) => (
				<View style={styles.card}>
					<Text style={styles.dish}>{dish.name}</Text>
					<Text>{dish.description}</Text>
				</View>
			)}
		/>
	);
}

const styles = StyleSheet.create({
	list: { gap: 12, padding: 16 },
	card: { padding: 16, borderWidth: 1, borderColor: colors.border, borderRadius: 8 },
	dish: { marginBottom: 4, fontSize: 18, fontWeight: '600' }
});
