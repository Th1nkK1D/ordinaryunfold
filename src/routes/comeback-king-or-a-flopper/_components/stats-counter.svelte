<script lang="ts">
	import { fade } from 'svelte/transition';
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import type { TeamStats } from '../../../data/comeback-king-or-a-flopper/model';

	export let timeScale: string[];
	export let team: TeamStats;
	export let activeTimeIndex: number;

	let isShowingTooltip: boolean = false;

	$: wins = team.W.at(activeTimeIndex) || 0;
	$: draws = team.D.at(activeTimeIndex) || 0;
	$: losses = team.L.at(activeTimeIndex) || 0;
	$: points = wins * 3 + draws;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'bottom',
		middleware: [offset(8), flip(), shift()]
	});
</script>

<p
	use:floatingRef
	on:mouseenter={() => (isShowingTooltip = true)}
	on:mouseleave={() => (isShowingTooltip = false)}
	class="flex gap-1 whitespace-nowrap break-words text-gray-400 md:mb-2 md:text-right md:text-xl {$$restProps.class}"
>
	{#if activeTimeIndex >= 0}
		<span class="font-bold text-gray-800">{timeScale[activeTimeIndex]}'</span> :
	{/if}
	<span class="text-green-600"><b>{wins}</b>W</span> +
	<span class="text-blue-500"><b>{draws}</b>D</span> +
	<span class="text-red-400"><b>{losses}</b>L</span> =
	<span class="text-gray-500"><b>{points}</b> points</span>
	<svg class="my-auto inline h-4" viewBox="0 0 24 24"
		><path
			fill="currentColor"
			d="M11 17h2v-6h-2zm1-8q.425 0 .713-.288T13 8t-.288-.712T12 7t-.712.288T11 8t.288.713T12 9m0 13q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
		/></svg
	>
</p>

{#if isShowingTooltip}
	<div transition:fade={{ duration: 200 }} use:floatingContent class="z-20">
		<div class="flex flex-col items-center">
			<svg class="-my-2 w-4" viewBox="0 0 12 16"
				><path fill-rule="evenodd" d="M12 11L6 5l-6 6h12z" class="fill-gray-600" /></svg
			>
			<div class="rounded bg-gray-600 px-2 py-1 text-sm text-white shadow">
				Win +3 points<br />
				Draw +1 point
			</div>
		</div>
	</div>
{/if}
