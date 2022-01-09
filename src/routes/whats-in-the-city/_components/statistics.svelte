<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { ANIMATE_DELAY_PER_POINT, ANIMATE_DURATION } from '../_components/map.svelte';
	import cities from '../../../data/whats-in-the-city/cities.json';

	const CITY_TWEEN_DURATION = 500;

	export let selectedCity: string;
	export let locationCount: number;

	const locationTween = tweened(0);
	const populationTween = tweened(0, { duration: CITY_TWEEN_DURATION });
	const areaTween = tweened(0, { duration: CITY_TWEEN_DURATION });

	$: locationTween.set(locationCount, {
		duration: locationCount * ANIMATE_DELAY_PER_POINT + ANIMATE_DURATION
	});

	$: {
		let city = cities.find(({ key }) => key === selectedCity);

		if (city) {
			$populationTween = city.population;
			$areaTween = city.area;
		}
	}
</script>

<div class="flex flex-col space-y-2 md:space-y-6 -md:(items-center text-sm)">
	<div class="flex flex-row space-x-4 {selectedCity ? '' : 'invisible'}">
		<div class="stat">
			<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"
				><rect fill="none" height="24" width="24" /><g
					><path
						d="M12,12.75c1.63,0,3.07,0.39,4.24,0.9c1.08,0.48,1.76,1.56,1.76,2.73L18,18H6l0-1.61c0-1.18,0.68-2.26,1.76-2.73 C8.93,13.14,10.37,12.75,12,12.75z M4,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C2,12.1,2.9,13,4,13z M5.13,14.1 C4.76,14.04,4.39,14,4,14c-0.99,0-1.93,0.21-2.78,0.58C0.48,14.9,0,15.62,0,16.43V18l4.5,0v-1.61C4.5,15.56,4.73,14.78,5.13,14.1z M20,13c1.1,0,2-0.9,2-2c0-1.1-0.9-2-2-2s-2,0.9-2,2C18,12.1,18.9,13,20,13z M24,16.43c0-0.81-0.48-1.53-1.22-1.85 C21.93,14.21,20.99,14,20,14c-0.39,0-0.76,0.04-1.13,0.1c0.4,0.68,0.63,1.46,0.63,2.29V18l4.5,0V16.43z M12,6c1.66,0,3,1.34,3,3 c0,1.66-1.34,3-3,3s-3-1.34-3-3C9,7.34,10.34,6,12,6z"
					/></g
				></svg
			>
			<p>
				{Math.round($populationTween).toLocaleString()} people
			</p>
		</div>
		<div class="stat">
			<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24"
				><g><rect fill="none" height="24" width="24" /></g><g
					><g
						><path
							d="M17.66,17.66l-1.06,1.06l-0.71-0.71l1.06-1.06l-1.94-1.94l-1.06,1.06l-0.71-0.71l1.06-1.06l-1.94-1.94l-1.06,1.06 l-0.71-0.71l1.06-1.06L9.7,9.7l-1.06,1.06l-0.71-0.71l1.06-1.06L7.05,7.05L5.99,8.11L5.28,7.4l1.06-1.06L4,4v14c0,1.1,0.9,2,2,2 h14L17.66,17.66z M7,17v-5.76L12.76,17H7z"
						/></g
					></g
				></svg
			>
			<p>
				{Math.round($areaTween).toLocaleString()} km<sup>2</sup>
			</p>
		</div>
	</div>

	<div class="stat {locationCount > 0 ? '' : 'invisible'}">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
			><path d="M0 0h24v24H0z" fill="none" /><path
				d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
			/></svg
		>
		<p>{Math.round($locationTween)} locations found</p>
	</div>
</div>

<style>
	.stat {
		@apply flex flex-row space-x-1 md:space-x-2 items-center;
	}

	svg {
		@apply fill-gray-600 w-5 h-5 md:(w-6 h-6);
	}
</style>
