<script lang="ts">
	import type { Game } from '../game';
	import GameDot from './game-dot.svelte';

	interface Props {
		title: string;
		description: string;
		games: Game[];
	}

	let { games, title, description }: Props = $props();
</script>

<div class="flex flex-row gap-2">
	<div class="flex w-full max-w-72 flex-wrap gap-[1px]">
		{#each games as game}
			<GameDot {...game} />
		{/each}
	</div>
	<div class="flex-1">
		<p style="font-family: 'Libre Baskerville', serif;">
			<span class="font-bold">{title}</span> - {games.length} games
		</p>
		<p>{description}</p>
	</div>
</div>
