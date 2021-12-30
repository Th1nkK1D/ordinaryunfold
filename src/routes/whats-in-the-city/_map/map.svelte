<script lang="ts">
	import { onMount } from 'svelte';
	import { geoPath, geoMercator } from 'd3-geo';
	import destination from '@turf/destination';
	import { lineString } from '@turf/helpers';
	import paper from 'paper';

	import bangkokGeo from '../../../data/whats-in-the-city/bangkok-geo.json';
	import bangkokGarden from '../../../data/whats-in-the-city/bangkok-garden.json';

	const MAP_COLOR = '#E5E5E5';
	const DISTANCE_RADIUS = [
		{ color: '#FF8A65' },
		{ km: 5, color: '#FFD54F' },
		{ km: 2, color: '#9CCC65' }
	];

	const ANIMATE_DELAY_PER_POINT = 10;
	const ANIMATE_DURATION_PER_KM = 6;

	let canvas: HTMLCanvasElement;

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

		const centroid = path.centroid(bangkokGeo);
		const pixelPerKm = path.measure(
			lineString([centroid, destination(centroid, 1, 0).geometry.coordinates as [number, number]])
		);

		const cityPath = new paper.Path(path(bangkokGeo));

		const distanceRadiusShape = DISTANCE_RADIUS.flatMap(({ km, color }, distanceIndex) => {
			const radiusFrom = (DISTANCE_RADIUS[distanceIndex + 1]?.km || 0) * pixelPerKm;
			const radiusTo = (km || clientWidth) * pixelPerKm;
			const duration = (radiusTo - radiusFrom) * ANIMATE_DURATION_PER_KM;

			return bangkokGarden.map(({ lat, lon }, pointIndex) => {
				const point = new paper.Point(projection([lon, lat]));
				const circle = new paper.Shape.Circle(point, 0);
				circle.fillColor = color;

				setTimeout(() => {
					circle.tween({ radius: radiusFrom }, { radius: radiusTo }, duration);
				}, pointIndex * ANIMATE_DELAY_PER_POINT);

				return circle;
			});
		});

		const bgRect = new paper.Shape.Rectangle(0, 0, clientWidth, clientHeight);
		bgRect.fillColor = MAP_COLOR;

		const group = new paper.Group([cityPath, bgRect, ...distanceRadiusShape]);
		group.clipped = true;
	});
</script>

<canvas class="h-full w-full" bind:this={canvas} />
