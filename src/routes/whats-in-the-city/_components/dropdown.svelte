<script lang="ts" context="module">
	export interface Option {
		key: string;
		name: string;
	}
</script>

<script lang="ts">
	export let placeholder = '';
	export let options: Option[];
	export let selectedOption: string = '';
</script>

<select bind:value={selectedOption} class="inline-block" {placeholder}>
	{#if placeholder}
		<option value="" class="hidden">{placeholder}</option>
	{/if}
	{#each options as { key, name }}
		<option value={key}>{name}</option>
	{/each}
</select>
