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
</script>

<section class="p-8 md: p-20">
	<div class="flex flex-col justify-center min-h-screen">
		<slot />
	</div>

	{#if steps.length > 0}
		<Scrollama
			on:stepenter={({ detail: { index } }) => {
				activePeopleMask = steps[index].matchedMask;
			}}
		>
			{#each steps as { heading, matchedMask }}
				<div class="flex flex-col justify-center h-25vh">
					<p class="text-white">{heading(matchedMask.filter((value) => value).length)}</p>
				</div>
			{/each}
		</Scrollama>
	{/if}
</section>
