<script lang="ts">
	import { continentDesigns, continents, type Continent } from './countries';
	import { continentPaths, viewBox } from './world-map';

	let { dimmed, highlight }: { dimmed: boolean; highlight?: Continent } = $props();
</script>

<svg class="world-map" class:dimmed {viewBox} aria-hidden="true">
	{#each continents as continent (continent)}
		<path
			d={continentPaths[continent]}
			class:lit={continent === highlight}
			style:--colour={continentDesigns[continent].colour}
		/>
	{/each}
</svg>

<style>
	.world-map {
		position: fixed;
		inset: 0;
		z-index: -1;
		width: 100%;
		height: 100%;
	}

	path {
		/* A faint tint of the text colour, so the map works in light and dark mode. */
		fill: color-mix(in srgb, currentColor 12%, transparent);
		transition:
			fill 600ms,
			opacity 400ms;
	}

	.dimmed path:not(.lit) {
		opacity: 0.5;
	}

	.lit {
		fill: var(--colour);
	}

	@media (prefers-reduced-motion: reduce) {
		path {
			transition: none;
		}
	}
</style>
