<script lang="ts">
	import type { ContentBlock } from '../_data/content';
	import ContentBox from './content-box.svelte';

	const SCREEN_LG = 1024;
	const MOBILE_OFFSET_TOP = 260;

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

<div class="flex flex-col py-6 px-4 space-y-24 md:(py-12 px-10 space-y-36)">
	<div class="space-y-4 md:space-y-8">
		<h1 class="font-head font-bold text-2xl md:text-5xl">
			ในวิกฤติกาลโควิด 19 <br />รัฐบาลไทยได้พูดอะไรไว้บ้าง?
		</h1>
		<div class="h-1 md:h-1.5 w-16 bg-blue-gray-900" />
		<p class="text-right font-head italic">อัพเดตล่าสุด ...</p>
	</div>
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
