<script lang="ts">
	import { onMount } from 'svelte';
	import type { Candidate, Group } from '../+page.server';
	import Button from './button.svelte';
	import Card from './card.svelte';

	const WINNING_CANDIDATE_PER_QUIZ = 1;
	const LOSING_CANDIDATE_PER_QUIZ = 3;
	const choiceLabels = ['ก.', 'ข.', 'ค.', 'ง.'];

	export let candidates: Candidate[];
	export let groups: Group[];

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

	onMount(() => {
		candidatesGroups = new Map(
			groups.map(({ id, name }) => {
				const groupCandidates = candidates.filter(({ group }) => group === id);

				return [
					id,
					{
						id,
						name,
						winningCandidates: shuffleArray(groupCandidates.filter(({ isWinner }) => isWinner)),
						losingCandidates: shuffleArray(groupCandidates.filter(({ isWinner }) => !isWinner))
					}
				];
			})
		);

		startNextQuiz();
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
		currentCandidates = [
			...nextGroup.losingCandidates.splice(0, LOSING_CANDIDATE_PER_QUIZ),
			...nextGroup.winningCandidates.splice(0, WINNING_CANDIDATE_PER_QUIZ)
		];
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
		if (selectedChoice && currentCandidates[selectedChoice].isWinner) {
			score++;
		}
		totalQuizCompleted++;
		isRevealed = true;
	}

	function formatThaiNumber(value: number) {
		// @ts-expect-error
		return value.toLocaleString('th-TH', { numberingSystem: 'thai' });
	}
</script>

<div class="mx-auto flex max-w-screen-lg flex-col gap-4 px-3 py-6 md:pt-16">
	<h2 class="font-charmonman">
		<span class="text-xl leading-normal">กลุ่มที่ {formatThaiNumber(currentGroup)}</span>
		<br />
		<span class="text-3xl leading-normal md:text-4xl"
			>{candidatesGroups?.get(currentGroup)?.name}</span
		>
	</h2>
	<div class="flex flex-col-reverse justify-between gap-3 md:flex-row md:gap-0">
		<p>
			{formatThaiNumber(totalQuizCompleted + 1)}. ผู้สมัครในข้อใดได้รับเลือกให้เป็นสว.? (๑ คะแนน)
		</p>
		<p class="opacity-50">
			คะแนนสะสม: {formatThaiNumber(score)} (เต็ม {formatThaiNumber(totalQuizCompleted)})
		</p>
	</div>
	<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
		{#each currentCandidates as candidate, i}
			<Card
				heading={isRevealed
					? `${candidate.title}${candidate.firstName} ${candidate.lastName}`
					: choiceLabels[i]}
				body={candidate.experience || ''}
				disabled={isRevealed}
				link={isRevealed ? candidate.documentUrl : ''}
				state={isRevealed
					? selectedChoice === i
						? candidate.isWinner
							? 'corrected'
							: 'incorrected'
						: candidate.isWinner
							? 'revealed'
							: null
					: selectedChoice === i
						? 'selected'
						: null}
				on:click={() => (selectedChoice = selectedChoice !== i ? i : null)}
			/>
		{/each}
	</div>
	<div class="sticky inset-x-0 bottom-12 mt-6 flex justify-center">
		{#if isRevealed}
			<Button class="bg-gray-700 text-white" on:click={startNextQuiz}>ข้อต่อไป ></Button>
		{:else if selectedChoice !== null}
			<Button class="bg-blue-600 text-white" on:click={submitAnswer}
				>เลือกข้อ {choiceLabels[selectedChoice]} เป็นคำตอบสุดท้าย!</Button
			>
		{/if}
	</div>
</div>
