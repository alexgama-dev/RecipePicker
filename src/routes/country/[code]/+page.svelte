<script lang="ts">
	import CountryDetails from '$lib/features/country-spin/CountryDetails.svelte';
	import CountrySpin from '$lib/features/country-spin/CountrySpin.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.country.name} · FoodThing</title>
</svelte:head>

<CountryDetails country={data.country} />
<CountrySpin label="Spin again" />
