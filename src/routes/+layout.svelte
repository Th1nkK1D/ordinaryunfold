<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';
	interface Props {
		children?: Snippet;
	}

	let { children }: Props = $props();
</script>

{#if import.meta.env.PROD}
	<script
		defer
		src="https://cloud.umami.is/script.js"
		data-website-id="706f91c3-7ea6-4f8a-9b93-ca305820694a"
	></script>
{/if}

{@render children?.()}

<style lang="postcss">
	:global(body) {
		@apply font-body;
	}
</style>
