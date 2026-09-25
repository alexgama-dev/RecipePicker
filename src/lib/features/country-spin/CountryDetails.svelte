<script lang="ts">
	import type { Country } from './countries';

	let { country }: { country: Country } = $props();
</script>

<h1>{country.name}</h1>
<ul>
	{#each country.dishes as dish (dish.name)}
		<li>
			<h2>{dish.name}</h2>
			<p>{dish.description}</p>
		</li>
	{/each}
</ul>

<style>
	ul {
		display: grid;
		gap: 1rem;
		margin: 0 0 2rem;
		padding: 0;
		list-style: none;
	}

	li {
		padding: 1rem;
		border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
		border-radius: 0.5rem;
	}

	h2 {
		margin: 0 0 0.25rem;
		font-size: 1.125rem;
	}

	p {
		margin: 0;
	}
</style>
