import { act, render, screen, userEvent } from '@testing-library/react-native';
import * as Updates from 'expo-updates';
import { AppState, type AppStateStatus } from 'react-native';
import { UpdateBanner } from './UpdateBanner';

jest.mock('expo-updates', () => ({
	isEnabled: true,
	useUpdates: jest.fn(),
	checkForUpdateAsync: jest.fn(),
	fetchUpdateAsync: jest.fn(),
	reloadAsync: jest.fn()
}));

const mocked = jest.mocked(Updates);
const label = 'New version ready, tap to restart';

function pending(isUpdatePending: boolean) {
	mocked.useUpdates.mockReturnValue({ isUpdatePending } as ReturnType<typeof Updates.useUpdates>);
}

beforeEach(() => {
	jest.clearAllMocks();
	mocked.checkForUpdateAsync.mockResolvedValue({ isAvailable: true } as Updates.UpdateCheckResult);
});

it('shows nothing when no update is pending', async () => {
	pending(false);
	await render(<UpdateBanner />);
	expect(screen.queryByText(label)).toBeNull();
});

it('restarts into the update when tapped', async () => {
	pending(true);
	await render(<UpdateBanner />);
	await userEvent.press(screen.getByText(label));
	expect(mocked.reloadAsync).toHaveBeenCalled();
});

it('fetches an available update when the app returns to the foreground', async () => {
	const listen = jest.spyOn(AppState, 'addEventListener');
	pending(false);
	await render(<UpdateBanner />);
	const onChange = listen.mock.calls[0][1] as (state: AppStateStatus) => void;

	await act(async () => onChange('active'));
	expect(mocked.checkForUpdateAsync).toHaveBeenCalled();
	expect(mocked.fetchUpdateAsync).toHaveBeenCalled();
});
