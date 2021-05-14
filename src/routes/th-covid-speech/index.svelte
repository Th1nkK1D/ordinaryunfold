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
	import Metadata from '../../components/metadata.svelte';
	import Chart from './_chart/chart.svelte';
	import Content from './_content/content.svelte';
	import { contentBlocks } from './_data/content';

	export let dailyNewCases: DailyNewCase[];

	let activeContentId: number;
	let scrollToSpeech: (id: number) => void;

</script>

<Metadata
	title="วิวาทะโควิด 19"
	description="ใคร ได้พูดอะไร ในแต่ละช่วงของวิกฤติกาล"
	path="/th-covid-speech"
	image="/th-covid-speech/og.png"
/>

<div class="relative flex flex-col lg:flex-row h-screen">
	<div class="bg-blue-gray-900 lg:flex-1 -lg:h-32vh">
		<Chart
			{dailyNewCases}
			{contentBlocks}
			bind:activeContentId
			on:selectspeech={({ detail: id }) => scrollToSpeech(id)}
		/>
	</div>

	<Content {contentBlocks} bind:activeContentId bind:scrollToSpeech />
</div>
