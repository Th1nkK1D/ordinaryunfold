<script lang="ts">
	import 'intersection-observer';
	import scrollama from 'scrollama';
	import { type Snippet } from 'svelte';
	interface Props {
		children?: Snippet;
		class?: string;
		onstepenter?: (res: scrollama.CallbackResponse) => unknown;
	}

	let { children, class: className = '', onstepenter = () => {} }: Props = $props();

	let container: HTMLElement;
	let scroller = scrollama();

	$effect(() => {
		scroller
			.setup({
				step: Array.from(container.children) as HTMLElement[]
			})
			.onStepEnter(onstepenter);

		return scroller.destroy;
	});
</script>

<svelte:window onresize={scroller.resize} />

<div bind:this={container} class={className}>
	{@render children?.()}
</div>
