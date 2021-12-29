<script lang="ts">
	import { geoPath, geoMercator } from 'd3-geo';

	import bangkokGeo from '../../../data/whats-in-the-city/bangkok-geo.json';

	const projection = geoMercator().fitExtent(
		[
			[0, 0],
			[940, 480]
		],
		bangkokGeo
	);
	const path = geoPath(projection);
</script>

<svg class="h-full w-full">
	<path d={path(bangkokGeo)} />
</svg>
