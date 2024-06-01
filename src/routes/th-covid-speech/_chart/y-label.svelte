<script lang="ts">
	export let index: number;
	export let y: number;
	export let count: number;
</script>

<div
	class="absolute left-0 right-0 text-white border-b border-white opacity-25 pl-1 md:pl-2 md:pb-1 text-sm {index %
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
