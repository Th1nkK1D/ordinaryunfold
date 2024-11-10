<script lang="ts">
	import type { Snippet } from 'svelte';
	import Scrollama from '../../../components/scrollama.svelte';
	import type { Step } from './chapters';
	import type { CallbackResponse } from 'scrollama';

	interface Props {
		steps?: Step[];
		activePeopleMask: boolean[];
		children?: Snippet;
	}

	let { steps = [], activePeopleMask = $bindable(), children }: Props = $props();

	const onStepEnter = ({ index }: CallbackResponse) => {
		activePeopleMask = index === 0 || index > steps.length ? [] : steps[index - 1].matchedMask;
	};
</script>

<Scrollama class="p-2" onstepenter={onStepEnter}>
	<section>
		<h2 class="mx-6 font-head text-4xl font-bold md:mx-20 md:text-6xl">{@render children?.()}</h2>
	</section>

	{#each steps as { heading, description, matchedMask }}
		<section class="items-center">
			<div class="mx-auto space-y-3 bg-gray-900 bg-opacity-50 p-3 text-center md:p-6">
				<h3 class="mx-auto max-w-xl font-head text-xl font-bold md:text-3xl">
					{@html heading(matchedMask.filter((value) => value).length)}
				</h3>
				{#if description}
					<p class="mx-auto text-sm md:max-w-3xl md:text-lg">{description}</p>
				{/if}
			</div>
		</section>
	{/each}

	<section></section>
</Scrollama>

<style lang="postcss">
	section {
		@apply flex min-h-dvh flex-col justify-center;
	}
</style>
