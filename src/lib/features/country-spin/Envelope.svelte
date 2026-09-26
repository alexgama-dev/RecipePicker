<script lang="ts">
	import { backOut } from 'svelte/easing';
	import { prefersReducedMotion } from 'svelte/motion';
	import { fly } from 'svelte/transition';
	import { continentDesigns, type Continent } from './countries';

	let {
		continent,
		onreveal,
		onopen
	}: { continent: Continent; onreveal: () => void; onopen: () => void } = $props();

	// Back up → flips to the front → turns back over and opens.
	const Stage = {
		Arriving: 'arriving',
		Flipping: 'flipping',
		Revealed: 'revealed',
		Opening: 'opening'
	} as const;
	type Stage = (typeof Stage)[keyof typeof Stage];

	let stage = $state<Stage>(prefersReducedMotion.current ? Stage.Revealed : Stage.Arriving);

	const design = $derived(continentDesigns[continent]);
	const frontUp = $derived(stage === Stage.Flipping || stage === Stage.Revealed);

	// An effect rather than a call in flipped(), so it also fires when reduced motion starts it revealed.
	$effect(() => {
		if (stage === Stage.Revealed) onreveal();
	});

	function arrived() {
		if (stage === Stage.Arriving) setTimeout(() => (stage = Stage.Flipping), 400);
	}

	function flipped(event: TransitionEvent) {
		if (event.target === event.currentTarget && stage === Stage.Flipping) stage = Stage.Revealed;
	}

	function open() {
		if (prefersReducedMotion.current) {
			onopen();
			return;
		}
		stage = Stage.Opening;
	}
</script>

<button
	class="envelope"
	class:front-up={frontUp}
	class:opening={stage === Stage.Opening}
	disabled={stage !== Stage.Revealed}
	aria-label={stage === Stage.Revealed || stage === Stage.Opening
		? `Open envelope from ${continent}`
		: 'Envelope'}
	style:--colour={design.colour}
	onclick={open}
	in:fly|global={{ y: -200, duration: prefersReducedMotion.current ? 0 : 500, easing: backOut }}
	onintroend={arrived}
>
	<span class="card" ontransitionend={flipped}>
		<span class="face back">
			<span class="flap" ontransitionend={onopen}></span>
		</span>
		<span class="face front">
			<span class="stamp">{design.code}</span>
			<span class="address">{continent}</span>
		</span>
	</span>
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

	.card {
		position: absolute;
		inset: 0;
		transform-style: preserve-3d;
		transition: transform 700ms ease-in-out;
	}

	.front-up .card {
		transform: rotateY(180deg);
	}

	.face {
		position: absolute;
		inset: 0;
		border-radius: 0.5rem;
		background: #f4e4c1;
		box-shadow: 0 4px 12px rgb(0 0 0 / 0.15);
		backface-visibility: hidden;
	}

	/* Keeps the flap's 3D inside the back face, so it hides with it when the front is up. */
	.back {
		perspective: 800px;
	}

	.front {
		display: grid;
		place-items: center;
		transform: rotateY(180deg);
		background:
			linear-gradient(135deg, transparent 0 8%, var(--colour) 8% 14%, transparent 14%), #f4e4c1;
	}

	.address {
		font-size: 1.5rem;
		font-weight: 600;
	}

	.stamp {
		position: absolute;
		top: 0.75rem;
		right: 0.75rem;
		padding: 0.25rem 0.375rem;
		border: 2px dashed var(--colour);
		font-size: 0.75rem;
		font-weight: 600;
	}

	.flap {
		position: absolute;
		inset: 0 0 45% 0;
		background: #e9d3a3;
		clip-path: polygon(0 0, 100% 0, 50% 100%);
		transform-origin: top;
		/* Waits for the card to turn back over before opening. */
		transition: transform 500ms ease-in 700ms;
	}

	.opening .flap {
		transform: rotateX(180deg);
	}
</style>
