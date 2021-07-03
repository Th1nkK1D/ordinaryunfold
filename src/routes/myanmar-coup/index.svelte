<script lang="ts">
	import Scrollama from '../../components/scrollama.svelte';
	import Metadata from '../../components/metadata.svelte';
	import PeopleBackground from './_people/people-background.svelte';
	import Chapter from './_sections/chapter.svelte';
	import Landing from './_sections/landing.svelte';
	import type { Person } from './_data';
	import { fetalities } from './_data';
	import { chapters } from './_sections/chapters';

	let people: Person[] = fetalities;
	let activePeopleMask: boolean[] = [];
</script>

<Metadata title="Myanmar Coup 2021" />

<PeopleBackground {people} {activePeopleMask} />

<div class="text-white">
	<Landing />

	<Scrollama
		class="flex flex-col w-full"
		on:stepenter={({ detail: { index } }) => {
			people = fetalities.sort(chapters[index].sortBy);
		}}
	>
		{#each chapters as { title, steps }, index}
			{#key index}
				<Chapter {steps} bind:activePeopleMask>
					{@html title}
				</Chapter>
			{/key}
		{/each}
	</Scrollama>
</div>

<style>
	:global(mark) {
		@apply bg-transparent text-yellow-500;
	}
</style>
