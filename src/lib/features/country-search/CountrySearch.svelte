<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Country } from '$lib/features/country-spin/countries';
	import { searchCountries } from './search';

	let query = $state('');
	let open = $state(false);
	let active = $state(0);
	const results = $derived(searchCountries(query));
	const expanded = $derived(open && query.trim() !== '');

	function choose(country: Country) {
		goto(resolve('/country/[code]', { code: country.code.toLowerCase() }));
	}

	function onkeydown(event: KeyboardEvent) {
		if (event.key === 'ArrowDown' && results.length) active = (active + 1) % results.length;
		else if (event.key === 'ArrowUp' && results.length)
			active = (active - 1 + results.length) % results.length;
		else if (event.key === 'Enter' && results[active]) choose(results[active]);
		else if (event.key === 'Escape') open = false;
		else return;
		event.preventDefault();
	}
</script>

<div class="search">
	<svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
		<circle cx="11" cy="11" r="7" />
		<path d="m20 20-4-4" />
	</svg>
	<input
		type="search"
		role="combobox"
		aria-label="Search a country"
		aria-autocomplete="list"
		aria-expanded={expanded}
		aria-controls="country-results"
		aria-activedescendant={expanded && results[active]
			? `country-${results[active].code}`
			: undefined}
		placeholder="Search a country…"
		autocomplete="off"
		bind:value={query}
		oninput={() => ((open = true), (active = 0))}
		onfocus={() => (open = true)}
		onblur={() => (open = false)}
		{onkeydown}
	/>
	{#if expanded}
		<ul id="country-results" role="listbox" aria-label="Countries">
			{#each results as country, i (country.code)}
				<li
					id="country-{country.code}"
					role="option"
					aria-selected={i === active}
					onpointerdown={(event) => {
						// Stop the input's blur from closing the list before the choice lands.
						event.preventDefault();
						choose(country);
					}}
					onpointerenter={() => (active = i)}
				>
					<span class="code">{country.code}</span>
					<span class="name">{country.name}</span>
					<span class="continent">{country.continent}</span>
				</li>
			{:else}
				<li class="empty">No countries match "{query.trim()}"</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.search {
		position: relative;
		margin: 1.5rem 0 2rem;
	}

	.icon {
		position: absolute;
		top: 50%;
		left: 1.25rem;
		width: 1.25rem;
		height: 1.25rem;
		translate: 0 -50%;
		fill: none;
		stroke: currentColor;
		stroke-width: 2;
		stroke-linecap: round;
		opacity: 0.55;
		pointer-events: none;
	}

	input {
		box-sizing: border-box;
		width: 100%;
		padding: 0.9rem 1.25rem 0.9rem 3.25rem;
		border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
		border-radius: 999px;
		background: Canvas;
		color: inherit;
		font: inherit;
		font-size: 1.125rem;
		box-shadow: 0 2px 8px color-mix(in srgb, currentColor 10%, transparent);
		transition:
			border-color 150ms,
			box-shadow 150ms;
	}

	input:focus {
		outline: none;
		border-color: #0b7285;
		box-shadow: 0 0 0 4px color-mix(in srgb, #0b7285 25%, transparent);
	}

	ul {
		position: absolute;
		z-index: 1;
		top: calc(100% + 0.5rem);
		right: 0;
		left: 0;
		max-height: 18rem;
		margin: 0;
		padding: 0.375rem;
		overflow-y: auto;
		border: 1px solid color-mix(in srgb, currentColor 15%, transparent);
		border-radius: 1rem;
		background: Canvas;
		box-shadow: 0 8px 24px color-mix(in srgb, currentColor 15%, transparent);
		list-style: none;
	}

	li {
		display: flex;
		gap: 0.75rem;
		align-items: center;
		padding: 0.5rem 0.75rem;
		border-radius: 0.625rem;
		cursor: pointer;
	}

	li[aria-selected='true'] {
		background: color-mix(in srgb, #0b7285 15%, transparent);
	}

	.code {
		min-width: 2rem;
		padding: 0.125rem 0.25rem;
		border: 1px dashed #e8590c;
		border-radius: 0.25rem;
		color: #e8590c;
		font-size: 0.75rem;
		font-weight: 700;
		text-align: center;
	}

	.name {
		flex: 1;
		font-weight: 500;
	}

	.continent {
		font-size: 0.875rem;
		opacity: 0.6;
	}

	.empty {
		cursor: default;
		opacity: 0.7;
	}
</style>
