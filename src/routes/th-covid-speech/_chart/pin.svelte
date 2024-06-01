<script lang="ts">
	import { isScreenLarge } from '../../../utils/screen';
	import { fade } from 'svelte/transition';
	import type { Speaker } from '../_data';

	const minBottom = 12;

	export let x: number;
	export let y: number;
	export let date: Date;
	export let count: number;
	export let speaker: Speaker | undefined;
	export let type: 'speech' | 'news';
	export let isActive: boolean = false;

	let isHovered = false;

</script>

{#if isActive || isHovered}
	<div
		class="absolute mb-2 md:mb-4 shadow transform -translate-x-1/2 bg-white rounded-lg px-3 py-1 w-auto text-center opacity-90 {isScreenLarge() &&
		isHovered
			? 'z-40 hidden md:flex'
			: 'z-20'}"
		style="left: {x}px; bottom: {Math.max(y, minBottom)}px;"
		transition:fade|global={{ duration: 150 }}
	>
		<p class="text-xs whitespace-nowrap">
			{date.toLocaleDateString('TH-th', { year: '2-digit', month: 'short', day: 'numeric' })}
		</p>
		<p class="text-sm font-bold">+{count.toLocaleString('TH-th')}</p>
	</div>
{/if}

<div
	class="absolute w-6 h-6 md:w-8 md:h-8 text-white flex shadow rounded-full cursor-pointer transition duration-300 ease-in-out transform -translate-x-1/2 translate-y-1/2 {isActive
		? 'bg-blue-500 scale-120 z-30'
		: 'bg-gray-500 hover:z-50 hover:scale-130)'}"
	style="left: {x}px; bottom: {Math.max(y, minBottom)}px;"
	on:click
	on:mouseover={() => (isHovered = true)}
	on:mouseleave={() => (isHovered = false)}
>
	{#if type === 'speech'}
		<img
			src="/th-covid-speech/speakers/{speaker.id}.webp"
			alt={speaker.name}
			class="rounded-full p-0.5 md:p-1 m-auto"
		/>
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="h-4 md:h-5 m-auto fill-current"
		>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<circle cx="12" cy="19" r="2" />
			<path d="M10 3h4v12h-4z" />
		</svg>
	{/if}
</div>
