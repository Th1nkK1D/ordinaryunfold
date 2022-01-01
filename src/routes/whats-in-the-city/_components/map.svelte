<script lang="ts" context="module">
	export interface Location {
		id: string;
		name: string;
		lat: number;
		lon: number;
	}
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { geoPath, geoMercator, geoCircle, geoDistance, GeoPermissibleObjects } from 'd3-geo';
	import { lengthToDegrees, radiansToDegrees } from '@turf/helpers';
	import paper from 'paper';
	import { createPinDefinition } from './symbols';

	export let map: GeoPermissibleObjects;
	export let locations: Location[];
	export let colors: string[];

	const MAP_COLOR = '#E5E5E5';
	const DISTANCE_RADIUS_KM = [5, 2];

	const ANIMATE_DELAY_PER_POINT = 10;
	const ANIMATE_DURATION = 500;

	let canvas: HTMLCanvasElement;

	onMount(() => {
		paper.setup(canvas);
	});

	const draw = (map: GeoPermissibleObjects, locations: Location[]) => {
		paper.project.clear();

		const { clientWidth, clientHeight } = canvas;

		const projection = geoMercator().fitExtent(
			[
				[0, 0],
				[clientWidth, clientHeight]
			],
			map
		);
		const path = geoPath(projection);

		const cityPath = new paper.Path(path(map));

		const maxLength = geoDistance(
			projection.invert([0, 0]),
			projection.invert([clientWidth, clientHeight])
		);
		const maxRadius = radiansToDegrees(maxLength);

		locations.sort((a, z) => z.lat - a.lat);

		const distanceRadiusShape = [
			maxRadius,
			...DISTANCE_RADIUS_KM.map((km) => lengthToDegrees(km))
		].flatMap((radius, distanceIndex) => {
			const createCircle = geoCircle().radius(radius);

			return locations.map(({ lat, lon }, pointIndex) => {
				const circle = new paper.Path(path(createCircle.center([lon, lat])()));
				circle.fillColor = colors[distanceIndex];
				circle.applyMatrix = false;
				circle.scaling = 0.00001;
				circle.opacity = 0;

				setTimeout(() => {
					circle.tweenTo({ scaling: 1, opacity: 1 }, ANIMATE_DURATION);
				}, ANIMATE_DURATION + pointIndex * ANIMATE_DELAY_PER_POINT);

				return circle;
			});
		});

		const bgMap = new paper.Path(path(map));
		bgMap.fillColor = MAP_COLOR;

		const group = new paper.Group([cityPath, ...distanceRadiusShape]);
		group.clipped = true;

		const pinDefinition = createPinDefinition();

		locations.map(({ lat, lon }, pointIndex) => {
			const pin = new paper.SymbolItem(pinDefinition);

			const finalPosition = new paper.Point(projection([lon, lat]));
			finalPosition.y -= 10;

			pin.position = finalPosition;
			pin.position.y -= 100;
			pin.opacity = 0;

			setTimeout(() => {
				pin.tweenTo({ 'position.y': finalPosition.y, opacity: 1 }, ANIMATE_DURATION);
			}, pointIndex * ANIMATE_DELAY_PER_POINT);
		});
	};

	$: {
		if (canvas) {
			draw(map, locations);
		}
	}
</script>

<canvas class="h-full w-full" bind:this={canvas} />
