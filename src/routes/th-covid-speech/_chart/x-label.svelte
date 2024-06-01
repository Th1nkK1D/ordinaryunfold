<script lang="ts">
	export let x: number;
	export let date: Date;
</script>

<div
	class="absolute bottom-0 text-white border-l border-white opacity-50 pl-1 md:pl-2 md:pb-1 text-sm w-20"
	style="left: {x}px;"
>
	{date.toLocaleDateString('TH-th', { year: '2-digit', month: 'short' })}
</div>
