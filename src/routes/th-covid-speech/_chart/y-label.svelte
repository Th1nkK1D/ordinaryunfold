<script lang="ts">
	interface Props {
		index: number;
		y: number;
		count: number;
	}

	let { index, y, count }: Props = $props();
</script>

<div
	class="absolute left-0 right-0 border-b border-white pl-1 text-sm text-white opacity-25 md:pb-1 md:pl-2 {index %
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
