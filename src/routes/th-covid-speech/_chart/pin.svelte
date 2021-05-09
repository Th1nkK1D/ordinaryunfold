<script lang="ts">
	import Quote from '../_quote.svelte';

	export let x: number;
	export let y: number;
</script>

<div
	class="absolute w-6 h-6 flex bg-white shadow rounded-full transform -translate-x-1/2 -translate-y-1/2"
	style="left: {x}px; bottom: {y}px;"
>
	<Quote class="w-3 m-auto" />
</div>
