import { renderHook } from '@testing-library/react-native';
import * as ReactNative from 'react-native';
import { useColors } from './theme';

it('uses different colours in dark mode', async () => {
	const scheme = jest.spyOn(ReactNative, 'useColorScheme');

	scheme.mockReturnValue('light');
	const { result: light } = await renderHook(() => useColors());
	scheme.mockReturnValue('dark');
	const { result: dark } = await renderHook(() => useColors());

	expect(dark.current.background).not.toBe(light.current.background);
	expect(dark.current.text).not.toBe(light.current.text);
});
