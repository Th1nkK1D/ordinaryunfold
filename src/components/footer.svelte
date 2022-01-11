<script>
	import ExternalLink from './external-link.svelte';
</script>

<footer class="text-sm {$$props.class || ''}">
	<p>
		Follow us on <ExternalLink href="https://www.facebook.com/ordinaryunfold" class="underline"
			>Facebook</ExternalLink
		>
		- Crafted with &lt;3 by
		<ExternalLink href="https://th1nkk1d.xyz" class="underline">Th1nkK1D</ExternalLink>
	</p>
	<p>
		Code is
		<ExternalLink href="https://github.com/Th1nkK1D/ordinaryunfold" class="underline"
			>open source</ExternalLink
		>
		under
		<ExternalLink href="https://github.com/Th1nkK1D/ordinaryunfold/blob/main/LICENSE"
			>MIT license</ExternalLink
		>. Data and content are licensed under
		<ExternalLink href="https://creativecommons.org/licenses/by/4.0/">CC-BY-4.0</ExternalLink>
	</p>
</footer>
