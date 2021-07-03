<script lang="ts">
	import { onMount } from 'svelte';
	import paper from 'paper/dist/paper-core';
	import { generateAvatarSymbols, BASE_SIZE } from './avatar';
	import type { Person } from '../_data';

	const TWEEN_TRANSLATE_CONFIG = {
		duration: 1500,
		easing: 'easeInOutQuad'
	};

	const TWEEN_FADE_CONFIG = {
		duration: 700,
		easing: 'easeInOutQuad'
	};

	export let people: Person[];
	export let activePeopleMask: boolean[];

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
			new paper.Point((index % columnSize) * size, Math.floor(index / columnSize) * size).add(
				size / 2
			);

		people.forEach((person) => {
			const item = randomPickIn(avatarSymbols).place(getPositionFromIndex(person.id));

			item.scale(scale);
			item.data = person;
		});
	});

	$: {
		if (people && getPositionFromIndex) {
			paper.project.activeLayer.children.forEach((avatar) => {
				const { x, y } = getPositionFromIndex(people.findIndex(({ id }) => id === avatar.data.id));

				avatar.tween({ 'position.x': x, 'position.y': y }, TWEEN_TRANSLATE_CONFIG);
			});
		}
	}

	$: {
		if (paper.project && activePeopleMask) {
			paper.project.activeLayer.children.forEach((avatar, index) => {
				const opacity = activePeopleMask.length === 0 || activePeopleMask[index] ? 1 : 0.3;

				if (opacity !== avatar.opacity) {
					avatar.tween({ opacity }, TWEEN_FADE_CONFIG);
				}
			});
		}
	}
</script>

<canvas class="fixed -z-1 h-screen w-full bg-true-gray-900" bind:this={canvas} />
