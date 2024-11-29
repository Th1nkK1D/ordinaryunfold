<script lang="ts">
	import type { Snippet } from 'svelte';
	import { wokeLevelMap } from '../game';
	import { fade } from 'svelte/transition';

	interface Props {
		legendMap?: typeof wokeLevelMap;
		xStarted?: number;
		hideAxisHint?: boolean;
		children?: Snippet;
	}

	let { legendMap = [], xStarted = 0, hideAxisHint, children }: Props = $props();
</script>

<div class="z-10 flex h-full w-full flex-col gap-1">
	<div class="flex flex-row">
		<span class="flex-1">{xStarted}%</span>
		<span>Positive Reviews (%)</span>
		<span class="flex-1 text-right">100%</span>
	</div>
	<div class="relative min-h-8 border-l border-r border-neutral-400">
		{#if children}
			{@render children()}
		{:else}
			<div class="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-400"></div>
		{/if}
		{#if legendMap.length > 0}
			<div
				transition:fade
				class="absolute bottom-2 left-3 flex flex-col rounded border border-zinc-300 bg-zinc-100 px-2 py-1 md:bottom-4 md:left-6"
			>
				{#each legendMap as { label, bgClass }}
					<div class="flex flex-row items-center gap-2">
						<div class="size-2 rounded-full {bgClass}"></div>
						<div class="font-body text-sm">{label}</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
	{#if !hideAxisHint}
		<div class="flex flex-row">
			<span class="flex-1">Tend to be bad</span>
			<span>Tend to be good</span>
		</div>
	{/if}
</div>

<style lang="postcss" scope>
	span {
		font-family: 'Libre Baskerville', serif;
		@apply text-sm text-neutral-500;
	}
</style>
