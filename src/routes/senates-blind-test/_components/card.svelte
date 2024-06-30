<script lang="ts">
	export let heading: string;
	export let body: string;
	export let state: 'selected' | 'corrected' | 'incorrected' | 'revealed' | null;
</script>

<button
	on:click
	class="flex max-w-lg flex-col gap-3 rounded border-[3px] bg-white p-4 text-left shadow-lg transition-all hover:shadow-xl {state ===
	'selected'
		? 'border-blue-600'
		: state === 'corrected'
			? 'border-green-600'
			: state === 'incorrected'
				? 'border-red-500'
				: 'border-white'}"
>
	<div class="flex w-full flex-row items-start justify-between">
		<h3 class="font-charmonman text-4xl font-bold">{heading}</h3>
		<svg class="right-2 top-3 w-8" viewBox="0 0 24 24">
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
	<p>{body}</p>
</button>
