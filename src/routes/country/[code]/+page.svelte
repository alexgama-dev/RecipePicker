<script lang="ts">
	import { resolve } from '$app/paths';
	import CountryDetails from '$lib/features/country-spin/CountryDetails.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.country.name} · Recipe Roulette</title>
</svelte:head>

<CountryDetails country={data.country} />
<a href={resolve('/')}>← Back</a>
