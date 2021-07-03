<script lang="ts">
	import Scrollama from '../../components/scrollama.svelte';
	import Metadata from '../../components/metadata.svelte';
	import PeopleBackground from './_people/people-background.svelte';
	import Chapter from './_sections/chapter.svelte';
	import type { Step } from './_sections/chapter.svelte';
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

	const chapterSteps: Step[][] = [
		[
			{
				matchedMask: fetalities.map(({ organization }) => organization === 'Civilian'),
				heading: (count) => `${count} people are <mark>civilians</mark>`,
				description: 'who would think the last day will came this soon?'
			},
			{
				matchedMask: fetalities.map(({ organization }) => organization === 'Student'),
				heading: (count) => `${count} <mark>students</mark> were killed`,
				description: 'future of the country, they said.'
			},
			{
				matchedMask: fetalities.map(({ organization }) =>
					['Teacher', 'Doctor/Nurse', 'Engineer', 'Civil Servant'].includes(organization)
				),
				heading: (count) =>
					`We also lost ${count} <mark>teachers, doctor, nurse, engineer and civil servant</mark>`,
				description: 'we appreciate your work'
			}
		]
	];

	let people: Person[] = fetalities;
	let activePeopleMask: boolean[] = [];
</script>

<Metadata title="Myanmar Coup 2021" />

<PeopleBackground {people} {activePeopleMask} />

<Scrollama
	class="flex flex-col w-full text-white"
	on:stepenter={({ detail: { index } }) => {
		people = chapterPeopleSortMap.has(index)
			? fetalities.sort(chapterPeopleSortMap.get(index))
			: fetalities;
	}}
>
	<Landing />
	<Chapter steps={chapterSteps[0]} bind:activePeopleMask>
		<h2><mark>Who</mark> are they?</h2>
	</Chapter>
	<Chapter bind:activePeopleMask>
		<h2><mark>How old</mark> are they?</h2>
	</Chapter>
	<Chapter bind:activePeopleMask>
		<h2>What are their <mark>sexuality?</mark></h2>
	</Chapter>
	<Chapter bind:activePeopleMask>
		<h2><mark>When</mark> did the incident happended?</h2>
	</Chapter>
</Scrollama>

<style>
	h2 {
		@apply font-head font-bold text-6xl;
	}

	:global(mark) {
		@apply bg-transparent text-yellow-500;
	}
</style>
