<script lang="ts">
	import type { Person } from '../_data';
	import paper from 'paper/dist/paper-core';
	import { onMount } from 'svelte';
	import { generateAvatarSymbols, BASE_SIZE } from './avatar';

	export let people: Person[];

	let avatarSymbols: paper.SymbolDefinition[];

	function randomPickIn<T>(array: T[]): T {
		return array[Math.floor(Math.random() * array.length)];
	}

	let canvas: HTMLCanvasElement;

	$: onMount(() => {
		paper.setup(canvas);

		avatarSymbols = generateAvatarSymbols();

		const size = Math.floor(Math.sqrt((canvas.clientHeight * canvas.clientWidth) / people.length));
		const scale = size / BASE_SIZE;
		const columnSize = Math.floor(canvas.clientWidth / size);

		people.forEach((_, index) => {
			const position = new paper.Point(
				(index % columnSize) * size,
				Math.floor(index / columnSize) * size
			);

			randomPickIn(avatarSymbols).place(position).scale(scale, position);
		});
	});
</script>

<canvas class="fixed -z-1 h-screen w-full bg-true-gray-900" bind:this={canvas} />
