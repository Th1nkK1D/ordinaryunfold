<script lang="ts">
	import scrollama from 'scrollama';
	import { onMount } from 'svelte';
	import { movies } from '../../data/movies-wrapped-2025/parse-movies';
	import LandingSection from './_sections/landing-section.svelte';

	let currentSectionIndex = $state(0);
	let totalSectionCount = $state(1);

	onMount(() => {
		const sections = document.querySelectorAll('section');
		totalSectionCount = sections.length;

		const scroller = scrollama()
			.setup({
				// @ts-expect-error NodeList can be deconstructed
				step: [...sections]
			})
			.onStepEnter(({ index }) => {
				currentSectionIndex = index;
			});

		return () => scroller.destroy();
	});
</script>

<div class="fixed h-1 w-full">
	<div
		class="h-full bg-gray-500 transition-all"
		style="width: {(currentSectionIndex / (totalSectionCount - 1)) * 100}%;"
	></div>
</div>

<LandingSection {movies} />

<section>next section</section>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Rampart+One&display=swap');

	:global(html) {
		@apply snap-y snap-mandatory scroll-smooth;
	}

	:global(body) {
		@apply snap-y snap-mandatory text-center font-raleway;
	}

	:global(section) {
		@apply mx-auto h-lvh w-full max-w-screen-sm snap-start;
	}

	:global(.content-container) {
		@apply flex h-lvh w-full flex-col items-center justify-center gap-8 p-4;
	}
</style>
