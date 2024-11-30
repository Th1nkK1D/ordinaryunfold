<script>
	import Metadata from '../components/metadata.svelte';
	import Hero from '../components/landing/hero.svelte';
	import Footer from '../components/footer.svelte';
	import ProjectCard from '../components/landing/project-card.svelte';
	import ExternalLink from '../components/external-link.svelte';
	import BlurryBackground from '../components/landing/blurry-background.svelte';
</script>

<Metadata />

<BlurryBackground />

<div class=" min-h-dvh p-4 text-gray-100">
	<div class="mx-auto flex w-full max-w-2xl flex-col">
		<Hero />
	</div>

	<div class="md:mb-18 mx-auto mb-12 flex w-full max-w-4xl flex-col space-y-24 md:space-y-36">
		<div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
			<ProjectCard
				title="Woke Game is Bad Game?"
				description="We analyzed over 1,000 games in Woke Content Detector's list to see if wokeness and user review ratings are related."
				href="/woke-game-is-bad-game/"
				image="/woke-game-is-bad-game/og.png"
				date="30 Nov 2024"
				lang="EN"
			/>
			<ProjectCard
				title="Senates Blind Test"
				description="From Thailand's Senates Election in 2024, guessing which candidate get the most votes by reading their 5-lines-introduction document."
				href="/senates-blind-test/"
				image="/senates-blind-test/og.png"
				date="6 Jul 2024"
				lang="TH"
			/>
			<ProjectCard
				title="Comeback King or a Flopper"
				description="Explore the top-five 2023/24 European football league teams. How many wins, draws, or lose they get in each minute of the game?"
				href="/comeback-king-or-a-flopper/"
				image="/comeback-king-or-a-flopper/og.png"
				date="15 Jun 2024"
				lang="EN"
			/>
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

		<div class="flex flex-row items-center justify-center space-x-4">
			<div class="text-sm md:text-base">Follow us</div>
			<ExternalLink
				href="https://www.facebook.com/ordinaryunfold"
				class="duration-250 text-gray-500 transition ease-in-out hover:text-blue-600"
				ariaLabel="Follow us on Facebook"
			>
				<svg
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
				class="duration-250 text-gray-500 transition ease-in-out hover:text-blue-600"
				ariaLabel="Follow us on Twitter"
			>
				<svg
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

		<Footer hideFollowLinks class="text-center opacity-70" />
	</div>
</div>
