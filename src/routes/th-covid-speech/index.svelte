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
	import Chart from './_chart.svelte';
	import Content from './_content.svelte';

	export let dailyNewCases: DailyNewCase[];
</script>

<svelte:head>
	<title>Thai Government COVID19 Speeches - OrdinaryUnfold</title>
</svelte:head>

<div class="flex flex-col md:flex-row w-screen h-screen">
	<div class="-sm:h-72 md:flex-1 bg-blue-gray-900 flex flex-col">
		<div class="flex p-4 -sm:(justify-center p-3)">
			<a href="/"><img src="logo-white.png" alt="OrdinaryUnfold" class="h-6 md:h-8" /></a>
		</div>
		<div class="flex-1">
			<Chart {dailyNewCases} />
		</div>
	</div>
	<div class="w-full max-w-2xl">
		<Content />
	</div>
</div>
