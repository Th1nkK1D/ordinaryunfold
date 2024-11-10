<script lang="ts">
	import { createBubbler } from 'svelte/legacy';

	const bubble = createBubbler();
	interface Props {
		heading: string;
		subtitle?: string;
		body?: string;
		state?: 'selected' | 'corrected' | 'incorrected' | 'revealed' | null;
		disabled?: boolean;
		link?: string;
		class?: String;
		style?: string;
		onclick?: () => unknown;
	}

	let {
		heading,
		subtitle = '',
		body = '',
		state = null,
		disabled = false,
		link = '',
		class: className,
		style,
		onclick
	}: Props = $props();
</script>

<button
	{onclick}
	{disabled}
	class="flex max-w-lg flex-col overflow-hidden rounded border-[3px] bg-white p-3 text-left text-black shadow-lg transition-all md:p-4 {disabled
		? ''
		: 'hover:shadow-xl'} {state === 'selected'
		? 'border-blue-600'
		: state === 'corrected'
			? 'border-green-600'
			: state === 'incorrected'
				? 'border-red-500'
				: 'border-white'} {className}"
	{style}
>
	<div class="flex w-full flex-row items-start justify-between">
		<h3 class="font-charmonman text-2xl font-bold md:text-3xl">
			{heading}
			{#if link}
				<a href={link} target="_blank" rel="noopener noreferrer" aria-label="เลือก">
					<svg class="inline w-6 fill-slate-500 hover:fill-blue-700" viewBox="0 0 24 24"
						><path
							d="M5 4v6.333v-.025V20zv4zm2.5 9.5h3.596q.148-.287.32-.527q.17-.24.365-.473H7.5zm0 4h2.887q-.049-.25-.067-.5t-.007-.5H7.5zM5.616 21q-.691 0-1.153-.462T4 19.385V4.615q0-.69.463-1.152T5.616 3H13.5L18 7.5v3.02q-.244-.086-.494-.121T17 10.333V8h-4V4H5.616q-.231 0-.424.192T5 4.615v14.77q0 .23.192.423t.423.192h5.776q.188.292.418.536q.232.243.485.464zM16.5 19.308q1.185 0 1.996-.812q.812-.811.812-1.996t-.812-1.996t-1.996-.812t-1.996.812t-.812 1.996t.812 1.996t1.996.812m5.1 2.98l-2.777-2.776q-.487.388-1.08.592t-1.243.204q-1.586 0-2.697-1.111t-1.11-2.697t1.11-2.697t2.697-1.11t2.697 1.11t1.11 2.697q0 .65-.203 1.243t-.593 1.08L22.29 21.6z"
						/></svg
					>
				</a>
			{/if}
		</h3>
		<svg class="w-8" viewBox="0 0 24 24">
			{#if state}
				{#if state === 'selected' || state === 'corrected'}
					<path
						class="transition-colors {state === 'selected' ? 'fill-blue-600' : 'fill-green-600'}"
						d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
					/>
				{:else if state === 'incorrected'}
					<path
						class="origin-center rotate-45 fill-red-500"
						d="M11 17h2v-4h4v-2h-4V7h-2v4H7v2h4zm1 5q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
					/>
				{:else}
					<path
						class="fill-amber-500"
						d="M12 2C6.47 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m4 13.44c0 .34-.22.56-.56.56H8.56c-.34 0-.56-.22-.56-.56V15h8zM16 14H8L7 8l3 2l2-3l2 3l3-2z"
					/>
				{/if}
			{/if}
		</svg>
	</div>
	<h4 class="text-gray-500">{subtitle}</h4>
	<p class="mt-3">{body}</p>
</button>
