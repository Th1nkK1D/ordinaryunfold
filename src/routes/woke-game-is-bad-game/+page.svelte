<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchGames, wokeLevelMap, type Game, type GameLevelGroup } from './game';
	import WokeLevel from './_components/woke-level.svelte';
	import ReviewScale from './_components/review-scale.svelte';
	import BeeswarmChart from './_components/beeswarm-chart.svelte';
	import Logo from '../../components/logo.svelte';
	import { groups as d3groups } from 'd3-array';
	import GuessingGame from './_components/guessing-game.svelte';
	import CohenDPlot from './_components/cohen-d-plot.svelte';
	import Footer from '../../components/footer.svelte';
	import Sharer from '../../components/sharer.svelte';
	import QuoteBlock from './_components/quote-block.svelte';
	import ReferenceText from './_components/reference-text.svelte';
	import CohenDFormular from './_components/cohen-d-formular.svelte';
	import Metadata from '../../components/metadata.svelte';

	let games = $state<Game[]>([]);

	let groups = $derived<GameLevelGroup[]>(
		d3groups(games, (g) => g.woke.level)
			.sort((a, z) => a[0] - z[0])
			.map(([_, gs]) => ({
				games: gs as Game[],
				mean: Math.round(
					gs.reduce((sum, { positivePercent }) => sum + positivePercent, 0) / gs.length
				)
			}))
	);

	onMount(async () => {
		games = await fetchGames();
	});
</script>

<Metadata
	title="Woke Game is Bad Game?"
	description="We analyzed over 1,000 games to see if wokeness and user reviews are correlated"
	path="/woke-game-is-bad-game"
/>

