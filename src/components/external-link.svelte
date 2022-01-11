<script lang="ts">
	export let href: string;
	export let areaLabel: string = undefined;
</script>

<a
	{href}
	rel="noreferrer noopener"
	target="_blank"
	aria-label={areaLabel}
	class={$$props.class || ''}><slot /></a
>
