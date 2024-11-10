<script lang="ts">
	import ReferenceLink from './reference-link.svelte';

	interface Props {
		content: string;
		source: string;
		url: string;
	}

	let { content, source, url }: Props = $props();
</script>

<div class="flex flex-row space-x-2 rounded-lg bg-sky-50 p-4 md:p-6">
	<div>
		<svg viewBox="0 0 24 24" class="w-8 fill-sky-600">
			<path d="M0 0h24v24H0V0z" fill="none" />
			<path
				d="M15.73 3H8.27L3 8.27v7.46L8.27 21h7.46L21 15.73V8.27L15.73 3zM19 14.9L14.9 19H9.1L5 14.9V9.1L9.1 5h5.8L19 9.1v5.8z"
			/>
			<circle cx="12" cy="16" r="1" /><path d="M11 7h2v7h-2z" />
		</svg>
	</div>

	<p class="flex-1">{content} <ReferenceLink {source} {url} /></p>
</div>
