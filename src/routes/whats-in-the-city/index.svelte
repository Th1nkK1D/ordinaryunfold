<script lang="ts">
	import Logo from '../../components/logo.svelte';
	import Map from './_map/map.svelte';
</script>

<div class="flex flex-col w-screen h-screen p-8">
	<div>
		<Logo dark />
	</div>
	<div class="flex flex-row flex-1 space-x-8">
		<div class="font-head font-bold mt-48 space-y-2">
			<h1 class="text-4xl">What's in</h1>
			<h2 class="text-6xl">Bangkok</h2>
		</div>
		<div class="flex-1">
			<Map />
		</div>
	</div>
</div>
