import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useColors } from '@/theme';

export default function RootLayout() {
	const c = useColors();
	const base = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme;
	const theme = {
		...base,
		colors: {
			...base.colors,
			primary: c.teal,
			background: c.background,
			card: c.surface,
			text: c.text,
			border: c.border
		}
	};

	return (
		<ThemeProvider value={theme}>
			<StatusBar style="auto" />
			<Stack>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="country/[code]" />
				<Stack.Screen name="dish/[slug]" />
			</Stack>
		</ThemeProvider>
	);
}
