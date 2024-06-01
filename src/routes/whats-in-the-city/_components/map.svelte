<script lang="ts" context="module">
	export interface Location {
		id: string;
		name: string;
		lat: number;
		lon: number;
	}

	export const DISTANCE_RADIUS_KM = [5, 2];
	export const ANIMATE_DELAY_PER_POINT = 10;
	export const ANIMATE_DURATION = 500;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { geoPath, geoMercator, geoCircle, geoDistance } from 'd3-geo';
	import type { GeoPermissibleObjects } from 'd3-geo';
	import { lengthToDegrees, radiansToDegrees } from '@turf/helpers';
	import paper from 'paper';
	import { createPinDefinition } from './symbols';

	export let map: GeoPermissibleObjects;
	export let locations: Location[];
	export let colors: string[];

	const MAP_COLOR = '#E5E5E5';

	const PIN_HEIGHT = 20;
	const PIN_DROP_OFFSET = 100;
	const PIN_TOOLTIP_OFFSET = 8;

	let canvas: HTMLCanvasElement;

	let tooltip: { x: number; y: number; name: string } | null = null;

	const draw = (map: GeoPermissibleObjects, locations: Location[], withTransition = true) => {
		paper.project.clear();

		const { clientWidth, clientHeight } = canvas;

		const projection = geoMercator().fitExtent(
			[
				[0, PIN_HEIGHT],
				[clientWidth, clientHeight]
			],
			map
		);
		const path = geoPath(projection);

		const cityPath =
			map?.geometry?.type === 'MultiPolygon'
				? new paper.Group(
						path(map)
							.split('M')
							.filter((polygon) => polygon.length)
							.map((polygon) => new paper.Path(`M${polygon}`))
					)
				: new paper.Path(path(map));

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

				if (withTransition) {
					circle.scaling = 0.00001;
					circle.opacity = 0;

					setTimeout(
						() => {
							circle.tweenTo({ scaling: 1, opacity: 1 }, ANIMATE_DURATION);
						},
						ANIMATE_DURATION + pointIndex * ANIMATE_DELAY_PER_POINT
					);
				}

				return circle;
			});
		});

		const background = new paper.Shape.Rectangle(
			new paper.Point(0, 0),
			new paper.Point(clientWidth, clientHeight)
		);
		background.fillColor = MAP_COLOR;

		const group = new paper.Group([cityPath, background, ...distanceRadiusShape]);
		group.clipped = true;

		const pinDefinition = createPinDefinition();

		locations.map(({ lat, lon, name }, pointIndex) => {
			const position = projection([lon, lat]);
			const pin = new paper.SymbolItem(pinDefinition);

			const finalPosition = new paper.Point(position);
			finalPosition.y -= PIN_HEIGHT / 2;

			pin.position = finalPosition;

			if (withTransition) {
				pin.position.y -= PIN_DROP_OFFSET;
				pin.opacity = 0;

				setTimeout(() => {
					pin.tweenTo({ 'position.y': finalPosition.y, opacity: 1 }, ANIMATE_DURATION);
				}, pointIndex * ANIMATE_DELAY_PER_POINT);
			}

			setTimeout(
				() => {
					pin.onMouseEnter = () => {
						tooltip = {
							name,
							x: position[0],
							y: position[1] - PIN_HEIGHT - PIN_TOOLTIP_OFFSET
						};
					};
					pin.onMouseLeave = () => (tooltip = null);
				},
				withTransition ? pointIndex * ANIMATE_DELAY_PER_POINT + ANIMATE_DURATION : 0
			);
		});
	};

	onMount(() => {
		paper.setup(canvas);
		paper.view.onResize = () => draw(map, locations, false);
	});

	$: if (canvas) draw(map, locations);
</script>

<div class="relative h-full w-full">
	<canvas class="h-full w-full" bind:this={canvas} resize />
	{#if tooltip}
		<div
			class="absolute -translate-x-1/2 -translate-y-full transform whitespace-nowrap rounded bg-black px-2 py-1 text-center text-sm text-white shadow"
			style="top: {tooltip.y}px; left: {tooltip.x}px"
			transition:scale|global={{ duration: 200 }}
		>
			{tooltip.name}
		</div>
	{/if}
</div>
