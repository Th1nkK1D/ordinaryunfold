<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let nextLabel = 'Next';
	export let canSkip = false;

	const dispatch = createEventDispatcher();
</script>

<div class="absolute inset-2 flex flex-col items-center justify-around">
	<div class="flex max-w-lg flex-col gap-6 bg-black/70 p-3 text-white">
		<p><slot /></p>
		<div class="flex flex-row items-center {canSkip ? 'justify-between' : 'justify-end'}">
			{#if canSkip}
				<button
					class="py-1 underline opacity-70 hover:opacity-100"
					on:click={() => dispatch('skip')}>skip</button
				>
			{/if}
			<button
				class="border border-white px-3 py-1 hover:bg-white hover:text-gray-800"
				on:click={() => dispatch('next')}>{nextLabel}</button
			>
		</div>
	</div>
</div>
