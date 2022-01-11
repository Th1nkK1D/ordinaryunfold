<script lang="ts">
	export let href: string;
</script>

<a {href} rel="noreferrer noopener" target="_blank" class={$$props.class || ''}><slot /></a>
