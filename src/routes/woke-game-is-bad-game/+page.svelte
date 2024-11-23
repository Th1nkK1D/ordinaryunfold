<script lang="ts">
	import { onMount } from 'svelte';
	import { fetchGames, type Game } from './game';
	import WokeLevel from './_components/woke-level.svelte';

	let games = $state<Game[]>([]);

	onMount(async () => {
		games = await fetchGames();
	});
</script>

<div class="flex justify-center bg-zinc-100 text-neutral-950">
	<div class="w-full max-w-screen-lg py-24">
		<section>
			<h1 class="text-8xl leading-tight">
				<span>Woke</span> Game<br /> is <span>Bad</span> Game?
			</h1>
			<p class="text-2xl">
				We analyses almost 1,400 games in Woke Content Detector's list to see if wokeness and user
				review are correlated.
			</p>
		</section>

		<section>
			<h2>What is woke game?</h2>
			<div class="flex flex-col gap-2">
				<WokeLevel
					title="1. Not woke"
					description="No Woke themes present (Recommended)"
					games={games.filter((g) => g.woke.level === 0)}
				/>
				<WokeLevel
					title="2. Subtle woke"
					description="Woke themes present with subtle/no specific messaging (Informational)"
					games={games.filter((g) => g.woke.level === 1)}
				/>
				<WokeLevel
					title="3. Overtly woke"
					description="Woke themes present with overt messaging (Not Recommended)"
					games={games.filter((g) => g.woke.level === 2)}
				/>
				<p>Total {games.length.toLocaleString()} game</p>
			</div>
		</section>
	</div>
</div>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&display=swap');

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
		@apply flex flex-col gap-8 px-3 py-12;
	}
</style>
