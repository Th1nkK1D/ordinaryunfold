<script lang="ts">
	import Logo from '../../components/logo.svelte';
	import { movies } from '../../data/movies-wrapped-2025/parse-movies';

	const totalMinutes = movies.reduce((sum, { duration }) => sum + duration, 0);
</script>

<section>
	<Logo />
	<div class="flex flex-col items-center gap-8 font-bold">
		<h1 class="flex flex-col items-center leading-none">
			<span class="text-2xl">In 2025, I watched</span>
			<span class="mt-8 font-rampart text-[10rem]">{movies.length}</span>
			<span class="mt-2 font-rampart text-5xl">movies</span>
		</h1>
		<span class="text-2xl">which is</span>
		<span class="font-rampart text-5xl">{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m</span>
		<span class="text-center text-2xl">of time I spent <br /> in the cinema</span>
	</div>
	<p class="flex flex-col items-center gap-3">
		Follow me below to unwrap
		<svg class="w-3" viewBox="0 0 15 21">
			<path
				d="M6.65686 20.7071C7.04738 21.0976 7.68055 21.0976 8.07107 20.7071L14.435 14.3431C14.8256 13.9526 14.8256 13.3195 14.435 12.9289C14.0445 12.5384 13.4113 12.5384 13.0208 12.9289L7.36397 18.5858L1.70711 12.9289C1.31659 12.5384 0.683424 12.5384 0.2929 12.9289C-0.0976249 13.3195 -0.0976249 13.9526 0.292899 14.3431L6.65686 20.7071ZM7.36397 0L6.36397 -4.37114e-08L6.36397 20L7.36397 20L8.36397 20L8.36397 4.37114e-08L7.36397 0Z"
				fill="white"
			/>
		</svg>
	</p>
</section>
<section>coming soon</section>

<style lang="postcss">
	@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&family=Rampart+One&display=swap');

	:global(html) {
		@apply snap-y snap-mandatory scroll-smooth;
	}

	:global(body) {
		@apply snap-y snap-mandatory bg-black font-raleway text-white;
	}

	section {
		@apply mx-auto flex h-lvh w-full max-w-screen-sm snap-start flex-col items-center justify-around p-3;
	}
</style>
