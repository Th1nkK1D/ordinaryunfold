<script lang="ts">
	import Sharer from '../../../components/sharer.svelte';
	import Footer from '../../../components/footer.svelte';
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
	class="pt-12 px-4 min-h-md md:(pt-20 px-10 min-h-screen) bg-no-repeat bg-contain bg-bottom -lg:text-center"
	style="background-image: url('/th-covid-speech/hero-cover.svg');"
>
	<h1 class="font-head font-bold font-bold text-5xl md:text-8xl">
		วาทกรรม<br />
		<span class="text-light-blue-700 text-6xl md:text-9xl">โควิด ๑๙</span><br />
	</h1>
	<h2 class="font-head text-xl mt-4 mb-12 md:(text-3xl mt-12 mb-36)">
		ย้อนดูแต่ละช่วงของวิกฤติกาล ว่ารัฐบาลไทยได้พูดอะไรไว้บ้าง?
	</h2>
	<div class="flex mb-12 md:mb-36 -lg:(justify-center)">
		<Sharer url="https://www.ordinaryunfold.com/th-covid-speech" />
	</div>

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

<div class="mt-36 py-6 px-4 space-y-48 md:(mt-48 py-12 px-10 space-y-60)">
	{#each contentBlocks as { id, type, ...contentBlock }}
		<ContentBox
			bind:this={contentBoxElements[id]}
			{type}
			{contentBlock}
			isActive={activeContentId === id}
			on:enter={() => (activeContentId = id)}
		/>
	{/each}

	<div class="flex justify-center">
		<Sharer url="https://www.ordinaryunfold.com/th-covid-speech" />
	</div>

	<div class="flex flex-col space-y-20 -lg:text-center">
		<div class="w-12 h-1 bg-black -lg:mx-auto" />

		<div class="space-y-4">
			<p class="text-xl font-head">ที่มาของข้อมูล</p>
			<ul class="space-y-2">
				<li>
					จำนวนผู้ติดเชื่้อโควิดใหม่รายวันจาก <a
						href="https://covid19.th-stat.com/th/api"
						class="text-blue-600 hover:underline"
						target="_black"
						rel="noreferrer noopener"
					>
						Open API กรมควบคุมโรค
					</a>
				</li>
				<li>ข่าวและคำพูดต่างๆ ตามลิ้งค์ที่ได้แนบไว้</li>
			</ul>
		</div>

		<Footer class="text-gray-400" />
	</div>
</div>
