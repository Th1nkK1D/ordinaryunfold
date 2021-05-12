<script lang="ts" context="module">
	interface CovidData {
		Confirmed: number;
		Date: string;
		Deaths: number;
		Hospitalized: number;
		NewConfirmed: number;
		NewDeaths: number;
		NewHospitalized: number;
		NewRecovered: number;
		Recovered: number;
	}

	interface CovidResponse {
		Data: CovidData[];
		DevBy: string;
		SeverBy: string;
		Source: string;
		UpdateDate: string;
	}

	export interface DailyNewCase {
		date: Date;
		count: number;
	}

	export async function load({ fetch }) {
		const res = await fetch('https://covid19.th-stat.com/api/open/timeline');

		if (res.ok) {
			const { Data } = (await res.json()) as CovidResponse;

			const dailyNewCases: DailyNewCase[] = Data.map(({ Date: date, NewConfirmed }) => ({
				date: new Date(date),
				count: NewConfirmed
			}));

			return {
				props: {
					dailyNewCases
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load Covid API`)
		};
	}
</script>

<script lang="ts">
	import Chart from './_chart/chart.svelte';
	import Content from './_content/content.svelte';
	import { contentBlocks } from './_data/content';

	export let dailyNewCases: DailyNewCase[];

	let activeContentId: number;
	let scrollToSpeech: (id: number) => void;
</script>

<svelte:head>
	<title>สุนทรพจน์โควิด 19 - OrdinaryUnfold</title>
	<meta name="description" content="ย้อนดูแต่ละช่วงของวิกฤติกาล ว่ารัฐบาลไทยได้พูดอะไรไว้บ้าง?" />
</svelte:head>

<div class="relative flex flex-col lg:flex-row min-h-screen">
	<div class="h-180px bg-blue-gray-900 flex flex-col sticky top-0 z-10 md:(flex-1 h-screen)">
		<div class="flex p-4 -md:(justify-center p-3)">
			<a href="/"><img src="/logo-white.png" alt="OrdinaryUnfold" class="h-6 md:h-8" /></a>
		</div>
		<div class="relative flex-1">
			<Chart
				{dailyNewCases}
				{contentBlocks}
				bind:activeContentId
				on:selectspeech={({ detail: id }) => scrollToSpeech(id)}
			/>
		</div>
	</div>
	<div class="w-full max-w-2xl">
		<Content {contentBlocks} bind:activeContentId bind:scrollToSpeech />
	</div>
</div>
