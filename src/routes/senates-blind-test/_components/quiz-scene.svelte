<script lang="ts">
	import { onMount } from 'svelte';
	import JSConfetti from 'js-confetti';
	import type { Candidate, Group } from '../+page.server';
	import Button from './button.svelte';
	import Card from './card.svelte';
	import PostGameModal from './post-game-modal.svelte';

	const WINNING_CANDIDATE_PER_QUIZ = 1;
	const LOSING_CANDIDATE_PER_QUIZ = 3;

	export let choiceLabels: string[];
	export let candidates: Candidate[];
	export let groups: Group[];
	export let isGameStarted: boolean;

	let candidatesGroups: Map<
		number,
		{
			id: number;
			name: string;
			winningCandidates: Candidate[];
			losingCandidates: Candidate[];
		}
	>;
	let totalQuizCompleted = 0;
	let score = 0;
	let currentGroup = 1;
	let currentCandidates: Candidate[] = [];
	let selectedChoice: number | null = null;
	let isRevealed = false;
	let isGameEnded = false;
	let confetti: JSConfetti;

	onMount(() => {
		candidatesGroups = new Map(
			groups.map(({ id, name }) => {
				const groupCandidates = candidates.filter(({ group }) => group === id);

				return [
					id,
					{
						id,
						name,
						winningCandidates: shuffleArray(
							groupCandidates.filter(({ isWinner }) => isWinner)
						).sort((a, z) => z.interestingScore - a.interestingScore),
						losingCandidates: shuffleArray(groupCandidates.filter(({ isWinner }) => !isWinner))
					}
				];
			})
		);

		startNextQuiz();

		confetti = new JSConfetti();
	});

	function startNextQuiz() {
		const availableGroups = [...candidatesGroups.values()].filter(
			(g) =>
				g.losingCandidates.length > LOSING_CANDIDATE_PER_QUIZ &&
				g.winningCandidates.length >= WINNING_CANDIDATE_PER_QUIZ
		);

		if (availableGroups.length < 0) {
			alert('คุณเล่นจนครบทุกคนแล้ว ทำไปได้ ขยันกว่ากกต.อีก');
			return;
		}

		const nextGroup = availableGroups[Math.floor(Math.random() * availableGroups.length)];

		currentGroup = nextGroup.id;
		currentCandidates = shuffleArray([
			...nextGroup.losingCandidates.splice(0, LOSING_CANDIDATE_PER_QUIZ),
			...nextGroup.winningCandidates.splice(0, WINNING_CANDIDATE_PER_QUIZ)
		]);
		selectedChoice = null;
		isRevealed = false;
	}

	function shuffleArray<T>(array: T[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}

		return array;
	}

	function submitAnswer() {
		if (selectedChoice !== null && currentCandidates[selectedChoice].isWinner) {
			score++;
			confetti.addConfetti();
		}
		totalQuizCompleted++;
		isRevealed = true;
	}

	async function endGame() {
		isGameEnded = true;

		while (isGameStarted) {
			await confetti.addConfetti();
		}
	}

	function formatThaiNumber(value: number) {
		// @ts-expect-error
		return value.toLocaleString('th-TH', { numberingSystem: 'thai' });
	}
</script>

<div class="relative mx-auto my-6 flex max-w-screen-lg flex-col gap-4 px-3 md:mt-16">
	<h2 class="font-charmonman">
		<span class="text-xl leading-normal">กลุ่มที่ {formatThaiNumber(currentGroup)}</span>
		<br />
		<span class="text-3xl leading-normal md:text-4xl"
			>{candidatesGroups?.get(currentGroup)?.name}</span
		>
	</h2>
	<div class="flex flex-col-reverse justify-between gap-3 md:flex-row md:gap-0">
		<p>
			{formatThaiNumber(totalQuizCompleted + 1)}. ผู้สมัครในข้อใดเป็นหนึ่งในผู้ชนะการโหวตของกลุ่ม?
			(๑ คะแนน)
		</p>
		<p class="opacity-50">
			คะแนน {formatThaiNumber(score)} (เต็ม {formatThaiNumber(totalQuizCompleted)})
		</p>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
		{#each currentCandidates as candidate, i}
			{@const isSelecting = selectedChoice === i}
			<Card
				heading={isRevealed ? candidate.fullname : choiceLabels[i]}
				subtitle={isRevealed
					? `${formatThaiNumber(candidate.score)} โหวต | ${candidate.province}`
					: ''}
				body={candidate.experience || ''}
				disabled={isRevealed}
				link={isRevealed
					? `https://smart-vote.s3.ap-southeast-1.amazonaws.com/level03/${candidate.imageName}`
					: undefined}
				state={isRevealed
					? isSelecting
						? candidate.isWinner
							? 'corrected'
							: 'incorrected'
						: candidate.isWinner
							? 'revealed'
							: null
					: isSelecting
						? 'selected'
						: null}
				on:click={() => (selectedChoice = selectedChoice !== i ? i : null)}
			/>
		{/each}
	</div>
	<div
		class="mt:bottom-12 sticky inset-x-0 bottom-8 mt-2 flex justify-center gap-2 md:mt-6 md:gap-4"
	>
		{#if isRevealed}
			<Button
				class="shadow- border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white"
				on:click={endGame}>พอแค่นี้</Button
			>
			<Button
				class="flex items-center gap-1 bg-gray-700 text-white shadow-lg"
				on:click={startNextQuiz}
				>ไปต่อ <svg class="-mr-2 w-6" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="m14 18l-1.4-1.45L16.15 13H4v-2h12.15L12.6 7.45L14 6l6 6z"
					/></svg
				></Button
			>
		{:else if selectedChoice !== null}
			<Button class="bg-blue-600 text-white shadow-lg" on:click={submitAnswer}
				>เลือกข้อ {choiceLabels[selectedChoice]} เป็นคำตอบสุดท้าย!</Button
			>
		{/if}
	</div>

	{#if isGameEnded}
		<PostGameModal on:exit={() => (isGameStarted = false)}>
			{formatThaiNumber(score)}/{formatThaiNumber(totalQuizCompleted)}
		</PostGameModal>
	{/if}
</div>
