<script>
	import 'virtual:windi.css';
	import smoothscroll from 'smoothscroll-polyfill';
	import { onMount } from 'svelte';

	onMount(() => smoothscroll.polyfill());

</script>

<slot />

<style>
	:global(body) {
		@apply font-body;
	}

</style>
