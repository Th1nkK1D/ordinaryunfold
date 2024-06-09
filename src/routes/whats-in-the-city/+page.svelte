<script lang="ts">
	import type { GeoPermissibleObjects } from 'd3-geo';
	import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import Logo from '../../components/logo.svelte';
	import Dropdown from './_components/dropdown.svelte';
	import Map from './_components/map.svelte';
	import type { Location } from './_components/map.svelte';
	import categories from '../../data/whats-in-the-city/categories.json';
	import cities from '../../data/whats-in-the-city/cities.json';
	import Legend from './_components/legend.svelte';
	import Metadata from '../../components/metadata.svelte';
	import Spinner from '../../components/spinner.svelte';
	import Statistics from './_components/statistics.svelte';
	import Comparison from './_components/comparison.svelte';
	import Footer from '../../components/footer.svelte';
	import ExternalLink from '../../components/external-link.svelte';
	import Sharer from '../../components/sharer.svelte';

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
		locations = (await fetchJson(`${city}-${category}.json`)) as Location[];
	};

	onMount(() => {
		loadCityJson('bangkok');
		pendingTask--;
	});

	$: colors = categories.find(({ key }) => key === selectedCategory)?.colors as string[];
</script>

<Metadata
	title="What's in the city?"
	description="What kind of place does Thailand flavor in the different cities?"
	path="/whats-in-the-city/"
	image="/whats-in-the-city/og.png"
/>

<div class="relative mx-auto flex h-screen w-full max-w-screen-2xl flex-col space-y-1 p-3 md:p-14">
	<div class="flex justify-center md:justify-normal">
		<Logo dark />
	</div>
	<div class="flex flex-1 flex-col-reverse md:flex-row md:space-x-12">
		<div class="md:w-sm my-6 space-y-4 text-center md:my-0 md:mt-48 md:space-y-8 md:text-left">
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
		<div class="relative flex flex-1 flex-col items-center">
			{#if pendingTask > 0}
				<div
					class="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-50"
					transition:fade|global
				>
					<Spinner />
				</div>
			{/if}
			<Map {map} {locations} {colors} />
			<Legend {colors} />
		</div>
	</div>
	<svg
		viewBox="0 0 24 24"
		class="absolute bottom-2 left-1/2 h-6 w-6 -translate-x-1/2 transform text-gray-300"
		fill="currentColor"
		><path d="M24 24H0V0h24v24z" fill="none" /><path
			d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"
		/></svg
	>
</div>

<div class="space-y-24 overflow-x-auto bg-gray-100 px-3 py-20 md:px-16 md:py-32">
	<Comparison />
</div>

<div class="mx-auto max-w-2xl space-y-16 px-3 py-20 md:px-16 md:py-32">
	<div class="space-y-2">
		<h3 class="font-bold">DISCLAIMER</h3>
		<p>
			The places data is not officially provided by the public sector. Even though Thailand is
			considered to be a single-metropolitan-growth country in which sub-urban provinces are
			expected to have less development, some locations might be missing or mislabeled. Please
			expect some level of error in data accuracy.
		</p>
	</div>

	<div class="flex items-center justify-center space-x-4">
		<span class="text-xs">Share</span>
		<Sharer
			url="https://www.ordinaryunfold.com/whats-in-the-city/"
			linkClass="text-blue-400 hover:text-blue-600"
		/>
	</div>
</div>

<div class="space-y-4 bg-gray-100 px-3 py-20 md:px-16 md:py-32">
	<div
		class="mx-auto flex max-w-screen-xl flex-col space-y-16 lg:flex-row lg:items-end lg:space-y-0"
	>
		<div class="space-y-2">
			<h2 class="text-2xl font-bold">Data Sources</h2>

			<ul class="space-y-1">
				<li>
					Places data from <ExternalLink
						href="https://map.longdo.com/"
						class="text-sky-700 hover:underline">Longdo Map API</ExternalLink
					> (Latest query on 9/1/2022)
				</li>
				<li>
					GeoJSON shapefiles from <ExternalLink
						href="https://github.com/cvibhagool/thailand-map/"
						class="text-sky-700 hover:underline">cvibhagool/thailand-map</ExternalLink
					>
				</li>
				<li>
					Population data from <ExternalLink
						href="https://opendata.data.go.th/dataset/statbyyear"
						class="text-sky-700 hover:underline"
						>Open Government Data of Thailand
					</ExternalLink>
				</li>
				<li>
					City's area from <ExternalLink
						href="https://th.wikipedia.org/wiki/จังหวัดของประเทศไทย"
						class="text-sky-700 hover:underline"
						>Wikipedia Thailand
					</ExternalLink>
				</li>
			</ul>
		</div>
		<Footer class="flex-1 lg:text-right" />
	</div>
</div>
