<script lang="ts" context="module">
	export interface Option {
		key: string;
		name: string;
		colors?: string[];
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let placeholder = '';
	export let options: Option[];
	export let selectedOption: string = '';

	const dispatch = createEventDispatcher();
</script>

<select
	bind:value={selectedOption}
	class="inline border-b-2 border-solid border-gray-200 bg-white font-bold"
	style="color: {selectedOption
		? options.find(({ key }) => key === selectedOption)?.colors?.[3]
		: '#9E9E9E'}"
	{placeholder}
	on:change={() => dispatch('select', selectedOption)}
>
	{#if placeholder}
		<option value="" class="hidden">{placeholder}</option>
	{/if}
	{#each options as { key, name, colors }}
		<option value={key} class="text-lg font-normal" style="color: {colors?.[3] || 'black'}"
			>{name}</option
		>
	{/each}
</select>
