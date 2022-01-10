<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import cities from '../../../data/whats-in-the-city/cities.json';

	const MIN_COLUMN_WIDTH = 180;
	const POPULATION_PER_CIRCLE = 100000;
	const MAX_AREA_SIZE = 120;

	const populationVis = cities.map(({ population }) => {
		const amount = population / POPULATION_PER_CIRCLE;
		const integer = Math.floor(amount);
		return { population, integer, fraction: amount - integer };
	});

	const mapArea = scaleLinear()
		.domain([0, Math.max(...cities.map(({ area }) => area))])
		.range([0, MAX_AREA_SIZE]);

	const areaVis = cities.map(({ area }) => ({
		area,
		size: Math.round(mapArea(area))
	}));
</script>

<div
	class="grid"
	style="grid-template-columns: repeat({cities.length + 1}, minmax({MIN_COLUMN_WIDTH}px, 1fr)"
>
	<div />

	{#each cities as { name }}
		<div class="cell text-lg font-bold text-center">{name}</div>
	{/each}

	<div class="row-label">Population</div>

	{#each populationVis as { population, integer, fraction }}
		<div class="cell space-y-1">
			<div class="flex flex-row flex-wrap content-start">
				{#each Array(Math.floor(integer)) as _}
					<div class="population-dot m-1" />
				{/each}

				<div class="m-1 overflow-hidden" style="width: {fraction * 8}px;">
					<div class="population-dot" />
				</div>
			</div>
			<p class="text-center text-sm">{population.toLocaleString()}</p>
		</div>
	{/each}

	<div class="row-label">Area</div>

	{#each areaVis as { area, size }}
		<div class="cell space-y-1 flex flex-col justify-center items-center">
			<div class="bg-green-300" style="width: {size}px; height: {size}px;" />
			<p class="text-center text-sm">{area.toLocaleString()} km<sup>2</sup></p>
		</div>
	{/each}
</div>

<style>
	.cell {
		@apply p-4;
	}

	.row-label {
		@apply p-4 font-bold italic text-right;
	}

	.population-dot {
		@apply w-2 h-2 rounded-full bg-blue-500;
	}
</style>
