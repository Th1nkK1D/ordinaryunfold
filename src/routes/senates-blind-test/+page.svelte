<script lang="ts">
	import ExternalLink from '../../components/external-link.svelte';
	import Footer from '../../components/footer.svelte';
	import Metadata from '../../components/metadata.svelte';
	import Sharer from '../../components/sharer.svelte';
	import IntroScene from './_components/intro-scene.svelte';
	import QuizScene from './_components/quiz-scene.svelte';

	const choiceLabels = ['ก.', 'ข.', 'ค.', 'ง.'];

	export let data;
	$: ({ candidates, groups } = data);

	let isGameStarted = false;
</script>

<Metadata
	title="Senates Blind Test"
	description="เกมทายใจ ใครเป็นผู้ชนะการเลือกตั้งสว. จากเอกสารแนะนำตัว ๕ บรรทัด"
	path="/senates-blind-test"
/>

<div class="relative min-h-lvh">
	{#if isGameStarted && candidates}
		<QuizScene {candidates} {groups} {choiceLabels} bind:isGameStarted />
	{:else}
		<IntroScene {choiceLabels} on:start={() => (isGameStarted = true)} />
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
			<p class="md:text-md text-sm">
				ข้อมูลผู้สมัครสว. จาก <ExternalLink
					href="https://github.com/PanJ/senate67"
					class="underline">PanJ/senate67</ExternalLink
				> และข้อมูล <ExternalLink
					href="https://docs.google.com/spreadsheets/d/1zJSO-l1nXAaj0g9YBoCzZrEyunBlRoHFiGsrN2fzDsQ/edit"
					class="underline">ผลคะแนนดิบสว.67 รอบระดับประเทศจาก iLaw</ExternalLink
				>
			</p>
			<Footer class="text-gray-100" />
		</div>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Charmonman:wght@700&family=Chonburi&display=swap');

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
