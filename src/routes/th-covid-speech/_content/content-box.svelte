<script lang="ts">
	import IntersectionObserver from 'svelte-intersection-observer';
	import type { ContentBlock } from '../_data';
	import SpeechBox from './speech-box.svelte';
	import NewsBox from './news-box.svelte';

	interface Props {
		contentBlock: Omit<ContentBlock, 'id' | 'type' | 'date'>;
		type: 'speech' | 'news';
		isActive?: boolean;
		date: Date;
		onenter: () => unknown;
		getBoundingClientRect?: () => DOMRect;
	}

	let {
		contentBlock,
		type,
		isActive = false,
		date,
		onenter,
		getBoundingClientRect = $bindable()
	}: Props = $props();

	let container = $state<HTMLElement>();

	$effect(() => {
		getBoundingClientRect = () => container?.getBoundingClientRect() || new DOMRect();
	});
</script>

<IntersectionObserver element={container} rootMargin="-50% 0px" on:intersect={onenter}>
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
