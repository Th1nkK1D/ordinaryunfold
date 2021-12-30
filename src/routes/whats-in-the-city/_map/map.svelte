<script lang="ts">
	import { onMount } from 'svelte';
	import { geoPath, geoMercator } from 'd3-geo';
	import destination from '@turf/destination';
	import { lineString } from '@turf/helpers';
	import paper from 'paper';

	import bangkokGeo from '../../../data/whats-in-the-city/bangkok-geo.json';
	import bangkokGarden from '../../../data/whats-in-the-city/bangkok-garden.json';

	const MAP_COLOR = '#E5E5E5';
	const PIN_RADIUS = 5;
	const DISTANCE_RADIUS = [
		{ km: 10, color: '#FF8A65' },
		{ km: 5, color: '#FFD54F' },
		{ km: 2, color: '#9CCC65' }
	];

	let canvas: HTMLCanvasElement;

	onMount(() => {
		paper.setup(canvas);

		const mapLayer = new paper.Layer();
		const pointRadiusLayers = DISTANCE_RADIUS.map(() => new paper.Layer());
		const pinLayer = new paper.Layer();

		const { clientWidth, clientHeight } = canvas;

		const projection = geoMercator().fitExtent(
			[
				[0, 0],
				[clientWidth, clientHeight]
			],
			bangkokGeo
		);
		const path = geoPath(projection);

		const centroid = path.centroid(bangkokGeo);
		const pixelPerKm = path.measure(
			lineString([centroid, destination(centroid, 1, 0).geometry.coordinates as [number, number]])
		);

		mapLayer.activate();
		const cityPath = new paper.Path(path(bangkokGeo));
		cityPath.fillColor = MAP_COLOR;

		bangkokGarden.forEach(({ lat, lon }) => {
			const point = new paper.Point(projection([lon, lat]));

			DISTANCE_RADIUS.forEach(({ km, color }, index) => {
				pointRadiusLayers[index].activate();
				const circle = new paper.Shape.Circle(point, km * pixelPerKm);
				circle.fillColor = color;
			});

			pinLayer.activate();
			const circle = new paper.Shape.Circle(point, PIN_RADIUS);
			circle.fillColor = 'white';
		});
	});
</script>

<canvas class="h-full w-full" bind:this={canvas} />
