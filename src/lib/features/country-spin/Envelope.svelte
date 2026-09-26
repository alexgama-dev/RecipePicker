<script lang="ts">
	import { prefersReducedMotion } from 'svelte/motion';
	import type { Continent } from './countries';

	let { continent, onopen }: { continent: Continent; onopen: () => void } = $props();

	let opening = $state(false);

	function open() {
		if (prefersReducedMotion.current) {
			onopen();
			return;
		}
		opening = true;
	}
</script>

<button
	class="envelope"
	class:opening
	disabled={opening}
	aria-label="Open envelope from {continent}"
	onclick={open}
>
	<span class="body">{continent}</span>
	<span class="flap" ontransitionend={onopen}></span>
</button>

<style>
	.envelope {
		position: relative;
		width: min(20rem, 100%);
		aspect-ratio: 3 / 2;
		/* Room for the flap once it has rotated open above the envelope. */
		margin-top: 7.5rem;
		padding: 0;
		border: none;
		background: none;
		color: #3b2f1e;
		font: inherit;
		perspective: 800px;
		cursor: pointer;
		transition: translate 150ms;
	}

	.envelope:hover:not(:disabled) {
		translate: 0 -4px;
	}

	.envelope:disabled {
		cursor: default;
	}

	.body {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: end center;
		padding-bottom: 1.5rem;
		border-radius: 0.5rem;
		background: #f4e4c1;
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
		font-size: 1.5rem;
		font-weight: 600;
	}

	.flap {
		position: absolute;
		inset: 0 0 45% 0;
		background: #e9d3a3;
		clip-path: polygon(0 0, 100% 0, 50% 100%);
		transform-origin: top;
		transition: transform 500ms ease-in;
	}

	.opening .flap {
		transform: rotateX(180deg);
	}
</style>
