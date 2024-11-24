<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="flex h-full w-full flex-col gap-1">
	<div class="flex flex-row">
		<div class="flex-1">0%</div>
		<div>Positive Reviews (%)</div>
		<div class="flex-1 text-right">100%</div>
	</div>
	<div class="relative min-h-8 border-l border-r border-neutral-400">
		{#if children}
			{@render children()}
		{:else}
			<div class="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-400"></div>
		{/if}
	</div>
	<div class="flex flex-row">
		<div class="flex-1">Tend to be bad</div>
		<div>Tend to be good</div>
	</div>
</div>

<style lang="postcss" scope>
	div {
		font-family: 'Libre Baskerville', serif;
		@apply text-sm text-neutral-500;
	}
</style>
