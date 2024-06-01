<script lang="ts">
	import Scrollama from '../../components/scrollama.svelte';
	import Metadata from '../../components/metadata.svelte';
	import PeopleBackground from './_people/people-background.svelte';
	import Chapter from './_sections/chapter.svelte';
	import Landing from './_sections/landing.svelte';
	import type { Person } from './_data';
	import { fatalities } from './_data';
	import { chapters } from './_sections/chapters';
	import Footer from '../../components/footer.svelte';
	import Sharer from '../../components/sharer.svelte';

	let people: Person[] = fatalities;
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
		class="flex w-full flex-col"
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

	<section class="flex h-screen flex-col items-center justify-center p-8 text-center">
		<h2><mark>The fight</mark> is&nbsp;not&nbsp;over.</h2>
	</section>

	<section class="flex h-screen flex-col space-y-12 p-4 text-center">
		<div class="flex flex-1 flex-col items-center justify-center space-y-4">
			<svg width="92" height="92" viewBox="0 0 92 92" fill="none">
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
			<p class="text-sm md:text-base">#StandWithMyanmar</p>
			<div class="flex flex-col items-center space-y-2 py-6 md:py-12">
				<Sharer
					url="https://www.ordinaryunfold.com/myanmar-coup/"
					linkClass="text-yellow-500 hover:text-yellow-300"
				/>
			</div>
			<a href="/" class="text-xs md:text-base">Return to home page</a>
		</div>

		<div class="space-y-6 text-xs md:text-base">
			<p>
				Fatality data from <a href="https://aappb.org/?cat=109" rel="papererrer noopener"
					>AAPPB 2021 Coup Daily Briefings</a
				>
				<br />
				News from
				<a
					href="https://www.nytimes.com/article/myanmar-news-protests-coup.html"
					rel="papererrer noopener">NYTimes</a
				>, <a href="https://www.bbc.com/news/world-asia-55902070" rel="papererrer noopener">BBC</a>,
				<a
					href="https://edition.cnn.com/2021/02/01/asia/myanmar-military-coup-explainer-intl-hnk-scli/index.html9"
					rel="papererrer noopener">CNN</a
				>, and
				<a
					href="https://en.wikipedia.org/wiki/2021_Myanmar_coup_d%27%C3%A9tat"
					rel="papererrer noopener">Wikipedia</a
				>
			</p>
			<Footer class="text-center text-xs text-gray-400 md:text-base" />
		</div>
	</section>
</div>

<style>
	:global(mark) {
		@apply bg-transparent text-yellow-500;
	}

	h2 {
		@apply font-head text-4xl font-bold md:text-6xl;
	}

	a {
		@apply text-yellow-500 hover:underline;
	}
</style>
