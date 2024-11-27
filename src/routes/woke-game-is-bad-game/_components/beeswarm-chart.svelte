<script lang="ts">
	import { groups as d3groups } from 'd3-array';
	import { type GameLevelGroup, wokeLevelMap } from '../game';
	import GameDot from './game-dot.svelte';
	import ReviewScale from './review-scale.svelte';
	import { slide } from 'svelte/transition';

	interface Props {
		groups: GameLevelGroup[];
		disabled?: boolean;
	}

	let { groups, disabled }: Props = $props();

	let groupData = $derived(
		groups.map(({ mean, games }) => ({
			group: d3groups(games, (g) => g.positivePercent),
			mean
		}))
	);
</script>

<div class="flex flex-col {disabled ? 'pointer-events-none select-none' : ''}">
	<ReviewScale>
		<div class="flex flex-col gap-1">
			{#each groupData as { group, mean }}
				<div class="relative flex w-full flex-1 flex-row">
					<div class="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-400"></div>
					<div
						class="absolute inset-y-0 border-r border-amber-500 pr-1 font-body text-amber-600"
						style="right: {100 - mean}%;"
					>
						Avg. {mean}%
					</div>
					{#each group as [percentage, games]}
						<div
							class="relative flex w-0 flex-col items-center justify-center"
							style="left: {percentage}%;"
						>
							{#each games.sort((a, z) => z.woke.level - a.woke.level) as game}
								<GameDot {...game} {disabled} />
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</ReviewScale>
	{#if !disabled}
		<div transition:slide class="flex flex-row flex-wrap justify-center gap-4">
			{#each wokeLevelMap as { label, bgClass }}
				<div class="flex flex-row items-center gap-1">
					<div class="size-2 rounded-full {bgClass}"></div>
					<div class="text-sm">{label}</div>
				</div>
			{/each}
		</div>
	{/if}
</div>
