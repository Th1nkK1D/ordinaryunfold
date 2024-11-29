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
	<BeeswarmChart {groups} {xScale} />
	<div
		class="relative flex flex-row items-center gap-1 border-l border-r border-neutral-800"
		style="margin: 0 {sdOffsetRight}% 0 {sdOffsetLeft}%;"
	>
		<div class="h-[1px] flex-1 bg-neutral-800"></div>
		<p>SD = {Math.round(pooledSd * 100) / 100}</p>
		<div class="h-[1px] flex-1 bg-neutral-800"></div>
	</div>
	<div
		class="relative z-10 mt-4 flex flex-row items-center border-t border-neutral-950 text-center"
	>
		<div style="width: {sdOffsetLeft}%">
			<span class="font-bold">Cohen's D</span>
			<br />(Unit: SD)
		</div>
		<div class="border-l border-neutral-900 p-1" style="width: {sdAreaSize * 0.2}%">
			&lt; 0.2<br /><span class="font-bold">Negligible</span>
		</div>
		<div class="border-l border-neutral-900 p-1" style="width: {sdAreaSize * 0.3}%">
			&lt; 0.5<br /><span class="font-bold">Small</span>
		</div>
		<div class="border-l border-neutral-900 p-1" style="width: {sdAreaSize * 0.3}%">
			&lt; 0.8<br /><span class="font-bold">Medium</span>
		</div>
		<div class="flex-1 border-l border-neutral-900 p-1">
			&gt;= 0.8<br /><span class="font-bold">Large</span>
		</div>
	</div>
	<div
		class="absolute -inset-y-2 w-[2px] -translate-x-1/2 bg-lime-900"
		style="left: {sdOffsetLeft + cohenD * sdAreaSize}%"
	>
		<div
			class="absolute bottom-0 -translate-x-1/2 translate-y-full whitespace-nowrap rounded bg-lime-900 px-1 text-center font-bold text-zinc-100"
		>
			d = {cohenD}
		</div>
	</div>
</div>
