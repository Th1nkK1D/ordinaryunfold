<script lang="ts">
	import { onMount } from 'svelte';
	import type { LeagueStats } from '../../data/comeback-king-or-flopper/model';
	import ScoreChart from './_chart/score-chart.svelte';

	let teamIndex = 0;
	let league: LeagueStats;

	onMount(async () => {
		const res = await fetch('/comeback-king-or-flopper/json/bundesliga.json');
		league = await res.json();
	});
</script>

{#if league}
	{@const team = league.teams[teamIndex]}
	<h1 class="text-2xl">{team.name}</h1>
	<ScoreChart class="h-[70vh] w-full" timeScale={league.timeScale} maxMatch={team.D[0]} {team} />
	<input type="number" name="team" bind:value={teamIndex} min="0" max={league.teams.length - 1} />
{/if}
