import { Link } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
	pickContinent,
	pickCountries,
	type Continent,
	type Country
} from '@recipe-roulette/food-data';
import { useColors } from '@/theme';

export function CountrySpin() {
	const c = useColors();
	const [pick, setPick] = useState<{ continent: Continent; options: Country[] }>();

	function spin() {
		const continent = pickContinent();
		setPick({ continent, options: pickCountries(continent, 3) });
	}

	return (
		<View style={styles.container}>
			<Pressable style={[styles.button, { backgroundColor: c.teal }]} role="button" onPress={spin}>
				<Text style={[styles.buttonText, { color: c.surface }]}>
					{pick ? 'Spin again' : 'Spin Random'}
				</Text>
			</Pressable>
			{pick && (
				<>
					<Text style={[styles.heading, { color: c.text }]} role="heading">
						Pick a country from {pick.continent}
					</Text>
					{pick.options.map((country) => (
						<Link key={country.code} href={`/country/${country.code.toLowerCase()}`} asChild>
							<Pressable
								style={StyleSheet.flatten([
									styles.card,
									{ borderColor: c.border, backgroundColor: c.surface }
								])}
							>
								<Text style={[styles.country, { color: c.text }]}>{country.name}</Text>
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
		borderRadius: 999
	},
	buttonText: { fontSize: 18, fontWeight: '700' },
	heading: { marginTop: 12, fontSize: 20, fontWeight: '700' },
	card: { padding: 16, borderWidth: 1, borderRadius: 8 },
	country: { fontSize: 18, fontWeight: '600' }
});
