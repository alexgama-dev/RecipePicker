import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
	pickContinent,
	pickCountries,
	type Continent,
	type Country
} from '@recipe-roulette/food-data';
import { colors } from '@/theme';

export function CountrySpin() {
	const [pick, setPick] = useState<{ continent: Continent; options: Country[] }>();

	function spin() {
		const continent = pickContinent();
		setPick({ continent, options: pickCountries(continent, 3) });
	}

	return (
		<View style={styles.container}>
			<Pressable style={styles.button} role="button" onPress={spin}>
				<Text style={styles.buttonText}>{pick ? 'Spin again' : 'Spin Random'}</Text>
			</Pressable>
			{pick && (
				<>
					<Text style={styles.heading} role="heading">
						Pick a country from {pick.continent}
					</Text>
					{pick.options.map((country) => (
						<Link key={country.code} href={`/country/${country.code.toLowerCase()}`} asChild>
							<Pressable style={styles.card}>
								<Text style={styles.country}>{country.name}</Text>
							</Pressable>
						</Link>
					))}
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, gap: 12, padding: 16 },
	button: {
		alignItems: 'center',
		paddingVertical: 16,
		borderRadius: 999,
		backgroundColor: colors.teal
	},
	buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
	heading: { marginTop: 12, fontSize: 20, fontWeight: '700' },
	card: { padding: 16, borderWidth: 1, borderColor: colors.border, borderRadius: 8 },
	country: { fontSize: 18, fontWeight: '600' }
});
