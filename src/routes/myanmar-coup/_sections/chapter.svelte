<script lang="ts">
	import Scrollama from '../../../components/scrollama.svelte';
	import type { Step } from './chapters';

	export let steps: Step[] = [];
	export let activePeopleMask: boolean[];

	const onStepEnter = ({ detail: { index } }) => {
		activePeopleMask = index === 0 || index > steps.length ? [] : steps[index - 1].matchedMask;
	};
</script>

<Scrollama class="p-8 md: p-20" on:stepenter={onStepEnter}>
	<div>
		<h2><slot /></h2>
	</div>

	{#each steps as { heading, description, matchedMask }}
		<div class="items-center space-y-2">
			<h3 class="font-head font-bold text-3xl max-w-xl text-center">
				{@html heading(matchedMask.filter((value) => value).length)}
			</h3>
			{#if description}
				<p class="text-lg">{description}</p>
			{/if}
		</div>
	{/each}

	<div />
</Scrollama>

<style>
	h2 {
		@apply font-head font-bold text-6xl;
	}
	div {
		@apply flex flex-col justify-center min-h-screen;
	}
</style>
