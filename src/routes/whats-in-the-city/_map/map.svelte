<script lang="ts">
	import { onMount } from 'svelte';
	import { geoPath, geoMercator, geoCircle, geoDistance } from 'd3-geo';
	import { lengthToDegrees, radiansToDegrees } from '@turf/helpers';
	import paper from 'paper';

	import bangkokGeo from '../../../data/whats-in-the-city/bangkok-geo.json';
	import bangkokGarden from '../../../data/whats-in-the-city/bangkok-garden.json';

	const MAP_COLOR = '#E5E5E5';
	const DISTANCE_RADIUS = [
		{ color: '#B2EBF2' },
		{ km: 5, color: '#80DEEA' },
		{ km: 2, color: '#4DD0E1' }
	];

	const ANIMATE_DELAY_PER_POINT = 10;
	const ANIMATE_DURATION_PER_LAYER = 500;

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

		const cityPath = new paper.Path(path(bangkokGeo));

		const maxLength = geoDistance(
			projection.invert([0, 0]),
			projection.invert([clientWidth, clientHeight])
		);
		const maxRadius = radiansToDegrees(maxLength);

		const distanceRadiusShape = DISTANCE_RADIUS.flatMap(({ km, color }) => {
			const createCircle = geoCircle().radius(km ? lengthToDegrees(km) : maxRadius);

			return bangkokGarden.map(({ lat, lon }, pointIndex) => {
				const circle = new paper.Path(path(createCircle.center([lon, lat])()));
				circle.fillColor = color;
				circle.applyMatrix = false;
				circle.scaling = 0.00001;
				circle.opacity = 0;

				setTimeout(() => {
					circle.tweenTo({ scaling: 1, opacity: 1 }, ANIMATE_DURATION_PER_LAYER);
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
