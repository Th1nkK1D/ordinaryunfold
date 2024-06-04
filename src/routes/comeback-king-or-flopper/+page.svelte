<script lang="ts">
	import { onMount } from 'svelte';
	import type { LeagueStats } from '../../data/comeback-king-or-flopper/model';
	import ScoreChart from './_chart/score-chart.svelte';
	import Logo from '../../components/logo.svelte';

	let teamIndex = 0;
	let league: LeagueStats;
	let activeTimeIndex: number = -1;

	onMount(async () => {
		const res = await fetch('/comeback-king-or-flopper/json/bundesliga.json');
		league = await res.json();
	});
</script>

<div class="relative flex h-screen flex-col bg-gray-100">
	<Logo dark class="mx-auto mt-3 md:mt-5" />
	{#if league}
		{@const team = league.teams[teamIndex]}
		{@const wins = team.W.at(activeTimeIndex) || 0}
		{@const draws = team.D.at(activeTimeIndex) || 0}
		{@const losses = team.L.at(activeTimeIndex) || 0}
		{@const points = wins * 3 + draws}
		<div
			class="relative mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-1 px-3 py-6 md:flex-row md:items-end md:justify-between"
		>
			<div class="flex flex-col items-center md:items-start">
				<select class="bg-transparent text-lg">
					<option>🇪🇸 Bundesliga</option>
				</select>
				<h1 class="text-3xl font-bold md:text-5xl">
					{teamIndex + 1}. {team.name}
				</h1>
			</div>
			<p class="text-gray-400 md:text-xl">
				{#if activeTimeIndex >= 0}
					<span class="font-bold">{activeTimeIndex}'</span> :
				{/if}
				<span class="font-bold text-green-500">{wins}W</span> +
				<span class="font-bold text-blue-500">{draws}D</span> +
				<span class="font-bold text-red-400">{losses}L</span> =
				<span class="font-bold text-gray-800">{points} points</span>
			</p>
		</div>
		<ScoreChart
			class="flex-1"
			timeScale={league.timeScale}
			maxMatch={team.D[0]}
			{team}
			bind:activeTimeIndex
		/>
		<input
			class="absolute bottom-1 right-1"
			type="number"
			name="team"
			bind:value={teamIndex}
			min="0"
			max={league.teams.length - 1}
		/>
	{/if}
</div>
