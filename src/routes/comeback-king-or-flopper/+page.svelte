<script lang="ts">
	import { onMount } from 'svelte';
	import type { LeagueStats } from '../../data/comeback-king-or-flopper/model';
	import ScoreChart from './_components/score-chart.svelte';
	import Logo from '../../components/logo.svelte';
	import Footer from '../../components/footer.svelte';
	import Sharer from '../../components/sharer.svelte';
	import TeamNavigation from './_components/team-navigation.svelte';

	let teamIndex = 0;
	let league: LeagueStats;
	let activeTimeIndex: number = -1;

	onMount(async () => {
		const res = await fetch('/comeback-king-or-flopper/json/bundesliga.json');
		league = await res.json();
	});
</script>

<div class="flex h-screen flex-col bg-gray-100">
	<Logo dark class="mx-auto mt-3 md:mt-5" />
	{#if league}
		{@const team = league.teams[teamIndex]}
		{@const wins = team.W.at(activeTimeIndex) || 0}
		{@const draws = team.D.at(activeTimeIndex) || 0}
		{@const losses = team.L.at(activeTimeIndex) || 0}
		{@const points = wins * 3 + draws}
		<section class="flex-col items-center gap-2 md:flex-row md:items-end md:justify-between">
			<div class="flex flex-col items-center gap-2 md:items-start">
				<select class="bg-transparent text-lg">
					<option>🇪🇸 Bundesliga</option>
				</select>
				<h1 class="text-center text-3xl font-bold md:text-left md:text-5xl">
					{teamIndex + 1}. {team.name}
				</h1>
			</div>
			<p class="text-gray-400 md:text-xl">
				{#if activeTimeIndex >= 0}
					<span class="font-bold text-gray-800">{activeTimeIndex}'</span> :
				{/if}
				<span class="text-green-500"><b>{wins}</b>W</span> +
				<span class="text-blue-500"><b>{draws}</b>D</span> +
				<span class="text-red-400"><b>{losses}</b>L</span> =
				<span class="text-gray-500"><b>{points}</b> points</span>
			</p>
		</section>
		<ScoreChart
			class="flex-1"
			timeScale={league.timeScale}
			maxMatch={team.D[0]}
			{team}
			bind:activeTimeIndex
		/>
		<section class="flex-row">
			<TeamNavigation bind:teamIndex teams={league.teams} />
		</section>
	{/if}
</div>

<section class="relative flex-col items-center justify-between gap-3 md:flex-row-reverse">
	<div class="flex items-center justify-center gap-3 md:gap-5">
		<span class="text-xs text-gray-400 md:text-sm">Share</span>
		<Sharer
			url="https://ordinaryunfold.com/comeback-king-or-flopper"
			linkClass="text-gray-400 hover:text-gray-600"
		/>
	</div>
	<Footer class="text-center text-xs text-gray-600 md:text-left md:text-sm" />
</section>

<style lang="postcss">
	section {
		@apply mx-auto flex w-full max-w-screen-lg px-3 py-3 md:py-6;
	}
</style>