<div class="flex justify-center bg-zinc-100 text-neutral-950">
	<div class="w-full max-w-screen-lg pb-16 pt-6 md:pt-16">
		<div class="flex flex-col items-center gap-12 px-3 pb-12 md:items-start md:gap-24 md:pb-20">
			<Logo dark />
			<h1
				class="max-w-72 text-balance text-center text-6xl leading-tight md:max-w-none md:text-left md:text-8xl md:leading-snug"
			>
				<span>Woke</span> Game is <span>Bad</span> Game?
			</h1>
			<p class="mx-auto !max-w-none text-xl md:text-2xl">
				We analyzed over 1,000 games in Woke Content Detector's list to see if wokeness and user
				positive reviews are correlated.
			</p>
		</div>

		<div class="flex flex-row items-center justify-center gap-3 py-6 md:gap-4">
			<svg class="w-6 fill-current md:w-8" viewBox="0 2 32 32"
				><g
					><path
						d="M24 13a1 1 0 1 1-2 0a1 1 0 0 1 2 0m0 4a1 1 0 1 1-2 0a1 1 0 0 1 2 0m-3-1a1 1 0 1 0 0-2a1 1 0 0 0 0 2m5-1a1 1 0 1 1-2 0a1 1 0 0 1 2 0M9.5 17a2 2 0 1 0 0-4a2 2 0 0 0 0 4m10.024 5.56a2 2 0 1 0 0-4a2 2 0 0 0 0 4m-5.23-2.5h.4c.28 0 .55.19.58.47c.07.36-.21.68-.56.68h-.43a.58.58 0 0 0-.58.58v.43c0 .35-.32.63-.68.56c-.28-.05-.47-.32-.47-.6v-.4a.58.58 0 0 0-.58-.58h-.43c-.35 0-.63-.32-.56-.68c.05-.28.32-.47.6-.47h.4c.32 0 .58-.26.58-.58v-.43c0-.35.32-.63.68-.56c.28.05.47.32.47.6v.4c0 .32.26.58.58.58"
					/><path
						d="M6.747 8.597a5.46 5.46 0 0 0-2.92 3.648v.004l-.032.101l-.115.382a99 99 0 0 0-1.552 5.824c-.395 1.695-.761 3.524-.964 5.165c-.196 1.596-.26 3.173.059 4.276c.46 1.596 1.915 2.421 2.75 2.795h.002a2.44 2.44 0 0 0 2.529-.346l.009-.007l.009-.008l.729-.623a1516 1516 0 0 1 3.33-2.837a129 129 0 0 1 .87-.728l.02-.015l.006-.005c.19-.144.426-.223.675-.223h7.696c.225 0 .46.075.664.216l4.987 4.225l.007.005c.404.33.89.47 1.294.512c.395.042.848.005 1.23-.163c.842-.37 2.284-1.205 2.755-2.791l.002-.007l.002-.007c.31-1.102.24-2.677.037-4.272c-.207-1.64-.578-3.468-.975-5.163a100 100 0 0 0-1.676-6.206l-.031-.1l-.001-.004c-.485-1.983-1.919-3.41-3.741-3.976C23.36 7.52 21.92 7 19.93 7l-.91 1h-6.476l-.91-1c-2.269 0-3.823.674-4.887 1.597m-1.003 4.22l.013-.04l.008-.034C6.159 11.085 7.59 10 9.369 10h13.232c1.788 0 3.21 1.084 3.605 2.743l.008.034l.02.064l.029.095l.112.37a98 98 0 0 1 1.528 5.704c.39 1.664.744 3.416.94 4.96c.2 1.583.21 2.794.023 3.47c-.21.694-.92 1.205-1.632 1.52l-.051.01a1 1 0 0 1-.173 0a.5.5 0 0 1-.236-.07l-5.028-4.26l-.03-.022A3.2 3.2 0 0 0 19.849 24h-7.696c-.67 0-1.334.212-1.883.63c-.215.162-1.501 1.255-2.684 2.263c-.603.514-1.194 1.018-1.634 1.395l-.719.614a.44.44 0 0 1-.442.064c-.743-.332-1.447-.836-1.646-1.524v-.002c-.195-.673-.19-1.885.005-3.474c.19-1.543.54-3.294.927-4.957a97 97 0 0 1 1.631-6.074l.03-.095z"
					/></g
				></svg
			>
			<svg class="w-6 fill-current md:w-8" viewBox="0 0 32 32"
				><path
					d="M28.002 2.071C29.103 1.993 30 2.895 30 4v15c0 1.105-.904 1.98-1.987 2.198c-3.553.716-5.973 3.857-6.815 6.815C20.979 29.095 20.105 30 19 30H4c-1.105 0-2.007-.897-1.929-1.998A28.02 28.02 0 0 1 10.2 10.2a28.02 28.02 0 0 1 17.802-8.129M17.038 29H19c.514 0 1.068-.447 1.217-1.185l.008-.038l.01-.038q.057-.198.122-.397c.649-2.36 2.14-4.37 4.13-5.687a8.8 8.8 0 0 1 3.328-1.438C28.553 20.068 29 19.514 29 19v-1.961a13 13 0 0 0-8.19 3.771A12.96 12.96 0 0 0 17.038 29M29 14.031v-3.005a19 19 0 0 0-12.44 5.534A19.03 19.03 0 0 0 11.026 29h3.005a16 16 0 0 1 4.659-10.31A16 16 0 0 1 29 14.031m0-6.008V5.02a25 25 0 0 0-16.68 7.3A25.05 25.05 0 0 0 5.02 29h3.003a22.05 22.05 0 0 1 6.417-14.56A22 22 0 0 1 29 8.023m-8.643 19.32c.649-2.36 2.14-4.37 4.13-5.688c-2.038 1.425-3.446 3.598-4.13 5.687"
				/></svg
			>
		</div>

		<section>
			<p>
				<i>"Woke"</i> might be the most popular word in the past few years. Not only do people use it
				in discussion a lot, but people also blame it for destroying culture and fun in many sectors
				including games, a lot. The problem is that not a lot of those accusations are backed by the
				data when most of the discussion around woke topic are so subjective. So here we are.
			</p>
			<div class="flex justify-center">
				<blockquote class="twitter-tweet" data-conversation="none">
					<p lang="en" dir="ltr">Yeah, video games are *way* too woke. It kills the vibe.</p>
					&mdash; Elon Musk (@elonmusk)<a
						href="https://twitter.com/elonmusk/status/1768087733082227117?ref_src=twsrc%5Etfw"
						>March 14, 2024</a
					>
				</blockquote>
				<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
			</div>
		</section>

		<section>
			<h2>But first, what is woke?</h2>
			<p>
				There are many discussions about the definition of woke. <ReferenceText
					href="https://www.merriam-webster.com/dictionary/woke">Merriam-Webster</ReferenceText
				> describes <i>"woke"</i> as
			</p>
			<QuoteBlock>
				aware of and actively attentive to important societal facts and issues (especially issues of
				racial and social justice)
			</QuoteBlock>
			<p>
				Our main data source, <ReferenceText
					href="https://steamcommunity.com/groups/Woke_Content_Detector"
					>Woke Content Detector</ReferenceText
				> (a group with over 2,000 members that aim to label computer games with wokeness label), defines
				"Woke content" in their <ReferenceText
					href="https://steamcommunity.com/groups/Woke_Content_Detector/discussions/0/6975585346734259204/"
					>methodology</ReferenceText
				> as
			</p>
			<QuoteBlock>
				any images, messages, characters, storytelling, dialogue, music, or game mechanics that
				include themes associated with the left-side of the political aisle in contemporary western
				politics.
			</QuoteBlock>
			<p>
				In the <ReferenceText
					href="https://store.steampowered.com/curator/44927664-Woke-Content-Detector/"
					>Woke Content Detector's list</ReferenceText
				>, there are {games.length.toLocaleString()} games with 200 or more reviews on Steam.* It was
				grouped into 3 levels of wokeness:
			</p>
			<div class="mx-auto flex flex-col gap-2">
				{#each wokeLevelMap as { label, description }, level}
					<WokeLevel
						title="{level + 1}. {label}"
						{description}
						games={games.filter((g) => g.woke.level === level)}
					/>
				{/each}
				<p class="self-end text-sm italic">* Data collected on 20 November 2024</p>
			</div>
		</section>

		<section>
			<h2>What is a bad (and good) game?</h2>
			<p>
				Good and bad games are subjective and opinionated. We use Steam's game reviews as a
				collective good/bad indicator. <ReferenceText href="https://store.steampowered.com"
					>Steam</ReferenceText
				> is a video game digital distribution service. People who buy games on Steam can give them a
				<i>"Positive"</i>
				or <i>"Negative"</i> review. When a game has enough reviews, Steam will show the percentage of
				positive reviews.
			</p>
			<ReviewScale />
		</section>

		<section>
			<h2>Let's guess</h2>
			<p>
				If a woke game is a bad game, now can you guess the positive review percentage that best
				separates <i>"Not Woke"</i> and <i>"Overtly Woke"</i> games?
				<i>(Let's ignore subtle woke games for now)</i>
			</p>
			<GuessingGame {games} />
		</section>

		<section>
			<h2>Analyse the difference</h2>
			<p>
				When divided into wokeness levels, <i>"Not Woke"</i> games seem to have the highest average
				positive rating at 88%, followed by <i>"Subtle Woke"</i> at 87% and <i>"Overtly Woke"</i> at
				85%.
			</p>
			<BeeswarmChart {groups} />
			<p>
				Look like the more woke the game is, the worse review it tends to be by an average of 3%
				between the
				<i>"Not Woke"</i> and <i>"Overtly Woke"</i> groups. The question is,
				<span class="font-bold italic">does this different matter?</span>
				In statistics, we can use <i>"Cohen's D"</i> to measure how large is the difference between the
				average of two groups relative to their sparsity.
			</p>
			<CohenDFormular />
			<p>
				We calculated
				<i>Cohen's D</i>
				value of the two most extreme groups, <i>"Not Woke"</i> and <i>"Overtly Woke"</i> and here
				is the result
				<i>(let's focus only on 80% positive reviews and above to see the details)</i>.
			</p>
			<CohenDPlot groups={groups.filter((_, i) => i !== 1)} />
			<p>
				According to the <ReferenceText
					href="https://www.statisticshowto.com/probability-and-statistics/statistics-definitions/cohens-d/"
					>Cohen's general guideline</ReferenceText
				>, Cohen's D of 0.28 can be interpreted as
				<span class="font-bold italic"
					>"The difference between two groups is small and difficult to see with the naked eye"</span
				>.
			</p>
		</section>

		<section>
			<h2>So, is woke game a bad game?</h2>
			<p class="text-8xl">NO.</p>
			<p>
				Using data from the Woke Content Detector, we cannot separate the game's wokeness with
				positive reviews percentage. And the difference in averages between the wokeness group is
				too small to be statistically significant.
			</p>
		</section>

		<div class="mt-32 flex flex-col items-center gap-16 px-3">
			<div class="flex flex-row items-center gap-6">
				<span class="text-sm">Share</span>
				<Sharer
					url="https://ordinaryunfold.com/woke-game-is-bad-game"
					linkClass="text-amber-700 hover:text-amber-600"
				/>
			</div>
			<Footer class="text-center" />
		</div>
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700&display=swap');

	h1,
	h2 {
		font-family: 'Libre Baskerville', serif;
		@apply font-bold;
	}

	h2 {
		@apply mx-auto w-full max-w-screen-md;
	}

	h1 > span {
		@apply underline decoration-neutral-300 decoration-wavy;
	}

	h2 {
		@apply text-3xl font-bold underline decoration-neutral-300 decoration-wavy;
	}

	section {
		@apply flex flex-col gap-8 px-3 py-12 md:gap-10 md:py-20;
	}

	p {
		@apply mx-auto max-w-screen-md text-pretty indent-6 md:indent-8;
	}
</style>
