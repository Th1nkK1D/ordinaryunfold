<script lang="ts">
	export let y: number;
	export let count: number;
</script>

<div
	class="absolute left-0 right-0 text-white border-b border-white opacity-25 p-2 text-sm"
	style="bottom: {y}px;"
>
	{count}
</div>
