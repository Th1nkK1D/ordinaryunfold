<script>
	import smoothscroll from 'smoothscroll-polyfill';
	import { onMount } from 'svelte';

	import '../app.css';

	onMount(() => smoothscroll.polyfill());
</script>

<slot />

<style>
	:global(body) {
		@apply font-body;
	}
</style>
