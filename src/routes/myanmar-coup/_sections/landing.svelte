<script lang="ts">
	import { onMount } from 'svelte';
	import { tweened } from 'svelte/motion';
	import { quartInOut } from 'svelte/easing';

	import Sharer from '../../../components/sharer.svelte';
	import Logo from '../../../components/logo.svelte';
	import fetalities from '../../../data/myanmar-coup/recent-fatality.csv';

	const count = tweened(0, {
		duration: 3000,
		easing: quartInOut
	});

	onMount(() => {
		$count = fetalities.length;
	});
</script>

<section class="flex flex-col min-h-screen p-8 md:p-20 justify-between">
	<Logo />
	<h1 class="text-5xl md:text-9xl font-head font-bold">LOSSES IN<br />MYANMAR</h1>
	<div class="font-head md:space-y-2">
		<p class="text-2xl md:text-5xl font-bold text-yellow-500">{Math.round($count)} people</p>
		<p class="text-lg md:text-2xl">have been confirmed killed by junta coup since Febuary 2021</p>
	</div>
	<p class="italic text-sm">Last updated on 3 July 2021</p>
	<div class="flex">
		<div class="flex-1">
			<Sharer
				url="https://www.ordinaryunfold.com/myanmar-coup/"
				linkClass="text-yellow-500 hover:text-yellow-300"
			/>
		</div>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-8 md:w-12 fill-yellow-500">
			<path d="M0 0h24v24H0V0z" fill="none" /><path
				d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"
			/>
		</svg>
	</div>
</section>
