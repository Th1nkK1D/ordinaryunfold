<script lang="ts">
	import { onMount } from 'svelte';
	import { geoPath, geoMercator } from 'd3-geo';
	import paper from 'paper';

	import bangkokGeo from '../../../data/whats-in-the-city/bangkok-geo.json';

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
		cityPath.strokeColor = 'black';
	});
</script>

<canvas class="h-full w-full" bind:this={canvas} />
