<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from './button.svelte';

	const dispatch = createEventDispatcher();
</script>

<div class="fixed inset-0 flex items-center justify-center bg-black/80 p-3">
	<div
		class="flex w-full max-w-md flex-col items-center gap-4 rounded-lg bg-white p-3 py-6 shadow-xl md:gap-8 md:py-12"
	>
		<h1 class="text-2xl">คุณได้คะแนน</h1>
		<p class="font-chonburi text-5xl">
			<slot />
		</p>
		<Button
			class="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
			on:click={() => dispatch('exit')}>กลับสู่หน้าหลัก</Button
		>
	</div>
</div>
