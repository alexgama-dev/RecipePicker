<script lang="ts">
	import { backOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fly } from 'svelte/transition';
	import type { Country } from './countries';

	let { country, index, onchoose }: { country: Country; index: number; onchoose: () => void } =
		$props();

	const dealDuration = 400;
	const dealStagger = 150;
	const dealDelay = $derived(index * dealStagger);
	const flipDelay = $derived(dealDelay + dealDuration + 200);
</script>

<button
	class="postcard"
	style:--flip-delay="{flipDelay}ms"
	onclick={onchoose}
	in:fly|global={{
		y: 200,
		delay: prefersReducedMotion.current ? 0 : dealDelay,
		duration: prefersReducedMotion.current ? 0 : dealDuration,
		easing: backOut
	}}
>
	<span class="card">
		<span class="face front">
			<span class="stamp">{country.code}</span>
			<span class="name">{country.name}</span>
		</span>
		<span class="face back" aria-hidden="true">
			<span class="label">POST CARD</span>
			<span class="lines"></span>
		</span>
	</span>
</button>

<style>
	.postcard {
		display: grid;
		width: 100%;
		aspect-ratio: 3 / 2;
		padding: 0;
		border: none;
		background: none;
		color: inherit;
		font: inherit;
		perspective: 800px;
		cursor: pointer;
		transition: translate 150ms;
	}

	.postcard:hover {
		translate: 0 -4px;
	}

	.card {
		position: relative;
		transform-style: preserve-3d;
		animation: flip 600ms ease-in-out var(--flip-delay) both;
	}

	@keyframes flip {
		from {
			transform: rotateY(180deg);
		}
		to {
			transform: rotateY(0);
		}
	}

	.face {
		position: absolute;
		inset: 0;
		border: 1px solid color-mix(in srgb, currentColor 20%, transparent);
		border-radius: 0.5rem;
		background: Canvas;
		backface-visibility: hidden;
	}

	.postcard:hover .front {
		border-color: #e8590c;
	}

	.front {
		display: grid;
		place-items: center;
	}

	.name {
		font-size: 1.125rem;
		font-weight: 600;
	}

	.stamp {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.25rem 0.375rem;
		border: 2px dashed #e8590c;
		font-size: 0.75rem;
		font-weight: 600;
	}

	.back {
		transform: rotateY(180deg);
	}

	.label {
		position: absolute;
		top: 0.5rem;
		left: 0.75rem;
		font-size: 0.75rem;
		letter-spacing: 0.2em;
		opacity: 0.6;
	}

	/* Divider down the middle, address lines on the right, like the back of a real postcard. */
	.lines {
		position: absolute;
		inset: 2rem 0.75rem 0.75rem 50%;
		border-left: 1px solid color-mix(in srgb, currentColor 30%, transparent);
		background: repeating-linear-gradient(
				transparent 0 calc(1.25rem - 1px),
				color-mix(in srgb, currentColor 30%, transparent) calc(1.25rem - 1px) 1.25rem
			)
			0.75rem 0 / calc(100% - 0.75rem) 100% no-repeat;
	}

	@media (prefers-reduced-motion: reduce) {
		.card {
			animation: none;
		}
	}
</style>
