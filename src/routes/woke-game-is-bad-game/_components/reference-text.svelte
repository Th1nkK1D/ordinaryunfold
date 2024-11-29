<script lang="ts">
	import type { Snippet } from 'svelte';
	import ExternalLink from '../../../components/external-link.svelte';

	interface Props {
		href: string;
		children?: Snippet;
	}

	let { href, children }: Props = $props();
</script>

<ExternalLink class="text-amber-700 hover:underline" {href}>{@render children?.()}</ExternalLink>
