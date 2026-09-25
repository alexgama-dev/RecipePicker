<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import Postcard from './Postcard.svelte';
	import { pickContinent, pickCountries, type Continent, type Country } from './countries';

	let { label = 'Spin' }: { label?: string } = $props();

	type Phase =
		| { name: 'idle' }
		| { name: 'continent'; continent: Continent }
		| { name: 'postcards'; continent: Continent; options: Country[] };

	let phase = $state<Phase>({ name: 'idle' });

	function spin() {
		phase = { name: 'continent', continent: pickContinent() };
	}

	function openEnvelope(continent: Continent) {
		phase = { name: 'postcards', continent, options: pickCountries(continent, 3) };
	}

	function choose(country: Country) {
		phase = { name: 'idle' };
		goto(resolve('/country/[code]', { code: country.code.toLowerCase() }));
	}
</script>

{#if phase.name === 'idle'}
	<button class="action" onclick={spin}>{label}</button>
{:else if phase.name === 'continent'}
	{@const continent = phase.continent}
	<p>Your postcards are from…</p>
	<h2>{continent}</h2>
	<button class="action" onclick={() => openEnvelope(continent)}>Open the envelope</button>
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
		padding: 0.75rem 2rem;
		border: none;
		border-radius: 999px;
		background: #e8590c;
		color: white;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
	}

	.action:hover {
		background: #d9480f;
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
