<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import type { DailyNewCase } from '../index.svelte';
	import XLabel from './x-label.svelte';
	import YLabel from './y-label.svelte';

	const X_MAX_WIDTH = 1500;
	const Y_STEP_SIZE = 1000;
	const SCROLL_BAR_HEIGHT = 8;

	export let dailyNewCases: DailyNewCase[];

	let clientHeight = SCROLL_BAR_HEIGHT;

	$: chartHeight = clientHeight - SCROLL_BAR_HEIGHT;

	const yMax = Math.max(...dailyNewCases.map(({ count }) => count));

	const xScale = scaleTime()
		.domain([dailyNewCases[0].date, dailyNewCases[dailyNewCases.length - 1].date])
		.range([0, X_MAX_WIDTH]);

	$: yScale = scaleLinear().domain([0, yMax]).range([0, chartHeight]);

	const xAxis = dailyNewCases
		.filter(({ date }) => date.getDate() === 1)
		.map(({ date }) => ({
			date,
			x: xScale(date)
		}));

	$: yAxis = new Array(Math.ceil(yMax / Y_STEP_SIZE)).fill(null).map((_, i) => {
		const count = i * Y_STEP_SIZE;

		return {
			count,
			y: Math.round(yScale(count)) + SCROLL_BAR_HEIGHT
		};
	});

	$: points = dailyNewCases
		.map(({ count, date }) => `${xScale(date)},${chartHeight - yScale(count)}`)
		.join(' ');
</script>

<div class="relative h-full w-full" bind:clientHeight>
	{#each yAxis as label}
		<YLabel {...label} />
	{/each}
	<div class="relative h-full overflow-x-scroll overflow-y-hidden">
		<div class="absolute top-0 bottom-0 overflow-hidden" style="width: {X_MAX_WIDTH}px;">
			{#each xAxis as label}
				<XLabel {...label} />
			{/each}
		</div>
		<svg class="absolute" viewBox="0 0 {X_MAX_WIDTH} {chartHeight}" style="width: {X_MAX_WIDTH}px;">
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color="#FF4D00" />
					<stop offset="100%" stop-color="#66BC31" />
				</linearGradient>
			</defs>
			<polyline
				fill="none"
				stroke="url(#gradient)"
				stroke-width="6"
				stroke-linecap="round"
				stroke-linejoin="round"
				{points}
			/>
		</svg>
	</div>
</div>

<style>
	::-webkit-scrollbar {
		height: 8px;
	}

	::-webkit-scrollbar-track {
		background: none;
	}

	::-webkit-scrollbar-thumb {
		@apply bg-gray-600;
		border-radius: 4px;
	}
</style>