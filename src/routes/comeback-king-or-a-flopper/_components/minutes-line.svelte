<script lang="ts">
	export let xFromMinutes: (m: string) => number;
	export let height: number;
	export let minutes: string;
	export let label: string | undefined = undefined;

	$: xValue = xFromMinutes(minutes);
</script>

<g class="fill-gray-400 stroke-gray-300 stroke-1 {$$restProps.class}">
	<line x1={xValue} y1={0} x2={xValue} y2={height} />
	{#if label}
		<text x={xValue + 4} y="16" font-size="13px" class="stroke-0">{label}</text>
	{/if}
</g>
