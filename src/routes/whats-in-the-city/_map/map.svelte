<script lang="ts">
	import { onMount } from 'svelte';
	import { geoPath, geoMercator } from 'd3-geo';
	import destination from '@turf/destination';
	import { lineString } from '@turf/helpers';
	import paper from 'paper';

	import bangkokGeo from '../../../data/whats-in-the-city/bangkok-geo.json';
	import bangkokGarden from '../../../data/whats-in-the-city/bangkok-garden.json';

	let canvas: HTMLCanvasElement;

	const POINT_RADIUS = [2, 5, 10];

	onMount(() => {
		paper.setup(canvas);

		const { clientWidth, clientHeight } = canvas;

		const projection = geoMercator().fitExtent(
			[
				[0, 0],
				[clientWidth, clientHeight]
			],
			bangkokGeo
		);

		const path = geoPath(projection);

		const cityPath = new paper.Path(path(bangkokGeo));
		cityPath.fillColor = '#E5E5E5';

		const centroid = path.centroid(bangkokGeo);
		const pixelPerKm = path.measure(
			lineString([centroid, destination(centroid, 1, 0).geometry.coordinates as [number, number]])
		);

		bangkokGarden.forEach(({ lat, lon }) => {
			const point = new paper.Point(projection([lon, lat]));
			const circle = new paper.Shape.Circle(point, POINT_RADIUS[0] * pixelPerKm);
			circle.fillColor = 'green';
		});
	});
</script>

<canvas class="h-full w-full" bind:this={canvas} />
