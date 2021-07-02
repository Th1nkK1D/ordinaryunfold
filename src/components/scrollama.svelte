<script lang="ts">
	import 'intersection-observer';
	import scrollama from 'scrollama';
	import { createEventDispatcher, onMount, onDestroy } from 'svelte';

	const dispatch = createEventDispatcher();

	let container: HTMLElement;
	let scroller = scrollama();

	onMount(() => {
		scroller
			.setup({
				step: Array.from(container.children) as HTMLElement[]
			})
			.onStepEnter((event) => dispatch('stepenter', event));
	});

	onDestroy(scroller.destroy);
</script>

<svelte:window on:resize={scroller.resize} />

<div bind:this={container} class={$$props.class || ''}>
	<slot />
</div>
