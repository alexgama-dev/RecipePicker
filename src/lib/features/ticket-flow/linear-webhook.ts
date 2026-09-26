export const TriggerStatus = {
	NeedsProposal: 'Needs proposal',
	Approved: 'Approved',
	ChangesRequested: 'Changes requested'
} as const;

const triggerStatuses: string[] = Object.values(TriggerStatus);
const alexUserId = 'f301f531-a00f-44b6-a488-594f7f27eb26';

export type LinearWebhook = {
	type: string;
	action: string;
	webhookTimestamp: number;
	actor?: { id: string };
	data: { identifier: string; state: { name: string } };
	updatedFrom?: { stateId?: string };
};

export async function isSignedByLinear(
	body: string,
	signature: string | null,
	secret: string | undefined
) {
	if (!secret || !signature) return false;
	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		'raw',
		encoder.encode(secret),
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['verify']
	);
	const signatureBytes = Uint8Array.from(signature.match(/../g) ?? [], (byte) =>
		parseInt(byte, 16)
	);
	return crypto.subtle.verify('HMAC', key, signatureBytes, encoder.encode(body));
}

// Returns the routine's fire text, or undefined when the webhook shouldn't start a run.
export function runRequest(event: LinearWebhook, now = Date.now()) {
	const statusChanged =
		event.type === 'Issue' && event.action === 'update' && event.updatedFrom?.stateId;
	const byAlex = event.actor?.id === alexUserId;
	const recent = Math.abs(now - event.webhookTimestamp) <= 60_000;
	if (statusChanged && byAlex && recent && triggerStatuses.includes(event.data.state.name)) {
		return `${event.data.identifier} → ${event.data.state.name}`;
	}
}

export async function startRoutine(text: string, fireUrl: string, token: string) {
	const response = await fetch(fireUrl, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${token}`,
			'anthropic-beta': 'experimental-cc-routine-2026-04-01',
			'anthropic-version': '2023-06-01',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text })
	});
	if (!response.ok) throw new Error(`Routine fire failed: ${response.status}`);
}
