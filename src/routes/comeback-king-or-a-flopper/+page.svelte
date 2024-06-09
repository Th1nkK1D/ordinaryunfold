<script lang="ts">
	import { onMount } from 'svelte';
	import type { LeagueStats } from '../../data/comeback-king-or-a-flopper/model';
	import ScoreChart from './_components/score-chart.svelte';
	import Logo from '../../components/logo.svelte';
	import Footer from '../../components/footer.svelte';
	import Sharer from '../../components/sharer.svelte';
	import TeamNavigation from './_components/team-navigation.svelte';
	import StatsCounter from './_components/stats-counter.svelte';

	let teamIndex = 0;
	let league: LeagueStats;
	let activeTimeIndex: number = -1;

	onMount(async () => {
		league = await (await fetch('/comeback-king-or-a-flopper/json/bundesliga.json')).json();
	});
</script>

<section class="flex min-h-screen flex-col justify-center gap-8 text-center md:gap-12 md:text-left">
	<Logo dark class="mx-auto mt-3 md:mx-0 md:mt-5" />
	<h1 class="bebas-neue text-balance text-6xl md:text-9xl">
		Comeback <span class="relative"
			>King<svg
				class="absolute -top-3 left-[1.2rem] size-6 fill-current md:-top-4 md:left-[2.85rem] md:size-10"
				viewBox="0 0 24 24"
			>
				<path
					d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14z"
				/>
			</svg>
		</span>
		or a Flopper
		<svg
			class="-mr-3 inline size-10 -translate-x-2 translate-y-3 -rotate-45 fill-current md:size-20 md:-translate-x-4 md:translate-y-6"
			viewBox="0 0 24 24"
		>
			<path
				d="m13.5 22.5l-2-.4l.8-4.3l-3.6-2.7l-1.3-5.7l-2.2 1.9l.8 3.8l-2 .4l-1-4.9l4.45-3.975q.575-.5 1.363-.412t1.512.387q.8.35 1.663.5t1.737.025t1.613-.575t1.412-1L18 7.1q-.75.575-1.55 1.075t-1.725.775q-.825.225-1.662.238T11.4 9l.7 3.1l3.7-.7l5.2 3.7l-1.2 1.6l-4.3-3l-3.6.7l2.7 2zM8 5.5q-.825 0-1.412-.587T6 3.5t.588-1.412T8 1.5t1.413.588T10 3.5t-.587 1.413T8 5.5"
			/>
		</svg>
	</h1>
	<p class="max-w-3xl text-pretty text-lg">
		Inspired by Bayer Leverkusen's late comeback again and again to become an undefeated 2023/2024
		Bundesliga champion. Let's see how each top-four European league team performs in each minute,
		from the kick-off to the final whistle.
	</p>
</section>

<div class="flex h-screen flex-col bg-gray-100">
	{#if league}
		{@const { teams, timeScale } = league}
		{@const team = teams[teamIndex]}
		<section
			class="flex-col items-center gap-2 md:flex-row md:items-end md:justify-between md:gap-4"
		>
			<div class="flex w-full flex-col items-center gap-2 overflow-x-clip md:items-start">
				<select class="bg-transparent font-head md:text-lg">
					<option>🇩🇪 Bundesliga</option>
				</select>
				<h2
					class="bebas-neue w-full whitespace-nowrap text-center text-3xl md:text-left md:text-5xl"
				>
					{teamIndex + 1}. {team.name}
				</h2>
			</div>
			<StatsCounter class="flex-1" {team} {timeScale} {activeTimeIndex} />
		</section>
		<ScoreChart class="flex-1" {team} {timeScale} maxMatch={team.D[0]} bind:activeTimeIndex />
		<section class="flex-row">
			<TeamNavigation bind:teamIndex {teams} />
		</section>
	{/if}
</div>

<section class="relative flex-col items-center justify-between gap-3 md:flex-row-reverse">
	<div class="flex items-center justify-center gap-3 md:gap-5">
		<span class="text-xs text-gray-400 md:text-sm">Share</span>
		<Sharer
			url="https://ordinaryunfold.com/comeback-king-or-a-flopper"
			linkClass="text-gray-400 hover:text-gray-600"
		/>
	</div>
	<Footer class="text-center text-xs text-gray-600 md:text-left md:text-sm" />
</section>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

	.bebas-neue {
		font-family: 'Bebas Neue', sans-serif;
	}

	section {
		@apply mx-auto flex w-full max-w-screen-lg px-3 py-3 md:py-6;
	}
</style>
