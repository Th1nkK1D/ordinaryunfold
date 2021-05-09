<script lang="ts">
	import type { Speaker } from '../index.svelte';
	import Quote from './quote.svelte';

	export let date: Date;
	export let quote: string;
	export let speaker: Speaker;
	export let reference: string;
</script>

<div class="text-center space-y-6">
	<div class="relative">
		<Quote class="transform rotate-180 -translate-y-full" />
		<Quote class="transform right-0 bottom-0 translate-y-full" />
		<p class="text-lg p-4">{quote}</p>
	</div>

	<div class="flex flex-col space-y-1">
		<img
			class="w-24 mx-auto rounded-full object-cover"
			src="https://via.placeholder.com/150"
			alt={speaker.name}
		/>
		<p class="font-bold">{speaker.name}</p>
		<p class="italic">{speaker.position}</p>
		<a
			href={reference}
			target="_blank"
			rel="noreferrer noopener"
			class="text-blue-600 mx-auto flex flex-row space-x-2"
		>
			<p>{date.toLocaleDateString('TH-th', { dateStyle: 'medium' })}</p>
			<svg
				width="13"
				height="13"
				viewBox="0 0 13 13"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				class="my-auto"
			>
				<path
					d="M10.2917 10.2917H2.70833V2.70833H6.5V1.625H2.70833C2.10708 1.625 1.625 2.1125 1.625 2.70833V10.2917C1.625 10.8875 2.10708 11.375 2.70833 11.375H10.2917C10.8875 11.375 11.375 10.8875 11.375 10.2917V6.5H10.2917V10.2917ZM7.58333 1.625V2.70833H9.52792L4.20333 8.03292L4.96708 8.79667L10.2917 3.47208V5.41667H11.375V1.625H7.58333Z"
					fill="currentColor"
				/>
			</svg>
		</a>
	</div>
</div>
