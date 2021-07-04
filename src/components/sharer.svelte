<script lang="ts">
	export let url: string;
	export let linkClass: string = 'text-light-blue-400 hover:text-light-blue-700';

	$: encodedUrl = encodeURI(url);
</script>

<div class="flex flex-row space-x-4 md:space-x-6 {$$props.class || ''}">
	<a
		href="http://www.facebook.com/sharer/sharer.php?u={encodedUrl}"
		target="_black"
		rel="noreferrer noopener"
		aria-label="Share to Facebook"
		class={linkClass}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
			><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg
		>
	</a>
	<a
		href="https://twitter.com/intent/tweet?url={encodedUrl}"
		target="_black"
		rel="noreferrer noopener"
		aria-label="Share to Twitter"
		class={linkClass}
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
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
	</a>
</div>

<style>
	svg {
		@apply h-6 md:h-8;
	}
</style>
