<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import { createEventDispatcher, onMount } from 'svelte';
	import { contentBlocks, dailyNewCases } from '../_data';
	import type { Speech } from '../_data';
	import Pin from './pin.svelte';
	import XLabel from './x-label.svelte';
	import YLabel from './y-label.svelte';
	import Logo from '../../../components/logo.svelte';

	const WIDTH_SCREEN_MULTIPLIER = 3.14;
	const Y_STEP_SIZE = 2000;
	const SCROLL_BAR_HEIGHT = 8;
	const MARGIN_TOP = 60;
	const MARGIN_RIGHT = 40;

	export let activeContentId: number;

	const dispatch = createEventDispatcher();

	let clientHeight = SCROLL_BAR_HEIGHT;
	let clientWidth = 0;
	let horizontalScroll: HTMLElement;

	$: chartHeight = clientHeight - SCROLL_BAR_HEIGHT;

	const yMax = Math.max(...dailyNewCases.map(({ count }) => count));

	$: xMaxWidth = clientWidth * WIDTH_SCREEN_MULTIPLIER;
	$: canvasSize = xMaxWidth + MARGIN_RIGHT;

	$: xScale = scaleTime()
		.domain([dailyNewCases[0].date, dailyNewCases[dailyNewCases.length - 1].date])
		.range([0, xMaxWidth]);

	$: yScale = scaleLinear()
		.domain([0, yMax])
		.range([0, chartHeight - MARGIN_TOP]);

	$: xAxis = dailyNewCases
		.filter(({ date }) => date.getDate() === 1)
		.map(({ date }) => ({
			date,
			x: xScale(date)
		}));

	$: yAxis = new Array(Math.ceil(yMax / Y_STEP_SIZE)).fill(null).map((_, i) => {
		const count = i * Y_STEP_SIZE;

		return {
			count,
			y: Math.round(yScale(count)) + SCROLL_BAR_HEIGHT
		};
	});

	$: points = dailyNewCases
		.map(({ count, date }) => `${xScale(date)},${chartHeight - yScale(count)}`)
		.join(' ');

	$: pins = contentBlocks.map(({ id, type, date, ...rest }) => {
		const matchedCases = dailyNewCases.find(
			(newCase) => newCase.date.toDateString() === date.toDateString()
		);

		const count = matchedCases
			? matchedCases.count
			: ([...dailyNewCases].reverse().find((newCase) => newCase.date <= date).count +
					dailyNewCases.find((newCase) => newCase.date >= date).count) /
			  2;

		return {
			id,
			type,
			date,
			count,
			speaker: type === 'speech' ? (rest as Speech).speaker : undefined,
			x: Math.round(xScale(date)),
			y: Math.round(yScale(count))
		};
	});

	$: {
		if (activeContentId) {
			const left =
				pins.find(({ id }) => id === activeContentId).x - horizontalScroll.clientWidth / 2;

			horizontalScroll.scrollTo({
				left,
				behavior: 'smooth'
			});
		}
	}

	onMount(() => {
		setTimeout(
			() =>
				horizontalScroll.scrollTo({
					left: canvasSize,
					behavior: 'smooth'
				}),
			1000
		);
	});
</script>

<div class="relative h-full w-full" bind:clientHeight bind:clientWidth>
	<div class="absolute top-0 left-0 flex p-4 z-10 -md:(justify-center p-3 right-0)">
		<Logo />
	</div>
	{#each yAxis as label, index}
		<YLabel {index} {...label} />
	{/each}
	<div class="relative h-full overflow-x-scroll overflow-y-hidden" bind:this={horizontalScroll}>
		<div class="absolute top-0 bottom-0 overflow-hidden" style="width: {canvasSize}px;">
			{#each xAxis as label}
				<XLabel {...label} />
			{/each}
		</div>
		<svg class="absolute" viewBox="0 0 {canvasSize} {chartHeight}" style="width: {canvasSize}px;">
			<defs>
				<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" stop-color="#FF4D00" />
					<stop offset="100%" stop-color="#66BC31" />
				</linearGradient>
			</defs>
			<polyline
				fill="none"
				stroke="url(#gradient)"
				stroke-width="6"
				stroke-linecap="round"
				stroke-linejoin="round"
				{points}
			/>
		</svg>
		{#each pins as { id, ...rest }}
			<Pin
				{...rest}
				isActive={id === activeContentId}
				on:click={() => dispatch('selectspeech', id)}
			/>
		{/each}
	</div>
</div>

<style>
	::-webkit-scrollbar {
		height: 8px;
	}

	::-webkit-scrollbar-track {
		background: none;
	}

	::-webkit-scrollbar-thumb {
		@apply bg-gray-600;
		border-radius: 4px;
	}
</style>
