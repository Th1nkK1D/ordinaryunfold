<script lang="ts">
	interface Props {
		dark?: boolean;
		class?: string;
	}

	let { dark = false, class: className = '' }: Props = $props();
</script>

<a href="/"
	><img
		src="/logo-{dark ? 'dark' : 'light'}.png"
		alt="OrdinaryUnfold"
		class="h-6 md:h-8 {className}"
	/></a
>
