<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{@render children?.()}

<style lang="postcss">
	:global(body) {
		@apply font-body;
	}
</style>
