<script lang="ts">
	import ExternalLink from '../../components/external-link.svelte';
	import Footer from '../../components/footer.svelte';
	import Metadata from '../../components/metadata.svelte';
	import Sharer from '../../components/sharer.svelte';
	import IntroScene from './_components/intro-scene.svelte';
	import QuizScene from './_components/quiz-scene.svelte';

	const choiceLabels = ['ก.', 'ข.', 'ค.', 'ง.'];

	let { data } = $props();
	let { candidates, groups } = $derived(data);

	let isGameStarted = $state(false);
</script>

<Metadata
	title="สว. Blind Test"
	description="เกมทายใจ ใครเป็นผู้ชนะการเลือกตั้ง จากเอกสารแนะนำตัว ๕ บรรทัด"
	path="/senates-blind-test"
	image="/senates-blind-test/og.png"
/>

<div class="relative min-h-lvh">
	{#if isGameStarted && candidates}
		<QuizScene {candidates} {groups} {choiceLabels} bind:isGameStarted />
	{:else}
		<IntroScene {choiceLabels} onstart={() => (isGameStarted = true)} />
	{/if}
</div>

<section class="bg-gray-800 text-gray-100">
	<div
		class="mx-auto flex w-full max-w-screen-lg flex-col items-center justify-between gap-6 px-3 py-8 md:flex-row-reverse md:py-12"
	>
		<div class="flex items-center justify-center gap-3 md:gap-5">
			<span class="text-xs text-gray-300 md:text-sm">Share</span>
			<Sharer
				url="https://ordinaryunfold.com/senates-blind-test"
				linkClass="text-gray-300 hover:text-gray-100"
			/>
		</div>
		<div class="flex flex-col gap-6 text-center md:text-left">
			<ExternalLink
				href="https://github.com/Th1nkK1D/ordinaryunfold/tree/main/src/data/senates-blind-test#readme"
				class="flex items-center justify-center gap-2 rounded-sm border border-white px-3 py-2 hover:bg-white hover:text-gray-800"
			>
				<svg class="w-6" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="m12 16l-5-5l1.4-1.45l2.6 2.6V4h2v8.15l2.6-2.6L17 11zm-6 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z"
					/></svg
				> ดาวน์โหลดข้อมูล
			</ExternalLink>
			<p class="text-sm md:text-base">
				ขอบคุณ <ExternalLink href="https://github.com/PanJ/senate67" class="underline"
					>ข้อมูลผู้สมัครสว. จาก PanJ</ExternalLink
				> และ <ExternalLink
					href="https://docs.google.com/spreadsheets/d/1zJSO-l1nXAaj0g9YBoCzZrEyunBlRoHFiGsrN2fzDsQ/edit"
					class="underline">ผลคะแนนดิบสว.67 รอบระดับประเทศจาก iLaw</ExternalLink
				>
			</p>
			<Footer class="text-gray-100" />
		</div>
	</div>
</section>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Charmonman:wght@700&family=Chonburi&display=swap');

	:global(body) {
		@apply bg-gray-200;
	}

	:global(.font-charmonman) {
		font-family: 'Charmonman', cursive;
		font-weight: 700;
		font-style: normal;
	}

	:global(.font-chonburi) {
		font-family: 'Chonburi', serif;
		font-weight: 400;
		font-style: normal;
	}
</style>
