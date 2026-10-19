import { useColorScheme } from 'react-native';

const light = {
	teal: '#0b7285',
	text: '#212529',
	muted: '#495057',
	border: '#dee2e6',
	background: '#f1f3f5',
	surface: '#ffffff'
} as const;

const dark = {
	teal: '#3bc9db',
	text: '#f1f3f5',
	muted: '#adb5bd',
	border: '#373a40',
	background: '#101113',
	surface: '#1a1b1e'
};

export type Colors = { [K in keyof typeof light]: string };

export function useColors(): Colors {
	return useColorScheme() === 'dark' ? dark : light;
}
