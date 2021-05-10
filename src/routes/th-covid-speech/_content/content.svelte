<script lang="ts">
	import type { ContentBlock } from '../_data/content';
	import ContentBox from './content-box.svelte';

	const SCREEN_LG = 1024;
	const MOBILE_OFFSET_TOP = 220;

	export let contentBlocks: ContentBlock[] = [];
	export let activeContentId: number;

	let contentBoxElements = new Map<number, ContentBox>();

	export const scrollToSpeech = (id: number) => {
		const { top, height }: DOMRect = contentBoxElements[id].getBoundingClientRect();
		window.scrollBy({
			top:
				top +
				(window.innerWidth >= SCREEN_LG ? height / 2 - window.innerHeight / 2 : -MOBILE_OFFSET_TOP),
			behavior: 'smooth'
		});
	};
</script>

<div
	class="space-y-8 pt-12 px-4 min-h-md md:(pt-20 px-10 space-y-36 min-h-screen) bg-no-repeat bg-contain bg-bottom"
	style="background-image: url('th-covid-speech/hero-cover.svg');"
>
	<h1 class="font-head font-bold -lg:text-center">
		<span class="font-normal text-2xl md:text-5xl !leading-normal">ในวิกฤติกาลโควิด 19</span><br />
		<span class="font-bold text-5xl md:text-8xl !leading-tight">
			รัฐบาลไทย<br />
			<span class="text-light-blue-700">ได้พูด</span><br />
			อะไรไว้บ้าง?
		</span>
	</h1>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		class="w-12 cursor-pointer fill-light-blue-700 hover:fill-light-blue-500 -lg:mx-auto"
		on:click={() => scrollToSpeech(1)}
		><path d="M0 0h24v24H0V0z" fill="none" /><path
			d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
		/></svg
	>
</div>

<div class="py-6 px-4 space-y-36 mt-36 md:(py-12 px-10 space-y-48 mt-48)">
	{#each contentBlocks as { id, type, ...contentBlock }}
		<ContentBox
			bind:this={contentBoxElements[id]}
			{type}
			{contentBlock}
			isActive={activeContentId === id}
			on:enter={() => (activeContentId = id)}
		/>
	{/each}
</div>
