<script lang="ts">
	import type { Speaker } from '../_data/content';
	import Quote from '../_quote.svelte';
	import ReferenceLink from './reference-link.svelte';

	export let date: Date;
	export let quote: string;
	export let note: string;
	export let speaker: Speaker;
	export let reference: string;
</script>

<div class="text-center space-y-6">
	<div class="relative">
		<Quote class="absolute text-gray-200 w-12 transform rotate-180 -translate-y-full" />
		<Quote class="absolute text-gray-200 w-12 transform right-0 bottom-0 translate-y-full" />
		<p class="text-lg p-2 md:p-4">{@html quote} <span>({note})</span></p>
	</div>

	<div class="flex flex-col space-y-1">
		<img
			class="w-24 mx-auto rounded-full object-cover"
			src="https://via.placeholder.com/150"
			alt={speaker.name}
		/>
		<p class="font-bold">{speaker.name}</p>
		<p class="italic">{speaker.position}</p>
		<ReferenceLink class="mx-auto" {date} {reference} />
	</div>
</div>
