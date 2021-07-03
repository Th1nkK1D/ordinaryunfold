<script lang="ts" context="module">
	type RenderCaption = (count: Number) => string;

	export interface Step {
		matchedMask: boolean[];
		heading: RenderCaption;
	}
</script>

<script lang="ts">
	import Scrollama from '../../../components/scrollama.svelte';

	export let steps: Step[] = [];
	export let activePeopleMask: boolean[];

	const onStepEnter = ({ detail: { index } }) => {
		activePeopleMask = index === 0 || index > steps.length ? [] : steps[index - 1].matchedMask;
	};
</script>

<Scrollama class="p-8 md: p-20" on:stepenter={onStepEnter}>
	<div class="flex flex-col justify-center min-h-screen">
		<slot />
	</div>

	{#each steps as { heading, matchedMask }}
		<div class="flex flex-col justify-center h-50vh">
			<p class="text-white">{heading(matchedMask.filter((value) => value).length)}</p>
		</div>
	{/each}

	<div class="h-50vh" />
</Scrollama>
