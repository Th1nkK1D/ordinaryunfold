<script lang="ts">
	import { type Snippet } from 'svelte';

	interface Props {
		nextLabel?: string;
		canSkip?: boolean;
		children?: Snippet;
		onskip?: () => unknown;
		onnext?: () => unknown;
	}

	let { nextLabel = 'Next', canSkip = false, children, onskip, onnext }: Props = $props();
</script>

<div class="absolute inset-2 flex flex-col items-center justify-around">
	<div class="flex max-w-lg flex-col gap-6 bg-black/70 p-3 text-white">
		<p>{@render children?.()}</p>
		<div class="flex flex-row items-center {canSkip ? 'justify-between' : 'justify-end'}">
			{#if canSkip}
				<button class="py-1 underline opacity-70 hover:opacity-100" onclick={onskip}>skip</button>
			{/if}
			<button
				class="border border-white px-3 py-1 hover:bg-white hover:text-gray-800"
				onclick={onnext}>{nextLabel}</button
			>
		</div>
	</div>
</div>
