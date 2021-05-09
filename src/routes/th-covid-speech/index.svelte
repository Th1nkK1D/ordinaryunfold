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

	export interface Speaker {
		name: string;
		position: string;
	}

	export interface Speech {
		id: number;
		date: Date;
		quote: string;
		speaker: Speaker;
		reference: string;
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
	import speechesData from './_data/speeches.csv';
	import speakers from './_data/speakers.csv';

	export let dailyNewCases: DailyNewCase[];

	let activeSpeechId: number;
	let scrollToSpeech: (id: number) => void;

	const speeches: Speech[] = speechesData
		.map(({ date, speaker, note, ...rest }, index) => ({
			id: index + 1,
			date: new Date(date),
			speaker: speakers.find(({ name }) => name === speaker),
			...rest
		}))
		.sort((a, z) => a.date.valueOf() - z.date.valueOf());
</script>

<svelte:head>
	<title>ในวิกฤติกาลโควิด 19 รัฐบาลไทยได้พูดอะไรไว้บ้าง? - OrdinaryUnfold</title>
</svelte:head>

<div class="relative flex flex-col lg:flex-row min-h-screen">
	<div class="h-200px bg-blue-gray-900 flex flex-col sticky top-0 z-10 md:(flex-1 h-screen)">
		<div class="flex p-4 -md:(justify-center p-3)">
			<a href="/"><img src="/logo-white.png" alt="OrdinaryUnfold" class="h-6 md:h-8" /></a>
		</div>
		<div class="relative flex-1">
			<Chart
				{dailyNewCases}
				{speeches}
				bind:activeSpeechId
				on:selectspeech={({ detail: id }) => scrollToSpeech(id)}
			/>
		</div>
	</div>
	<div class="w-full max-w-2xl">
		<Content {speeches} bind:activeSpeechId bind:scrollToSpeech />
	</div>
</div>
