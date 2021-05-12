<script lang="ts">
	import type { Speaker } from '../_data/content';
	import Quote from '../_quote.svelte';
	import ReferenceLink from './reference-link.svelte';

	export let quote: string;
	export let note: string;
	export let speaker: Speaker;
	export let reference: string;
</script>

<div class="text-center space-y-6">
	<div class="relative">
		<Quote class="absolute text-blue-200 w-12 transform rotate-180 -translate-y-full" />
		<Quote class="absolute text-blue-200 w-12 transform right-0 bottom-0 translate-y-full" />
		<div class="p-2 md:p-4 space-y-2">
			<p class="text-lg">
				{@html quote}
				<ReferenceLink {reference} />
			</p>
			{#if note}
				<p class="text-sm text-gray-500">({note})</p>
			{/if}
		</div>
	</div>

	<div class="flex flex-col space-y-1">
		<img
			class="w-24 mx-auto rounded-full object-cover"
			src="/th-covid-speech/speakers/{speaker.id}.jpeg"
			alt={speaker.name}
		/>
		<p class="font-bold">{speaker.name}</p>
		<p class="italic">{speaker.position}</p>
	</div>
</div>
