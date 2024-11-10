<script lang="ts">
	import { isScreenLarge } from '../../../utils/screen';
	import { fade } from 'svelte/transition';
	import type { Speaker } from '../_data';

	const minBottom = 12;

	interface Props {
		x: number;
		y: number;
		date: Date;
		count: number;
		speaker: Speaker | undefined;
		isActive?: boolean;
		onclick?: () => unknown;
	}

	let { x, y, date, count, speaker, isActive = false, onclick }: Props = $props();

	let isHovered = $state(false);
</script>

{#if isActive || isHovered}
	<div
		class="absolute mb-2 w-auto -translate-x-1/2 transform rounded-lg bg-white px-3 py-1 text-center opacity-90 shadow md:mb-4 {isScreenLarge() &&
		isHovered
			? 'z-40 hidden md:flex'
			: 'z-20'}"
		style="left: {x}px; bottom: {Math.max(y, minBottom)}px;"
		transition:fade|global={{ duration: 150 }}
	>
		<p class="whitespace-nowrap text-xs">
			{date.toLocaleDateString('TH-th', { year: '2-digit', month: 'short', day: 'numeric' })}
		</p>
		<p class="text-sm font-bold">+{count.toLocaleString('TH-th')}</p>
	</div>
{/if}

<button
	class="absolute flex h-6 w-6 -translate-x-1/2 translate-y-1/2 transform cursor-pointer rounded-full text-white shadow transition duration-300 ease-in-out md:h-8 md:w-8 {isActive
		? 'scale-120 z-30 bg-blue-500'
		: 'hover:scale-130) bg-gray-500 hover:z-50'}"
	style="left: {x}px; bottom: {Math.max(y, minBottom)}px;"
	{onclick}
	onmouseover={() => (isHovered = true)}
	onfocus={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	{#if speaker}
		<img
			src="/th-covid-speech/speakers/{speaker.id}.webp"
			alt={speaker.name}
			class="m-auto rounded-full p-0.5 md:p-1"
		/>
	{:else}
		<svg viewBox="0 0 24 24" class="m-auto h-4 fill-current md:h-5">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<circle cx="12" cy="19" r="2" />
			<path d="M10 3h4v12h-4z" />
		</svg>
	{/if}
</button>
