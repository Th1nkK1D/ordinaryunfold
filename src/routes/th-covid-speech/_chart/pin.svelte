<script lang="ts">
	import Quote from '../_quote.svelte';

	const minBottom = 12;

	export let x: number;
	export let y: number;
	export let isActive: boolean = false;
</script>

<div
	on:click
	class="absolute w-4 h-4 md:(w-6 h-6) flex shadow rounded-full cursor-pointer transition duration-300 ease-in-out transform -translate-x-1/2 translate-y-1/2 {isActive
		? 'bg-white scale-150 z-10'
		: 'text-white bg-gray-600 hover:scale-150'}"
	style="left: {x}px; bottom: {Math.max(y, minBottom)}px;"
>
	<Quote class="w-2 md:w-3 m-auto" />
</div>
