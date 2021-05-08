<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import type { DailyNewCase } from '../index.svelte';
	import XLabel from './x-label.svelte';
	import YLabel from './y-label.svelte';

	const X_MAX_WIDTH = 1500;
	const Y_STEP_SIZE = 1000;

	export let dailyNewCases: DailyNewCase[];

	const yMax = Math.max(...dailyNewCases.map(({ count }) => count));

	const xScale = scaleTime()
		.domain([dailyNewCases[0].date, dailyNewCases[dailyNewCases.length - 1].date])
		.range([0, X_MAX_WIDTH]);

	const yScale = scaleLinear().domain([0, yMax]).range([0, 100]);

	const xAxis = dailyNewCases
		.filter(({ date }) => date.getDate() === 1)
		.map(({ date }) => ({
			date,
			x: xScale(date)
		}));

	const yAxis = new Array(Math.floor(yMax / Y_STEP_SIZE)).fill(null).map((_, i) => {
		const count = (i + 1) * Y_STEP_SIZE;

		return {
			count,
			y: Math.round(yScale(count))
		};
	});
</script>

<div class="relative h-full w-full">
	{#each yAxis as label}
		<YLabel {...label} />
	{/each}
	<div class="relative h-full overflow-x-scroll">
		{#each xAxis as label}
			<XLabel {...label} />
		{/each}
	</div>
</div>
