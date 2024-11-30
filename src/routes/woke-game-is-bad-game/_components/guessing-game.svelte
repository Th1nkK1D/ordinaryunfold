<script lang="ts">
	import { fade, slide } from 'svelte/transition';
	import { wokeLevelMap, type Game } from '../game';
	import BeeswarmChart from './beeswarm-chart.svelte';
	import { draggable } from '@neodrag/svelte';

	interface Props {
		games: Game[];
	}

	let { games }: Props = $props();

	let contentBoxSize = $state<ResizeObserverSize[]>();
	let selectedPosition = $state(100);
	let isGuessing = $state(true);
	let result = $state<{ correct: number; total: number }>();

	let mean = $derived(
		Math.round(games.reduce((sum, { positivePercent }) => sum + positivePercent, 0) / games.length)
	);

	let selectedPercent = $derived(
		contentBoxSize ? Math.round((selectedPosition / contentBoxSize[0].inlineSize) * 100) : 0
	);

	$effect(() => {
		if (contentBoxSize && isGuessing) {
			selectedPosition = Math.round((mean / 100) * contentBoxSize[0].inlineSize);
		}
	});

	function submit() {
		result = games.reduce(
			(result, { woke: { level }, positivePercent }) => {
				if (level !== 1) {
					result.total++;

					if (
						(level === 0 && positivePercent >= selectedPercent) ||
						(level === 2 && positivePercent <= selectedPercent)
					) {
						result.correct++;
					}
				}

				return result;
			},
			{ correct: 0, total: 0 }
		);

		isGuessing = false;
	}
</script>

<div class="relative py-6" role="presentation" bind:contentBoxSize>
	{#if isGuessing || result}
		<div transition:fade class="absolute inset-x-0 inset-y-6 flex flex-row">
			<div
				class="transition-opacity {wokeLevelMap[2].bgClass} {result ? 'opacity-15' : 'opacity-25'}"
				style="width: {selectedPosition}px;"
			></div>
			<div
				class="flex-1 transition-opacity {wokeLevelMap[0].bgClass} {result
					? 'opacity-15'
					: 'opacity-25'}"
			></div>
		</div>
	{/if}

	<BeeswarmChart groups={[{ games, mean }]} disabled={isGuessing} />

	{#if isGuessing}
		<div transition:fade class="absolute inset-x-0 inset-y-6 z-10 flex select-none flex-row">
			<p class="area-label" style="width: {selectedPosition}px;">
				Mostly<br />Overty Woke
			</p>
			<p class="area-label flex-1">
				Mostly<br />Not Woke
			</p>
		</div>
	{/if}

	{#if isGuessing || result}
		<div
			transition:fade
			class="absolute inset-y-0 z-20 flex flex-row justify-center text-zinc-100 transition-opacity {isGuessing
				? 'cursor-move'
				: 'pointer-events-none opacity-40'}"
			use:draggable={{
				axis: 'x',
				bounds: 'parent',
				onDrag: (e) => (selectedPosition = e.offsetX),
				position: { x: selectedPosition, y: 0 },
				disabled: !isGuessing
			}}
		>
			<!-- For bigger dragging area -->
			<div class="absolute inset-y-0 w-8"></div>
			<div class="w-[2px] bg-neutral-950"></div>
			<div class="absolute -top-1 rounded bg-neutral-950 px-1 text-sm font-bold">
				{selectedPercent}%
			</div>
			{#if isGuessing}
				<div class="absolute inset-y-1/2 size-5 -translate-y-1/2 rounded-full bg-neutral-950">
					<svg class="w-full fill-current" viewBox="0 0 24 24"
						><path
							d="m7 17l-5-5l5-5l1.4 1.4L5.825 11h12.35L15.6 8.4L17 7l5 5l-5 5l-1.4-1.4l2.575-2.6H5.825L8.4 15.6z"
						/></svg
					>
				</div>
			{/if}
		</div>
	{/if}
</div>

{#if isGuessing}
	<div class="flex flex-row justify-center gap-4">
		<button onclick={submit} class="bg-neutral-950 font-bold text-zinc-100 hover:bg-neutral-600">
			See the result
		</button>
		<button onclick={() => (isGuessing = false)} class="hover:bg-zinc-200">Just tell me</button>
	</div>
{:else}
	<p transition:slide class="mx-auto max-w-screen-md indent-8">
		{#if result}
			{@const { correct, total } = result}
			That's {Math.round((correct / total) * 100)}% ({correct}/{total}) corrected,
			<span class="font-bold">but you still guess {total - correct} games wrong.</span> Unfortunatedly,
		{:else}
			Don't worry, because actually,
		{/if}
		positive review cannot clearly separate overty woke and not woke games.
	</p>
{/if}

<style lang="postcss">
	.area-label {
		@apply flex items-center justify-center overflow-hidden text-center text-2xl font-bold;
		text-shadow: 0 0 20px white;
	}

	button {
		@apply rounded border-2 border-zinc-950 px-4 py-2;
	}
</style>
