<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { pickCountry } from './countries';

	let { label = 'Spin', currentCode }: { label?: string; currentCode?: string } = $props();

	function spin() {
		const { code } = pickCountry(currentCode);
		goto(resolve('/country/[code]', { code: code.toLowerCase() }));
	}
</script>

<button onclick={spin}>{label}</button>

<style>
	button {
		padding: 0.75rem 2rem;
		border: none;
		border-radius: 999px;
		background: #e8590c;
		color: white;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	button:hover {
		background: #d9480f;
	}
</style>
