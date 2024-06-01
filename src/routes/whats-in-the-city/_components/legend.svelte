<script lang="ts">
	import { DISTANCE_RADIUS_KM } from './map.svelte';

	const UPPER_BOUND_KM = 2;

	export let colors: string[];

	let totalRange = DISTANCE_RADIUS_KM[0] + UPPER_BOUND_KM;

	$: legends = [
		{
			label: 0,
			size: (DISTANCE_RADIUS_KM[1] * 100) / totalRange,
			color: colors?.[2],
			icon: '<svg height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.56-.89-1.68-1.25-2.65-.84L6 8.3V13h2V9.6l1.8-.7"/></svg>'
		},
		{
			label: DISTANCE_RADIUS_KM[1],
			size: ((DISTANCE_RADIUS_KM[0] - DISTANCE_RADIUS_KM[1]) * 100) / totalRange,
			color: colors?.[1],
			icon: '<svg enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><path d="M18.18,10l-1.7-4.68C16.19,4.53,15.44,4,14.6,4H12v2h2.6l1.46,4h-4.81l-0.36-1H12V7H7v2h1.75l1.82,5H9.9 c-0.44-2.23-2.31-3.88-4.65-3.99C2.45,9.87,0,12.2,0,15c0,2.8,2.2,5,5,5c2.46,0,4.45-1.69,4.9-4h4.2c0.44,2.23,2.31,3.88,4.65,3.99 c2.8,0.13,5.25-2.19,5.25-5c0-2.8-2.2-5-5-5H18.18z M7.82,16c-0.4,1.17-1.49,2-2.82,2c-1.68,0-3-1.32-3-3s1.32-3,3-3 c1.33,0,2.42,0.83,2.82,2H5v2H7.82z M14.1,14h-1.4l-0.73-2H15C14.56,12.58,14.24,13.25,14.1,14z M19,18c-1.68,0-3-1.32-3-3 c0-0.93,0.41-1.73,1.05-2.28l0.96,2.64l1.88-0.68l-0.97-2.67c0.03,0,0.06-0.01,0.09-0.01c1.68,0,3,1.32,3,3S20.68,18,19,18z"/></g></svg>'
		},
		{
			label: DISTANCE_RADIUS_KM[0],
			size: (UPPER_BOUND_KM * 100) / totalRange,
			color: colors?.[0],
			icon: '<svg height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 4H5C3.34 4 2 5.34 2 7v8c0 1.66 1.34 3 3 3l-1 1v1h1l2-2h2v-5H4V6h9v2h2V7c0-1.66-1.34-3-3-3zM5 14c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm15.57-4.34c-.14-.4-.52-.66-.97-.66h-7.19c-.46 0-.83.26-.98.66l-1.42 4.11v5.51c0 .38.31.72.69.72h.62c.38 0 .68-.38.68-.76V18h8v1.24c0 .38.31.76.69.76h.61c.38 0 .69-.34.69-.72l.01-1.37v-4.14l-1.43-4.11zm-8.16.34h7.19l1.03 3h-9.25l1.03-3zM12 16c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm8 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>'
		}
	];
</script>

<div
	class="flex flex-row items-center space-x-4 text-xs text-gray-600 transition-opacity duration-1000 md:space-x-6 md:text-sm {colors
		? 'opacity-100'
		: 'opacity-0'}"
>
	<div class="text-right">Reachable by<br />(distance in km)</div>
	<div class="flex w-48 flex-row md:w-64">
		{#each legends as { label, size, color, icon }, index (index)}
			<div class="flex flex-col" style="width: {size}%">
				<div class="flex justify-center">
					{@html icon}
				</div>
				<div
					class="h-1.5 transition-colors duration-1000 md:h-2"
					style="background-color: {color};"
				/>
				<div>
					<span class="-ml-1">{label}</span>
				</div>
			</div>
		{/each}
		<svg class="mt-24px h-1.5 md:h-2" viewBox="0 0 100 100" fill="none">
			<polygon points="0,0 0,100 100,50" fill={colors?.[0]} />
		</svg>
	</div>
</div>
