<script lang="ts">
	const SITE_NAME = 'OrdinaryUnfold';
	const BASE_URL = 'https://www.ordinaryunfold.com';

	export let title: string;
	export let description: string = 'Bite-size visualization and storytelling experiments';
	export let image: string = '/og.png';
	export let path: string = '';
</script>

<svelte:head>
	<title>{title ? `${title} - ${SITE_NAME}` : SITE_NAME}</title>
	<meta name="description" content={description} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{BASE_URL}{path}" />
	<meta property="og:title" content={title || SITE_NAME} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content="{BASE_URL}{image}" />
</svelte:head>
