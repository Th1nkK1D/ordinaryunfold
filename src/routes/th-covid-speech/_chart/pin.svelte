<script lang="ts">
	import Quote from '../_quote.svelte';

	const minBottom = 12;

	export let x: number;
	export let y: number;
	export let type: 'speech' | 'news';
	export let isActive: boolean = false;
</script>

<div
	on:click
	class="absolute w-4 h-4 md:(w-6 h-6) flex shadow rounded-full cursor-pointer transition duration-300 ease-in-out transform -translate-x-1/2 translate-y-1/2 {isActive
		? 'bg-white scale-150 z-10'
		: 'text-white bg-gray-600 hover:scale-150'}"
	style="left: {x}px; bottom: {Math.max(y, minBottom)}px;"
>
	{#if type === 'speech'}
		<Quote class="w-2 md:w-3 m-auto" />
	{:else}
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			class="h-3 md:h-4 m-auto fill-current"
		>
			<path d="M0 0h24v24H0V0z" fill="none" />
			<circle cx="12" cy="19" r="2" />
			<path d="M10 3h4v12h-4z" />
		</svg>
	{/if}
</div>
