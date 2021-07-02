<script lang="ts">
	import { BACK_HAIR, FACES, FRONT_HAIR } from './variation.json';

	function randomPickIn<T>(array: T[]): T {
		return array[Math.floor(Math.random() * array.length)];
	}

	const backHair = randomPickIn(BACK_HAIR);
	const face = randomPickIn(FACES);
	const frontHair = randomPickIn(FRONT_HAIR);
</script>

<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
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

<style>
	ellipse {
		@apply fill-white;
	}
	path {
		@apply stroke-white stroke-4 stroke-join-round fill-true-gray-900;
	}
</style>
