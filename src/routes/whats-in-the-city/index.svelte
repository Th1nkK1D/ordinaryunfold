<script lang="ts">
	import Logo from '../../components/logo.svelte';
	import Map from './_map/map.svelte';
</script>

<div class="flex flex-col w-screen h-screen max-w-screen-2xl mx-auto p-3 md:p-16">
	<div class="flex -md:justify-center">
		<Logo dark />
	</div>
	<div class="flex flex-col-reverse md:(flex-row space-x-12) flex-1">
		<div class="font-head font-bold md:(space-y-2 w-sm mt-48) -md:(text-center my-6)">
			<h1 class="text-3xl md:text-4xl">What's in</h1>
			<h2 class="text-5xl md:text-6xl">Bangkok</h2>
		</div>
		<div class="flex-1">
			<Map />
		</div>
	</div>
</div>
