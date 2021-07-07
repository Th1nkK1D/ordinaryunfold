<script lang="ts">
	import Scrollama from '../../components/scrollama.svelte';
	import Metadata from '../../components/metadata.svelte';
	import PeopleBackground from './_people/people-background.svelte';
	import Chapter from './_sections/chapter.svelte';
	import Landing from './_sections/landing.svelte';
	import type { Person } from './_data';
	import { fetalities } from './_data';
	import { chapters } from './_sections/chapters';
	import Footer from '../../components/footer.svelte';
	import Sharer from '../../components/sharer.svelte';

	let people: Person[] = fetalities;
	let activePeopleMask: boolean[] = [];
</script>

<Metadata
	title="Losses in Myanmar"
	description="The lives that were taken away by junta coup"
	path="/myanmar-coup/"
	image="/myanmar-coup/og.png"
/>

<PeopleBackground {people} {activePeopleMask} />

<div class="text-white">
	<Landing />

	<Scrollama
		class="flex flex-col w-full"
		on:stepenter={({ detail: { index } }) => {
			people = people.sort(chapters[index].sortBy);
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

	<section class="h-screen flex flex-col justify-center items-center text-center p-8">
		<h2><mark>The fight</mark> is&nbsp;not&nbsp;over.</h2>
	</section>

	<section class="h-screen flex flex-col space-y-12 p-8 text-center">
		<div class="flex-1 flex flex-col justify-center items-center space-y-4">
			<svg
				width="92"
				height="92"
				viewBox="0 0 92 92"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M45.9998 81.8417L40.4415 76.7817C20.6998 58.88 7.6665 47.0733 7.6665 32.5833C7.6665 20.7767 16.9432 11.5 28.7498 11.5C35.4198 11.5 41.8215 14.605 45.9998 19.5117C50.1782 14.605 56.5798 11.5 63.2498 11.5C75.0565 11.5 84.3332 20.7767 84.3332 32.5833C84.3332 47.0733 71.2998 58.88 51.5582 76.82L45.9998 81.8417Z"
					class="fill-yellow-500"
				/>
			</svg>
			<h2>How can I help?</h2>
			<p class="md:text-lg">
				Spread the news, and visit <a
					href="https://www.isupportmyanmar.com/"
					rel="papererrer noopener">isupportmyanmar</a
				> for more information.
			</p>
			<p class="-md:text-sm">#StandWithMyanmar</p>
			<div class="pt-12">
				<Sharer
					url="https://www.ordinaryunfold.com/myanmar-coup/"
					linkClass="text-yellow-500 hover:text-yellow-300"
				/>
			</div>
		</div>

		<div class="space-y-6">
			<p class="-md:text-sm">
				Data from <a href="https://aappb.org/?cat=109" rel="papererrer noopener"
					>AAPPB 2021 Coup Daily Briefings</a
				>
			</p>
			<Footer class="text-center text-true-gray-400" />
		</div>
	</section>
</div>

<style>
	:global(mark) {
		@apply bg-transparent text-yellow-500;
	}

	h2 {
		@apply font-head font-bold text-4xl md:text-6xl;
	}

	a {
		@apply text-yellow-500 hover:underline;
	}
</style>
