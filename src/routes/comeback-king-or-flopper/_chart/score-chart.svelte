<script lang="ts">
	import { scaleLinear, type ScaleLinear } from 'd3-scale';
	import { area, curveBasis } from 'd3-shape';
	import type { TeamStats } from '../../../data/comeback-king-or-flopper/model';

	const width = 1000;
	const height = 500;

	export let timeScale: string[];
	export let maxMatch: number;
	export let team: TeamStats;

	$: x = scaleLinear([0, timeScale.length - 1], [0, width]);
	$: upperY = scaleLinear([0, maxMatch], [height / 2, 0]);
	$: lowerY = scaleLinear([0, maxMatch], [height / 2, height]);

	$: createArea = (y: ScaleLinear<number, number, never>) =>
		area<number>()
			.x((_, i) => x(i))
			.y0(height / 2)
			.y1((count) => y(count))
			.curve(curveBasis);

	$: winPathData = createArea(upperY)(team.W.map((c, i) => c + team.D[i] / 2));
	$: drawLowerPathData = createArea(upperY)(team.D.map((c) => c / 2));
	$: drawUpperPathData = createArea(lowerY)(team.D.map((c) => c / 2));
	$: lostPathData = createArea(lowerY)(team.L.map((c, i) => c + team.D[i] / 2));
</script>

<svg {width} {height} viewBox="0 0 {width} {height}">
	<path d={winPathData} class="fill-green-600" />
	<path d={lostPathData} class="fill-red-500" />
	<path d={drawLowerPathData} class="fill-gray-400" />
	<path d={drawUpperPathData} class="fill-gray-400" />

	<line x1="0" y1={height / 2} x2={width} y2={height / 2} class="stroke-white stroke-2" />
</svg>
