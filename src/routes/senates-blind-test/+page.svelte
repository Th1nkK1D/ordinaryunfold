<script lang="ts">
	import Metadata from '../../components/metadata.svelte';
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

<div
	class="relative min-h-lvh border-[6px] transition-colors duration-500 md:border-8 {isGameStarted
		? 'border-gray-400 bg-gray-200'
		: 'border-white/15 bg-[#2B815F]'}"
>
	{#if isGameStarted && candidates}
		<QuizScene {candidates} {groups} {choiceLabels} on:exit={() => (isGameStarted = false)} />
	{:else}
		<IntroScene {choiceLabels} on:start={() => (isGameStarted = true)} />
	{/if}
</div>

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
