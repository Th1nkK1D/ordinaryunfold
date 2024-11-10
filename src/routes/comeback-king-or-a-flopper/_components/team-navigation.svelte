<script lang="ts">
	import type { TeamStats } from '../../../data/comeback-king-or-a-flopper/model';

	interface Props {
		teamIndex: number;
		teams: TeamStats[];
		class?: string;
	}

	let { teamIndex = $bindable(), teams, class: className }: Props = $props();
</script>

<div class="flex w-full flex-row {className}">
	{#if teamIndex > 0}
		<button onclick={() => teamIndex--}>
			<svg viewBox="0 0 24 24">
				<path d="M14 17.308L8.692 12L14 6.692l.708.708l-4.6 4.6l4.6 4.6z" />
			</svg>
			<span class="text-left">{teamIndex}. {teams[teamIndex - 1].name}</span>
		</button>
	{/if}
	<div class="min-w-6 flex-1"></div>
	{#if teamIndex < teams.length - 1}
		<button onclick={() => teamIndex++}>
			<span class="text-right">{teamIndex + 2}. {teams[teamIndex + 1].name}</span>
			<svg viewBox="0 0 24 24">
				<path d="m13.292 12l-4.6-4.6l.708-.708L14.708 12L9.4 17.308l-.708-.708z" />
			</svg>
		</button>
	{/if}
</div>

<style lang="postcss">
	button {
		@apply flex flex-row items-center gap-1 py-2 text-gray-600 hover:text-black;
	}
	svg {
		@apply -m-2 size-8;
	}
	path {
		@apply fill-current;
	}
	span {
		@apply leading-none;
	}
</style>
