<script lang="ts">
	import { wokeLevelMap, type Game } from '../game';
	import BeeswarmChart from './beeswarm-chart.svelte';

	interface Props {
		games: Game[];
	}

	let { games }: Props = $props();

	let contentBoxSize = $state<ResizeObserverSize[]>([]);
	let selectedPercent = $state(87);

	function updateSelectedPercent({ layerX }: { layerX: number }) {
		selectedPercent = Math.max(
			0,
			Math.min(Math.round((layerX / contentBoxSize[0].inlineSize) * 100), 100)
		);
	}
</script>

<div
	class="relative py-6"
	onclick={updateSelectedPercent}
	ondrag={updateSelectedPercent}
	ondragend={updateSelectedPercent}
	role="presentation"
	bind:contentBoxSize
>
	<div class="absolute inset-x-0 inset-y-6 flex flex-row">
		<div class="{wokeLevelMap[2].bgClass} bg-opacity-25" style="width: {selectedPercent}%;"></div>
		<div class="flex-1 {wokeLevelMap[0].bgClass} bg-opacity-25"></div>
	</div>
	<BeeswarmChart groups={[games]} disabled />
	<div
		class="absolute inset-y-0 flex -translate-x-1/2 cursor-move flex-row justify-center px-3"
		style="left: {selectedPercent}%;"
	>
		<div class="w-[2px] bg-neutral-950"></div>
		<div class="absolute -top-1 rounded bg-neutral-950 px-1 text-sm font-bold text-neutral-50">
			{selectedPercent}%
		</div>
	</div>
</div>
