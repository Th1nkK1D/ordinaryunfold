<script lang="ts">
	interface Props {
		xFromMinutes: (m: string) => number;
		height: number;
		minutes: string;
		label?: string;
		class?: string;
	}

	let { xFromMinutes, height, minutes, label = undefined, class: className }: Props = $props();

	let xValue = $derived(xFromMinutes(minutes));
</script>

<g class="fill-gray-400 stroke-gray-300 stroke-1 {className}">
	<line x1={xValue} y1={0} x2={xValue} y2={height} />
	{#if label}
		<text x={xValue + 4} y="16" font-size="13px" class="stroke-0">{label}</text>
	{/if}
</g>
