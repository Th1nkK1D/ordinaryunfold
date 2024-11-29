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
	<div class="flex w-full max-w-32 flex-wrap place-content-start gap-[1px] md:max-w-72">
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
