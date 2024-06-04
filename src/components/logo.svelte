<script lang="ts">
	export let dark = false;
</script>

<a href="/"
	><img
		src="/logo-{dark ? 'dark' : 'light'}.png"
		alt="OrdinaryUnfold"
		class="h-6 md:h-8 {$$restProps.class}"
	/></a
>
