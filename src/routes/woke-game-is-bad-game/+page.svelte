<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchGames, wokeLevelMap, type Game } from './game';
	import WokeLevel from './_components/woke-level.svelte';
	import ReviewScale from './_components/review-scale.svelte';
	import BeeswarmChart from './_components/beeswarm-chart.svelte';
	import Logo from '../../components/logo.svelte';
	import { groups as d3groups } from 'd3-array';
	import GuessingGame from './_components/guessing-game.svelte';

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

<div class="flex justify-center bg-zinc-100 text-neutral-950">
	<div class="w-full max-w-screen-lg py-24">
		<section>
			<Logo dark />
			<h1 class="text-8xl leading-tight">
				<span>Woke</span> Game<br /> is <span>Bad</span> Game?
			</h1>
			<div class="text-2xl">
				We analyses over 1,000 games in Woke Content Detector's list to see if wokeness and user
				review are correlated.
			</div>
		</section>

		<section>
			<h2>What is bad (and good) game?</h2>
			<p>
				Good and bad game is subjective and opinionate, so we use Steam's game review as a
				collective good/bad indicator. Steam is a video game digital distribution service. People
				who bought game on Steam can give a "Positive" or "Negative" review to the game. When the
				games has enough reviews, Steam will show the percentage of positive reviews.
			</p>
			<ReviewScale hideLegend />
		</section>

		<section>
			<h2>What is woke game?</h2>
			<p>
				There are many discussion about the definition of woke. To aligned with our main datasets,
				Woke Content Detector (a group with over 2-thousand members aim to label computer games with
				wokeness label), defines "Woke content" in their methodology as <i
					>"Any images, messages, characters, storytelling, dialogue, music, or game mechanics that
					include themes associated with the left-side of the political aisle in contemporary
					western politics."</i
				>
			</p>
			<p>
				In the Woke Content Detector's list, there are {games.length.toLocaleString()} games with 200
				or more reviews on Steam.* It was grouped into 3 level of wokeness:
			</p>
			<div class="flex flex-col gap-2">
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
			<h2>Let's guess</h2>
			<p>
				If woke game is bad game, now can you guess the positive review percentage which best
				saperate "Overtly Woke" and "Not Woke" games? <i>(Let's ignore subtle woke games for now)</i
				>
			</p>
			<GuessingGame {games} />
		</section>

		<section>
			<BeeswarmChart {groups} />
		</section>
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700&display=swap');

	h1,
	h2 {
		font-family: 'Libre Baskerville', serif;
		@apply font-bold;
	}

	h1 > span {
		@apply underline decoration-neutral-500 decoration-dotted;
	}

	h2 {
		@apply text-3xl font-bold underline decoration-neutral-300 decoration-wavy;
	}

	section {
		@apply flex flex-col gap-8 px-3 py-16;
	}

	section > p {
		@apply indent-8;
	}
</style>
