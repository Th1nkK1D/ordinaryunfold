<script lang="ts">
	import MinutesLine from './minutes-line.svelte';

	interface RangePoint {
		minutes: string;
		label?: string;
	}

	export let xFromMinutes: (m: string) => number;
	export let height: number;
	export let range: [RangePoint, RangePoint];
</script>

<rect
	x={xFromMinutes(range[0].minutes)}
	y="0"
	width={xFromMinutes(range[1].minutes) - xFromMinutes(range[0].minutes)}
	{height}
	class="fill-gray-200"
/>

{#each range as x}
	<MinutesLine {xFromMinutes} {height} {...x} />
{/each}
