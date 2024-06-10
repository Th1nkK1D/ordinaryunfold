<script lang="ts">
	import Metadata from '../../components/metadata.svelte';
	import Chart from './_chart/chart.svelte';
	import Content from './_content/content.svelte';

	let activeContentId: number;
	let scrollToSpeech: (id: number) => void;
</script>

<Metadata
	title="วิวาทะโควิด 19"
	description="ใคร ได้พูดอะไร ในแต่ละช่วงของวิกฤติกาล"
	path="/th-covid-speech/"
	image="/th-covid-speech/og2.png"
/>

<div class="relative flex h-dvh flex-col lg:flex-row">
	<div class="h-[32vh] bg-gray-900 lg:h-auto lg:flex-1">
		<Chart bind:activeContentId on:selectspeech={({ detail: id }) => scrollToSpeech(id)} />
	</div>

	<Content bind:activeContentId bind:scrollToSpeech />
</div>
