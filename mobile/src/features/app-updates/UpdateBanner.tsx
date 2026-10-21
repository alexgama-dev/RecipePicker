import * as Updates from 'expo-updates';
import { useEffect } from 'react';
import { AppState, Pressable, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useColors } from '@/theme';

async function fetchIfAvailable() {
	const { isAvailable } = await Updates.checkForUpdateAsync();
	if (isAvailable) await Updates.fetchUpdateAsync();
}

// expo-updates only checks on a cold start, so also check whenever the app comes back to the foreground.
export function UpdateBanner() {
	const c = useColors();
	const { isUpdatePending } = Updates.useUpdates();

	useEffect(() => {
		if (!Updates.isEnabled) return;
		const sub = AppState.addEventListener('change', (state) => {
			if (state === 'active') fetchIfAvailable().catch(() => {});
		});
		return () => sub.remove();
	}, []);

	if (!isUpdatePending) return null;
	return (
		<SafeAreaView edges={['bottom']} style={{ backgroundColor: c.teal }}>
			<Pressable role="button" onPress={() => Updates.reloadAsync()} style={styles.banner}>
				<Text style={[styles.text, { color: c.surface }]}>New version ready, tap to restart</Text>
			</Pressable>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	banner: { padding: 12 },
	text: { fontSize: 16, fontWeight: '600', textAlign: 'center' }
});
