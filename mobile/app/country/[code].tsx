import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { findCountry } from '@recipe-roulette/food-data';
import { CountryDetails } from '@/features/country/CountryDetails';
import { useColors } from '@/theme';

export default function CountryScreen() {
	const { code } = useLocalSearchParams<{ code: string }>();
	const country = findCountry(code);
	const c = useColors();
	if (!country) return <Text style={{ color: c.text }}>Country not found</Text>;
	return (
		<>
			<Stack.Screen options={{ title: country.name }} />
			<CountryDetails country={country} />
		</>
	);
}
