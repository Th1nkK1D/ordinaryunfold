<script lang="ts">
	import type { Person } from '../_data';
	import paper from 'paper/dist/paper-core';
	import { onMount } from 'svelte';
	import { drawAvatar } from './avatar';

	export let people: Person[];

	let canvas: HTMLCanvasElement;

	$: onMount(() => {
		paper.setup(canvas);

		drawAvatar();
	});
</script>

<canvas class="fixed -z-1 h-screen w-full bg-true-gray-900" bind:this={canvas} />
