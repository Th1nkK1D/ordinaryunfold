<script lang="ts">
	import type { Candidate } from '../+page.server';
	import Button from './button.svelte';
	import Card from './card.svelte';

	const choiceLabels = ['ก.', 'ข.', 'ค.', 'ง.'];

	export let candidates: Candidate[];
	export let groupMap: Map<number, string>;

	let currentGroup = 1;
	let selectedChoice: number | null = null;
	let isRevealed = false;
</script>

<div class="mx-auto flex max-w-screen-lg flex-col gap-4 px-3 py-16">
	<h2 class="font-charmonman">
		<span class="text-xl">กลุ่มที่ {currentGroup}</span>
		<br />
		<span class="text-4xl">{groupMap.get(currentGroup)}</span>
	</h2>
	<div class="flex flex-row justify-between">
		<p>ผู้สมัครในข้อใดได้รับเลือกให้เป็นสว.? (๑ คะแนน)</p>
		<p>คะแนนสะสม: ๓ (เต็ม ๐)</p>
	</div>
	<div class="grid grid-cols-2 gap-6">
		{#each [...candidates.filter((c) => !c.isWinner).slice(0, 3), ...candidates
				.filter((c) => c.isWinner)
				.slice(0, 1)] as candidate, i}
			<div>
				<Card
					heading={choiceLabels[i]}
					body={candidate.experience || ''}
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
			</div>
		{/each}
	</div>
	{#if selectedChoice !== null}
		<div class="fixed inset-x-0 bottom-12 flex justify-center">
			<Button
				class="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
				on:click={() => (isRevealed = true)}
				>เลือกข้อ {choiceLabels[selectedChoice]} เป็นคำตอบสุดท้าย!</Button
			>
		</div>
	{/if}
</div>
