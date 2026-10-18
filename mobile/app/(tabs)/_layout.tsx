import { Tabs } from 'expo-router';
import { colors } from '@/theme';

export default function TabsLayout() {
	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: colors.teal }}>
			<Tabs.Screen name="index" options={{ title: 'Home' }} />
			<Tabs.Screen name="search" options={{ title: 'Search' }} />
			<Tabs.Screen name="spin" options={{ title: 'Spin' }} />
		</Tabs>
	);
}
