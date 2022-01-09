<script lang="ts">
	import cities from '../../../data/whats-in-the-city/cities.json';

	const MIN_COLUMN_WIDTH = 180;
</script>

<div
	class="grid"
	style="grid-template-columns: repeat({cities.length + 1}, minmax({MIN_COLUMN_WIDTH}px, 1fr)"
>
	<div />
	{#each cities as { name }}
		<div class="font-bold text-center">{name}</div>
	{/each}
</div>
