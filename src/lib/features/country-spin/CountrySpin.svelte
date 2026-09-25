<script lang="ts">
	import { countries, type Country } from './countries';
	import { pickRandom } from './random';

	let country = $state<Country>();
</script>

<button onclick={() => (country = pickRandom(countries))}>Spin</button>

{#if country}
	<h2>{country.name}</h2>
	<ul>
		{#each country.dishes as dish (dish.name)}
			<li><strong>{dish.name}</strong>: {dish.description}</li>
		{/each}
	</ul>
{/if}
