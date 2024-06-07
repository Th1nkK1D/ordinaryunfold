<script lang="ts">
	import type { TeamStats } from '../../../data/comeback-king-or-a-flopper/model';

	export let teamIndex: number;
	export let teams: TeamStats[];
</script>

<div class="flex w-full flex-row">
	{#if teamIndex > 0}
		<button on:click={() => teamIndex--}>
			<svg viewBox="0 0 24 24">
				<path d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z" />
			</svg>
			<span class="text-left">{teams[teamIndex - 1].name}</span>
		</button>
	{/if}
	<div class="min-w-6 flex-1" />
	{#if teamIndex < teams.length - 1}
		<button on:click={() => teamIndex++}>
			<span class="text-right">{teams[teamIndex + 1].name}</span>
			<svg viewBox="0 0 24 24">
				<path d="m13.292 12l-4.6-4.6l.708-.708L14.708 12L9.4 17.308l-.708-.708z" />
			</svg>
		</button>
	{/if}
</div>

<style lang="postcss">
	button {
		@apply flex flex-row items-center text-gray-500 hover:text-gray-900;
	}
	svg {
		@apply size-10;
	}
	path {
		@apply fill-current;
	}
	span {
		@apply leading-none;
	}
</style>
