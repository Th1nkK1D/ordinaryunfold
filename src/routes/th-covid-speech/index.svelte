<script lang="ts">
	import Metadata from '../../components/metadata.svelte';
	import Chart from './_chart/chart.svelte';
	import Content from './_content/content.svelte';
	import { contentBlocks } from './_data/content';

	let activeContentId: number;
	let scrollToSpeech: (id: number) => void;

</script>

<Metadata
	title="วิวาทะโควิด 19"
	description="ใคร ได้พูดอะไร ในแต่ละช่วงของวิกฤติกาล"
	path="/th-covid-speech"
	image="/th-covid-speech/og2.png"
/>

<div class="relative flex flex-col lg:flex-row h-screen">
	<div class="bg-blue-gray-900 lg:flex-1 -lg:h-32vh">
		<Chart
			{contentBlocks}
			bind:activeContentId
			on:selectspeech={({ detail: id }) => scrollToSpeech(id)}
		/>
	</div>

	<Content {contentBlocks} bind:activeContentId bind:scrollToSpeech />
</div>
