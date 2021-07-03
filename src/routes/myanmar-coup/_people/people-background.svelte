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

	let getPositionFromIndex: (index: number) => paper.Point;

	let canvas: HTMLCanvasElement;

	$: onMount(() => {
		paper.setup(canvas);

		avatarSymbols = generateAvatarSymbols();

		const size = Math.floor(Math.sqrt((canvas.clientHeight * canvas.clientWidth) / people.length));
		const scale = size / BASE_SIZE;
		const columnSize = Math.floor(canvas.clientWidth / size);

		getPositionFromIndex = (index: number) =>
			new paper.Point((index % columnSize) * size, Math.floor(index / columnSize) * size);

		people.forEach((person) => {
			const item = randomPickIn(avatarSymbols).place();

			item.scale(scale);
			item.data = person;
		});
	});

	$: {
		if (paper && getPositionFromIndex) {
			paper.project.activeLayer.children.forEach((avatar) => {
				const newIndex = people.findIndex(({ id }) => id === (avatar.data as Person).id);
				avatar.position = getPositionFromIndex(newIndex);
			});
		}
	}
</script>

<canvas class="fixed -z-1 h-screen w-full bg-true-gray-900" bind:this={canvas} />
