import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import {
	isSignedByLinear,
	runRequest,
	startRoutine
} from '$lib/features/ticket-flow/linear-webhook';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.text();
	const signature = request.headers.get('linear-signature');
	if (!(await isSignedByLinear(body, signature, env.LINEAR_WEBHOOK_SECRET))) error(401);

	const text = runRequest(JSON.parse(body));
	if (text) await startRoutine(text, env.ROUTINE_FIRE_URL!, env.ROUTINE_TOKEN!);
	return new Response(null, { status: 204 });
};
