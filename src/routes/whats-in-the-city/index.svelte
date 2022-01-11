<script lang="ts">
	import type { GeoPermissibleObjects } from 'd3-geo';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Logo from '../../components/logo.svelte';
	import Dropdown from './_components/dropdown.svelte';
	import Map, { Location } from './_components/map.svelte';
	import categories from '../../data/whats-in-the-city/categories.json';
	import cities from '../../data/whats-in-the-city/cities.json';
	import Legend from './_components/legend.svelte';
	import Metadata from '../../components/metadata.svelte';
	import Spinner from './_components/spinner.svelte';
	import Statistics from './_components/statistics.svelte';
	import Comparison from './_components/comparison.svelte';
	import Footer from '../../components/footer.svelte';
	import ExternalLink from '../../components/external-link.svelte';

	const RESOURCES_PATH = '/whats-in-the-city/json';

	let pendingTask = 1;
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

	onMount(() => {
		loadCityJson('bangkok');
		pendingTask--;
	});

	$: colors = categories.find(({ key }) => key === selectedCategory)?.colors;
</script>

<Metadata
	title="What's in the city?"
	description="What kind of place does Thailand flavor?"
	path="/whats-in-the-city/"
	image="/whats-in-the-city/og.png"
/>

<div class="flex flex-col w-full h-screen max-w-screen-2xl mx-auto p-3 md:p-16 space-y-1">
	<div class="flex -md:justify-center">
		<Logo dark />
	</div>
	<div class="flex flex-col-reverse md:(flex-row space-x-12) flex-1">
		<div class="space-y-4 md:(space-y-8 w-sm mt-48) -md:(text-center my-6)">
			<div class="font-head font-bold md:space-y-2">
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
						on:select={({ detail }) => {
							loadCityJson(detail);
							if (selectedCategory) loadCategoryJson(detail, selectedCategory);
						}}
					/>
				</h2>
			</div>

			<Statistics {selectedCity} locationCount={locations.length} />
		</div>
		<div class="flex-1 flex flex-col relative items-center">
			{#if pendingTask > 0}
				<div
					class="z-10 absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center"
					transition:fade
				>
					<Spinner />
				</div>
			{/if}
			<Map {map} {locations} {colors} />
			<Legend {colors} />
		</div>
	</div>
</div>

<div class="px-3 py-20 md:(px-16 py-32) bg-gray-100 overflow-x-auto">
	<Comparison />
</div>

<div class="px-3 py-12 md:(px-16 py-24) space-y-4">
	<h2 class="text-2xl font-bold">Data Sources</h2>
	<div class="flex flex-col lg:(flex-row items-end) -lg:space-y-16">
		<ul class="space-y-1">
			<li>
				Places data from <ExternalLink href="https://map.longdo.com/" class="underline"
					>Longdo Map API</ExternalLink
				> (Latest queried on 9/1/2022)
			</li>
			<li>
				GeoJSON shapefiles from <ExternalLink
					href="https://github.com/cvibhagool/thailand-map/"
					class="underline">cvibhagool/thailand-map</ExternalLink
				>
			</li>
			<li>
				Population data from <ExternalLink
					href="https://opendata.data.go.th/dataset/statbyyear"
					class="underline"
					>Open Government Data of Thailand
				</ExternalLink>
			</li>
			<li>
				City's area from <ExternalLink
					href="https://th.wikipedia.org/wiki/จังหวัดของประเทศไทย"
					class="underline"
					>Wikipedia Thailand
				</ExternalLink>
			</li>
		</ul>
		<Footer class="flex-1 text-center lg:text-right" />
	</div>
</div>
