<script>
	import Metadata from '../components/metadata.svelte';
	import Hero from '../components/landing/hero.svelte';

	import Footer from '../components/footer.svelte';
	import ProjectCard from '../components/landing/project-card.svelte';
	import ExternalLink from '../components/external-link.svelte';
</script>

<Metadata />

<div class="bg-black text-white min-h-screen p-4">
	<div class="flex flex-col w-full max-w-2xl mx-auto">
		<Hero />
	</div>

	<div class="flex flex-col w-full max-w-4xl mx-auto space-y-24 md:space-y-36">
		<div class="grid grid-cols-1 gap-4 md:(grid-cols-2 gap-6)">
			<ProjectCard
				title="What's in the city?"
				description="Explore different places in six example cities of Thailand. What kind of place does Thai flavor? Is it easy to be reached? What is the difference in each city?"
				href="/whats-in-the-city/"
				image="/whats-in-the-city/og.png"
				date="15 Jan 2022"
				lang="EN"
			/>
			<ProjectCard
				title="Losses in Myanmar"
				description="Get to know the victims demography during the 2021 coup d'état in Myanmar. #StandWithMyanmar"
				href="/myanmar-coup/"
				image="/myanmar-coup/og.png"
				date="11 Jul 2021"
				lang="EN"
			/>
			<ProjectCard
				title="Thailand Covid-19 Speeches"
				description="How did Thai government, political parties, doctors, and others talk about COVID-19 compared to daily new cases."
				href="/th-covid-speech/"
				image="/th-covid-speech/og2.png"
				date="14 May 2021"
				lang="TH"
			/>
		</div>

		<div class="flex flex-row justify-center items-center space-x-4">
			<div class="-md:text-sm">Follow us</div>
			<ExternalLink
				href="https://www.facebook.com/ordinaryunfold"
				class="text-gray-500 hover:text-light-blue-600"
				ariaLabel="Follow us on Facebook"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-6 md:w-8"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg
				>
			</ExternalLink>
			<ExternalLink
				href="https://twitter.com/ordinaryunfold"
				class="text-gray-500 hover:text-light-blue-600"
				ariaLabel="Follow us on Twitter"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-6 md:w-8"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					><path
						d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
					/></svg
				>
			</ExternalLink>
		</div>

		<Footer class="opacity-70 text-center" />
	</div>
</div>
