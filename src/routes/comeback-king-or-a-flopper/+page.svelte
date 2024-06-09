<script lang="ts">
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import type { LeagueStats } from '../../data/comeback-king-or-a-flopper/model';
	import ScoreChart from './_components/score-chart.svelte';
	import Logo from '../../components/logo.svelte';
	import Footer from '../../components/footer.svelte';
	import Sharer from '../../components/sharer.svelte';
	import TeamNavigation from './_components/team-navigation.svelte';
	import StatsCounter from './_components/stats-counter.svelte';
	import StripeBackground from './_components/stripe-background.svelte';
	import ExternalLink from '../../components/external-link.svelte';
	import Spinner from '../../components/spinner.svelte';

	let teamIndex = 0;
	let selectedLeague = 'bundesliga';
	let isLoading = true;
	let league: LeagueStats;
	let activeTimeIndex: number = -1;

	onMount(() => {
		loadSelectedLeagueData();
	});

	async function loadSelectedLeagueData() {
		isLoading = true;
		league = await (await fetch(`/comeback-king-or-a-flopper/json/${selectedLeague}.json`)).json();
		teamIndex = 0;
		isLoading = false;
	}
</script>

<main
	class="scroll- h-screen snap-y snap-proximity flex-col overflow-x-hidden overflow-y-scroll scroll-smooth"
>
	<div class="relative h-screen">
		<StripeBackground class="absolute inset-0" />
		<section
			class="absolute inset-0 flex flex-col items-center justify-evenly gap-8 text-center text-white md:items-start md:justify-center md:gap-12 md:text-left"
		>
			<Logo class="mx-auto mt-3 self-start md:mx-0 md:mt-5" />
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
				Inspired by Bayer Leverkusen's late comeback again and again to become an undefeated 2023/24
				Bundesliga champion. Let's see how each top-four European league team performs in each
				minute, from the kick-off to the final whistle.
			</p>
			<a href="#explore" class="md:self-end">
				<svg viewBox="0 0 24 24" class="w-8 fill-current opacity-60 hover:opacity-100 md:w-10">
					<path d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z" />
				</svg>
			</a>
		</section>
	</div>

	<div id="explore" class="relative flex h-screen flex-col bg-gray-100">
		{#if isLoading}
			<div
				transition:fade
				class="absolute inset-0 z-10 flex items-center justify-center bg-white/40"
			>
				<Spinner />
			</div>
		{/if}
		{#if league}
			{@const { teams, timeScale } = league}
			{@const team = teams[teamIndex]}
			<section
				class="flex-col items-center gap-2 md:flex-row md:items-end md:justify-between md:gap-4"
			>
				<div class="flex w-full flex-col items-center gap-2 overflow-x-clip md:items-start">
					<div class="flex flex-row items-end gap-3 font-head">
						<select
							class="cursor-pointer border-b border-solid border-gray-300 bg-transparent pr-1 md:text-lg"
							bind:value={selectedLeague}
							on:change={loadSelectedLeagueData}
						>
							<option value="bundesliga">🇩🇪 Bundesliga</option>
							<option value="laliga">🇪🇸 LaLiga</option>
							<option value="premier-league">🏴󠁧󠁢󠁥󠁮󠁧󠁿 Premier League</option>
							<option value="serie-a">🇮🇹 Seria A</option>
						</select>
						<p class="text-gray-400">2023/24</p>
					</div>
					<h2
						class="bebas-neue w-full whitespace-nowrap text-center text-3xl md:text-left md:text-5xl"
					>
						{teamIndex + 1}. {team.name}
					</h2>
				</div>
				<StatsCounter class="flex-1" {team} {timeScale} {activeTimeIndex} />
			</section>
			{#key league.teams[0].name}
				<ScoreChart class="flex-1" {team} {timeScale} maxMatch={team.D[0]} bind:activeTimeIndex />
			{/key}
			<section class="flex-row">
				<TeamNavigation bind:teamIndex {teams} />
			</section>
		{/if}
	</div>

	<section class="relative flex-col items-center justify-between gap-6 md:flex-row-reverse">
		<div class="flex items-center justify-center gap-3 md:gap-5">
			<span class="text-xs text-gray-400 md:text-sm">Share</span>
			<Sharer
				url="https://ordinaryunfold.com/comeback-king-or-a-flopper"
				linkClass="text-gray-400 hover:text-gray-600"
			/>
		</div>
		<div class="flex flex-col gap-6 text-center text-gray-600 md:text-left">
			<p class="md:text-md text-sm">
				Matches data from <ExternalLink href="https://www.livescore.com/" class="underline"
					>LiveScore</ExternalLink
				>
			</p>
			<Footer />
		</div>
	</section>
</main>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

	.bebas-neue {
		font-family: 'Bebas Neue', sans-serif;
	}

	main > * {
		@apply snap-end;
	}

	section {
		@apply mx-auto flex w-full max-w-screen-lg px-3 py-8 md:py-12;
	}
</style>
