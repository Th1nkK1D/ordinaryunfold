<script lang="ts">
	interface Props {
		onclick: () => unknown;
		children?: import('svelte').Snippet;
		class?: string;
	}

	let { children, onclick, class: className }: Props = $props();
</script>

<button {onclick} class="rounded-sm px-5 py-3 font-bold hover:brightness-110 {className}"
	>{@render children?.()}</button
>
