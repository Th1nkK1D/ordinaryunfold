<script lang="ts">
	import { clickOutside } from 'svelte-use-click-outside';
	import anime from 'animejs';
	import { scaleLinear, type ScaleLinear } from 'd3-scale';
	import { area, curveBasis } from 'd3-shape';
	import type { TeamStats } from '../../../data/comeback-king-or-a-flopper/model';
	import RangeBoxX from './range-box-x.svelte';
	import MinutesLine from './minutes-line.svelte';

	export let timeScale: string[];
	export let maxMatch: number;
	export let team: TeamStats;
	export let activeTimeIndex: number;

	let winPath: SVGPathElement;
	let drawLowerPath: SVGPathElement;
	let drawUpperPath: SVGPathElement;
	let lostPath: SVGPathElement;
	let mouseX: number | null;

	let width = 0;
	let height = 0;

	$: x = scaleLinear([0, timeScale.length - 1], [0, width]);
	$: xFromMinutes = (minutes: string) => x(timeScale.indexOf(minutes));
	$: upperY = scaleLinear([0, maxMatch], [height / 2, 0]);
	$: lowerY = scaleLinear([0, maxMatch], [height / 2, height]);

	$: createArea = (y: ScaleLinear<number, number, never>) =>
		area<number>()
			.x((_, i) => x(i))
			.y0(height / 2)
			.y1((count) => y(count))
			.curve(curveBasis);

	$: {
		animatePath(winPath, createArea(upperY)(team.W.map((c, i) => c + team.D[i] / 2)));
		animatePath(drawLowerPath, createArea(upperY)(team.D.map((c) => c / 2)));
		animatePath(drawUpperPath, createArea(lowerY)(team.D.map((c) => c / 2)));
		animatePath(lostPath, createArea(lowerY)(team.L.map((c, i) => c + team.D[i] / 2)));
	}

	function animatePath(path: SVGPathElement, d: string | null) {
		if (!path || !d) return;

		let duration = 250;

		if (!path.getAttribute('d')) {
			path.setAttribute('d', createArea(upperY)(new Array(team.D.length).fill(0)) as string);
			duration *= 2;
		}

		anime({
			targets: path,
			d,
			easing: 'easeInOutQuad',
			duration
		});
	}

	function updateCrosshair(clientX: number) {
		mouseX = Math.min(Math.max(0, clientX), width);
		activeTimeIndex = Math.floor(x.invert(mouseX));
	}

	function removeCrosshair() {
		mouseX = null;
		activeTimeIndex = -1;
	}
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	class="relative {$$restProps.class}"
	on:mousemove={(e) => updateCrosshair(e.clientX)}
	on:mouseleave={removeCrosshair}
	on:touchmove={(e) => updateCrosshair(e.targetTouches[0].clientX)}
	role="region"
	use:clickOutside={removeCrosshair}
>
	<svg class="absolute inset-0" {width} {height}>
		<RangeBoxX
			{height}
			{xFromMinutes}
			range={[
				{ minutes: '45', label: `45'` },
				{ minutes: '46', label: `HT` }
			]}
		/>
		<RangeBoxX
			{height}
			{xFromMinutes}
			range={[{ minutes: '90', label: `90'` }, { minutes: timeScale.at(-1) || '90' }]}
		/>

		{#each ['15', '30', '60', '75'] as minutes}
			<MinutesLine {height} {xFromMinutes} {minutes} label="{minutes}'" class="opacity-60" />
		{/each}

		<path bind:this={winPath} class="fill-green-600" />
		<path bind:this={lostPath} class="fill-red-400" />
		<path bind:this={drawLowerPath} class="fill-blue-500" />
		<path bind:this={drawUpperPath} class="fill-blue-500" />
		<line x1="0" y1={height / 2} x2={width} y2={height / 2} class="stroke-blue-500 stroke-1" />

		<line x1={mouseX} y1="0" x2={mouseX} y2={height} class="stroke-gray-800 stroke-1" />
	</svg>
</div>
