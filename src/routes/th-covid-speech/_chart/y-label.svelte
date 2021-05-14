<script lang="ts">
	export let index: number;
	export let y: number;
	export let count: number;

</script>

<div
	class="absolute left-0 right-0 text-white border-b border-white opacity-25 p-2 text-sm {index %
		2 ===
	1
		? '-lg:hidden'
		: ''}"
	style="bottom: {y}px;"
>
	{#if index > 0}
		{count}
	{/if}
</div>
