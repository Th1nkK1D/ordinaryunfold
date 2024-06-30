<script lang="ts">
	import { createEventDispatcher, onMount } from 'svelte';
	import JSConfetti from 'js-confetti';
	import type { Candidate, Group } from '../+page.server';
	import Button from './button.svelte';
	import Card from './card.svelte';

	const WINNING_CANDIDATE_PER_QUIZ = 1;
	const LOSING_CANDIDATE_PER_QUIZ = 3;

	export let choiceLabels: string[];
	export let candidates: Candidate[];
	export let groups: Group[];

	const dispatch = createEventDispatcher();

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
						winningCandidates: shuffleArray(groupCandidates.filter(({ isWinner }) => isWinner)),
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
			confetti.addConfetti();
		}
		totalQuizCompleted++;
		isRevealed = true;
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
			{formatThaiNumber(totalQuizCompleted + 1)}. ผู้สมัครในข้อใดได้รับเลือกให้เป็นสว.? (๑ คะแนน)
		</p>
		<p class="opacity-50">
			คะแนน {formatThaiNumber(score)} (เต็ม {formatThaiNumber(totalQuizCompleted)})
		</p>
	</div>
	<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
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
	<button
		class="absolute right-3 top-0 text-gray-400 hover:text-red-600"
		on:click={() => dispatch('exit')}
	>
		<svg class="w-5 md:w-6" viewBox="0 0 14 14"
			><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
				><path
					d="M5.214 1.643c0-.493.4-.893.893-.893h6.25c.493 0 .893.4.893.893v10.714c0 .493-.4.893-.893.893H9.232"
				/><path
					d="M6.553 5.438a1.563 1.563 0 1 0 3.126 0a1.563 1.563 0 1 0-3.126 0m-4.017.669h1.818a1 1 0 0 1 .707.293L7.6 8.94a1 1 0 0 0 .707.292h1.371"
				/><path d="M6.107 7.446L3.721 9.832a1 1 0 0 1-.707.293H.75" /><path
					d="m4.321 9.232l1.493 1.493a1 1 0 0 1 .293.707v1.818"
				/></g
			></svg
		>
	</button>
</div>
