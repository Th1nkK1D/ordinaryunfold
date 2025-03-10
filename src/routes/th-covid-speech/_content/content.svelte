<script lang="ts">
	import Sharer from '../../../components/sharer.svelte';
	import Footer from '../../../components/footer.svelte';
	import { contentBlocks, lastUpdated } from '../_data';
	import ContentBox from './content-box.svelte';
	import SortButton from './sort-button.svelte';
	import ExternalLink from '../../../components/external-link.svelte';

	const OFFSET_TOP = 12;

	interface Props {
		activeContentId: number;
		scrollToSpeech: (id: number) => void;
	}

	let { activeContentId = $bindable(), scrollToSpeech = $bindable() }: Props = $props();

	let contentBoxParent: HTMLElement;
	let isReversed: boolean = $state(true);
	let container: HTMLElement;
	let sortButtonContainer: HTMLElement;

	$effect(() => {
		scrollToSpeech = (id: number) => {
			const contentBox = contentBoxParent.children.item(
				contentBlocks.findIndex((c) => c.id === id)
			);

			if (!contentBox) return;

			const { top, height }: DOMRect = contentBox.getBoundingClientRect();

			container.scrollBy({
				top:
					top -
					container.offsetTop -
					(height < container.clientHeight ? (container.clientHeight - height) / 2 : OFFSET_TOP),
				behavior: 'smooth'
			});
		};
	});

	const getTopContentId = () => contentBlocks[isReversed ? contentBlocks.length - 1 : 0].id;

	const onClickReverse = () => {
		isReversed = !isReversed;
		activeContentId = getTopContentId();
	};
</script>

<div bind:this={container} class="lg:h-dvh) flex-1 overflow-y-scroll lg:max-w-3xl">
	<div
		class="flex h-full flex-col bg-contain bg-bottom bg-no-repeat px-4 pt-12 text-center lg:px-10 lg:pt-20 lg:text-left"
		style="background-image: url('/th-covid-speech/hero-cover.svg');"
	>
		<div class="flex flex-1 flex-col space-y-4 md:space-y-12">
			<h1 class="font-head text-5xl font-bold md:text-8xl">
				วิวาทะ<br />
				<span class="text-6xl text-sky-700 md:text-9xl">โควิด ๑๙</span><br />
			</h1>
			<h2 class="font-head text-xl md:text-3xl">ใคร ได้พูดอะไร ในแต่ละช่วงของวิกฤติกาล</h2>
			<p class="font-sm italic text-gray-600">
				ข้อมูลล่าสุด {new Date(lastUpdated).toLocaleDateString('TH-th', { dateStyle: 'medium' })}
			</p>
			<div class="mx-auto lg:mx-0">
				<Sharer url="https://www.ordinaryunfold.com/th-covid-speech/" />
			</div>
		</div>

		<div class="flex flex-1">
			<button
				onclick={() => sortButtonContainer.scrollIntoView({ behavior: 'smooth' })}
				aria-label="ดู"
			>
				<svg
					viewBox="0 0 24 24"
					class="m-auto w-12 cursor-pointer fill-sky-700 hover:fill-sky-500 lg:mx-0"
					><path d="M0 0h24v24H0V0z" fill="none" /><path
						d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
					/></svg
				>
			</button>
		</div>
	</div>

	<div class="px-4 lg:px-10">
		<div class="-mb-4 pt-6 md:pt-12" bind:this={sortButtonContainer}>
			<SortButton {isReversed} onclick={onClickReverse} />
		</div>

		<div
			class="mx-auto flex max-w-2xl {isReversed ? 'flex-col-reverse' : 'flex-col'}"
			bind:this={contentBoxParent}
		>
			{#each contentBlocks as { id, type, date, ...contentBlock }}
				<ContentBox
					{type}
					{date}
					{contentBlock}
					isActive={activeContentId === id}
					onenter={() => (activeContentId = id)}
				/>
			{/each}
		</div>

		<div class="my-24 flex justify-center">
			<Sharer url="https://www.ordinaryunfold.com/th-covid-speech/" />
		</div>

		<div class="mb-12 flex flex-col space-y-20 text-center lg:text-left">
			<div class="mx-auto h-1 w-12 bg-black lg:mx-0"></div>

			<div class="space-y-4">
				<p class="font-head text-xl">ที่มาของข้อมูล</p>
				<ul class="space-y-2">
					<li>
						จำนวนผู้ติดเชื้อใหม่รายวันจาก <ExternalLink
							href="https://covid19.ddc.moph.go.th/api/Cases/timeline-cases-all"
							class="text-sky-700 hover:underline"
						>
							Open API กรมควบคุมโรค
						</ExternalLink>
						(<ExternalLink
							href="https://covid19.th-stat.com/th/api"
							class="text-sky-700 hover:underline"
						>
							เวอร์ชั่นเก่า
						</ExternalLink> ที่ใช้ไม่ได้แล้ว)
					</li>
					<li>ข่าวและคำพูดต่างๆ ตามลิ้งค์ที่ได้แนบไว้</li>
					<li>
						มีคำพูดหรือเหตุการที่น่าสนใจ? <ExternalLink
							href="https://docs.google.com/forms/d/e/1FAIpQLSdx-AyhmdZh9gd-oJvS51MRbTy5ehQ9_n2B1hLkMMREJv3I6g/viewform?usp=sf_link"
							class="text-sky-700 hover:underline">บอกเราได้ที่นี่</ExternalLink
						>
					</li>
				</ul>
			</div>

			<Footer class="text-gray-400" />
		</div>
	</div>
</div>
