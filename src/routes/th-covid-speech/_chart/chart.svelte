<script lang="ts">
	import { scaleTime, scaleLinear } from 'd3-scale';
	import { contentBlocks, dailyNewCases } from '../_data';
	import type { Speech } from '../_data';
	import Pin from './pin.svelte';
	import XLabel from './x-label.svelte';
	import YLabel from './y-label.svelte';
	import Logo from '../../../components/logo.svelte';

	type DailyNewCase = (typeof dailyNewCases)[number];

	const WIDTH_CASE_MULTIPLIER = 6;
	const Y_STEP_SIZE = 5000;
	const SCROLL_BAR_HEIGHT = 8;
	const MARGIN_TOP = 60;
	const MARGIN_RIGHT = 40;

	interface Props {
		activeContentId: number;
		onselectspeech: (id: number) => unknown;
	}

	let { activeContentId = $bindable(), onselectspeech }: Props = $props();

	let clientHeight = $state(SCROLL_BAR_HEIGHT);
	let horizontalScroll: HTMLElement;

	let chartHeight = $derived(clientHeight - SCROLL_BAR_HEIGHT);

	const yMax = Math.max(...dailyNewCases.map(({ count }) => count));

	let xMaxWidth = $derived(dailyNewCases.length * WIDTH_CASE_MULTIPLIER);
	let canvasSize = $derived(xMaxWidth + MARGIN_RIGHT);

	let xScale = $derived(
		scaleTime()
			.domain([dailyNewCases[0].date, dailyNewCases[dailyNewCases.length - 1].date])
			.range([0, xMaxWidth])
	);

	let yScale = $derived(
		scaleLinear()
			.domain([0, yMax])
			.range([0, chartHeight - MARGIN_TOP])
	);

	let xAxis = $derived(
		dailyNewCases
			.filter(({ date }) => date.getDate() === 1)
			.map(({ date }) => ({
				date,
				x: xScale(date)
			}))
	);

	let yAxis = $derived(
		new Array(Math.ceil(yMax / Y_STEP_SIZE)).fill(null).map((_, i) => {
			const count = i * Y_STEP_SIZE;

			return {
				count,
				y: Math.round(yScale(count)) + SCROLL_BAR_HEIGHT
			};
		})
	);

	let points = $derived(
		dailyNewCases
			.map(({ count, date }) => `${xScale(date)},${chartHeight - yScale(count)}`)
			.join(' ')
	);

	let pins = $derived(
		contentBlocks.map(({ id, type, date, ...rest }) => {
			const matchedCases = dailyNewCases.find(
				(newCase) => newCase.date.toDateString() === date.toDateString()
			);

			const count = matchedCases
				? matchedCases.count
				: (([...dailyNewCases].reverse().find((newCase) => newCase.date <= date) as DailyNewCase)
						.count +
						(dailyNewCases.find((newCase) => newCase.date >= date) as DailyNewCase).count) /
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
		})
	);

	$effect(() => {
		if (activeContentId) {
			const x = pins.find(({ id }) => id === activeContentId)?.x;

			if (x === undefined) return;

			horizontalScroll.scrollTo({
				left: x - horizontalScroll.clientWidth / 2,
				behavior: 'smooth'
			});
		}
	});

	$effect(() => {
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

<div class="relative h-full w-full" bind:clientHeight>
	<div
		class="absolute inset-0 bottom-auto top-0 z-10 flex justify-center p-3 md:right-auto md:justify-start md:p-4"
	>
		<Logo />
	</div>
	{#each yAxis as label, index}
		<YLabel {index} {...label} />
	{/each}
	<div class="relative h-full overflow-y-hidden overflow-x-scroll" bind:this={horizontalScroll}>
		<div class="absolute bottom-0 top-0 overflow-hidden" style="width: {canvasSize}px;">
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
			<Pin {...rest} isActive={id === activeContentId} onclick={() => onselectspeech(id)} />
		{/each}
	</div>
</div>

<style lang="postcss">
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
