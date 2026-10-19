import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useColors } from '@/theme';

function tabIcon(name: 'home' | 'shuffle') {
	return function TabIcon({ size, focused }: { size: number; focused: boolean }) {
		const c = useColors();
		return (
			<Ionicons
				name={focused ? name : `${name}-outline`}
				color={focused ? c.teal : c.muted}
				size={size}
			/>
		);
	};
}

export default function TabsLayout() {
	const c = useColors();

	return (
		<Tabs screenOptions={{ tabBarActiveTintColor: c.teal, tabBarInactiveTintColor: c.muted }}>
			<Tabs.Screen name="index" options={{ title: 'Home', tabBarIcon: tabIcon('home') }} />
			<Tabs.Screen name="spin" options={{ title: 'Spin', tabBarIcon: tabIcon('shuffle') }} />
		</Tabs>
	);
}
