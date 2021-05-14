<script lang="ts">
	export let isReversed: boolean = false;

	$: text = isReversed ? 'ใหม่ไปเก่า' : 'เก่าไปใหม่';

</script>

<button class="pl-2 pr-3 py-1 text-sm text-light-blue-700 hover:bg-gray-100 rounded" on:click>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 inline fill-current">
		<path class={isReversed ? 'opacity-20' : ''} d="M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3z" />
		<path class={isReversed ? '' : 'opacity-20'} d="M9 3L5 6.99h3V14h2V6.99h3L9 3z" />
	</svg>
	เรียงจาก {text}
</button>
