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

	let meanDiff = $derived(Math.round(Math.abs(groups[0]?.mean - groups[1]?.mean) * 10) / 10);
	let cohenD = $derived(groups ? Math.round((meanDiff / pooledSd) * 100) / 100 : 0);

	let cohenDOffsetLeft = $derived(sdOffsetLeft + cohenD * sdAreaSize);
</script>

<div class="relative mb-6">
	<div
		class="absolute bottom-6 top-0 bg-amber-100"
		style="left: {sdOffsetLeft}%; right: {100 - cohenDOffsetLeft}%"
	></div>

	<BeeswarmChart {groups} {xScale} hideAxisHint />

	<div class="range-label" style="margin: 8px {100 - cohenDOffsetLeft}% 8px {sdOffsetLeft}%;">
		<div></div>
		<p>
			<i>M<sub>1</sub>-M<sub>2</sub></i> = {meanDiff}
		</p>
		<div></div>
	</div>

	<div class="range-label" style="margin: 8px {sdOffsetRight}% 8px {sdOffsetLeft}%;">
		<div></div>
		<p><i>SD<sub>pooled</sub></i> = {Math.round(pooledSd * 100) / 100}</p>
		<div></div>
	</div>

	<div
		class="relative mt-8 flex flex-row border-neutral-950 bg-zinc-100 text-center text-sm md:text-base"
	>
		<div
			class="self-center pr-4 text-right font-bold italic leading-none"
			style="width: {sdOffsetLeft}%"
		>
			Cohen's d size
		</div>
		<div class="range-cell relative bg-lime-100" style="width: {sdAreaSize * 0.2}%">
			<div>0</div>
			<span>Negligible</span>
		</div>
		<div class="range-cell bg-lime-200" style="width: {sdAreaSize * 0.3}%">
			<div>0.2</div>
			<span>Small</span>
		</div>
		<div class="range-cell bg-lime-300" style="width: {sdAreaSize * 0.3}%">
			<div>0.5</div>
			<span>Medium</span>
		</div>
		<div class="range-cell flex-1 bg-lime-400">
			<div>0.8</div>
			<span>Large</span>
		</div>
		<div
			class="absolute -inset-y-4 -translate-x-1/2 border-l-2 border-dashed border-lime-800"
			style="left: {sdOffsetLeft + cohenD * sdAreaSize}%"
		>
			<div
				class="absolute bottom-0 -translate-x-1/2 translate-y-full whitespace-nowrap rounded bg-lime-800 px-1 text-center font-bold text-zinc-100"
			>
				d = {cohenD}
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.range-label {
		@apply relative z-10 flex flex-row items-center gap-1 border-l border-r border-neutral-500 text-sm md:gap-2 md:text-base;
	}

	.range-label > div {
		@apply h-[1px] flex-1 bg-neutral-500;
	}

	.range-label p {
		@apply text-center;
	}

	.range-label i {
		font-family: 'Libre Baskerville', serif;
		@apply text-xs md:text-sm;
	}

	.range-cell {
		@apply relative flex items-center justify-center break-all border-b border-l border-t border-neutral-900 bg-opacity-70 p-1 md:py-2;
	}

	.range-cell > div {
		@apply absolute left-0 top-0 -translate-x-1/2 -translate-y-full text-xs md:text-sm;
	}
</style>
