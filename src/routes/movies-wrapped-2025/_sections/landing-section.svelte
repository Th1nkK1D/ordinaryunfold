<script lang="ts">
	import Logo from '../../../components/logo.svelte';
	import type { Movie } from '../../../data/movies-wrapped-2025/parse-movies';

	const { movies }: { movies: Movie[] } = $props();

	const totalMinutes = $derived(movies.reduce((sum, { duration }) => sum + duration, 0));
</script>

<section class="content-container justify-around gap-0">
	<Logo dark />
	<div class="flex flex-col items-center gap-8">
		<h1 class="flex flex-col items-center leading-none">
			<span class="text-2xl font-bold">In 2025, I watched</span>
			<span class="mt-8 font-rampart text-[10rem]">{movies.length}</span>
			<span class="mt-2 font-rampart text-5xl">movies</span>
		</h1>
		<span class="text-2xl font-bold">which is</span>
		<span class="font-rampart text-5xl">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</span>
		<span class="text-center text-2xl font-bold">of time I spent <br /> in the cinema</span>
	</div>
	<button class="flex flex-col items-center gap-3" onclick={() => scrollBy(0, window.innerHeight)}>
		Follow me below to unwrap
		<svg class="w-3" viewBox="0 0 15 21">
			<path
				d="M6.65686 20.7071C7.04738 21.0976 7.68055 21.0976 8.07107 20.7071L14.435 14.3431C14.8256 13.9526 14.8256 13.3195 14.435 12.9289C14.0445 12.5384 13.4113 12.5384 13.0208 12.9289L7.36397 18.5858L1.70711 12.9289C1.31659 12.5384 0.683424 12.5384 0.2929 12.9289C-0.0976249 13.3195 -0.0976249 13.9526 0.292899 14.3431L6.65686 20.7071ZM7.36397 0L6.36397 -4.37114e-08L6.36397 20L7.36397 20L8.36397 20L8.36397 4.37114e-08L7.36397 0Z"
				fill="currentColor"
			/>
		</svg>
	</button>
</section>
