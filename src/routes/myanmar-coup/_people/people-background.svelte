<script lang="ts">
	import type { Person } from '../_data';
	import paper from 'paper/dist/paper-core';
	import { onMount } from 'svelte';
	import { generateAvatarSymbols } from './avatar';

	export let people: Person[];

	let avatarSymbols: paper.SymbolDefinition[];

	function randomPickIn<T>(array: T[]): T {
		return array[Math.floor(Math.random() * array.length)];
	}

	let canvas: HTMLCanvasElement;

	$: onMount(() => {
		paper.setup(canvas);

		avatarSymbols = generateAvatarSymbols();

		randomPickIn(avatarSymbols).place();
	});
</script>

<canvas class="fixed -z-1 h-screen w-full bg-true-gray-900" bind:this={canvas} />
