<script>
	import 'virtual:windi.css';
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.gstatic.com" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@0,400;0,700;1,400&family=Prompt:ital,wght@0,400;0,700;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<slot />

<style>
	:global(body) {
		@apply font-body;
	}
</style>
