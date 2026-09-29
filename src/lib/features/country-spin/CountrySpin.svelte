<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Envelope from './Envelope.svelte';
	import Postcard from './Postcard.svelte';
	import WorldMap from './WorldMap.svelte';
	import { pickContinent, pickCountries, type Continent, type Country } from './countries';

	const PhaseName = {
		Idle: 'idle',
		Continent: 'continent',
		Postcards: 'postcards'
	} as const;

	type Phase =
		| { name: typeof PhaseName.Idle }
		| { name: typeof PhaseName.Continent; continent: Continent }
		| { name: typeof PhaseName.Postcards; continent: Continent; options: Country[] };

	let { onspin }: { onspin?: () => void } = $props();

	let phase = $state<Phase>({ name: PhaseName.Idle });
	let litContinent = $state<Continent>();

	function spin() {
		litContinent = undefined;
		phase = { name: PhaseName.Continent, continent: pickContinent() };
		onspin?.();
	}

	function openEnvelope(continent: Continent) {
		phase = { name: PhaseName.Postcards, continent, options: pickCountries(continent, 3) };
	}

	function choose(country: Country) {
		goto(resolve('/country/[code]', { code: country.code.toLowerCase() }));
	}
</script>

<WorldMap dimmed={phase.name !== PhaseName.Idle} highlight={litContinent} />

{#if phase.name === PhaseName.Idle}
	<button class="action" onclick={spin}>Spin Random</button>
{:else if phase.name === PhaseName.Continent}
	{@const continent = phase.continent}
	<p>Your postcards are from…</p>
	<Envelope
		{continent}
		onreveal={() => (litContinent = continent)}
		onopen={() => openEnvelope(continent)}
	/>
{:else}
	<h2>Pick a postcard from {phase.continent}</h2>
	<ul>
		{#each phase.options as country, index (country.code)}
			<li>
				<Postcard {country} {index} onchoose={() => choose(country)} />
			</li>
		{/each}
	</ul>
{/if}

<style>
	.action {
		display: block;
		margin: 0 auto;
		padding: 0.75rem 2rem;
		border: 2px solid #0b7285;
		border-radius: 999px;
		background: Canvas;
		color: #0b7285;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	.action:hover {
		background: #0b7285;
		color: white;
	}

	ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 1rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}
</style>
