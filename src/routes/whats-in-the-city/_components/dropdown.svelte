<script lang="ts" module>
	export interface Option {
		key: string;
		name: string;
		colors?: string[];
	}
</script>

<script lang="ts">
	interface Props {
		placeholder?: string;
		options: Option[];
		selectedOption?: string;
		onselect: (option: string) => unknown;
	}

	let { placeholder = '', options, selectedOption = $bindable(''), onselect }: Props = $props();
</script>

<select
	bind:value={selectedOption}
	class="inline border-b-2 border-solid border-gray-200 bg-white font-bold"
	style="color: {selectedOption
		? options.find(({ key }) => key === selectedOption)?.colors?.[3]
		: '#9E9E9E'}"
	{placeholder}
	onchange={(val) => onselect(val.currentTarget.value)}
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
