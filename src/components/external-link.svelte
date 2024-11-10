<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		href: string;
		children?: Snippet;
		ariaLabel?: string;
		class?: string;
	}

	let { href, ariaLabel = undefined, children, class: className = '' }: Props = $props();
</script>

<a {href} rel="noreferrer noopener" target="_blank" aria-label={ariaLabel} class={className}>
	{@render children?.()}
</a>
