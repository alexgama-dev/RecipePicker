import { describe, expect, it } from 'vitest';
import { isSignedByLinear, runRequest, TriggerStatus, type LinearWebhook } from './linear-webhook';

const secret = 'test-secret';
const alexUserId = 'f301f531-a00f-44b6-a488-594f7f27eb26';
const now = 1_800_000_000_000;

async function sign(body: string, key = secret) {
	const cryptoKey = await crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(key),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
	);
	const signature = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(body));
	return Buffer.from(signature).toString('hex');
}

function statusChange(status: string, overrides: Partial<LinearWebhook> = {}): LinearWebhook {
	return {
		type: 'Issue',
		action: 'update',
		webhookTimestamp: now,
		actor: { id: alexUserId },
		data: { identifier: 'FOOD-99', state: { name: status } },
		updatedFrom: { stateId: 'previous-state' },
		...overrides
	};
}

describe('isSignedByLinear', () => {
	const body = '{"type":"Issue"}';

	it('accepts a body signed with the secret', async () => {
		expect(await isSignedByLinear(body, await sign(body), secret)).toBe(true);
	});

	it('rejects a tampered body', async () => {
		expect(await isSignedByLinear('{"type":"Other"}', await sign(body), secret)).toBe(false);
	});

	it('rejects a signature made with another secret', async () => {
		expect(await isSignedByLinear(body, await sign(body, 'other-secret'), secret)).toBe(false);
	});

	it('rejects a missing signature', async () => {
		expect(await isSignedByLinear(body, null, secret)).toBe(false);
	});

	it('rejects everything when no secret is configured', async () => {
		expect(await isSignedByLinear(body, await sign(body), undefined)).toBe(false);
	});
});

describe('runRequest', () => {
	it.each(Object.values(TriggerStatus))('starts a run when Alex moves a ticket to %s', (status) => {
		expect(runRequest(statusChange(status), now)).toBe(`FOOD-99 → ${status}`);
	});

	it('ignores status changes made by someone else', () => {
		const event = statusChange(TriggerStatus.Approved, { actor: { id: 'claude-user-id' } });
		expect(runRequest(event, now)).toBeUndefined();
	});

	it('ignores moves into other statuses', () => {
		expect(runRequest(statusChange('Proposal Review'), now)).toBeUndefined();
	});

	it('ignores updates that are not status changes', () => {
		const event = statusChange(TriggerStatus.Approved, { updatedFrom: {} });
		expect(runRequest(event, now)).toBeUndefined();
	});

	it('ignores non-issue events', () => {
		const event = statusChange(TriggerStatus.Approved, { type: 'Comment' });
		expect(runRequest(event, now)).toBeUndefined();
	});

	it('ignores webhooks older than a minute', () => {
		expect(runRequest(statusChange(TriggerStatus.Approved), now + 61_000)).toBeUndefined();
	});
});
