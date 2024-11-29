<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import type { GameLevelGroup } from '../game';
	import BeeswarmChart from './beeswarm-chart.svelte';

	interface Props {
		groups: GameLevelGroup[];
	}

	let { groups }: Props = $props();

	let pooledSd = $derived.by(() => {
		const groupSds = groups.map(({ games, mean }) =>
			Math.sqrt(
				games.reduce((sum, g) => sum + Math.pow(g.positivePercent - mean, 2), 0) / games.length
			)
		);

		return Math.sqrt(groupSds.reduce((sum, gsd) => sum + Math.pow(gsd, 2), 0) / groupSds.length);
	});

	const xScale = scaleLinear([80, 100], [0, 100]);

	let sdOffsetLeft = $derived(xScale(groups[1]?.mean));
	let sdOffsetRight = $derived(100 - xScale(groups[1]?.mean + pooledSd));
	let sdAreaSize = $derived(100 - sdOffsetRight - sdOffsetLeft);

	let cohenD = $derived(
		groups ? Math.round((Math.abs(groups[1]?.mean - groups[0]?.mean) / pooledSd) * 100) / 100 : 0
	);
</script>

<div class="relative mb-6">
	<div class="absolute inset-0 left-0 flex flex-row">
		<div style="width: {sdOffsetLeft}%"></div>
		<div class="bg-lime-100" style="width: {sdAreaSize * 0.2}%"></div>
		<div class="bg-lime-200" style="width: {sdAreaSize * 0.3}%"></div>
		<div class="bg-lime-300" style="width: {sdAreaSize * 0.3}%"></div>
		<div class="flex-1 bg-lime-400"></div>
	</div>
	<BeeswarmChart {groups} {xScale} hideAxisHint />
	<div
		class="relative flex flex-row items-center gap-1 border-l border-r border-neutral-800"
		style="margin: 0 {sdOffsetRight}% 0 {sdOffsetLeft}%;"
	>
		<div class="h-[1px] flex-1 bg-neutral-800"></div>
		<p>SD<sub>pooled</sub> = {Math.round(pooledSd * 100) / 100}</p>
		<div class="h-[1px] flex-1 bg-neutral-800"></div>
	</div>
	<div
		class="relative z-10 mt-4 flex flex-row border-t border-neutral-950 text-center text-sm md:text-base"
	>
		<div class="self-center font-bold" style="width: {sdOffsetLeft}%">Cohen's D</div>
		<div class="range-cell" style="width: {sdAreaSize * 0.2}%">
			<span> &lt; 0.2</span><span>Negligible</span>
		</div>
		<div class="range-cell" style="width: {sdAreaSize * 0.3}%">
			<span> &lt; 0.5</span><span>Small</span>
		</div>
		<div class="range-cell" style="width: {sdAreaSize * 0.3}%">
			<span> &lt; 0.8</span><span>Medium</span>
		</div>
		<div class="range-cell flex-1">
			<span>&gt;= 0.8</span><span>Large</span>
		</div>
	</div>
	<div
		class="absolute -inset-y-2 border-l-2 border-dashed border-lime-800"
		style="left: {sdOffsetLeft + cohenD * sdAreaSize}%"
	>
		<div
			class="absolute bottom-0 -translate-x-1/2 translate-y-full whitespace-nowrap rounded bg-lime-800 px-1 text-center font-bold text-zinc-100"
		>
			d = {cohenD}
		</div>
	</div>
</div>

<style lang="postcss">
	.range-cell {
		@apply flex flex-col items-center justify-center break-all border-l border-neutral-900 py-1 md:py-2;
	}

	.range-cell > span {
		@apply font-bold;
	}
</style>
