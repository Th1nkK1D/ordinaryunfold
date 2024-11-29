<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="mx-auto flex max-w-screen-md flex-row" style="font-family: 'Libre Baskerville', serif;">
	<span>&ldquo;</span>
	<div class="italic text-neutral-600">{@render children?.()}</div>
	<span class="self-end">&bdquo;</span>
</div>

<style lang="postcss">
	span {
		@apply text-6xl text-neutral-400;
	}
</style>
