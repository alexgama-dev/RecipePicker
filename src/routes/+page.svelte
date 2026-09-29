<script lang="ts">
	import CountrySearch from '$lib/features/country-search/CountrySearch.svelte';
	import CountrySpin from '$lib/features/country-spin/CountrySpin.svelte';

	let spinning = $state(false);
</script>

<svelte:head>
	<title>Recipe Roulette</title>
</svelte:head>

<h1>Recipe Roulette</h1>
{#if !spinning}
	<CountrySearch />
	<p class="or">or</p>
{/if}
<CountrySpin onspin={() => (spinning = true)} />

<style>
	h1 {
		text-align: center;
	}

	.or {
		display: flex;
		gap: 1rem;
		align-items: center;
		margin: 0 0 1.5rem;
		font-size: 0.875rem;
		opacity: 0.6;
	}

	.or::before,
	.or::after {
		content: '';
		flex: 1;
		border-top: 1px solid currentColor;
		opacity: 0.4;
	}
</style>
