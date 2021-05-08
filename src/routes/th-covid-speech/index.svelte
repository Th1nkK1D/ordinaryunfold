<script>
	import Content from './_content.svelte';
</script>

<svelte:head>
	<title>Thai Government COVID19 Speeches - OrdinaryUnfold</title>
</svelte:head>

<div class="flex flex-col md:flex-row w-screen h-screen">
	<div class="-sm:h-72 md:flex-1 bg-blue-gray-900 flex flex-col">
		<div class="flex p-4 -sm:(justify-center p-3)">
			<a href="/"><img src="logo-white.png" alt="OrdinaryUnfold" class="h-6 md:h-8" /></a>
		</div>
		<div class="flex-1">Chart</div>
	</div>
	<div class="w-full max-w-2xl">
		<Content />
	</div>
</div>
