<script lang="ts">
	import { onMount } from 'svelte';
	import paper from 'paper';
	import { generateAvatarSymbols, BASE_SIZE } from './avatar';
	import type { Person } from '../_data';

	const ENTER_TRANSITION_DURATION = 3000;

	const TWEEN_TRANSLATE_CONFIG = {
		duration: 1500,
		easing: 'easeInOutQuad'
	};

	const MUTE_OPACITY = 0.25;

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

		const { clientHeight, clientWidth } = canvas;

		const size = Math.floor(Math.sqrt((clientHeight * clientWidth) / people.length));
		const scale = size / BASE_SIZE;

		const columnSize = Math.floor(clientWidth / size);
		const rowSize = Math.ceil(people.length / columnSize);

		const xOffset = Math.round((clientWidth - size * columnSize + size) / 2);
		const yOffset = Math.round((clientHeight - size * rowSize + size) / 2);

		getPositionFromIndex = (index: number) =>
			new paper.Point(
				(index % columnSize) * size + xOffset,
				Math.floor(index / columnSize) * size + yOffset
			);

		const enterDelay = ENTER_TRANSITION_DURATION / people.length;

		people.forEach((person, index) => {
			setTimeout(() => {
				const item = randomPickIn(avatarSymbols).place(getPositionFromIndex(person.id));

				item.scale(scale);
				item.data = person;
			}, enterDelay * index);
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
				avatar.opacity =
					activePeopleMask.length === 0 || activePeopleMask[index] ? 1 : MUTE_OPACITY;
			});
		}
	}
</script>

<div class="fixed -z-10 h-screen w-full bg-gray-900">
	<canvas
		class="h-full w-full {activePeopleMask.length === 0 ? 'opacity-60' : ''}"
		bind:this={canvas}
	/>
</div>
