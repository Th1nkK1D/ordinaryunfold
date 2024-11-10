<script lang="ts">
	import ExternalLink from '../../../components/external-link.svelte';

	interface Props {
		source: string;
		url: string;
		class?: string;
	}

	let { source, url, class: className = '' }: Props = $props();
</script>

<ExternalLink href={url} class="inline-flex text-sm text-sky-700 hover:underline {className}">
	- {source}
	<svg width="13" height="13" viewBox="0 0 13 13" fill="none" class="my-auto ml-1">
		<path
			d="M10.2917 10.2917H2.70833V2.70833H6.5V1.625H2.70833C2.10708 1.625 1.625 2.1125 1.625 2.70833V10.2917C1.625 10.8875 2.10708 11.375 2.70833 11.375H10.2917C10.8875 11.375 11.375 10.8875 11.375 10.2917V6.5H10.2917V10.2917ZM7.58333 1.625V2.70833H9.52792L4.20333 8.03292L4.96708 8.79667L10.2917 3.47208V5.41667H11.375V1.625H7.58333Z"
			fill="currentColor"
		/>
	</svg>
</ExternalLink>
