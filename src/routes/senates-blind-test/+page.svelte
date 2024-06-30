<script lang="ts">
	import IntroScene from './_components/intro-scene.svelte';
	import QuizScene from './_components/quiz-scene.svelte';

	export let data;
	$: ({ candidates, groups } = data);

	let isGameStarted = false;
</script>

<div
	class="relative h-lvh overflow-hidden transition-colors duration-700 ease-in-out {isGameStarted
		? 'bg-gray-200'
		: 'bg-[#2B815F]'}"
>
	{#if isGameStarted && candidates}
		<QuizScene {candidates} {groups} />
	{:else}
		<IntroScene on:start={() => (isGameStarted = true)} />
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
