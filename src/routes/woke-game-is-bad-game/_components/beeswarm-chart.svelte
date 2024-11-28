<script lang="ts">
	import { groups as d3groups } from 'd3-array';
	import { scaleLinear, type ScaleLinear } from 'd3-scale';
	import { type GameLevelGroup } from '../game';
	import GameDot from './game-dot.svelte';
	import ReviewScale from './review-scale.svelte';

	interface Props {
		groups: GameLevelGroup[];
		disabled?: boolean;
		xScale?: ScaleLinear<number, number, never>;
	}

	let { groups, disabled, xScale = scaleLinear([0, 100], [0, 100]) }: Props = $props();

	let xStarted = $derived(xScale.domain()[0]);

	let groupData = $derived(
		groups.map(({ mean, games }) => ({
			group: d3groups(
				games.filter((g) => g.positivePercent >= xStarted),
				(g) => g.positivePercent
			),
			mean
		}))
	);
</script>

<div class="flex flex-col {disabled ? 'pointer-events-none select-none' : ''}">
	<ReviewScale {xStarted} hideLegend={disabled}>
		<div class="flex flex-col gap-1">
			{#each groupData as { group, mean }}
				<div class="relative flex w-full flex-1 flex-row">
					<div class="absolute inset-x-0 top-1/2 h-[1px] bg-neutral-400"></div>
					<div
						class="absolute inset-y-0 border-r border-amber-500 pr-1 font-body text-amber-600"
						style="right: {Math.round(100 - xScale(mean))}%;"
					>
						Avg. {mean}%
					</div>
					{#each group as [percentage, games]}
						<div
							class="relative flex w-0 flex-col items-center justify-center"
							style="left: {xScale(percentage)}%;"
						>
							{#each games.sort((a, z) => a.woke.level - z.woke.level) as game}
								<GameDot {...game} {disabled} />
							{/each}
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</ReviewScale>
</div>
