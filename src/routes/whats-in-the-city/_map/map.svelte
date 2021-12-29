<script lang="ts">
	import { onMount } from 'svelte';
	import { geoPath, geoMercator, geoCircle } from 'd3-geo';
	import paper from 'paper';

	import bangkokGeo from '../../../data/whats-in-the-city/bangkok-geo.json';
	import bangkokGarden from '../../../data/whats-in-the-city/bangkok-garden.json';

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
		cityPath.fillColor = '#E5E5E5';

		bangkokGarden.forEach(({ lat, lon }) => {
			const point = new paper.Point(projection([lon, lat]));
			const circle = new paper.Shape.Circle(point, 5);
			circle.fillColor = 'green';
		});
	});
</script>

<canvas class="h-full w-full" bind:this={canvas} />
