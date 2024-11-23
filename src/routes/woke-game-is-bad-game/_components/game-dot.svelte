<script lang="ts">
	import { createTooltip } from '@melt-ui/svelte';
	import { fade } from 'svelte/transition';
	import type { Game } from '../game';

	let { name, woke, releaseYear, steamAppPath }: Game = $props();

	let bgClass = $derived(
		woke.level === 0 ? 'bg-blue-500' : woke.level === 1 ? 'bg-purple-500' : 'bg-red-500'
	);

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
</script>

<button {...$trigger} use:trigger class="size-2 rounded-full {bgClass}" aria-label={name}></button>

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
