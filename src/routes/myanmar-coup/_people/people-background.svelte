<script lang="ts">
	import fetalities from '../../../data/myanmar-coup/recent-fatality.csv';
	import Avatar from './avatar.svelte';

	let clientHeight: number = 0;
	let clientWidth: number = 0;

	$: size = Math.floor(Math.sqrt((clientHeight * clientWidth) / fetalities.length));
</script>

<div
	class="fixed -z-1 flex flex-row flex-wrap h-screen w-full content-around overflow-hidden bg-true-gray-900"
	bind:clientHeight
	bind:clientWidth
>
	{#each fetalities as avatar}
		<Avatar {size} />
	{/each}
</div>
