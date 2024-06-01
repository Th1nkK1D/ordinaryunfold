<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import { createEventDispatcher } from 'svelte';
	import type { ContentBlock } from '../_data';
	import SpeechBox from './speech-box.svelte';
	import NewsBox from './news-box.svelte';

	export let contentBlock: Omit<ContentBlock, 'id' | 'type' | 'date'>;
	export let type: 'speech' | 'news';
	export let isActive: boolean = false;
	export let date: Date;

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
		class="md:my-30 my-24 space-y-12 transition-opacity duration-300 ease-in-out {isActive
			? ''
			: 'opacity-15'}"
		bind:this={container}
	>
		<p class="text-center font-head text-xl text-sky-700">
			[ {date.toLocaleDateString('TH-th', { dateStyle: 'medium' })} ]
		</p>

		{#if type === 'speech'}
			<SpeechBox {...contentBlock} />
		{:else}
			<NewsBox {...contentBlock} />
		{/if}
	</div>
</IntersectionObserver>
