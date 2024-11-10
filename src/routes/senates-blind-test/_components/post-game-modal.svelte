<script lang="ts">
	import { type Snippet } from 'svelte';
	import Button from './button.svelte';
	import Sharer from '../../../components/sharer.svelte';
	interface Props {
		children?: Snippet;
		onexit: () => unknown;
	}

	let { children, onexit }: Props = $props();
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black/80 p-3">
	<div
		class="flex w-full max-w-md flex-col items-center gap-8 rounded-lg bg-white p-3 py-6 shadow-xl md:gap-10 md:py-12"
	>
		<div class="space-y-4 text-center">
			<h1 class="font-chonburi text-2xl">คุณได้คะแนน</h1>
			<p class="font-charmonman text-6xl">
				{@render children?.()}
			</p>
		</div>
		<img src="/senates-blind-test/award-giphy.webp" alt="" />
		<div class="flex flex-row items-center gap-4">
			<p class="text-sm">แชร์ให้เพื่อนเล่น</p>
			<Sharer
				url="https://ordinaryunfold.com/senates-blind-test"
				linkClass="text-blue-400 hover:text-blue-600"
			/>
		</div>
		<Button
			class="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
			onclick={onexit}>กลับสู่หน้าหลัก</Button
		>
	</div>
</div>
