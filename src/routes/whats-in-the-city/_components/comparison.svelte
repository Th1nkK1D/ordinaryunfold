<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import cities from '../../../data/whats-in-the-city/cities.json';
	import placeStats from '../../../data/whats-in-the-city/places-stats.json';
	import categories from '../../../data/whats-in-the-city/categories.json';

	const MIN_COLUMN_WIDTH = 180;
	const POPULATION_PER_CIRCLE = 100000;
	const MAX_AREA_SIZE = 120;
	const MAX_CHART_HEIGHT = 200;

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

	const placeChartHeight = scaleLinear()
		.domain([0, Math.max(...Object.values(placeStats).flatMap((place) => Object.values(place)))])
		.range([0, MAX_CHART_HEIGHT]);

	const placeVis = cities.map(({ key: city }) =>
		categories.map(({ key: category, colors }) => ({
			count: placeStats[city][category],
			height: Math.round(placeChartHeight(placeStats[city][category])),
			color: colors[3]
		}))
	);
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

	<div class="row-label">Places</div>

	{#each placeVis as city}
		<div class="cell flex flex-row space-x-1 items-end">
			{#each city as { height, color, count }}
				<div class="flex-1 relative mt-4" style="height: {height}px; background-color: {color};">
					<div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full text-xs">
						{count}
					</div>
				</div>
			{/each}
		</div>
	{/each}

	<div />

	<div
		class="cell flex flex-row space-x-4 justify-center"
		style="-ms-grid-column-span: span {cities.length} / span {cities.length}; grid-column: span {cities.length} / span {cities.length}"
	>
		{#each categories as { name, colors }}
			<div class="flex flex-row flex-wrap space-x-1 items-center">
				<div class="w-3 h-3" style="background-color: {colors[3]};" />
				<p class="text-sm">{name}</p>
			</div>
		{/each}
	</div>
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
