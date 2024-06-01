<script lang="ts">
	export let x: number;
	export let date: Date;
</script>

<div
	class="absolute bottom-0 w-20 border-l border-white pl-1 text-sm text-white opacity-50 md:pb-1 md:pl-2"
	style="left: {x}px;"
>
	{date.toLocaleDateString('TH-th', { year: '2-digit', month: 'short' })}
</div>
