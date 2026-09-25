<script lang="ts">
	import CountryDetails from '$lib/features/country-spin/CountryDetails.svelte';
	import SpinButton from '$lib/features/country-spin/SpinButton.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.country.name} · FoodThing</title>
</svelte:head>

<CountryDetails country={data.country} />
<SpinButton label="Spin again" currentCode={data.country.code} />
