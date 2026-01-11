<script lang="ts">
	import { groups } from 'd3-array';
	import type { Movie } from '../../../data/movies-wrapped-2025/parse-movies';
	import OptionItem from '../_components/option-item.svelte';
	import { flip } from 'svelte/animate';
	import { fade, slide } from 'svelte/transition';

	interface Props {
		movies: Movie[];
		isShowingResult: boolean;
	}

	const { movies, isShowingResult }: Props = $props();

	const companionCounts = $derived(
		groups(movies, (m) => m.companion).map(([companion, items]) => ({
			companion: companion,
			count: items.length,
			randomOrder: Math.random()
		}))
	);

	const displayedCompanions = $derived(
		companionCounts.toSorted(
			isShowingResult ? (a, z) => z.count - a.count : (a, z) => a.randomOrder - z.randomOrder
		)
	);

	let selectedCompanion = $state<string>();
	let resultSection = $state<HTMLElement>();
</script>

<div class="relative">
	<div class="content-container sticky top-0">
		<p>First thing first,</p>
		<h1 class="text-2xl font-bold">Guess who I spent time in the cinema with the most?</h1>
		<ol class="flex w-full flex-col gap-2">
			{#each displayedCompanions as { companion, count }, i (companion)}
				<li animate:flip={{ duration: 400 }}>
					<OptionItem
						number={i + 1}
						title={companion}
						subtitle={isShowingResult ? `${count} movies` : undefined}
						selected={companion === selectedCompanion}
						onclick={!isShowingResult && !selectedCompanion
							? () => {
									selectedCompanion = companion;
									resultSection?.scrollIntoView();
								}
							: undefined}
					/>
					{#if isShowingResult && i === 0}
						<p in:slide={{ delay: 1000 }} out:slide={{ delay: 0 }} class="my-4 flex flex-col gap-4">
							<span
								>I solo almost half of it. Didn't talk to anyone during the screening did we?</span
							>
							<span
								>But it is a great group activity too! <br /> These are my top movie companions:</span
							>
						</p>
					{/if}
				</li>
			{/each}
		</ol>
	</div>
	<section></section>
	<section bind:this={resultSection}></section>
</div>
