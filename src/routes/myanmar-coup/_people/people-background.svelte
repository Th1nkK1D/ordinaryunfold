<script lang="ts">
	import type { Person } from '../_data';
	import Avatar from './avatar.svelte';

	export let people: Person[];

	let clientHeight: number = 0;
	let clientWidth: number = 0;

	$: size = Math.floor(Math.sqrt((clientHeight * clientWidth) / people.length));
</script>

<div
	class="fixed -z-1 flex flex-row flex-wrap h-screen w-full content-around overflow-hidden bg-true-gray-900"
	bind:clientHeight
	bind:clientWidth
>
	{#each people as _}
		<Avatar {size} />
	{/each}
</div>
