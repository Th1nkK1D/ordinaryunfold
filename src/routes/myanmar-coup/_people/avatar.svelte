<script lang="ts">
	import { BACK_HAIR, FACES, FRONT_HAIR } from './variation.json';

	export let size: number;
	export let isActive: boolean = false;

	function randomPickIn<T>(array: T[]): T {
		return array[Math.floor(Math.random() * array.length)];
	}

	const backHair = randomPickIn(BACK_HAIR);
	const face = randomPickIn(FACES);
	const frontHair = randomPickIn(FRONT_HAIR);
</script>

<div
	class="p-1px md:p-1"
	style="width:{size}px; height:{size}px; --color: {isActive
		? 'rgba(245, 158, 11)'
		: 'rgba(255,255,255,0.15)'};"
>
	<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
		<!-- back hair -->
		{#each backHair as d}
			<path {d} />
		{/each}
		<!-- faces -->
		<path d={face} />
		<!-- eyes -->
		<ellipse cx="65.5" cy="59.5" rx="2.5" ry="7.5" />
		<ellipse cx="35.5" cy="59.5" rx="2.5" ry="7.5" />
		<!-- front hair -->
		<path d={frontHair} />
	</svg>
</div>

<style>
	ellipse {
		fill: var(--color);
	}
	path {
		stroke: var(--color);
		@apply stroke-4 stroke-join-round fill-true-gray-900;
	}
</style>
