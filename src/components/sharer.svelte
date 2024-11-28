<script lang="ts">
	import ExternalLink from './external-link.svelte';

	interface Props {
		url: string;
		linkClass?: string;
		class?: string;
	}

	let { url, linkClass = 'text-sky-400 hover:text-sky-700', ...props }: Props = $props();

	let encodedUrl = $derived(encodeURI(url));
</script>

<div class="flex flex-row space-x-4 md:space-x-6 {props.class || ''}">
	<ExternalLink
		href="http://www.facebook.com/sharer/sharer.php?u={encodedUrl}"
		ariaLabel="Share to Facebook"
		class={linkClass}
	>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg
		>
	</ExternalLink>
	<ExternalLink
		href="https://twitter.com/intent/tweet?url={encodedUrl}"
		ariaLabel="Share to Twitter"
		class={linkClass}
	>
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path
				d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
			/></svg
		>
	</ExternalLink>
</div>

<style lang="postcss">
	svg {
		@apply h-6 md:h-8;
	}
</style>
