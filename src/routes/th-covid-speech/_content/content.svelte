<script lang="ts">
	import Sharer from '../../../components/sharer.svelte';
	import Footer from '../../../components/footer.svelte';
	import { contentBlocks, lastUpdated } from '../_data';
	import ContentBox from './content-box.svelte';
	import SortButton from './sort-button.svelte';

	export let activeContentId: number;

	let contentBoxElements = new Map<number, ContentBox>();
	let isReversed: boolean = true;
	let container: HTMLElement;
	let sortButtonContainer: HTMLElement;

	export const scrollToSpeech = (id: number) => {
		const OFFSET_TOP = 12;
		const { top, height }: DOMRect = contentBoxElements[id].getBoundingClientRect();

		container.scrollBy({
			top:
				top -
				container.offsetTop -
				(height < container.clientHeight ? (container.clientHeight - height) / 2 : OFFSET_TOP),
			behavior: 'smooth'
		});
	};

	const getTopContentId = () => contentBlocks[isReversed ? contentBlocks.length - 1 : 0].id;

	const onClickReverse = () => {
		isReversed = !isReversed;
		activeContentId = getTopContentId();
	};
</script>

<div bind:this={container} class="flex-1 overflow-y-scroll lg:(max-w-3xl h-screen)">
	<div
		class="flex flex-col pt-12 px-4 h-full lg:(pt-20 px-10) bg-no-repeat bg-contain bg-bottom -lg:text-center"
		style="background-image: url('/th-covid-speech/hero-cover.svg');"
	>
		<div class="flex-1 flex flex-col space-y-4 md:space-y-12">
			<h1 class="font-head font-bold font-bold text-5xl md:text-8xl">
				วิวาทะ<br />
				<span class="text-light-blue-700 text-6xl md:text-9xl">โควิด ๑๙</span><br />
			</h1>
			<h2 class="font-head text-xl md:text-3xl">ใคร ได้พูดอะไร ในแต่ละช่วงของวิกฤติกาล</h2>
			<p class="italic font-sm text-gray-600">
				ข้อมูลล่าสุด {new Date(lastUpdated).toLocaleDateString('TH-th', { dateStyle: 'medium' })}
			</p>
			<div class="-lg:mx-auto">
				<Sharer url="https://www.ordinaryunfold.com/th-covid-speech/" />
			</div>
		</div>

		<div class="flex flex-1">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				class="w-12 cursor-pointer fill-light-blue-700 hover:fill-light-blue-500 my-auto -lg:mx-auto"
				on:click={() => sortButtonContainer.scrollIntoView({ behavior: 'smooth' })}
				><path d="M0 0h24v24H0V0z" fill="none" /><path
					d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
				/></svg
			>
		</div>
	</div>

	<div class="px-4 lg:px-10">
		<div class="pt-6 -mb-4 md:pt-12" bind:this={sortButtonContainer}>
			<SortButton {isReversed} on:click={onClickReverse} />
		</div>

		<div class="flex max-w-2xl mx-auto {isReversed ? 'flex-col-reverse' : 'flex-col'}">
			{#each contentBlocks as { id, type, date, ...contentBlock }}
				<ContentBox
					bind:this={contentBoxElements[id]}
					{type}
					{date}
					{contentBlock}
					isActive={activeContentId === id}
					on:enter={() => (activeContentId = id)}
				/>
			{/each}
		</div>

		<div class="flex justify-center my-24">
			<Sharer url="https://www.ordinaryunfold.com/th-covid-speech/" />
		</div>

		<div class="flex flex-col space-y-20 mb-12 -lg:text-center">
			<div class="w-12 h-1 bg-black -lg:mx-auto" />

			<div class="space-y-4">
				<p class="text-xl font-head">ที่มาของข้อมูล</p>
				<ul class="space-y-2">
					<li>
						จำนวนผู้ติดเชื้อใหม่รายวันจาก <a
							href="https://covid19.th-stat.com/th/api"
							class="text-light-blue-700 hover:underline"
							target="_black"
							rel="noreferrer noopener"
						>
							Open API กรมควบคุมโรค
						</a>
					</li>
					<li>ข่าวและคำพูดต่างๆ ตามลิ้งค์ที่ได้แนบไว้</li>
					<li>
						มีคำพูดหรือเหตุการที่น่าสนใจ? <a
							href="https://docs.google.com/forms/d/e/1FAIpQLSdx-AyhmdZh9gd-oJvS51MRbTy5ehQ9_n2B1hLkMMREJv3I6g/viewform?usp=sf_link"
							class="text-light-blue-700 hover:underline"
							target="_black"
							rel="noreferrer noopener">บอกเราได้ที่นี่</a
						>
					</li>
				</ul>
			</div>

			<Footer class="text-gray-400" />
		</div>
	</div>
</div>
