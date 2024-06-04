<script lang="ts">
	import { onMount } from 'svelte';
	import type { LeagueStats } from '../../data/comeback-king-or-flopper/model';
	import ScoreChart from './_chart/score-chart.svelte';
	import Logo from '../../components/logo.svelte';

	let teamIndex = 0;
	let league: LeagueStats;

	onMount(async () => {
		const res = await fetch('/comeback-king-or-flopper/json/bundesliga.json');
		league = await res.json();
	});
</script>

<div class="relative flex h-screen flex-col bg-gray-100">
	<Logo dark class="mx-auto mt-3 md:mt-5" />
	{#if league}
		{@const team = league.teams[teamIndex]}
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
				<span class="font-bold text-green-500">{team.W.at(-1)}W</span> +
				<span class="font-bold text-blue-500">{team.D.at(-1)}D</span> +
				<span class="font-bold text-red-400">{team.L.at(-1)}L</span> =
				<span class="font-bold text-black">{team.points} points</span>
			</p>
		</div>
		<ScoreChart class="flex-1" timeScale={league.timeScale} maxMatch={team.D[0]} {team} />
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
