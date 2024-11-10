<script lang="ts">
	import { scaleLinear } from 'd3-scale';
	import cities from '../../../data/whats-in-the-city/cities.json';
	import placeStats from '../../../data/whats-in-the-city/places-stats.json';
	import categories from '../../../data/whats-in-the-city/categories.json';

	type CityKey = keyof typeof placeStats;
	type CategoryKey = keyof (typeof placeStats)[CityKey];

	const MIN_COLUMN_WIDTH = 160;
	const POPULATION_PER_CIRCLE = 100000;
	const MAX_AREA_SIZE = 120;
	const MAX_CHART_HEIGHT = 200;

	const populationVis = cities.map(({ population }) => {
		const amount = population / POPULATION_PER_CIRCLE;
		const integer = Math.floor(amount);
		return { population, integer, fraction: amount - integer };
	});

	const mapArea = scaleLinear()
		.domain([0, Math.max(...cities.map(({ area }) => Math.sqrt(area)))])
		.range([0, MAX_AREA_SIZE]);

	const areaVis = cities.map(({ area }) => ({
		area,
		size: Math.round(Math.sqrt(area))
	}));

	const placeChartHeight = scaleLinear()
		.domain([0, Math.max(...Object.values(placeStats).flatMap((place) => Object.values(place)))])
		.range([0, MAX_CHART_HEIGHT]);

	const placeVis = cities.map(({ key: city }) =>
		categories.map(({ key: category, colors }) => ({
			count: placeStats[city as CityKey][category as CategoryKey],
			height: Math.round(placeChartHeight(placeStats[city as CityKey][category as CategoryKey])),
			color: colors[3]
		}))
	);
</script>

<div
	class="mx-auto grid max-w-screen-xl"
	style="grid-template-columns: repeat({cities.length + 1}, minmax({MIN_COLUMN_WIDTH}px, 1fr)"
>
	<div></div>

	{#each cities as { name }}
		<div class="cell text-center text-xl font-bold">{name}</div>
	{/each}

	<div class="row-label">Region</div>

	{#each cities as { region }}
		<div class="cell text-center">{region}</div>
	{/each}

	<div class="row-label">Population</div>

	{#each populationVis as { population, integer, fraction }}
		<div class="cell space-y-1">
			<div class="flex flex-row flex-wrap content-start">
				{#each Array(Math.floor(integer)) as _}
					<div class="population-dot m-1"></div>
				{/each}

				<div class="m-1 overflow-hidden" style="width: {fraction * 8}px;">
					<div class="population-dot"></div>
				</div>
			</div>
			<p class="text-center text-sm">{population.toLocaleString()}</p>
		</div>
	{/each}

	<div class="row-label">Area (km<sup>2</sup>)</div>

	{#each areaVis as { area, size }}
		<div class="cell flex flex-col items-center justify-center space-y-1">
			<div class="bg-gray-400" style="width: {size}px; height: {size}px;"></div>
			<p class="text-center text-sm">{area.toLocaleString()}</p>
		</div>
	{/each}

	<div class="row-label">Places</div>

	{#each placeVis as city}
		<div class="cell flex flex-row items-end space-x-1">
			{#each city as { height, color, count }}
				<div class="relative mt-4 flex-1" style="height: {height}px; background-color: {color};">
					<div class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-full transform text-xs">
						{count}
					</div>
				</div>
			{/each}
		</div>
	{/each}

	<div></div>

	<div
		class="cell flex flex-row justify-center space-x-4"
		style="-ms-grid-column-span: span {cities.length} / span {cities.length}; grid-column: span {cities.length} / span {cities.length}"
	>
		{#each categories as { name, colors }}
			<div class="flex flex-row flex-wrap items-center space-x-1">
				<div class="h-3 w-3" style="background-color: {colors[3]};"></div>
				<p class="text-sm">{name}</p>
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.cell {
		@apply p-4;
	}

	.row-label {
		@apply p-4 text-right font-bold italic;
	}

	.population-dot {
		@apply h-2 w-2 rounded-full bg-gray-400;
	}
</style>
