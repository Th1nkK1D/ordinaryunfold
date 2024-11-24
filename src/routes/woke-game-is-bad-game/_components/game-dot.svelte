<script lang="ts">
	import { createTooltip } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import { wokeLevelMap, type Game } from '../game';

	let { name, woke, releaseYear, positivePercent, steamAppPath }: Game = $props();

	const {
		elements: { trigger, content, arrow },
		states: { open }
	} = createTooltip({
		positioning: {
			placement: 'top',
			gutter: 1
		},
		openDelay: 0,
		closeDelay: 0,
		group: 'game'
	});

	let { label, bgClass, textClass } = $derived(wokeLevelMap[woke.level]);
</script>

<button {...$trigger} use:trigger class="size-[6px] rounded-full {bgClass}" aria-label={name}
></button>

{#if $open}
	<div
		{...$content}
		use:content
		transition:fade={{ duration: 100 }}
		class="z-10 max-w-72 rounded-lg bg-zinc-900 text-neutral-50 shadow"
	>
		<div {...$arrow} use:arrow></div>
		<div class="flex flex-col gap-2 rounded px-3 py-2">
			<p><span class="font-bold">{name}</span> ({releaseYear})</p>
			<p class="italic">
				<span class="font-bold {textClass}">{label}</span>
				- {positivePercent}% positive reviews
			</p>
			{#if woke.explanation}
				<p class="text-sm">{woke.explanation}</p>
			{/if}
			<a
				class="self-end text-sm underline opacity-70 hover:opacity-100"
				href="https://store.steampowered.com/app/{steamAppPath}"
				target="_blank"
				rel="noopener noreferrer">View on Steam</a
			>
		</div>
	</div>
{/if}
