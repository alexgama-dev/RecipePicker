import { Stack, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { findCountry } from '@recipe-roulette/food-data';
import { CountryDetails } from '@/features/country/CountryDetails';

export default function CountryScreen() {
	const { code } = useLocalSearchParams<{ code: string }>();
	const country = findCountry(code);
	if (!country) return <Text>Country not found</Text>;
	return (
		<>
			<Stack.Screen options={{ title: country.name }} />
			<CountryDetails country={country} />
		</>
	);
}
