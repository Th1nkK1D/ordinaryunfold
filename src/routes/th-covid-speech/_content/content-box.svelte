<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { createEventDispatcher } from 'svelte';
	import type { ContentBlock } from '../_data/content';
	import SpeechBox from './speech-box.svelte';

	export let contentBlock: ContentBlock;
	export let isActive: boolean = false;

	let container: HTMLElement;

	const dispatch = createEventDispatcher();

	export const getBoundingClientRect = () => container.getBoundingClientRect();
</script>

<IntersectionObserver
	element={container}
	rootMargin="-50% 0px"
	on:intersect={() => dispatch('enter')}
>
	<div
		class="transition-opacity duration-300 ease-in-out {isActive ? '' : 'opacity-15'}"
		bind:this={container}
	>
		{#if contentBlock.type === 'speech'}
			<SpeechBox {...contentBlock} />
		{:else}
			{JSON.stringify(contentBlock)}
		{/if}
	</div>
</IntersectionObserver>
