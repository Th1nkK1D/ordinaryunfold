<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { createEventDispatcher } from 'svelte';
	import type { ContentBlock } from '../_data/content';
	import SpeechBox from './speech-box.svelte';
	import NewsBox from './news-box.svelte';

	export let contentBlock: Omit<ContentBlock, 'id' | 'type'>;
	export let type: 'speech' | 'news';
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
		{#if type === 'speech'}
			<SpeechBox {...contentBlock} />
		{:else}
			<NewsBox {...contentBlock} />
		{/if}
	</div>
</IntersectionObserver>
