<script lang="ts">
	import { slide, type SlideParams } from 'svelte/transition';

	interface Props {
		number: number;
		title: string;
		subtitle?: string;
		onclick?: () => void;
		selected?: boolean;
	}

	const { number, title, subtitle, onclick, selected }: Props = $props();

	const slideConfig: SlideParams = { axis: 'x', delay: 800 };
</script>

<button
	disabled={!onclick}
	class="flex w-full flex-row items-center justify-center border-2 border-black p-4 transition-colors {selected
		? 'bg-black text-white'
		: 'bg-white'}"
	{onclick}
>
	{#if number && !onclick}
		<span transition:slide={slideConfig} class="w-4 text-right text-xl font-bold">{number}.</span>
	{/if}
	<span class="text-xl font-bold">{title}</span>
	{#if !onclick}
		<span transition:slide={slideConfig} class="w-full whitespace-nowrap text-right font-normal"
			>{subtitle}</span
		>
	{/if}
</button>
