<script lang="ts">
	import type { GeoPermissibleObjects } from 'd3-geo';
	import { onMount } from 'svelte';
	import Logo from '../../components/logo.svelte';
	import Dropdown from './_components/dropdown.svelte';
	import Map, { Location } from './_components/map.svelte';
	import categories from '../../data/whats-in-the-city/categories.json';
	import cities from '../../data/whats-in-the-city/cities.json';

	const RESOURCES_PATH = '/whats-in-the-city/json';

	let pendingTask = 0;
	let map: GeoPermissibleObjects;
	let locations: Location[] = [];

	let selectedCategory: string = '';
	let selectedCity: string = cities[0].key;

	const fetchJson = async (path: string) => {
		pendingTask++;
		const res = await fetch(`${RESOURCES_PATH}/${path}`);
		pendingTask--;

		return res.json();
	};

	const loadCityJson = async (city: string) => {
		map = await fetchJson(`${city}-geo.json`);
	};

	const loadCategoryJson = async (city: string, category: string) => {
		locations = await fetchJson(`${city}-${category}.json`);
	};

	onMount(() => loadCityJson('bangkok'));
</script>

<div class="flex flex-col w-screen h-screen max-w-screen-2xl mx-auto p-3 md:p-16">
	<div class="flex -md:justify-center">
		<Logo dark />
	</div>
	<div class="flex flex-col-reverse md:(flex-row space-x-12) flex-1">
		<div class="font-head font-bold md:(space-y-2 w-sm mt-48) -md:(text-center my-6)">
			<h1 class="text-3xl md:text-4xl">
				<Dropdown
					options={categories}
					bind:selectedOption={selectedCategory}
					placeholder="What's"
					on:select={({ detail }) => loadCategoryJson(selectedCity, detail)}
				/> in
			</h1>
			<h2 class="text-5xl md:text-6xl">
				<Dropdown
					options={cities}
					bind:selectedOption={selectedCity}
					on:select={({ detail }) => loadCityJson(detail)}
				/>
			</h2>
		</div>
		<div class="flex-1 relative">
			{#if pendingTask > 0}
				<div class="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center">
					loading...
				</div>
			{/if}
			<Map {map} {locations} />
		</div>
	</div>
</div>
