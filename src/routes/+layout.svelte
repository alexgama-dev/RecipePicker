<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>FoodThing</title>
</svelte:head>

<main>
	{@render children()}
</main>

<style>
	:global(:root) {
		color-scheme: light dark;
		font-family: system-ui, sans-serif;
		line-height: 1.5;
	}

	:global(body) {
		margin: 0;
	}

	main {
		max-width: 40rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}
</style>
