<script lang="ts">
	import ReferenceLink from './reference-link.svelte';

	export let date: Date;
	export let content: string;
	export let reference: string;
</script>

<div class="rounded-lg p-4 md:p-6 space-y-2 bg-blue-50 flex flex-col">
	<div>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="fill-blue-300 w-8">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path
				d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"
			/>
			<circle cx="12" cy="16" r="1" /><path d="M11 7h2v7h-2z" />
		</svg>
	</div>

	<p>{content}</p>

	<div class="flex flex-row justify-end">
		<ReferenceLink {date} {reference} />
	</div>
</div>
