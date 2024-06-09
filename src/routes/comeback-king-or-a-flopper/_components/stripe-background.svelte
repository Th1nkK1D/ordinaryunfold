<script lang="ts">
	import { onMount } from 'svelte';
	import { spring, type SpringOpts } from 'svelte/motion';

	const UPDATE_MS = 3000;

	const sptringConfig: SpringOpts = {
		stiffness: 0.01,
		damping: 1
	};

	let greenSize = spring(0, sptringConfig);
	let redSize = spring(0, sptringConfig);

	onMount(() => {
		randomStripeSizes();

		const interval = setInterval(() => {
			randomStripeSizes();
		}, UPDATE_MS);

		return () => clearInterval(interval);
	});

	function randomStripeSizes() {
		const green = randomInt(100);
		greenSize.set(green);
		redSize.set(randomInt(100 - green));
	}

	function randomInt(max: number) {
		return Math.floor(Math.random() * max);
	}
</script>

<div class="flex flex-row bg-black {$$restProps.class}">
	<div class="bg-green-600 opacity-30" style="width: {$greenSize}%;"></div>
	<div class="flex-1 bg-blue-500 opacity-30"></div>
	<div class="bg-red-400 opacity-30" style="width: {$redSize}%;"></div>
</div>
