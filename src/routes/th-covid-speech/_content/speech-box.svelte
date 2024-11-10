<script lang="ts">
	import type { Speaker } from '../_data';
	import Quote from './quote.svelte';
	import ReferenceLink from './reference-link.svelte';

	interface Props {
		quote: string;
		note: string;
		speaker: Speaker;
		source: string;
		url: string;
	}

	let {
		quote,
		note,
		speaker,
		source,
		url
	}: Props = $props();
</script>

<div class="space-y-6 text-center">
	<div class="relative">
		<Quote class="-translate-y-full rotate-180 transform" />
		<Quote class="bottom-0 right-0 translate-y-full transform" />
		<div class="space-y-2 p-2 md:p-4">
			<p class="md:text-lg">
				{@html quote}
				<ReferenceLink {source} {url} />
			</p>
			{#if note}
				<p class="text-sm text-gray-500">({note})</p>
			{/if}
		</div>
	</div>

	<div class="flex flex-col space-y-1 text-sm md:text-base">
		<img
			class="mx-auto w-24 rounded-full object-cover"
			src="/th-covid-speech/speakers/{speaker.id}.webp"
			alt={speaker.name}
		/>
		<p class="font-bold">{speaker.name}</p>
		<p class="italic">{speaker.position}</p>
	</div>
</div>
