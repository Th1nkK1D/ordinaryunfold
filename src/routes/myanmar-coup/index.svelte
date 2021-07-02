<script lang="ts">
	import Scrollama from '../../components/scrollama.svelte';
	import Metadata from '../../components/metadata.svelte';
	import PeopleBackground from './_people/people-background.svelte';
	import Chapter from './_sections/chapter.svelte';
	import Landing from './_sections/landing.svelte';
	import type { Person } from './_data';
	import { fetalities } from './_data';

	type PeopleSortFunction = (a: Person, b: Person) => number;

	const chapterPeopleSortMap = new Map<number, PeopleSortFunction>([
		[1, (a, z) => a.organization.localeCompare(z.organization)],
		[2, (a, z) => a.age - z.age],
		[3, (a, z) => a.sex.localeCompare(z.sex)],
		[4, (a, z) => a.dateOfIncident.getTime() - z.dateOfIncident.getTime()]
	]);

	let people: Person[] = fetalities;
</script>

<Metadata title="Myanmar Coup 2021" />

<PeopleBackground {people} />

<Scrollama
	class="flex flex-col w-full text-white"
	on:stepenter={({ detail: { index } }) => {
		people = chapterPeopleSortMap.has(index)
			? fetalities.sort(chapterPeopleSortMap.get(index))
			: fetalities;
	}}
>
	<Landing />
	<Chapter>
		<h2><mark>Who</mark> are they?</h2>
	</Chapter>
	<Chapter>
		<h2><mark>How old</mark> are they?</h2>
	</Chapter>
	<Chapter>
		<h2>What are their <mark>sexuality?</mark></h2>
	</Chapter>
	<Chapter>
		<h2><mark>When</mark> did the incident happended?</h2>
	</Chapter>
</Scrollama>

<style>
	h2 {
		@apply font-head font-bold text-6xl;
	}

	mark {
		@apply bg-transparent text-yellow-500;
	}
</style>
