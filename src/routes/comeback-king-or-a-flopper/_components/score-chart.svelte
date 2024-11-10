<script lang="ts" module>
	export type TutorialStep = 0 | 1 | null;
</script>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { clickOutside } from 'svelte-use-click-outside';
	import anime from 'animejs';
	import { scaleLinear, type ScaleLinear } from 'd3-scale';
	import { area } from 'd3-shape';
	import { flip } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import type { TeamStats } from '../../../data/comeback-king-or-a-flopper/model';
	import highlightEvents from '../../../data/comeback-king-or-a-flopper/highlight-events.json';
	import RangeBoxX from './range-box-x.svelte';
	import MinutesLine from './minutes-line.svelte';
	import Tutorial from './tutorial.svelte';

	interface Props {
		timeScale: string[];
		maxMatch: number;
		team: TeamStats;
		activeTimeIndex: number;
		tutorialStep: TutorialStep;
		class?: string;
	}

	let {
		timeScale,
		maxMatch,
		team,
		activeTimeIndex = $bindable(),
		tutorialStep = $bindable(),
		class: className
	}: Props = $props();

	let winPath: SVGPathElement;
	let drawLowerPath: SVGPathElement;
	let drawUpperPath: SVGPathElement;
	let lostPath: SVGPathElement;
	let mouseX = $state<number | null>(null);
	let width = $state(0);
	let height = $state(0);

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		middleware: [flip()]
	});

	let midY = $derived(height / 2);
	let x = $derived(scaleLinear([0, timeScale.length - 1], [0, width]));
	let xFromMinutes = $derived((minutes: string) => x(timeScale.indexOf(minutes)));
	let upperY = $derived(scaleLinear([0, maxMatch], [height / 2, 0]));
	let lowerY = $derived(scaleLinear([0, maxMatch], [height / 2, height]));
	let createArea = $derived((y: ScaleLinear<number, number, never>) =>
		area<number>()
			.x((_, i) => x(i))
			.y0(height / 2)
			.y1((count) => y(count))
	);
	let events = $derived(
		Object.entries((highlightEvents as Record<string, Record<string, string>>)[team.name] || {})
	);
	let groundPathData = $derived(createArea(upperY)(new Array(timeScale.length).fill(0)));

	$effect(() => {
		if (tutorialStep !== 0) {
			animatePath(winPath, createArea(upperY)(team.W.map((c, i) => c + team.D[i] / 2)));
			animatePath(drawLowerPath, createArea(upperY)(team.D.map((c) => c / 2)));
			animatePath(drawUpperPath, createArea(lowerY)(team.D.map((c) => c / 2)));
			animatePath(lostPath, createArea(lowerY)(team.L.map((c, i) => c + team.D[i] / 2)));
		}
	});

	function animatePath(path: SVGPathElement, d: string | null) {
		if (!path || !d) return;

		let duration = 250;
		let currentPath = path.getAttribute('d');

		if (!currentPath || currentPath?.split('0,0').length === timeScale.length * 2 + 1) {
			path.setAttribute('d', createArea(upperY)(new Array(timeScale.length).fill(0)) as string);
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
		activeTimeIndex = Math.round(x.invert(mouseX));
	}

	function removeCrosshair() {
		mouseX = null;
		activeTimeIndex = -1;
	}
</script>

<div
	bind:clientWidth={width}
	bind:clientHeight={height}
	class="relative {className}"
	onmousemove={(e) => updateCrosshair(e.clientX)}
	onmouseleave={removeCrosshair}
	ontouchmove={(e) => updateCrosshair(e.targetTouches[0].clientX)}
	role="region"
	use:clickOutside={removeCrosshair}
>
	<svg class="absolute inset-0" {width} {height}>
		<!-- extra time boxes -->
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

		<!-- major minutes grid -->
		{#each ['1', '15', '30', '60', '75'] as minutes}
			<MinutesLine {height} {xFromMinutes} {minutes} label="{minutes}'" class="opacity-70" />
		{/each}

		{#if tutorialStep === null}
			<!-- event lines -->
			{#each events as [minutes]}
				<MinutesLine
					{height}
					{xFromMinutes}
					{minutes}
					class="fill-yellow-500 stroke-yellow-400 stroke-2"
				/>
			{/each}
		{/if}

		<!-- areas -->
		<path bind:this={winPath} class="fill-green-600" />
		<path bind:this={lostPath} class="fill-red-400" />
		<path bind:this={drawLowerPath} class="fill-blue-500" />
		<path bind:this={drawUpperPath} class="fill-blue-500" />

		{#if tutorialStep !== 0}
			<line x1="0" y1={midY} x2={width} y2={midY} class="stroke-blue-500 stroke-1" />
		{/if}

		<!-- active minute crosshair -->
		<line x1={mouseX} y1="0" x2={mouseX} y2={height} class="stroke-gray-800 stroke-1" />
	</svg>

	{#if tutorialStep === 0}
		<Tutorial canSkip onskip={() => (tutorialStep = null)} onnext={() => (tutorialStep = 1)}>
			Football is a 90-minute game, split into two halves at 45 minutes (half-time). The stoppage
			time (gray area) can be added to the end of both halves to compensate for injuries,
			substitution, celebration, or any incidents.
		</Tutorial>
	{:else if tutorialStep === 1}
		<Tutorial nextLabel="Let's explore" onnext={() => (tutorialStep = null)}>
			From every game in the season, the chart shows how many games they are winning, losing, or
			drawing in each minute. In the real world, only the results at full-time were counted, but
			what was going on along the way?
		</Tutorial>
	{:else}
		{#each events as [minutes, caption]}
			{@const minutesIndex = timeScale.indexOf(minutes)}
			{@const isUpper = team.W[minutesIndex] < team.L[minutesIndex]}
			<div
				use:floatingRef
				class="absolute {isUpper ? 'top-7' : 'bottom-4'}"
				style="left: {xFromMinutes(minutes)}px;"
			></div>
			<div
				transition:fade={{ duration: 200, delay: 50 }}
				use:floatingContent={{ placement: isUpper ? 'bottom-start' : 'top-start' }}
				class=" max-w-64 text-pretty bg-yellow-400 p-2 text-sm leading-tight"
			>
				{caption}
			</div>
		{/each}
	{/if}
</div>
