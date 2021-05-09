<script lang="ts">
	import type { Speech } from '../index.svelte';
	import SpeechBox from './speech-box.svelte';

	const SCREEN_LG = 1024;
	const MOBILE_OFFSET_TOP = 260;

	export let speeches: Speech[] = [];
	export let activeSpeechId: number;

	let speechBoxElements = new Map<number, SpeechBox>();

	export const scrollToSpeech = (id: number) => {
		const { top, height }: DOMRect = speechBoxElements[id].getBoundingClientRect();
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
	{#each speeches as speech}
		<SpeechBox
			bind:this={speechBoxElements[speech.id]}
			{...speech}
			isActive={activeSpeechId === speech.id}
			on:enter={({ detail: id }) => (activeSpeechId = id)}
		/>
	{/each}
</div>
