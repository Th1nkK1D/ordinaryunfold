<script lang="ts">
	import Scrollama from '../../../components/scrollama.svelte';
	import type { Step } from './chapters';

	export let steps: Step[] = [];
	export let activePeopleMask: boolean[];

	const onStepEnter = ({ detail: { index } }) => {
		activePeopleMask = index === 0 || index > steps.length ? [] : steps[index - 1].matchedMask;
	};
</script>

<Scrollama class="p-2" on:stepenter={onStepEnter}>
	<section>
		<h2 class="font-head font-bold text-4xl mx-6 md:(mx-20 text-6xl)"><slot /></h2>
	</section>

	{#each steps as { heading, description, matchedMask }}
		<section class="items-center">
			<div class="bg-true-gray-900 bg-opacity-50 p-3 md:p-6 mx-auto space-y-3 text-center">
				<h3 class="font-head font-bold text-xl md:text-3xl max-w-xl mx-auto">
					{@html heading(matchedMask.filter((value) => value).length)}
				</h3>
				{#if description}
					<p class="text-sm md:(text-lg max-w-3xl) mx-auto">{description}</p>
				{/if}
			</div>
		</section>
	{/each}

	<section />
</Scrollama>

<style>
	section {
		@apply flex flex-col justify-center min-h-screen;
	}
</style>
