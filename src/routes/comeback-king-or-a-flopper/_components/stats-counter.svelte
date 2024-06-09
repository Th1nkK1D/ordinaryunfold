<script lang="ts">
	import type { TeamStats } from '../../../data/comeback-king-or-a-flopper/model';

	export let timeScale: string[];
	export let team: TeamStats;
	export let activeTimeIndex: number;

	$: wins = team.W.at(activeTimeIndex) || 0;
	$: draws = team.D.at(activeTimeIndex) || 0;
	$: losses = team.L.at(activeTimeIndex) || 0;
	$: points = wins * 3 + draws;
</script>

<p class="whitespace-nowrap text-lg text-gray-400 md:text-right md:text-xl {$$restProps.class}">
	{#if activeTimeIndex >= 0}
		<span class="font-bold text-gray-800">{timeScale[activeTimeIndex]}'</span> :
	{/if}
	<span class="text-green-600"><b>{wins}</b>W</span> +
	<span class="text-blue-500"><b>{draws}</b>D</span> +
	<span class="text-red-400"><b>{losses}</b>L</span> =
	<span class="text-gray-500"><b>{points}</b> points</span>
</p>
